<template>
  <MainLayout>
  <div class="flex flex-col p-6 w-full overflow-hidden mb-3 bg-white dark:bg-gray-800 rounded-lg">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full border-collapse">
        <thead class="sticky top-0 bg-gray-100 dark:bg-gray-700 text-left z-10">
          <tr>
            <th class="px-2 py-2"></th>
            <th class="px-4 py-2 font-bold text-sm text-blue-600 dark:text-blue-400">Name</th>
            <th class="px-4 py-2 font-bold text-sm text-blue-600 dark:text-blue-400">Email</th>
            <th class="px-4 py-2 font-bold text-sm text-blue-600 dark:text-blue-400">Role</th>
            <th class="px-4 py-2 font-bold text-sm text-blue-600 dark:text-blue-400">Status</th>
            <th class="px-4 py-2 font-bold text-sm text-blue-600 dark:text-blue-400">Joined Date</th>
            <th class="px-4 py-2 font-bold text-sm text-blue-600 dark:text-blue-400">2FA</th>
            <th class="px-4 py-2 font-bold text-sm text-blue-600 dark:text-blue-400">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(user, index) in users" :key="index" class="group border-t border-gray-200 dark:border-gray-700">
            <td class="px-2 py-2">
              <input type="checkbox" v-model="user.selected" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            </td>
            <td class="px-4 py-2">
              <div class="flex items-center gap-2 cursor-pointer">
                <div class="w-10 h-10 overflow-hidden rounded-full">
                  <img :src="user.avatar" :alt="user.name" />
                </div>
                <span class="font-medium text-gray-800 dark:text-white">{{ user.name }}</span>
              </div>
            </td>
            <td class="px-4 py-2">
              <span class="text-gray-600 dark:text-gray-300">{{ user.email }}</span>
            </td>
            <td class="px-4 py-2">
              <span class="text-gray-600 dark:text-gray-300">{{ user.role }}</span>
            </td>
            <td class="px-4 py-2">
              <span :class="['rounded-full px-2 py-0.5 text-xs font-medium', user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-500' : 'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-500']">
                {{ user.status }}
              </span>
            </td>
            <td class="px-4 py-2">
              <span class="text-gray-600 dark:text-gray-300">{{ user.joinedDate }}</span>
            </td>
            <td class="px-4 py-2">
              <span class="text-gray-600 dark:text-gray-300">{{ user.twoFA ? 'Enabled' : 'Disabled' }}</span>
            </td>
            <td class="px-4 py-2">
              <div class="relative">
                <button @click="toggleMenu(index)" class="focus:outline-none">
                  <svg class="w-6 h-6 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="6" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="18" r="2" />
                  </svg>
                </button>
                <div v-if="activeMenu === index" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button @click="openModal('edit', user)" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</button>
                  <button @click="openModal('delete', user)" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 class="text-lg font-bold">{{ modalType === 'edit' ? 'Edit User' : 'Delete User' }}</h2>
          <p v-if="modalType === 'edit'">Edit user details for {{ selectedUser.name }}.</p>
          <p v-if="modalType === 'delete'">Are you sure you want to delete {{ selectedUser.name }}?</p>
          <div class="mt-4 flex justify-end space-x-4">
            <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button @click="handleAction" class="px-4 py-2 bg-blue-600 text-white rounded">{{ modalType === 'edit' ? 'Save' : 'Delete' }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/Layout/MainLayout.vue';
// import MainLayout from '@/Layout/MainLayout.vue';
export default {
  data() {
    return {
      users: [
        { id: 1, name: 'Liam Smith', email: 'liam.smith@example.com', role: 'Project Manager', status: 'Active', joinedDate: '24 Jun 2024, 9:23 AM', twoFA: true, avatar: 'https://via.placeholder.com/40', selected: false },
        { id: 2, name: 'Noah Anderson', email: 'noah.anderson@example.com', role: 'UX Designer', status: 'Active', joinedDate: '15 Mar 2024, 2:45 PM', twoFA: false, avatar: 'https://via.placeholder.com/40', selected: false },
        { id: 3, name: 'Isabella Garcia', email: 'isabella.garcia@example.com', role: 'Front-end Developer', status: 'Inactive', joinedDate: '10 Aug 2023, 11:30 AM', twoFA: true, avatar: 'https://via.placeholder.com/40', selected: false },
      ],
      activeMenu: null,
      isModalOpen: false,
      modalType: '',
      selectedUser: {},
    };
  },
  methods: {
    toggleMenu(index) {
      this.activeMenu = this.activeMenu === index ? null : index;
    },
    openModal(type, user) {
      this.modalType = type;
      this.selectedUser = { ...user };
      this.isModalOpen = true;
      this.activeMenu = null;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleAction() {
      if (this.modalType === 'edit') {
        console.log('Edit user:', this.selectedUser);
      } else {
        console.log('Delete user:', this.selectedUser);
        this.users = this.users.filter(u => u.id !== this.selectedUser.id);
      }
      this.closeModal();
    },
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  table {
    display: block;
    overflow-x: auto;
  }
  th, td {
    min-width: 120px;
  }
}
</style>