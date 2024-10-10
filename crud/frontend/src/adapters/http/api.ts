import axios from "axios"

const api = axios.create({
    baseURL: 'oriontec-crud-api.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default api