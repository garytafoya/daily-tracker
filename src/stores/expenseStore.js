// Utilities
import { defineStore } from 'pinia'
import { dbGetExpensesByMonthYear } from '@/js/db'
import { calculateTotalMonthlySpend, calculateAverageExpenseAmount } from '@/js/utilities'


export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    monthlyLimit: 1200,
    monthlyExpenses: []
  }),

  actions: {
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


