const SimpleTableRow = ({ entry }) => {
    return (
            <tr key={entry._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full bg-gray-200" src={entry.image_url} alt="" />
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                                {entry.name}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm break-all whitespace-normal text-gray-900">{entry.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm break-all whitespace-normal text-gray-900">{entry._id}</div>
                </td>
            </tr>
    );
};

export default SimpleTableRow