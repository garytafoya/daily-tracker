<template>
  <v-card>
    
    <!-- {{spent}} -->


    <v-container>
      <v-row>
        <p class="text-overline ml-2">Daily Ave</p>
      </v-row>
      <v-row justify="space-between">
        <p class="text-h4 font-weight-light ml-2">${{ aveSpend }}</p>
      </v-row>
    </v-container>
  
  </v-card>
</template>

<script setup>

import { ref } from 'vue'
import { useExpenseStore } from '@/stores/expenseStore'
const expenseStore = useExpenseStore()

//Computed Functions
const aveSpend = computed (() => {
  return expenseStore.getAverageDailySpend
})


</script>