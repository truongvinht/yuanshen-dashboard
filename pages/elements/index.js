
import dbConnect from '../../lib/dbConnect'
import Element from '../../models/Element'
import Header from '../../components/Header'

const Elements = ({elements, actions = {} }) => {

  return (
    <div>
      <Header headerTitle={"Elemente"}/>
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
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {elements.map((obj) => (
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
                          {obj._id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href={`/locations/${obj._id}/edit`} className="text-indigo-600 hover:text-indigo-900">Ändern</a>
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
    const result = await Element.find({})
    const elements = result.map((doc) => {
        const loc = doc.toObject()
        
        loc._id = loc._id.toString()
        return loc
    })

      // actions
    let actions = [{'param_ref':'/newLocation', 'param_as':'/newLocation', 'param_title':'Neu', isEdit:true}];

    return { props: { elements: elements, actions: actions}  }
}

export default Elements
