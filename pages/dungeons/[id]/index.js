import { useRouter } from 'next/router'
import useSWR from 'swr'
import Header from '../../components/Header'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditDungeonPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: object, error } = useSWR(id ? `/api/dungeons/${id}` : null, fetcher)

    if (error) return <p>Failed to load</p>
    if (!object) return <p>Loading...</p>

    return (
    <div>
        <Header headerTitle={"Dungeon"}/>
    </div>
    );
};

export default EditDungeonPage

