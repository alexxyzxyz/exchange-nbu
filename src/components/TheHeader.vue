<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { HOME, CUSTOM_CURRENCIES, SEARCH } from '@/utils/routes'

const home = HOME
const customCurrencies = CUSTOM_CURRENCIES
const search = SEARCH

const route = useRoute()

const currentRouteName = computed(() => route.name)

</script>

<template>
	<header class="header">
		<nav class="header__nav">
			<router-link :to="{ name: home }" class="header__nav__item" :class="{ active : currentRouteName === home }">Головна</router-link>
			<router-link :to="{ name: customCurrencies }" class="header__nav__item" :class="{ active : currentRouteName === customCurrencies }">Змінені курси</router-link>
			<router-link :to="{ name: search }" class="header__nav__item" :class="{ active : currentRouteName === search }">Пошук курсу</router-link>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
	.header {
		background: $header-bg;
		color: $white;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;

		&__nav {
			&__item {
				padding: 5px 20px;

				&.active {
					color: $header-active-menu;
					background-color: $white;
				}
			}
		}
	}
</style>
