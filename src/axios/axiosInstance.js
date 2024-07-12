import axios from 'axios'

const AxiosInstance = axios.create({
    baseURL: 'https://taskapp-aleemilyas.azurewebsites.net/',
})

export default AxiosInstance