import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://api.relysia.com',
})

export default instance
