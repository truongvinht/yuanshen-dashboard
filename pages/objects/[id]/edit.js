import { useRouter } from 'next/router'
import useSWR from 'swr'
import ObjectForm from '../../../components/ObjectForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditObject = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: pullObject, error } = useSWR(id ? `/api/objects/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!pullObject) return <p>Loading...</p>

  const objectForm = {
    name: pullObject.name,
    type: pullObject.type,
    rating: pullObject.rating,
    element: pullObject.element,
    wp_type: pullObject.wp_type,
    obtained_from: pullObject.obtained_from,
    image_url: pullObject.image_url
  }

  return <ObjectForm formId="edit-object-form" objectForm={objectForm} forNewObject={false}/>
}

export default EditObject
