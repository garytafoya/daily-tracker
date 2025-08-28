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
          v-model="selectedMonth"
          :items="['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']"
          @update:model-value="loadExpenses()"
        ></v-select>
      </v-col>
      <v-col>
      <v-select
        class="mr-2"
        label="Year"
        v-model="selectedYear"
        :items="['2025']"
      ></v-select>
      </v-col>
    </v-row>

    <v-row class="mt-5" justify="center">
      <div class="text-h4">{{selectedMonth}} {{selectedYear}}</div>
      <v-btn class="ml-2" size="small" color="primary" icon="mdi-plus" @click="addExpenseToDB()"></v-btn>
    </v-row>

    <v-row>
      <v-col>
        <spent-card></spent-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <percent-spent-card></percent-spent-card>
      </v-col>
      <v-col>
        <days-left-card></days-left-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <daily-spend-card></daily-spend-card>
      </v-col>
      <v-col>
        <average-daily-spend-card></average-daily-spend-card>
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
      <template v-slot:item="{ item }">
        <tr class="text-no-wrap">
          <td class="text-h6 text-center">{{ formatDateForTable(item.date) }}</td>
          <td class="text-h6 text-center" @click="deleteExpenseFromDB(item)">${{ item.amount }}</td>
        </tr>
      </template>
    </v-data-table>

  </v-container>
  <add-expense ref="addExpense"></add-expense>
  <delete-expense ref="deleteExpense"></delete-expense>
</template>

<script setup>
import AddExpense from '@/components/AddExpense.vue'
import DeleteExpense from '@/components/DeleteExpense.vue'
import SpentCard from '@/components/SpentCard.vue'
import PercentSpentCard from '@/components/PercentSpentCard.vue'
import AverageDailySpendCard from '@/components/AverageDailySpendCard.vue'
import DailySpendCard from '@/components/DailySpendCard.vue'
import DaysLeftCard from '@/components/DaysLeftCard.vue'

import { useExpenseStore } from '@/stores/expenseStore'

const expenseStore = useExpenseStore()

const selectedMonth = ref('')
const selectedYear = ref ('')

const currentMonthAbbr = ref('')
const currentYear = ref('')
const addExpense = ref('')
const deleteExpense = ref('')

const headers = ref( [
  { title: 'DATE', align: 'center', key: 'date' },
  { title: 'AMOUNT', align: 'center', key: 'amount' },
])

onMounted(() => {
  //Get the current month/year to set the dropdown defaults
  //and save it in the store
  const date = new Date()
  selectedMonth.value = date.toLocaleString('default', { month: 'short' }).toUpperCase()
  selectedYear.value = String(date.getFullYear())
  expenseStore.setSelectedMonthAndYear(selectedMonth.value, selectedYear.value)

  // Load any expenses based on the selections
  expenseStore.loadMonthlyExpenses(selectedMonth.value, selectedYear.value).then(() =>{
    expenseStore.loadSpendingLimit()
  })
})

// COMPUTED FUNCTIONS
const expenses = computed (() => {
  let tmpExpenses = expenseStore.getMonthlyExpenses
  tmpExpenses.sort((a, b) => new Date(b.date) - new Date(a.date))
  return tmpExpenses
})

// STANDARD FUNCTIONS
const addExpenseToDB = () => {
  addExpense.value.openAddExpenseDialog()
}

const loadExpenses = () => {
  expenseStore.setSelectedMonthAndYear(selectedMonth.value, selectedYear.value)
  expenseStore.loadMonthlyExpenses(currentMonthAbbr.value, currentYear.value)
}

const deleteExpenseFromDB = (expense) => {
  deleteExpense.value.openDeleteExpenseDialog(expense)
}

const formatDateForTable = (dateStr) => {
  const [year, month, day] = dateStr.split('-')
  return `${parseInt(month)}/${parseInt(day)}`
}

</script>

<style scoped>

</style>