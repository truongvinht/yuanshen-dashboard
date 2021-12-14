import ObjectForm from '../components/ObjectForm'

const NewObject = () => {
  const objectForm = {
    name: '',
    type: 'Figur',
    rating: 3,
    element: '',
    wp_type: '',
    obtained_from: '',
    image_url: ''
  }

  return <ObjectForm formId="add-object-form" objectForm={objectForm} />
}

export default NewObject
