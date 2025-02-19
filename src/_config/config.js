import axios from "axios";

const api = axios.create({
    // baseURL: "https://ozarkbackend-production-4da6.up.railway.app/api"
    baseURL: "https://ozarkapi.coderworldlabs.in/api"
    // baseURL: "http://localhost:5000/api"
})

// export const BASE_URL = "https://ozarkbackend-production-4da6.up.railway.app"
export const BASE_URL = "https://ozarkapi.coderworldlabs.in/api"
// export const BASE_URL = "http://localhost:5000"
export default api;