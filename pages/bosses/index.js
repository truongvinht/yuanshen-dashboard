
import dbConnect from '../../lib/dbConnect'
import Boss from '../../models/Boss'
import Header from '../../components/Header'
import SimpleTable from '../../components/SimpleTable'

const Elements = ({elements, actions = {}, error = false}) => {
  
  return (
    <div>
      <Header headerTitle={"Boss"}/>
      <SimpleTable rowObjects={elements}></SimpleTable>
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
    const elements = result.map((doc) => {
        const el = doc.toObject()
        
        el._id = el._id.toString()
        el.description = el.synergy
        return el
    })

      // actions
    let actions = [{'param_ref':'/newBoss', 'param_as':'/newBoss', 'param_title':'Neu', isEdit:true}];

    return { props: { elements: elements, actions: actions}  }
}

export default Elements
