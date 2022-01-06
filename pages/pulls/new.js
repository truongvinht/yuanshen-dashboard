import dbConnect from '../../lib/dbConnect'
import PullObject from '../../models/PullObject'
import SinglePullForm from '../../components/SinglePullForm'

const NewSinglePull = ({ pullObjects }) => {
    const singlePullForm = {
        banner: '',
        object_ref: '',
        eventTime: new Date(),
        uid: ''
    }

    return <SinglePullForm formId="add-pull-form" pullObjects={pullObjects} pForm={singlePullForm} />
}

export async function getServerSideProps() {
    await dbConnect()

    /* find all the data in our database */
    const result = await PullObject.find({}).sort([["rating", -1], ["type", 1], ["name", 1]])
    const pullObjects = result.map((doc) => {
        const pullObj = doc.toObject()
        pullObj._id = pullObj._id.toString()
        return pullObj
    })

    return { props: { pullObjects: pullObjects } }
}

export default NewSinglePull
