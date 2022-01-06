import Header from './Header'

const EditingHeader = ({headerTitle, isEditing = false}) => {
    return (
        <Header headerTitle={isEditing?headerTitle + ' bearbeiten':headerTitle + ' anlegen'}/>
    );
};

export default EditingHeader