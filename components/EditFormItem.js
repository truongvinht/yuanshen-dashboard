
import EditFormText from './EditFormText'
import EditFormEnum from './EditFormEnum'
import EditFormDatetime from './EditFormDatetime'

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

    // datetime
    if (attribute_desc.classType === 'datetime-local') {
        return (
            <EditFormDatetime attribute_desc={attribute_desc} objForm={objForm} onChange={onChange}/>
        )
    }

    // default is only a div
    return (
        <div />
    )
}
export default EditFormItem
