import songFields from './songFields'

export default values => {
  const errors = {}

  songFields.forEach(field => {
    if (field.validation.required && !values[field.name]) {
      errors[field.name] = 'Required'
    }
  })

  return errors
}
