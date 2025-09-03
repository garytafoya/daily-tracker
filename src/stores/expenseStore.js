// Utilities
import { defineStore } from 'pinia'
import { dbGetExpensesByMonthYear, dbGetSpendingLimit } from '@/js/db'
import { dailySpendingAverage, calculateDailySpendingLimit, getDaysInMonth, daysLeftInMonth, totalSpentInMonth } from '@/js/utilities'


export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    selectedMonth: '',
    selectedYear: '',
    monthlyLimit: 1100,
    monthlyExpenses: [],
    remainingBudget: '',
    originalDailySpendingLimit: '',
    updatedDailySpendingLimit: ''
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
        this.calculateRemainingBudget()
        this.calculateOriginalDailySpendingLimit()
        this.calculateUpdatedDailySpendingLimit()
      }
      catch (err) {
        console.log(err.message)
      }
    },
    calculateRemainingBudget() {
      this.remainingBudget = Number(this.monthlyLimit) - Number(totalSpentInMonth(this.monthlyExpenses))
    },
    calculateOriginalDailySpendingLimit() {
      const days = getDaysInMonth(this.selectedMonth, this.selectedYear)
      this.originalDailySpendingLimit = (this.monthlyLimit/days).toFixed(0)
    },
    calculateUpdatedDailySpendingLimit() {
      const daysLeft = daysLeftInMonth(this.selectedMonth, this.selectedYear)
      this.updatedDailySpendingLimit = calculateDailySpendingLimit(this.selectedMonth, this.selectedYear, daysLeft, this.remainingBudget).toFixed(0)
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
    getOriginalDailyLimit: (state) => {
      return state.originalDailySpendingLimit
    },
    getUpdatedDailyLimit: (state) => {
      return state.updatedDailySpendingLimit
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
    getDaysInMonth: (state) => {
      return getDaysInMonth(state.selectedMonth, state.selectedYear)
    },
    getRemainingDaysLeftInMonth: (state) => {
      return daysLeftInMonth(state.selectedMonth, state.selectedYear)
    },
   
  }


})

