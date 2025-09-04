<template>
  <v-card>
    <v-container>
      <v-row>
        <p class="text-overline ml-2">% Month</p>
      </v-row>
      <v-row justify="space-between">
        <p class="text-h4 font-weight-light ml-2">{{percentOfMonth}}%</p>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>

import { ref } from 'vue'
import { useExpenseStore } from '@/stores/expenseStore'
const expenseStore = useExpenseStore()

//Computed Functions
const percentOfMonth = computed (() => {
  const daysInMonth = expenseStore.getDaysInMonth
  const daysLeft = expenseStore.getRemainingDaysLeftInMonth
  const daysPast = daysInMonth - daysLeft

  return ( ((daysPast/daysInMonth) * 100).toFixed(0) )
})

</script>