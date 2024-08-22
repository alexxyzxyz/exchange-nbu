import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import axiosInstance from '@/plugins/axios'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(axiosInstance)
app.use(pinia)
app.use(router)
app.mount('#app')
