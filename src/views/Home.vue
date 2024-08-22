<script setup>
	import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
	import Spinner from '@/components/Spinner.vue'
	import CurrensiesList from '@/components/CurrensiesList.vue'

	const { proxy } = getCurrentInstance()

	const isLoading = ref('false')
	const data = reactive([])
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '')

	const fetchCurrencies = async () => {
		isLoading.value = true

		try {
			const response = await proxy.$axios.get('NBUStatService/v1/statdirectory/exchange?json')
			data.push(...response.data)
		} catch (err) {
			console.log(err)
		} finally {
			isLoading.value = false
		}
	}

	onMounted(fetchCurrencies)
</script>

<template>
	<h1>Курси валют на поточний день</h1>
	<Spinner v-if="isLoading" />
	<CurrensiesList
        v-else
        :currencies="data"
        :date="today"    
    />
</template>
