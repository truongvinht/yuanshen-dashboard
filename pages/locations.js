import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import dbConnect from '../lib/dbConnect'
import Location from '../models/Location'
import Head from 'next/head'


const Locations = ({locations}) => {

  return (
    <div>
      <Head>
        <title>Yuanshen-Dashboard</title>
      </Head>
      <h1>Regionen</h1>
      <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
          <AgGridReact
              rowData={locations}>
              <AgGridColumn field="_id"></AgGridColumn>
              <AgGridColumn field="name"></AgGridColumn>
              <AgGridColumn field="image_url"></AgGridColumn>
          </AgGridReact>
      </div>
    </div>
  );
};

export async function getServerSideProps() {

    // start db connection
    await dbConnect()


    /* find all the data in our database */
    const result = await Location.find({}).sort([["name", 1]])
    const locations = result.map((doc) => {
        const loc = doc.toObject()
        
        loc._id = loc._id.toString()
        return loc
    })

    return { props: { locations: locations } }
}

export default Locations
