
import dbConnect from '../../lib/dbConnect'
import Element from '../../models/Element'
import Header from '../../components/Header'
import SimpleTable from '../../components/base/SimpleTable'

const Elements = ({elements, error = false}) => {
  
  let header = {
    "name": "Name",
    "description": "Beschreibung"
  };
  
  return (
    <div>
      <Header headerTitle={"Elemente"}/>
      <SimpleTable headerItems={header} rowObjects={elements}></SimpleTable>
    </div>
  );
};

export async function getServerSideProps() {

    // start db connection
    await dbConnect()


    /* find all the data in our database */
    const result = await Element.find({}).catch(err => {
      return []
    })
    const elements = result.map((doc) => {
        const el = doc.toObject()
        
        el._id = el._id.toString()
        el.description = el.synergy
        return el
    })
    return { props: { elements: elements}  }
}

export default Elements
