import axios from "axios"

const api = axios.create({
    baseURL: 'https://oriontec-challenge-backend.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default api