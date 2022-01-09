import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import dbConnect from '../../lib/dbConnect'
import Pull from '../../models/Pull'
import PullObject from '../../models/PullObject'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'


const pulls = ({pulls}) => {
  const router = useRouter()
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };
//router.push('/objects')
  const onSelectionChanged = () => {
    const selectedRows = gridApi.getSelectedRows();
    console.log(selectedRows[0]._id)
    
  };
  return (
    <div>
      <Head>
        <title>Yuanshen-Dashboard</title>
      </Head>
      <h1>Überblick der Ziehungen</h1>
      <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
          <AgGridReact
              rowData={pulls}
              rowSelection={'single'}
              onGridReady={onGridReady}
              onSelectionChanged={onSelectionChanged}>
              <AgGridColumn field="banner"></AgGridColumn>
              <AgGridColumn headerName="Ziehung" field="object_ref"></AgGridColumn>
              <AgGridColumn headerName="Zeit" field="eventTime"></AgGridColumn>
              <AgGridColumn headerName="Index" maxWidth="80" field="order_index"></AgGridColumn>
              <AgGridColumn headerName="UID" field="uid"></AgGridColumn>
          </AgGridReact>
      </div>
    </div>
  );
};

export async function getServerSideProps() {

    // start db connection
    await dbConnect()

    const objResult = await PullObject.find({})
    const objects = objResult.map((obj) => {
      const pullObj = obj.toObject()
      pullObj._id = pullObj._id.toString()
      return pullObj
    })

    /* find all the data in our database */
    const result = await Pull.find({}).sort([["eventTime", 1], ["index", 1]])
    const pulls = result.map((doc) => {
        const pull = doc.toObject()
        
        pull._id = pull._id.toString()

        for (const pullObj of objects) {
          if (pullObj._id === pull.object_ref) {
            pull.object_ref = pullObj.name;
          }
        }

        pull.eventTime = pull.eventTime.toLocaleString()
        return pull
    })

    return { props: { pulls: pulls } }
}

export default pulls
