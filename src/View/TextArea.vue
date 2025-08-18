<!-- TextArea.vue -->
<template>
  <MainLayout>
  <div>
    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <textarea
      v-model="model"
      :rows="rows"
      :cols="cols"
      :disabled="disabled"
      :placeholder="placeholder"
      class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
    ></textarea>
  </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/Layout/MainLayout.vue';
import { defineProps, defineModel } from 'vue'

// ✅ Props for rows, cols, label etc
const props = defineProps({
  label: { type: String, default: 'Description' },
  rows: { type: Number, default: 6 },
  cols: { type: Number, default: 50 },
  placeholder: { type: String, default: 'Enter text...' },
  disabled: { type: Boolean, default: false },
})


const model = defineModel()
</script>

<!-- usage examaple: -->
<!-- <TextArea v-model="myText" :rows="10" :cols="80" label="Notes" /> -->
