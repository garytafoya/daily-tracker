<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
      class="dialog-top"
    >
      <v-card title="Add Expense">
        <v-card-text class="pb-2">
          <v-row dense>
            <v-col cols="12" class="pb-0">
              <p class="text-overline">Date *</p>
              <v-text-field
                variant="outlined"
                density="comfortable"
                v-model="expenseDate"
                type="date"
                required
              >
              </v-text-field>

              <p class="text-overline">Expense Amount *</p>
              <v-text-field
                ref="inputRef"
                type="number" 
                prefix="$"
                density="comfortable"
                v-model="expenseAmount"
                @keypress="onlyAllowDigits"
              ></v-text-field>
            </v-col>
          </v-row>
            
          <!-- CATEGORY CHIPS -->
          <p class="text-overline pb-0">Categories</p>
          <v-chip-group
            class="d-flex justify-center"
            selected-class="text-primary"
            column
            v-model="selectedCategory"
          >
            <v-chip
            v-for="(chip, index) in tags"
            :key="index"
            :value="chip"
            size="large"
            color="primary"
            >
              {{ chip }}
            </v-chip>
          </v-chip-group>
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
const expenseDate = ref(new Date().toLocaleDateString('en-CA'))
const expenseAmount = ref('')
const inputRef = ref(null)
const selectedCategory = ref('')

const tags= ref([
  'Gas',
  'Groceries',
  'Shopping',
  'Amazon',
  'Restaurant',
  'Coffee',
  'Other'
])

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
  selectedCategory.value = ''
}

const submitExpense = async () => {
  dialog.value = false
  const month = expenseStore.getSelectedMonth
  const year = expenseStore.getSelectedYear

  if (selectedCategory.value == '') selectedCategory.value = 'Other'

  dbAddExpense(
    {
    date: expenseDate.value,
    searchMonth: month,
    searchYear: year.toString(),
    amount: expenseAmount.value,
    category: selectedCategory.value
    }
  ).then(() => {
    expenseStore.loadMonthlyExpenses(month, year)
  })
}

// Functions to Expose to Parent
defineExpose({
  openAddExpenseDialog,
})
</script>

<style scoped>
.dialog-top {
  align-items: flex-start !important;   /* vertical alignment */
  justify-content: center !important;  /* keep it horizontally centered */
  padding-top: 20px !important;        /* optional spacing from top */
}
</style>
