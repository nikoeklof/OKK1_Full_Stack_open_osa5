import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const newBlog = (blog, token) => {
  const config = { headers: { 'Authorization': `bearer ${token}` } }
  return axios.post(baseUrl, blog, config)
}
const addLikes = (blog) => {
  const likedBlog = blog
  likedBlog.likes = blog.likes + 1
  return axios.put(`${baseUrl}/${blog.id}`, likedBlog)
}
const deleteBlog = (id, token) => {
  const config = { headers: { 'Authorization': `bearer ${token}` } }
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getAll,
  newBlog,
  addLikes,
  deleteBlog
}