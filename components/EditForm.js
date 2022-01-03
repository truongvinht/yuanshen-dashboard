
import EditFormItem from './EditFormItem'

const EditForm = ({ formId, handleSubmit, components}) => {
    return (
        <>    
            <form className="w-full max-w-lg" id={formId} onSubmit={handleSubmit}>
                {components.map((obj) => (
                    <EditFormItem attribute_desc={obj} />
                ))}
                <button className="shadow bg-black-500 hover:bg-black-400 focus:shadow-outline focus:outline-none text-white| font-bold py-2 px-4 rounded" type="submit">
                Speichern
                </button>
            </form>
        </>
    )
}
export default EditForm
