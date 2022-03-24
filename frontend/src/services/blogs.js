import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
// const setToken = () =>{
//   const post = axios.post(baseUrl)
//   post.then
// }

export default { getAll }