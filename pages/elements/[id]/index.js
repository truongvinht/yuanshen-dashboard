import { useRouter } from 'next/router'
import useSWR from 'swr'
import ElementForm from '../../../components/ElementForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditElement = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: elementObject, error } = useSWR(id ? `/api/elements/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!elementObject) return <p>Loading...</p>

  const elementForm = {
    name: elementObject.name,
    image_url: elementObject.image_url,
    synergy: elementObject.synergy,
    search_name: elementObject.search_name,
  }

  return <ElementForm formId="edit-element-form" elementForm={elementForm} forNewObject={false}/>
}

export default EditElement
