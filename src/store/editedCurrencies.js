import { defineStore } from 'pinia'

export const useEditedCurrencies = defineStore('editedCurrencies', {
    state: () => ({
        currenciesList: [],
    }),
    actions: {
        addNewCurrency(newItem, isExist) {
            if (isExist) {
                this.editedCurrenciesList.forEach(i => {
                    if (i.cc === newItem.cc && i.exchangedate === newItem.exchangedate) {
                        i.rate = newItem.rate
                    }
                })
            } else {
                this.editedCurrenciesList.push(newItem)
            }            
        },
    },
    getters: {
        editedCurrenciesList: (state) => state.currenciesList 
    }
})