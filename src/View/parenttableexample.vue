<script setup>
import DynamicTable from '@/Components/DynamicTable.vue'
import { ref } from 'vue'
import MainLayout from '@/Layout/MainLayout.vue'
const users = ref([
  { id: 1, name: 'Liam Smith', email: 'liam.smith@example.com', role: 'Project Manager', status: 'Active', joinedDate: '24 Jun 2024', twoFA: true },
  { id: 2, name: 'Noah Anderson', email: 'noah.anderson@example.com', role: 'UX Designer', status: 'Active', joinedDate: '15 Mar 2024', twoFA: false },
  { id: 3, name: 'Isabella Garcia', email: 'isabella.garcia@example.com', role: 'Front-end Developer', status: 'Inactive', joinedDate: '10 Aug 2023', twoFA: true },
])

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'joinedDate', label: 'Joined Date' },
  { key: 'twoFA', label: '2FA' },
]

const actions = [
  { label: 'Edit', handler: (row) => console.log('Edit:', row) },
  { label: 'Delete', danger: true, handler: (row) => console.log('Delete:', row) },
]
</script>

<template>
<MainLayout>
  <DynamicTable
    :columns="columns"
    :rows="users"
    selectable
    showActions
    :actions="actions"
    @action="({ action, row }) => console.log(action.label, row)"
  >
    <!-- Example of customizing a column via slot -->
    <template #twoFA="{ row }">
      <span :class="row.twoFA ? 'text-green-500' : 'text-red-500'">
        {{ row.twoFA ? 'Enabled' : 'Disabled' }}
      </span>
    </template>
  </DynamicTable>
</MainLayout>
</template>
