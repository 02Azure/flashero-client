import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://localhost:3000'
  baseURL: 'https://flashero-02azure-server.herokuapp.com'
})

export default instance
