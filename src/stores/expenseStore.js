// Utilities
import { defineStore } from 'pinia'
import { dbGetExpensesByMonthYear, dbGetSpendingLimit } from '@/js/db'
import { averageByDate, calculateTotalMonthlySpend, calculateAverageExpenseAmount } from '@/js/utilities'


export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    selectedMonth: '',
    selectedYear: '',
    monthlyLimit: 1100,
    monthlyExpenses: []
  }),

  actions: {

    setSelectedMonthAndYear(month, year) {
      this.selectedMonth = month
      this.selectedYear = year
    },
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
    getMonthlyExpenses: (state) => {
      return state.monthlyExpenses
    },
    getTotalSpent: (state) => {
      return calculateTotalMonthlySpend(state.monthlyExpenses)
    },
    getRemainingBudget: (state) => {
      return (Number(state.monthlyLimit) - Number(calculateTotalMonthlySpend(state.monthlyExpenses)))
    },
    getMonthlyLimit: (state) => {
      return state.monthlyLimit
    },
    getDailyLimit: (store) => {
      return (store.getRemainingBudget / store.getRemainingDaysLeftInMonth).toFixed(0)
    },
    getPercentSpent: (state) => {
      return ((calculateTotalMonthlySpend(state.monthlyExpenses)/state.monthlyLimit) * 100)
    },
    getAverageDailySpend: (state) => {
      return averageByDate(state.monthlyExpenses)
    },
    getSelectedMonth: (state) => {
      return state.selectedMonth
    },
    getSelectedYear: (state) => {
      return state.selectedYear
    },
    getRemainingDaysLeftInMonth: (state) => {
      const monthIndex = new Date(`${state.selectedMonth} 1, ${state.selectedYear}`).getMonth()
      const totalDays = new Date(state.selectedYear, monthIndex + 1, 0).getDate()
      const today = new Date()
      
      if (today.getFullYear().toString() === state.selectedYear && today.getMonth() === monthIndex) {
        return (totalDays - today.getDate())
      }
      return "--" // If not the current month
    }
  }

})

