import axios from 'axios'

const AxiosInstance = axios.create({
    baseURL : 'https://light-slug-slacks.cyclic.app',
})

export default AxiosInstance