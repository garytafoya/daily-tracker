<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >

      <v-card
        title="Add Expense"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
            >
            <v-text-field
                  variant="outlined"
                  density="compact"
                  label="Date *"
                  v-model="expenseDate"
                  type="date"
                  required
                >
            </v-text-field>



            <v-text-field
              ref="inputRef"
              type="number" 
              class="custom-input custom-font" 
              label="Amount" 
              prefix="$"
              v-model="expenseAmount"
              @keypress="onlyAllowDigits"
              ></v-text-field>
            </v-col>
          </v-row>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="submitExpense()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, defineExpose, watch, nextTick } from 'vue'
import { dbAddExpense } from '@/js/db.js'
import { useExpenseStore } from '@/stores/expenseStore'

const expenseStore = useExpenseStore()


const dialog = ref(false)
const today = new Date().toISOString().split('T')[0]
const expenseDate = ref(today)
const expenseAmount = ref('')
const input = ref('')
const inputRef = ref(null)

//always set focus to the input
watch(dialog, async (val) => {
  if (val) {
    await nextTick()
    inputRef.value?.focus()
  }
})

const onlyAllowDigits = e => {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault()
  }
}

const wholeNumberRule = v =>
  /^\d*$/.test(v) || 'Only whole numbers are allowed'


const openAddExpenseDialog = () => {
  dialog.value = true
  expenseAmount.value = ''
}

const submitExpense = async () => {

  dialog.value = false
  console.log('submitting: ' + expenseDate.value)

  dbAddExpense(
    {
    date: expenseDate.value,
    amount: expenseAmount.value
    }
  ).then(() => {
    expenseStore.loadMonthlyExpenses(expenseDate.value)
  })


  // const date = new Date()
  // const month = date.toLocaleString('default', { month: 'long' })
  // const year = date.getFullYear()

  // dbAddExpense(expenseAmount.value).then(() => {
  //   expenseStore.loadMonthlyExpenses(month, year)
  // })

}

// Functions to Expose to Parent
defineExpose({
  openAddExpenseDialog,
})


</script>


<style scoped>
.custom-input {
  height: 100px;
}

.custom-font ::v-deep .v-field__input {
  font-size: 50px;
  text-align: center;
}
</style>
