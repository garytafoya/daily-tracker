<template>
  <v-card>
    <v-container>
      <v-row>
        <p class="text-overline ml-2">Daily Limit</p>
      </v-row>
      <v-row justify="space-between">
        <p class="text-h4 font-weight-light ml-2">${{ originalDailyLimit }}/${{ updatedDailyLimit }}</p>
      </v-row>
    </v-container>
  
  </v-card>
</template>

<script setup>

import { ref } from 'vue'
import { useExpenseStore } from '@/stores/expenseStore'
const expenseStore = useExpenseStore()

//Computed Functions

const originalDailyLimit = computed (() => {
  return expenseStore.getOriginalDailyLimit
})

const updatedDailyLimit = computed (() => {
  return expenseStore.getUpdatedDailyLimit
})

</script>