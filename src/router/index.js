import { createRouter, createWebHistory } from 'vue-router'
import { HOME, CUSTOM_CURRENCIES, SEARCH, EDIT } from '@/utils/routes'

const routes = [
    {
        path: '/',
        name: HOME,
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/custom-currencies',
        name: CUSTOM_CURRENCIES,
        component: () => import('@/views/CustomCurrencies.vue')
    },
    {
        path: '/search',
        name: SEARCH,
        component: () => import('@/views/Search.vue')
    },
    {
        path: '/edit/:id/:date',
        name: EDIT,
        component: () => import('@/views/EditCurrency.vue')
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router