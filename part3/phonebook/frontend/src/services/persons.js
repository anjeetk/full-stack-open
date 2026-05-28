import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3001'

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/persons`)
  console.log(request)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(`${baseUrl}/api/persons`, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}


export default { getAll, create, update, remove }