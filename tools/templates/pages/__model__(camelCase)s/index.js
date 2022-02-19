import dbConnect from '../../lib/dbConnect'
import __model__ from '../../models/__model__'
import Header from '../../components/Header'

//<Actionbar  actions={actions} />
const __model__s = ({__model__(camelCase)s, actions = {} }) => {

  return (
    <div>
      <Header headerTitle={"__model__"}/>
    </div>
  );
};

export async function getServerSideProps() {
    
    // start db connection
    await dbConnect()

    /* find all the data in our database */
    const result = await __model__.find({})
    const __model__(camelCase)s = result.map((doc) => {
        const __model__(camelCase)s = doc.toObject()
        
        __model__(camelCase)s._id = __mod__model__(camelCase)s._id.toString()
        return __model__(camelCase)s
    })

      // actions
    let actions = [{'param_ref':'/__model__(camelCase)s/new', 'param_as':'/__model__(camelCase)s/new', 'param_title':'Neu', isEdit:true}];

    return { props: { __model__(camelCase)s: __model__(camelCase)s, actions: actions}  }
}

export default __model__s
