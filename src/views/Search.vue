<script setup>
	import { ref, reactive, onMounted, getCurrentInstance, computed } from 'vue'
	import Spinner from '@/components/Spinner.vue'
	import CurrensiesList from '@/components/CurrensiesList.vue'

	const { proxy } = getCurrentInstance()

	const isLoading = ref('false')
	const data = reactive([])

	const today = new Date().toISOString().split('T')[0]
	const searchingDate = ref(today)

	const parsedDate = computed(() => {
		return searchingDate.value.replace(/-/g, '')
	})

	const fetchCurrencies = async () => {
		isLoading.value = true

		try {
			const response = await proxy.$axios.get(`NBUStatService/v1/statdirectory/exchange?date=${parsedDate.value}&json`)
            data.length = 0
			data.push(...response.data)
		} catch (err) {
			console.log(err)
		} finally {
			isLoading.value = false
		}
	}

    const searchDate = (e) => {
        if (!!e.target.value) {
            fetchCurrencies()
        }
    }

	onMounted(fetchCurrencies)
</script>

<template>
	<div class="search-list">
        <h1>Пошук курсу по даті</h1>
        <input
                class="search-input"
                v-model="searchingDate"
                type="date"
                :max="today"
                @change="searchDate"
            />
        <Spinner v-if="isLoading" />
        <CurrensiesList
            v-else
            :currencies="data"
            :date="parsedDate"    
        />
    </div>
</template>

<style lang="scss" scoped>
    .search-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        .search-input {
            margin: 20px auto;
        }
    }
    
</style>
