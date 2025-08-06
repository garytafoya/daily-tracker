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
          :items="['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']"
        ></v-select>
      </v-col>
      <v-col>
      <v-select
        class="mr-2"
        label="Year"
        :items="['2005', '2006']"
      ></v-select>
      </v-col>
    </v-row>

    <v-row class="mt-1" justify="center">
      <div class="text-body-1">Spent/Remaining</div>
    </v-row>
    <v-row class="mb-3" justify="center">
      <div class="text-h2"><span class="text-green">${{ monthlyTotal }}</span>/<span class="text-blue-accent-1">${{ remainingBudget }}</span></div>
    </v-row>



    <!-- <v-row class="mt-5" justify="center">
      <div class="text-body-1">Spent</div>
    </v-row>

    <v-row justify="center">
      <div class="text-h1">${{ monthlyTotal }}</div>
    </v-row>

    <v-row class="mt-5" justify="center">
      <div class="text-body-1">Remaining</div>
    </v-row>

    <v-row justify="center">
      <div class="text-h2">${{remainingBudget}}</div>

      <v-col cols="auto">
        <v-btn size="large" color="green-lighten-1" icon="mdi-plus" @click="addExpenseToDB()"></v-btn>
      </v-col>
    </v-row> -->

    <v-divider class="mt-5 mb-5"></v-divider>

    <v-row class="ml-2 mr-2" justify="space-between">
      <div class="text-body-1 ml-2">Monthly Spending Goal:</div>
      <div class="text-body-1 mr-2">$ {{ monthlyLimit }}</div>
    </v-row>

    <v-row class="ml-2 mr-2" justify="space-between">
      <div class="text-body-1 ml-2">Daily Spending Limit:</div>
      <div class="text-body-1 mr-2">${{ dailySpendingLimit }}</div>
    </v-row>
    
    <v-row class="ml-2 mr-2 text-red" justify="space-between">
      <div class="text-body-1 ml-2">Ave Daily Spend to Date:</div>
      <div class="text-body-1 mr-2">$40</div>
    </v-row>

    <v-row class="ml-2 mr-2" justify="space-between">
      <div class="text-body-1 ml-2">NEW Daily Spending Limit:</div>
      <div class="text-body-1 mr-2">${{ adjustedDailySpendingLimit }}</div>
    </v-row>


    <v-row class="ml-2 mr-2" justify="space-between">
      <div class="text-body-1 ml-2">% Budget Spent:</div>
      <div class="text-body-1 mr-2">{{ percentBudgetSpent }}%</div>
    </v-row>

    <v-row class="ml-2 mr-2" justify="space-between">
      <div class="text-body-1 ml-2">% Month Complete:</div>
      <div class="text-body-1 mr-2">{{percentMonthComplete}}%</div>
    </v-row>

  <v-divider class="mt-5 mb-5"></v-divider>

  <v-row class="mt-5" justify="center">
    <div class="text-h4">{{currentMonth}} {{currentYear}}</div>
    <v-col cols="auto">
      <v-btn size="small" color="green-lighten-1" icon="mdi-plus" @click="addExpenseToDB()"></v-btn>
    </v-col>
  </v-row>

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
import { getCurrentFullMonth, getDaysInMonth, getDaysLeftInMonth, averageByDate } from '@/js/utilities.js'
import AddExpense from '@/components/AddExpense.vue'
import { useExpenseStore } from '@/stores/expenseStore'

const expenseStore = useExpenseStore()

const currentMonth = ref('')
const currentYear = ref('')
const addExpense = ref('')

const headers = ref( [
  { title: 'DATE', align: 'center', key: 'displayDate' },
  { title: 'AMOUNT', align: 'center', key: 'value' },
])

onMounted(() => {
  const date = new Date()
  currentMonth.value = date.toLocaleString('default', { month: 'long' })
  currentYear.value = date.getFullYear()

  expenseStore.loadMonthlyExpenses(currentMonth.value, currentYear.value).then(() =>{
    currentMonth.value = getCurrentFullMonth()
    console.log(averageByDate(expenses.value))
  })
})

// COMPUTED FUNCTIONS
const expenses = computed (() => {
  return expenseStore.getMonthlyExpenses
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


// STANDARD FUNCTIONS
const addExpenseToDB = () => {
  console.log('adding expense')
  addExpense.value.openAddExpenseDialog()
}

</script>
