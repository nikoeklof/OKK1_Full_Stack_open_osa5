import axios from 'axios'
const LoginbaseUrl = '/api/login'
const RegisterBaseurl = '/api/users'

const login = async credentials => {
  const response = await axios.post(LoginbaseUrl, credentials)
  return response.data
}

const register = async user => {
  const response = await axios.post(RegisterBaseurl, user)
  return response.data
}
export default { login, register }