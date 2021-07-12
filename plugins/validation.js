export default function({ redirect }, inject) {
  const validation = {
    required: [
      (value) => {
        return value.length < 1 ? 'Field is required' : true
      }
    ]
  }

  inject('validation', validation)
}
