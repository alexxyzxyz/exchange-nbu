import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/main.scss'
import App from '@/App.vue'
import axiosInstance from '@/plugins/axios'
import router from '@/router'

const app = createApp(App)
const pinia = createPinia()

app.use(axiosInstance).use(pinia).use(router).mount('#app')
