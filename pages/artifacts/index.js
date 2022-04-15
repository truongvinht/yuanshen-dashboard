
import dbConnect from '../../lib/dbConnect'
import Artifact from '../../models/Artifact'
import Dungeon from '../../models/Dungeon'
import CardCollectionGrid from '../../components/base/CardCollectionGrid'
import ArtifactCard from '../../components/custom/ArtifactCard'
import Header from '../../components/Header'

const Artifacts = ({artifacts, error = false}) => {
  
  return (
    <div>
      <Header headerTitle={"Artifaktsets"}/>
      <br />
      <CardCollectionGrid cards={
        artifacts.map((obj) => (
          <ArtifactCard card={obj} />
        ))} />
    </div>
  );
};

export async function getServerSideProps() {

    // start db connection
    await dbConnect()


    /* find all the data in our database */
    const result = await Artifact.find({}).catch(err => {
      return []
    })

    // search for Dungeon
    let dungeonMap = {}
    for (let d of result) {

        let dId = d.dungeon_id;

        // skip if already requested
        if (Object.prototype.hasOwnProperty.call(dungeonMap, dId)) {
            continue
        }

        const dungeon = await Dungeon.findById(dId).catch(err => {
            return []
        })
        if (dungeon !== undefined) {

          if (dungeon.name !== undefined &&dungeon.name !== null) {
            dungeonMap[dId] = {'name':dungeon.name, 'image_url':dungeon.image_url}
          }

        }
    }


    const objects = result.map((doc) => {
        const obj = doc.toObject()
        
        obj._id = obj._id.toString()

        if (Object.prototype.hasOwnProperty.call(obj, 'dungeon_id')) {

          if (Object.prototype.hasOwnProperty.call(dungeonMap, obj.dungeon_id)) {
            obj.dungeon = dungeonMap[obj.dungeon_id]
          }
        }


        return obj
    })
    return { props: { artifacts: objects}  }
}

export default Artifacts
