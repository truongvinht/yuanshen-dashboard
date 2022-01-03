const EditFormText = ({attribute_desc, objForm, onChange}) => {

    if (attribute_desc.required) {
        return (
            <div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={attribute_desc.name}>{attribute_desc.name}</label>
                <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                maxLength={attribute_desc.maxLength}
                name={attribute_desc.name}
                value={objForm[attribute_desc.value]}
                onChange={onChange}
                required
                />
            </div>
        )
    } else {
        return (
            <div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={attribute_desc.name}>{attribute_desc.name}</label>
                <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                maxLength={attribute_desc.maxLength}
                name={attribute_desc.name}
                value={objForm[attribute_desc.value]}
                onChange={onChange}
                />
            </div>
        )
    }
}
export default EditFormText
