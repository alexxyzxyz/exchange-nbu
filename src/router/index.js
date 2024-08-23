import { createRouter, createWebHistory } from 'vue-router'
import { HOME, CUSTOM_CURRENCIES, SEARCH, EDIT } from '@/utils/routes'

const routes = [
	{
		path: '/',
		name: HOME,
		component: () => import('@/views/Home.vue'),
        meta: {
			title: 'Головна (курси на поточну дату)',
		},
	},
	{
		path: '/custom-currencies',
		name: CUSTOM_CURRENCIES,
		component: () => import('@/views/CustomCurrencies.vue'),
		meta: {
			title: 'Змінені курси',
		},
	},
	{
		path: '/search',
		name: SEARCH,
		component: () => import('@/views/Search.vue'),
        meta: {
			title: 'Пошук курсу по даті',
		},
	},
	{
		path: '/edit/:id/:date',
		name: EDIT,
		component: () => import('@/views/EditCurrency.vue'),
        meta: {
			title: 'Редагування курсу валюти',
		},
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title || 'Курси НБУ'
	next()
})

export default router
