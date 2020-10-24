import axios from 'axios'

export const postLogin = async credentials => {
  const url = `http://192.168.1.27:8000/api/account/login`
  const res = await axios.post(url, credentials, { withCredentials: true })
  return res.data
}
