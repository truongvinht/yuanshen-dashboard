
import SimpleTableHeader from './SimpleTableHeader'
import SimpleTableRowSimple from './SimpleTableRowSimple'
import SimpleTableRowSub from './SimpleTableRowSub'

const SimpleTable = ({ headerItems, rowObjects, subtitleKey=undefined }) => {
    return (
        <div>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                    {
                                        Object.keys(headerItems).map((mapK) => (
                                            <SimpleTableHeader key={mapK} name={headerItems[mapK]} />
                                        ))
                                    }
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {rowObjects.map((obj) => (
                                        subtitleKey===undefined?
                                        <SimpleTableRowSimple key={obj._id} header={headerItems} entry={obj} />:
                                        <SimpleTableRowSub key={obj._id} header={headerItems} entry={obj} subtitleKey={subtitleKey} />
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

export default SimpleTable