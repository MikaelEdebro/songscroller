import songFields from './songFields'

export default values => {
  console.log({ values })
  const errors = {}

  songFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = 'Required'
    }
  })

  return errors
}
