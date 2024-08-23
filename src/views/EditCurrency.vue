<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { ref, reactive, onMounted, getCurrentInstance, computed } from 'vue'
    import { useEditedCurrencies } from '@/store/editedCurrencies'
    import { CUSTOM_CURRENCIES } from '@/utils/routes'
	import Spinner from '@/components/Spinner.vue'

    const route = useRoute()

    const router = useRouter()

    const store = useEditedCurrencies()

    const { proxy } = getCurrentInstance()

	const isLoading = ref(false)

	const data = reactive({})

    const oldRate = ref('')

    const isAlreadyChanged = store.editedCurrenciesList.find(i => i.cc === route.params.id && i.exchangedate === route.params.date)

    const updateData = (newData) => {
        Object.keys(newData).forEach(key => {
            data[key] = newData[key];
        });
    }

    const valueChanged = computed(() => {
        return data.rate.toString() !== oldRate.value.toString()
    })

    const fetchCurrency = async () => {
		isLoading.value = true

		try {
			const response = await proxy.$axios.get(`NBUStatService/v1/statdirectory/exchange?valcode=${route.params.id}&date=${route.params.date}&json`)
            
            if (response.data.length) {
                return response.data
            } else {
                return {}
            }            
		} catch (err) {
			console.log(err)
		} finally {
			isLoading.value = false
		}
	}

    const isParamsWithError = computed(() => {
        return Object.entries(data).length === 0
    })

    const save = () => {
        if (!isParamsWithError || data.message) {
            console.log(1)
            return
        }
        store.addNewCurrency(data, isAlreadyChanged)
        router.push({ name: CUSTOM_CURRENCIES })
    }

    onMounted(async () => {
        if (isAlreadyChanged && Object.entries(isAlreadyChanged).length !== 0) {
            updateData(isAlreadyChanged)
            oldRate.value = isAlreadyChanged.rate
        } else {
            const response = await fetchCurrency()
            updateData(...response)
            oldRate.value = response[0].rate
        }        
    })

</script>

<template>
    <h1>Редагування курсу</h1>
    <Spinner v-if="isLoading" />
    <div
        v-else
        class="edit-currency"
    >
        <div class="edit-currency__row">
            <label>
                <span>r030:</span>
                <input type="text" :disabled="true" :value="data.r030" >
            </label>
        </div>
        <div class="edit-currency__row">
            <label>
                <span>txt:</span>                
                <input type="text" :disabled="true" :value="data.txt" >
            </label>
        </div>
        <div class="edit-currency__row">
            <label>
                <span>rate:</span>                
                <input type="number" v-model="data.rate" >
            </label>
        </div>
        <div class="edit-currency__row">
            <label>
                <span>cc:</span>                
                <input type="text" :disabled="true" :value="data.cc" >
            </label>
        </div>
        <div class="edit-currency__row">
            <label>
                <span>exchangedate:</span>                
                <input type="text" :disabled="true" :value="data.exchangedate" >
            </label>
        </div>
        <p
            v-if="isParamsWithError"
            class="edit-currency__params-error"
        >
            Wrong parameters format
        </p>
        <p
            v-if="data.message"
            class="edit-currency__server-error"
        >
            {{ data.message }}
        </p>
        <button
            class="edit-currency__save-btn"
            :disabled="data.message || isParamsWithError || !valueChanged"
            @click="save"
        >
            Save
        </button>
    </div>
</template>

<style lang="scss" scoped>
    .edit-currency {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;

        &__row {
            span {
                display: inline-block;
                width: 150px;
                text-align: start;
            }
        }

        &__server-error,
        &__params-error {
            color: $error-text;
            font-size: 18px;
            background-color: $error-bg;
            padding: 10px;
        }

        &__save-btn {
            margin-top: 20px;
            align-self: flex-end;
        }
    }
</style>