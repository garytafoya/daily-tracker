<template>
   <v-dialog
      v-model="dialog"
      max-width="600"
      class="dialog-top"
    >
    <v-card title="Delete This Expense?">
      <v-row class="mb-3" justify="center">
        <p class="text-h6 font-weight-light ml-2">${{expenseToDelete.amount}} on {{ formatDateForDialog(expenseToDelete.date) }}</p>
      </v-row>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Cancel"
          variant="plain"
          @click="dialog = false"
        ></v-btn>

        <v-btn
          color="primary"
          text="Delete"
          variant="tonal"
          @click="submitDeleteExpense()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import { dbDeleteExpense } from '@/js/db.js'
import { useExpenseStore } from '@/stores/expenseStore'

const expenseStore = useExpenseStore()
const dialog = ref(false)
const expenseToDelete = ref('')

// STANDARD FUNCTIONS
const openDeleteExpenseDialog = (expense) => {
  expenseToDelete.value = expense
  dialog.value = true
}

const formatDateForDialog = (dateStr) => {
  const [year, month, day] = dateStr.split('-')
  return `${parseInt(month)}/${parseInt(day)}`
}

const submitDeleteExpense = async () => {
  const month = expenseStore.getSelectedMonth
  const year = expenseStore.getSelectedYear

  dbDeleteExpense(expenseToDelete.value.id)
  .then(() => {
    expenseStore.loadMonthlyExpenses(month, year)
    dialog.value = false
  })
}

// Functions to Expose to Parent
defineExpose({
  openDeleteExpenseDialog
})

</script>

<style scoped>
.dialog-top {
  align-items: flex-start !important;   /* vertical alignment */
  justify-content: center !important;  /* keep it horizontally centered */
  padding-top: 20px !important;        /* optional spacing from top */
}
</style>
