import dbConnect from '../../lib/dbConnect'
import Dungeon from '../../models/Dungeon'
import Header from '../../components/Header'

const DungeonPage = ({}) => {
    return (
    <div>
        <Header headerTitle={"Dungeon"}/>
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
    return { props: { }  }
}
export default DungeonPage

