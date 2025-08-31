<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
      class="dialog-top"
    >
      <v-card title="Set Spending Limit">

        <v-slider
          class="ml-0 mr-0 text-h6"
          color="primary"
          :max="5"
          :ticks="limitValues"
          show-ticks="always"
          direction="vertical"
          step="1"
          tick-size="6"
          label="Spending Limit"
          v-model="spendingLimit"
        ></v-slider>

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
            @click="submitSpendingLimit()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import { dbSetSpendingLimit } from '@/js/db.js'
import { useExpenseStore } from '@/stores/expenseStore'

const expenseStore = useExpenseStore()
const dialog = ref(false)

const spendingLimit = ref()

const limitValues = ref({
  0: 1000,
  1: 1100,
  2: 1200,
  3: 1300,
  4: 1400,
  5: 1500
})

// COMPUTED FUNCTIONS
const savedSpendingLimit = computed (() => {
  return expenseStore.getMonthlyLimit
})


// STANDARD FUNCTIONS
const openSetSpendingLimitDialog = () => {

  console.log(savedSpendingLimit.value)
  const limitValueindex= Object.keys(limitValues.value).find(key => limitValues.value[key] === savedSpendingLimit.value)
  spendingLimit.value = limitValueindex
  dialog.value = true
}

const submitSpendingLimit = async () => {
  dbSetSpendingLimit(
    { spendingLimit: limitValues.value[spendingLimit.value]}
  ).then(() => {
    expenseStore.loadMonthlySpendingLimit().then(() => {
      dialog.value = false
    })

  })
}

// Functions to Expose to Parent
defineExpose({
  openSetSpendingLimitDialog,
})


</script>

<style scoped>
.dialog-top {
  align-items: flex-start !important;   /* vertical alignment */
  justify-content: center !important;  /* keep it horizontally centered */
  padding-top: 20px !important;        /* optional spacing from top */
}
</style>