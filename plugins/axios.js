export default function({ $axios, redirect }, inject) {
  // define headers
  const oHeaders = {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  // create doc service
  const geoCodeApi = $axios.create({
    baseURL: 'https://nominatim.openstreetmap.org',
    headers: oHeaders
  })

  inject('geoCodeApi', geoCodeApi)
}
