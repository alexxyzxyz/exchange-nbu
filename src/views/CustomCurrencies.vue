<script setup>
    import { useEditedCurrencies } from '@/store/editedCurrencies'
    import CurrensiesList from '@/components/CurrensiesList.vue'

    const store = useEditedCurrencies()
</script>

<template>
    <h1>Курси валют які змінив користувач</h1>
    <CurrensiesList
        :currencies="store.editedCurrenciesList"
    />
</template>