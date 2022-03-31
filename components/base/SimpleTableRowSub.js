
import SimpleTableCellSingle from './SimpleTableCellSingle'
import SimpleTableCellImageWithSub from './SimpleTableCellImageWithSub'

const SimpleTableRowSub = ({header, entry , subtitleKey}) => {
    return (
            <tr key={entry._id}>
            {
                Object.keys(header).map((mapK) => (
                    Object.keys(header)[0] === mapK?
                    <SimpleTableCellImageWithSub key={mapK} image={entry.image_url} subtitle={entry[subtitleKey]} text={entry[mapK]} />:
                    <SimpleTableCellSingle key={mapK} text={entry[mapK]} />
                ))
            }

            </tr>
    );
};

export default SimpleTableRowSub