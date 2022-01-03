
import EditFormText from './EditFormText'
import EditFormEnum from './EditFormEnum'

const EditFormItem = ({attribute_desc, objForm, onChange}) => {

    // manual text input
    if (attribute_desc.classType === 'text') {
        return (
            <EditFormText attribute_desc={attribute_desc} objForm={objForm} onChange={onChange}/>
        )
    }

    // enum input
    if (attribute_desc.classType === 'enum') {
        return (
            <EditFormEnum attribute_desc={attribute_desc} objForm={objForm} onChange={onChange}/>
        )
    }

    // default is only a div
    return (
        <div />
    )
}
export default EditFormItem
