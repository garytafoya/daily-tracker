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
        <p class="text-h5 font-weight-light ml-1">${{ spent }}</p>
        <p class="text-h6 font-weight-light ml-1">${{ (goal - spent) }}</p>
        <p class="text-h5 font-weight-light mr-1">${{ goal }}</p>
      </v-row>
    </v-container>

    <v-row>
      <v-progress-linear class="mb-5 mt-3" color="primary" rounded-bar :model-value="percentToGoal" height="20"></v-progress-linear>
    </v-row>
  </v-card>
  <set-spend-limit ref="setSpendLimit"></set-spend-limit>
</template>

<script setup>

import { ref } from 'vue'
import SetSpendLimit from '@/components/SetSpendLimit.vue'

const setSpendLimit = ref('')

const props = defineProps({
  spent: Number,
  goal: Number
})

const percentToGoal = computed (() => {
  return (((props.spent / props.goal) * 100).toFixed(0))
})

const openSetSpendLimit = () => {
  console.log('setting spend limit')
  setSpendLimit.value.openSetSpendingLimitDialog()
}


</script>