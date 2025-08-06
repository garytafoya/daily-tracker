// Utilities
import { defineStore } from 'pinia'
import { dbGetExpensesByMonthAndYear } from '@/js/db'
import { calculateTotalMonthlySpend, calculateAverageExpenseAmount } from '@/js/utilities'


export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    monthlyLimit: '1200',
    monthlyExpenses: []
  }),

  actions: {
    async loadMonthlyExpenses(date) {
      try{
        const response = await dbGetExpensesByMonthAndYear(date)
        
        let updatedResponse = response.map(item => ({
          ...item,
          poop: 'yup we got it'
        }))


        
        console.log(updatedResponse)
        this.monthlyExpenses = updatedResponse
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


