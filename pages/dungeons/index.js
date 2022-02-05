import dbConnect from '../../lib/dbConnect'
import Dungeon from '../../models/Dungeon'
import Location from '../../models/Location'
import Header from '../../components/Header'

const DungeonPage = ({dungeons}) => {

    return (
        <div>
          <Header headerTitle={"Spähre"}/>
          <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dungeons.map((obj) => (
                      <tr key={obj._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full bg-gray-200" src={obj.image_url} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {obj.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {'in '+obj.location}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    
    
    
    
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
          dung.location = locationMap[dung.location_id]
          return dung
    })
    return { props: {dungeons: dungeons  }  }
}
export default DungeonPage

