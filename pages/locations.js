
import dbConnect from '../lib/dbConnect'
import Location from '../models/Location'
import Actionbar from '../components/Actionbar'

//<Actionbar  actions={actions} />
const Locations = ({locations, actions = {} }) => {

  return (
    <div>
      <h1>Regionen</h1>
      
      
      <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">

                {locations.map((obj) => (
                  <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {obj.name}
                        </div>
                        <div class="text-sm text-gray-500">
                          {obj._id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
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
    const result = await Location.find({})
    const locations = result.map((doc) => {
        const loc = doc.toObject()
        
        loc._id = loc._id.toString()
        return loc
    })

      // actions
    let actions = [{'param_ref':'/newLocation', 'param_as':'/newLocation', 'param_title':'Neu', isEdit:true}];

    return { props: { locations: locations, actions: actions}  }
}

export default Locations
