<template>

  <v-container  max-width="900">
    <v-row class="mt-5 mb-5" justify="center">
      <h1 class="text-h3 font-weight-bold text-center">Daily Tracker</h1>
    </v-row>

    <v-row justify="center">
      <v-col>
        <v-select
          class="ml-2"
          label="Month"
          v-model="currentMonthAbbr"
          :items="['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']"
          @update:model-value="loadExpenses()"
        ></v-select>
      </v-col>
      <v-col>
      <v-select
        class="mr-2"
        label="Year"
        v-model="currentYear"
        :items="['2025']"
      ></v-select>
      </v-col>
    </v-row>

    <v-row class="mt-5" justify="center">
      <div class="text-h4">{{currentMonthAbbr}} {{currentYear}}</div>
      <v-btn class="ml-2" size="small" color="green-lighten-1" icon="mdi-plus" @click="addExpenseToDB()"></v-btn>
    </v-row>

    <v-row>
      <v-col>
        <spent-card :spent="monthlyTotal" :goal="monthlyLimit"></spent-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <percent-spent-card :percent="percentBudgetSpent"></percent-spent-card>
      </v-col>
      <v-col>
        <percent-month-complete-card :percent="percentMonthComplete"></percent-month-complete-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <daily-spend-card :amount="adjustedDailySpendingLimit"></daily-spend-card>
      </v-col>
      <v-col>
        <average-daily-spend-card :average="averageDailySpend"></average-daily-spend-card>
      </v-col>
    </v-row>

    <v-btn @click="tmpFN">HI</v-btn>

    <v-data-table
      class="mt-5"
      :items="expenses"
      :headers="headers"
      items-per-page="-1"
      hide-default-footer
      density="compact"
    >
    </v-data-table>

  </v-container>
  <add-expense ref="addExpense"></add-expense>

</template>

<script setup>
import { getCurrentMonthAbbr, getCurrentFullMonth, getDaysInMonth, getDaysLeftInMonth, averageByDate } from '@/js/utilities.js'
import AddExpense from '@/components/AddExpense.vue'
import SpentCard from '@/components/SpentCard.vue'
import PercentSpentCard from '@/components/PercentSpentCard.vue'
import AverageDailySpendCard from '@/components/AverageDailySpendCard.vue'
import DailySpendCard from '@/components/DailySpendCard.vue'
import PercentMonthCompleteCard from '@/components/PercentMonthCompleteCard.vue'

import { useExpenseStore } from '@/stores/expenseStore'

const expenseStore = useExpenseStore()

const currentMonthAbbr = ref('')
const currentMonth = ref('')
const currentYear = ref('')
const addExpense = ref('')

const headers = ref( [
  { title: 'DATE', align: 'center', key: 'date' },
  { title: 'AMOUNT', align: 'center', key: 'amount' },
])

onMounted(() => {
  const date = new Date()
  currentMonth.value = date.toLocaleString('default', { month: 'long' })
  currentYear.value = String(date.getFullYear())
  currentMonthAbbr.value = getCurrentMonthAbbr()

  expenseStore.loadMonthlyExpenses(currentMonthAbbr.value, currentYear.value).then(() =>{
    currentMonth.value = getCurrentFullMonth()
  })
})

// COMPUTED FUNCTIONS
const expenses = computed (() => {
  let tmpExpenses = expenseStore.getMonthlyExpenses
  tmpExpenses.sort((a, b) => new Date(b.date) - new Date(a.date))
  return tmpExpenses
})

const monthlyLimit = computed (() => {
  return expenseStore.getMonthlyLimit
})

const dailySpendingLimit = computed (() => {
  const limit = monthlyLimit.value / getDaysInMonth(currentMonth.value, currentYear.value)
  return Number(limit).toFixed(0)
})

const adjustedDailySpendingLimit = computed (() => {
  const limit = remainingBudget.value / getDaysLeftInMonth()
  return Number(limit).toFixed(0)
})

const monthlyTotal = computed (() => {
  return expenseStore.getTotalSpent
})

const expenseAverage = computed(() => {
  return expenseStore.getAverageExpenseAmount
})

const remainingBudget = computed(() => {
  return expenseStore.getRemainingBudget
})

const percentBudgetSpent = computed(() => {
  const percentSpent = ((monthlyTotal.value / monthlyLimit.value) * 100)
  return Number(percentSpent).toFixed(0)
})

const percentMonthComplete = computed(() => {
  const percentComplete = (getDaysLeftInMonth() / getDaysInMonth(currentMonth.value, currentYear.value) * 100)
  return Number(percentComplete).toFixed(0)
})

const averageDailySpend = computed(() =>{
  return 44
})




// STANDARD FUNCTIONS
const addExpenseToDB = () => {
  console.log('adding expense')
  addExpense.value.openAddExpenseDialog()
}

const loadExpenses = () => {
  expenseStore.loadMonthlyExpenses(currentMonthAbbr.value, currentYear.value).then(() =>{
    console.log('done loading expenses')
  })
}


const tmpFN = () => {
  const tmp = expenseStore.getMonthlyExpenses
  const tmp1 = averageByDate(expenseStore.getMonthlyExpenses)
  console.log(tmp1)
}

</script>
