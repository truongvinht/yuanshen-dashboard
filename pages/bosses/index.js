
import dbConnect from '../../lib/dbConnect'
import Boss from '../../models/Boss'
import Location from '../../models/Location'
import Header from '../../components/Header'
import SimpleTable from '../../components/base/SimpleTable'
import {BOSS_TYPE, bosstypeName} from '../../enum/BossType'

const Bosses = ({bosses, actions = {}, error = false}) => {
  

  let header = {
    "name": "Name",
    "description": "Description",
    "location": "Region"
  };

  return (
    <div>
      <Header headerTitle={"Boss"}/>
      <SimpleTable headerItems={header} rowObjects={bosses} subtitleKey={'sub'}></SimpleTable>
    </div>
  );
};

export async function getServerSideProps() {

    // start db connection
    await dbConnect()


    /* find all the data in our database */
    const result = await Boss.find({}).catch(err => {
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


    const bosses = result.map((doc) => {
        const b = doc.toObject()
        
        b._id = b._id.toString()
        b.location = locationMap[b.location_id]
        b.sub = bosstypeName(b.type)
        b.name = `${b.name} (${b.resin})`
        return b
    })

      // actions
    let actions = [{'param_ref':'/newBoss', 'param_as':'/newBoss', 'param_title':'Neu', isEdit:true}];

    return { props: { bosses: bosses, actions: actions}  }
}

export default Bosses
