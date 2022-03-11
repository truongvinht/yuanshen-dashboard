const SimpleTableHeader = ({name}) => {
    return (
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {name}
            </th>
    );
};

export default SimpleTableHeader