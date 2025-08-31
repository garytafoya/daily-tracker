// Utilities
import { defineStore } from 'pinia'
import { dbGetExpensesByMonthYear, dbGetSpendingLimit } from '@/js/db'
import { dailySpendingAverage, calculateDailySpendingLimit, daysLeftInMonth, totalSpentInMonth } from '@/js/utilities'


export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    selectedMonth: '',
    selectedYear: '',
    monthlyLimit: 1100,
    monthlyExpenses: [],
    remainingBudget: '',
    dailySpendingLimit: ''
  }),

  actions: {
    setSelectedMonthAndYear(month, year) {
      this.selectedMonth = month
      this.selectedYear = year
    },
    async loadMonthlySpendingLimit() {
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
        this.updateRemainingBudget()
        this.updateDailySpendingLimit()
      }
      catch (err) {
        console.log(err.message)
      }
    },
    updateRemainingBudget() {
      this.remainingBudget = Number(this.monthlyLimit) - Number(totalSpentInMonth(this.monthlyExpenses))
    },
    updateDailySpendingLimit() {
      const daysLeft = daysLeftInMonth(this.selectedMonth, this.selectedYear)
      this.dailySpendingLimit = calculateDailySpendingLimit(this.selectedMonth, this.selectedYear, daysLeft, this.remainingBudget)
    }
  },
  getters: {
    getMonthlyExpenses: (state) => {
      return state.monthlyExpenses
    },
    getTotalSpent: (state) => {
      return totalSpentInMonth(state.monthlyExpenses)
    },
    getRemainingBudget: (state) => {
      return state.remainingBudget
    },
    getMonthlyLimit: (state) => {
      return state.monthlyLimit
    },
    getDailyLimit: (state) => {
      return state.dailySpendingLimit
    },
    getPercentSpent: (state) => {
      return ((totalSpentInMonth(state.monthlyExpenses)/state.monthlyLimit) * 100)
    },
    getDailySpendingAverage: (state) => {
      return dailySpendingAverage(state.monthlyExpenses)
    },
    getSelectedMonth: (state) => {
      return state.selectedMonth
    },
    getSelectedYear: (state) => {
      return state.selectedYear
    },
    getRemainingDaysLeftInMonth: (state) => {
      return daysLeftInMonth(state.selectedMonth, state.selectedYear)
    },
   
  }


})

