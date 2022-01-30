const EditFormMultiEnum = ({attribute_desc, objForm, onChange}) => {
    return (
        <div>
            <label 
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor={attribute_desc.name}>{attribute_desc.name}</label>

            <select
                name={attribute_desc.name}
                value={objForm[attribute_desc.value]}
                onChange={onChange}
                className="block col-span-1 appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
                {attribute_desc.options.map((obj) => (
                    <option key={obj.value} value={obj.value}>{obj.text}</option>
                ))}
            </select>
        </div>
    )
}
export default EditFormMultiEnum
