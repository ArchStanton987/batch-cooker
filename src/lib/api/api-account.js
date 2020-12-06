import axios from 'axios'

export const postLogin = async credentials => {
  const url = `https://batch-cooker.herokuapp.com/api/account/login`
  const res = await axios.post(url, credentials, { withCredentials: true })
  return res
}

export const postRegister = async credentials => {
  const url = `https://batch-cooker.herokuapp.com/api/account/register`
  const res = await axios.post(url, credentials, { withCredentials: true })
  return res
}

export const disconnectUser = async UserId => {
  const url = `https://batch-cooker.herokuapp.com/api/account/logout`
  const res = await axios.post(url, { UserId: UserId, disconnect: true }, { withCredentials: true })
  return res
}
