// Utilities
import { defineStore } from 'pinia'
import { dbGetExpensesByMonthYear, dbGetSpendingLimit } from '@/js/db'
import { averageDailyExpenseToDate, dailySpendingAverage, calculateDailySpendingLimit, getDaysInMonth, daysLeftInMonth, totalSpentInMonth } from '@/js/utilities'


export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    selectedMonth: '',
    selectedYear: '',
    monthlyLimit: 1100,
    monthlyExpenses: [],
    remainingBudget: '',
    originalDailySpendingLimit: '',
    updatedDailySpendingLimit: '',
    averageDailyExpenseToDate: '',
    daysInMonth: '',
    daysLeftInMonth: ''
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
        this.calculateAverageDailyExpenseToDate()
        this.calculateDaysInMonth()
        this.calculateDaysLeftInMonth()
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
      const spendingLimt = calculateDailySpendingLimit(this.selectedMonth, this.selectedYear, daysLeft, this.remainingBudget)
      this.updatedDailySpendingLimit = spendingLimt.toFixed(0)
    },
    calculateAverageDailyExpenseToDate() {
      this.averageDailyExpenseToDate = averageDailyExpenseToDate(this.monthlyExpenses, this.selectedMonth, this.selectedYear )
    },
    calculateDaysInMonth() {
      this.daysInMonth = getDaysInMonth(this.selectedMonth, this.selectedYear)
    },
    calculateDaysLeftInMonth() {
      this.daysLeftInMonth = daysLeftInMonth(this.selectedMonth, this.selectedYear)
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
      return state.averageDailyExpenseToDate
    },
    getSelectedMonth: (state) => {
      return state.selectedMonth
    },
    getSelectedYear: (state) => {
      return state.selectedYear
    },
    getDaysInMonth: (state) => {
      return state.daysInMonth
    },
    getRemainingDaysLeftInMonth: (state) => {
      return state.daysLeftInMonth
    },
  }

})

