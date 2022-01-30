import EditFormEnumElement from './EditFormEnumElement'

const EditFormEnum = ({attribute_desc, objForm, onChange}) => {
    return (
        <div>
            <label 
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor={attribute_desc.name}>{attribute_desc.name}</label>
            <EditFormEnumElement name={attribute_desc.name} options={attribute_desc.options} element={objForm[attribute_desc.value]} onChange={onChange} />
        </div>
    )
}
export default EditFormEnum
