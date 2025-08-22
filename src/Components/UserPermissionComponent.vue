<script setup>
import { ref, reactive, onMounted } from 'vue'
import Button from '../Components/ui/Button.vue'
import Popup from '../Components/Popup.vue'
import Modal from './Modal.vue'

// Reactive data
const showPermissionModal = ref(false)
const submitting = ref(false)

// Mock data - replace with actual API calls
const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
])

const permissions = ref([
  { id: 1, name: 'user.create', description: 'Create new users' },
  { id: 2, name: 'user.edit', description: 'Edit user information' },
  { id: 3, name: 'user.delete', description: 'Delete users' },
  { id: 4, name: 'school.register', description: 'Register new schools' },
  { id: 5, name: 'school.view', description: 'View school information' }
])

const userPermissions = ref([
  {
    id: 1,
    user_name: 'John Doe',
    user_email: 'john@example.com',
    permission_name: 'user.create',
    allow: true,
    scope_type: 'Region',
    scope_id: 1,
    ends_at: '2024-12-31T23:59:59'
  },
  {
    id: 2,
    user_name: 'Jane Smith',
    user_email: 'jane@example.com',
    permission_name: 'school.view',
    allow: false,
    scope_type: 'School',
    scope_id: 5,
    ends_at: null
  }
])

// Form data
const permissionForm = reactive({
  user_id: '',
  permission_id: '',
  allow: true,
  scope_type: '',
  scope_id: null,
  include_descendants: false,
  conditions_json: '',
  starts_at: '',
  ends_at: ''
})

// Methods
const resetForm = () => {
  Object.assign(permissionForm, {
    user_id: '',
    permission_id: '',
    allow: true,
    scope_type: '',
    scope_id: null,
    include_descendants: false,
    conditions_json: '',
    starts_at: '',
    ends_at: ''
  })
}

const onScopeTypeChange = () => {
  if (permissionForm.scope_type === 'Root') {
    permissionForm.scope_id = null
  }
}

const submitPermission = async () => {
  try {
    submitting.value = true
    
    // Validate required fields
    if (!permissionForm.user_id || !permissionForm.permission_id || !permissionForm.scope_type) {
      alert('Please fill in all required fields')
      return
    }

    // Validate JSON conditions if provided
    let conditions = null
    if (permissionForm.conditions_json.trim()) {
      try {
        conditions = JSON.parse(permissionForm.conditions_json)
      } catch (e) {
        alert('Invalid JSON format in conditions field')
        return
      }
    }

    // Prepare data for API
    const permissionData = {
      user_id: permissionForm.user_id,
      permission_id: permissionForm.permission_id,
      allow: permissionForm.allow,
      scope_type: permissionForm.scope_type,
      scope_id: permissionForm.scope_type === 'Root' ? null : permissionForm.scope_id,
      include_descendants: permissionForm.include_descendants,
      conditions: conditions,
      starts_at: permissionForm.starts_at || null,
      ends_at: permissionForm.ends_at || null
    }

    // TODO: Replace with actual API call
    console.log('Submitting permission data:', permissionData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('Permission assigned successfully!')
    
    // Close modal and reset form
    showPermissionModal.value = false
    resetForm()
    
    // TODO: Refresh the permissions list
    // await fetchUserPermissions()
    
  } catch (error) {
    console.error('Error assigning permission:', error)
    alert('Failed to assign permission. Please try again.')
  } finally {
    submitting.value = false
  }
}

const removePermission = async (permissionId) => {
  if (!confirm('Are you sure you want to remove this permission?')) {
    return
  }
  
  try {
    // TODO: Replace with actual API call
    console.log('Removing permission:', permissionId)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Remove from local array (replace with API refresh)
    const index = userPermissions.value.findIndex(p => p.id === permissionId)
    if (index > -1) {
      userPermissions.value.splice(index, 1)
    }
    
    alert('Permission removed successfully!')
    
  } catch (error) {
    console.error('Error removing permission:', error)
    alert('Failed to remove permission. Please try again.')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'No expiry'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Lifecycle hooks
onMounted(() => {
  // TODO: Fetch initial data
  // fetchUsers()
  // fetchPermissions()
  // fetchUserPermissions()
})
</script>
<template>
  <div class="p-6">
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">User Permissions</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Manage user permissions and access controls</p>
      </div>
      
      <!-- Assign Permission Button -->
      <Button 
        variant="primary" 
        size="md"
        @click="showPermissionModal = true"
        class="flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Assign Permission
      </Button>
    </div>

    <!-- Permission Assignment Modal -->
    <Modal
      v-if="showPermissionModal"
      @close="showPermissionModal = false; resetForm()"
      :fullScreenBackdrop="true"
    >
      <template #body>
      <div
        class="relative max-h-[700px] w-full max-w-[700px] overflow-y-auto overflow-x-hidden rounded-3xl bg-white p-4 lg:p-11"
      >
        <h5 class="modal-title mb-2 text-theme-xl font-semibold text-gray-800 lg:text-2xl">
        Assign User Permission
        </h5>
        <p class="text-sm text-gray-500">
        Configure and assign a permission to a user
        </p>

        <form @submit.prevent="submitPermission" class="space-y-6 mt-8">
        <!-- User Selection -->
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Select User *
          </label>
          <select
          v-model="permissionForm.user_id"
          required
          class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
          <option value="">Choose a user</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }} ({{ user.email }})
          </option>
          </select>
        </div>

        <!-- Permission Selection -->
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Select Permission *
          </label>
          <select
          v-model="permissionForm.permission_id"
          required
          class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
          <option value="">Choose a permission</option>
          <option v-for="permission in permissions" :key="permission.id" :value="permission.id">
            {{ permission.name }} - {{ permission.description }}
          </option>
          </select>
        </div>

        <!-- Permission Type (Allow/Deny) -->
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Permission Type *
          </label>
          <div class="flex gap-4">
          <label class="flex items-center">
            <input
            type="radio"
            v-model="permissionForm.allow"
            :value="true"
            class="mr-2 text-blue-600 focus:ring-blue-500"
            />
            <span class="text-sm text-green-600 font-medium">Allow</span>
          </label>
          <label class="flex items-center">
            <input
            type="radio"
            v-model="permissionForm.allow"
            :value="false"
            class="mr-2 text-blue-600 focus:ring-blue-500"
            />
            <span class="text-sm text-red-600 font-medium">Deny</span>
          </label>
          </div>
        </div>

        <!-- Scope Type -->
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Scope Type *
          </label>
          <select
          v-model="permissionForm.scope_type"
          required
          @change="onScopeTypeChange"
          class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
          <option value="">Select scope type</option>
          <option value="Root">Root</option>
          <option value="Federal">Federal</option>
          <option value="Region">Region</option>
          <option value="Zone">Zone</option>
          <option value="Woreda">Woreda</option>
          <option value="School">School</option>
          </select>
        </div>

        <!-- Scope ID (conditionally shown) -->
        <div v-if="permissionForm.scope_type && permissionForm.scope_type !== 'Root'">
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
          {{ permissionForm.scope_type }} ID
          </label>
          <input
          type="number"
          v-model="permissionForm.scope_id"
          :placeholder="`Enter ${permissionForm.scope_type} ID`"
          class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <!-- Include Descendants -->
        <div>
          <label class="flex items-center">
          <input
            type="checkbox"
            v-model="permissionForm.include_descendants"
            class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span class="text-sm font-medium text-gray-700 dark:text-gray-400">
            Include Descendants
          </span>
          </label>
          <p class="mt-1 text-xs text-gray-500">
          Apply this permission to all child entities within the scope
          </p>
        </div>

        <!-- Time Range -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            v-model="permissionForm.starts_at"
            class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            v-model="permissionForm.ends_at"
            class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <!-- Conditions (JSON) -->
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Additional Conditions (Optional)
          </label>
          <textarea
          v-model="permissionForm.conditions_json"
          rows="4"
          placeholder='Enter conditions as JSON, e.g., {"department": "IT", "level": "senior"}'
          class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          ></textarea>
          <p class="mt-1 text-xs text-gray-500">
          Optional JSON conditions for fine-grained access control
          </p>
        </div>

        <!-- Form Actions -->
        <div class="modal-footer mt-8 flex items-center gap-3 sm:justify-end">
          <Button
          variant="outline"
          size="md"
          type="button"
          @click="showPermissionModal = false; resetForm()"
          >
          Cancel
          </Button>
          <Button
          variant="primary"
          size="md"
          type="submit"
          :loading="submitting"
          >
          Assign Permission
          </Button>
        </div>
        </form>
      </div>
      </template>
    </Modal>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Current User Permissions</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">View and manage existing user permission overrides</p>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Permission</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Scope</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Valid Until</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="permission in userPermissions" :key="permission.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ permission.user_name }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ permission.user_email }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ permission.permission_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  permission.allow 
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                    : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                ]">
                  {{ permission.allow ? 'Allow' : 'Deny' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ permission.scope_type }}
                  <span v-if="permission.scope_id" class="text-gray-500">({{ permission.scope_id }})</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ permission.ends_at ? formatDate(permission.ends_at) : 'No expiry' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <Button 
                  variant="danger" 
                  size="xs"
                  @click="removePermission(permission.id)"
                >
                  Remove
                </Button>
              </td>
            </tr>
            <tr v-if="userPermissions.length === 0">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No user permissions found. Click "Assign Permission" to add one.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>



<style scoped>
/* Add any custom styles here */
</style>
