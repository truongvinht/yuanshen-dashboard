import { useRouter } from 'next/router'
import useSWR from 'swr'
import LocationForm from '../../../components/LocationForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditElement = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: locationObject, error } = useSWR(id ? `/api/locations/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!locationObject) return <p>Loading...</p>



  const locationForm = {
    name: locationObject.name,
    image_url: locationObject.image_url
  }

  return <LocationForm formId="edit-location-form" locationForm={locationForm} forNewObject={false}/>
}

export default EditElement
