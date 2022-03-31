// table cell with single text line with image
const SimpleTableCellImageWithSingle = ({image, text, defaultImg = ''}) => {
    return (
        <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
                <img className="h-10 w-10 rounded-full bg-gray-200" src={image} alt={defaultImg} />
            </div>
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                    {text}
                </div>
            </div>
        </div>
    </td>
    );
};

export default SimpleTableCellImageWithSingle