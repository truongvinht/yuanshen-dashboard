import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import dbConnect from '../../lib/dbConnect'
import Pull from '../../models/Pull'
import PullObject from '../../models/PullObject'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Actionbar from '../../components/Actionbar'


const pulls = ({pulls, actions = {}}) => {
  const router = useRouter()
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };
//router.push('/objects')
  const onSelectionChanged = () => {
    const selectedRows = gridApi.getSelectedRows();
    router.push(`/pulls/${selectedRows[0]._id}`)
  };



  const dynamicCellStyle = params => {

    console.log(params);
    if (params.data.rating === '4') {
        //mark police cells as red
        return {color: 'purple','font-weight': 'bold', backgroundColor: 'AliceBlue'};
    }else if (params.data.rating === '5') {
        //mark police cells as red
        return {color: 'orange', 'font-weight': 'bold',backgroundColor: 'AliceBlue'};
    }
    return {color: 'black', backgroundColor: 'white'};
  };

  return (
    <div>
      <Head>
        <title>Yuanshen-Dashboard</title>
      </Head>
      <h1>Überblick der Ziehungen ({pulls.length})</h1>
      <Actionbar actions={actions} />
      <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
          <AgGridReact
              rowData={pulls}
              rowSelection={'single'}
              onGridReady={onGridReady}
              onSelectionChanged={onSelectionChanged}
              rowStyle={'black'}

>
              <AgGridColumn field="banner" cellStyle={dynamicCellStyle}></AgGridColumn>
              <AgGridColumn headerName="Ziehung" field="object_ref" cellStyle={dynamicCellStyle}></AgGridColumn>
              <AgGridColumn headerName="Zeit" field="eventTime" cellStyle={dynamicCellStyle}></AgGridColumn>
              <AgGridColumn headerName="Index" maxWidth="80" field="order_index" cellStyle={dynamicCellStyle}></AgGridColumn>
              <AgGridColumn headerName="UID" field="uid" cellStyle={dynamicCellStyle}></AgGridColumn>

          </AgGridReact>
      </div>
    </div>
  );
};
// <AgGridColumn headerName="Rarität" maxWidth="80" field="rating"></AgGridColumn>

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
        let pull = doc.toObject()
        
        pull._id = pull._id.toString()

        for (const pullObj of objects) {
          if (pullObj._id === pull.object_ref) {
            pull.object_ref = pullObj.name;
            pull.rating = `${pullObj.rating}`;
          }
        }

        pull.eventTime = pull.eventTime.toLocaleString()
        return pull
    })

  // actions
  let actions = [{'param_ref':'/pulls/new', 'param_as':'/pulls/new', 'param_title':'Single', isEdit:true},
  {'param_ref':'/pulls/newMulti', 'param_as':'/pulls/newMulti', 'param_title':'Multi', isEdit:true}
];

    return { props: { pulls: pulls , actions: actions} }
}

export default pulls
