<template>
  <v-card>
    <v-container>
      <v-row justify="space-between">
        <p class="text-overline ml-2 mb-2">Spent</p>
        <p class="text-overline ml-2 mb-2">Remaining</p>
        <p class="text-overline mr-2 mb-2">Limit
          <v-btn class="ml-2" density="compact" icon="mdi-cog-outline" @click="openSetSpendLimit"></v-btn>
        </p>
      </v-row>
      <v-row justify="space-between">
        <p class="text-h5 font-weight-light ml-1">${{ totalSpent }}</p>
        <p class="text-h6 font-weight-light ml-1">${{ (monthlyLimit - totalSpent) }}</p>
        <p class="text-h5 font-weight-light mr-1">${{ monthlyLimit }}</p>
      </v-row>
    </v-container>

    <v-row>
      <v-progress-linear
        class="mb-5 mt-3"
        color="success"
        rounded-bar
        striped
        :model-value="percentSpent"
        height="30">
        <strong>{{ percentSpent }}%</strong>
      </v-progress-linear>
    </v-row>
  </v-card>
  <set-spend-limit ref="setSpendLimit"></set-spend-limit>
</template>

<script setup>

import { ref } from 'vue'
import SetSpendLimit from '@/components/SetSpendLimit.vue'
import { useExpenseStore } from '@/stores/expenseStore'
const expenseStore = useExpenseStore()
const setSpendLimit = ref('')

//Computed Functions
const totalSpent = computed (() => {
  return expenseStore.getTotalSpent
})

const monthlyLimit = computed (() => {
  return expenseStore.getMonthlyLimit
})

const percentSpent = computed (() => {
  return expenseStore.getPercentSpent.toFixed(0)
})

//Standard Functions
const openSetSpendLimit = () => {
  setSpendLimit.value.openSetSpendingLimitDialog()
}

</script>