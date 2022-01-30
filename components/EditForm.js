
import EditFormItem from './EditFormItem'

const EditForm = ({ formId, columns=1, onChange, handleSubmit, handleDelete=null, objForm, components}) => {
    
    const formClass = `w-full grid grid-cols-${columns} gap-3 max-w-lg`
    
    return (
        <>    
            <form className={formClass} id={formId} onSubmit={handleSubmit}>
                {components.map((obj) => (
                    <EditFormItem attribute_desc={obj} objForm={objForm} onChange={onChange} />
                ))}
                <button className="shadow bg-black-500 hover:bg-black-400 focus:shadow-outline focus:outline-none text-white| font-bold py-2 px-4 rounded" type="submit">
                Speichern
                </button>{handleDelete!==null?<button className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white| font-bold py-2 px-4 rounded" onClick={handleDelete}  type="button">
                Löschen
                </button>:<div />}
                
            </form>
        </>
    )
}
export default EditForm
{}