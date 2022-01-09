import { useRouter } from 'next/router'
import useSWR from 'swr'
import EditPullForm from '../../../components/EditPullForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditPull = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: pull, error } = useSWR(id ? `/api/pulls/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!pull) return <p>Loading...</p>

  return <EditPullForm formId="edit-pull-form" pull={pull}/>
}

export default EditPull
