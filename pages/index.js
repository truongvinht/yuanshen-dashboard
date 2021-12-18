import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import dbConnect from '../lib/dbConnect'
import Pull from '../models/Pull'
import PullObject from '../models/PullObject'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import pullObjects from './objects';

const Index = ({pulls}) => {
  const rowData = [
    {make: "Toyota", model: "Celica", price: 35000},
    {make: "Ford", model: "Mondeo", price: 32000},
    {make: "Porsche", model: "Boxter", price: 72000}
  ];

  return (
      <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
          <AgGridReact
              rowData={pulls}>
              <AgGridColumn field="banner"></AgGridColumn>
              <AgGridColumn field="object_ref"></AgGridColumn>
              <AgGridColumn field="eventTime"></AgGridColumn>
              <AgGridColumn field="index"></AgGridColumn>
          </AgGridReact>
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

export default Index
