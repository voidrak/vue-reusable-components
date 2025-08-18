<template>
  <div
    class="flex flex-col overflow-hidden mb-3 bg-white dark:bg-gray-800 rounded-lg"
    :style="{ width, height, padding }"
  >
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full border-collapse">
        <thead class="sticky top-0 bg-gray-100 dark:bg-gray-700 text-left z-10">
          <tr>
            <th v-if="selectable" class="px-2 py-2"></th>
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-2 font-bold text-sm text-blue-600 dark:text-blue-400"
            >
              {{ col.label }}
            </th>
            <th v-if="showActions" class="px-4 py-2 font-bold text-sm text-blue-600 dark:text-blue-400">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(row, index) in rows"
            :key="row.id || index"
            class="group border-t border-gray-200 dark:border-gray-700"
          >
            <!-- Checkbox -->
            <td v-if="selectable" class="px-2 py-2">
              <input
                type="checkbox"
                v-model="row.selected"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </td>

            <!-- Dynamic cells -->
            <td v-for="col in columns" :key="col.key" class="px-4 py-2">
              <slot :name="col.key" :row="row">
                {{ row[col.key] }}
              </slot>
            </td>

            <!-- Actions -->
            <td v-if="showActions" class="px-4 py-2">
              <div class="relative">
                <button @click="toggleMenu(index)" class="focus:outline-none">
                  ⋮
                </button>
                <div
                  v-if="activeMenu === index"
                  class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                  <button
                    v-for="action in actions"
                    :key="action.label"
                    @click="() => handleAction(action, row)"
                    class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    :class="action.danger ? 'text-red-600' : 'text-gray-700'"
                  >
                    {{ action.label }}
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/**
 * Props: styling + config + data
 */
const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: 'auto' },
  padding: { type: String, default: '1.5rem' },

  columns: { type: Array, required: true }, // [{ key: 'name', label: 'Name' }, ...]
  rows: { type: Array, required: true }, // [{ id:1, name:'...', email:'...' }]
  selectable: { type: Boolean, default: false },
  showActions: { type: Boolean, default: false },
  actions: { type: Array, default: () => [] }, // [{ label:'Edit', handler: fn }, { label:'Delete', danger:true, handler: fn }]
})

/**
 * Local state
 */
const activeMenu = ref(null)

const toggleMenu = (index) => {
  activeMenu.value = activeMenu.value === index ? null : index
}

const emit = defineEmits(['action'])

const handleAction = (action, row) => {
  if (action.handler) action.handler(row) // optional direct handler
  emit('action', { action, row }) // emit back to parent
  activeMenu.value = null
}
</script>
