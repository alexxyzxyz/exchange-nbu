import axios from 'axios'

export default {
    install: (app) => {
        const axiosInstance = axios.create({
            baseURL: 'https://bank.gov.ua/',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        app.config.globalProperties.$axios = axiosInstance;
    }
}