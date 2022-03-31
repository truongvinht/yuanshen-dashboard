
import SimpleTableCellSingle from './SimpleTableCellSingle'
import SimpleTableCellImageWithSingle from './SimpleTableCellImageWithSingle'

const SimpleTableRowSimple = ({header, entry }) => {
    return (
            <tr key={entry._id}>
            {
                Object.keys(header).map((mapK) => (
                    Object.keys(header)[0] === mapK?
                    <SimpleTableCellImageWithSingle key={mapK} image={entry.image_url} text={entry[mapK]} />:
                    <SimpleTableCellSingle key={mapK} text={entry[mapK]} />
                ))
            }

            </tr>
    );
};

export default SimpleTableRowSimple