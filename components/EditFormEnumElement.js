const EditFormEnumElement = ({name, options, element, onChange}) => {
    return (
        <div>
            <select
                name={name}
                value={element}
                onChange={onChange}
                className="block col-span-1 appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
                {options.map((obj) => (
                    <option key={obj.value} value={obj.value}>{obj.text}</option>
                ))}
            </select>
        </div>
    )
}
export default EditFormEnumElement
