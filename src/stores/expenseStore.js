// Utilities
import { defineStore } from 'pinia'
import { dbGetExpensesByMonthYear, dbGetSpendingLimit } from '@/js/db'
import { calculateTotalMonthlySpend, calculateAverageExpenseAmount } from '@/js/utilities'


export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    monthlyLimit: 1100,
    monthlyExpenses: []
  }),

  actions: {
    async loadSpendingLimit() {
      try{
        const response = await dbGetSpendingLimit()
        this.monthlyLimit = response
      }
      catch (err) {
        console.log(err.message)
      }
    },
    async loadMonthlyExpenses(month, year) {
      try{
        const response = await dbGetExpensesByMonthYear(month, year)
        this.monthlyExpenses = response
      }
      catch (err) {
        console.log(err.message)
      }
    }
  },
  getters: {
    getMonthlyLimit: (state) => state.monthlyLimit,
    getMonthlyExpenses: (state) => state.monthlyExpenses,
    getTotalSpent: (state) => calculateTotalMonthlySpend(state.monthlyExpenses),
    getRemainingBudget: (state) => (Number(state.monthlyLimit) - Number(calculateTotalMonthlySpend(state.monthlyExpenses))),
    getAverageExpenseAmount: (state) => calculateAverageExpenseAmount(state.monthlyExpenses)
  }

})


