import dbConnect from '../../lib/dbConnect'
import Dungeon from '../../models/Dungeon'
import Location from '../../models/Location'
import Header from '../../components/Header'
import SimpleTable from '../../components/base/SimpleTable'

const DungeonPage = ({ dungeons }) => {
  let header = {
    "name": "Name"
  };
  return (
    <div>
      <Header headerTitle={"Spähre"} />
      <SimpleTable headerItems={header} rowObjects={dungeons} subtitleKey={'location'} />
    </div>
  );
};

export async function getServerSideProps() {

  // start db connection
  await dbConnect()
  /* find all the data in our database */
  const result = await Dungeon.find({}).catch(err => {
    return []
  })


  // search for location

  let locationMap = {}
  for (let d of result) {

    let locId = d.location_id;

    // skip if already requested
    if (Object.prototype.hasOwnProperty.call(locationMap, locId)) {
      continue
    }

    const loc = await Location.findById(locId).catch(err => {
      return []
    })
    if (loc !== undefined)
      locationMap[locId] = loc.name;
  }

  let dungeons = result.map((doc) => {
    const dung = doc.toObject()

    dung._id = dung._id.toString()
    dung.location = `in ${locationMap[dung.location_id]}`
    return dung
  })
  return { props: { dungeons: dungeons } }
}
export default DungeonPage

