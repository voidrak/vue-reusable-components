<script setup>
import MainLayout from "@/Layout/MainLayout.vue";
import { ref } from "vue";

// Dummy API-like data from UserResource
const user = ref({
  id: 1,
  national_id: "ET1234567",
  phone: "+251-912-345-678",
  gender: 1,
  gender_: "Male",
  first_name: "Nuru",
  middle_name: "Hussen",
  last_name: "Mohammed",
  email: "nuru@example.com",
  photo: "https://via.placeholder.com/120",
  detail: {
    address: "Addis Ababa, Ethiopia",
    emergency_contact: "+251-987-654-321",
    birth_date: "22/08/1999",
  },
});

const activeTab = ref("profile");
const isEditing = ref(false);
const tempUser = ref({ ...user.value });

// Edit controls
const startEdit = () => {
  tempUser.value = JSON.parse(JSON.stringify(user.value));
  isEditing.value = true;
};
const saveProfile = () => {
  user.value = JSON.parse(JSON.stringify(tempUser.value));
  isEditing.value = false;
  alert("Profile updated successfully!");
};
const cancelEdit = () => {
  isEditing.value = false;
};

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    tempUser.value.photo = URL.createObjectURL(file);
  }
};

// Password form
const passwordForm = ref({
  current: "",
  new: "",
  confirm: "",
});
const updatePassword = () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert("New passwords do not match!");
    return;
  }
  alert("Password updated successfully (dummy)!");
  passwordForm.value = { current: "", new: "", confirm: "" };
};
</script>

<template>
    <MainLayout>
  <div class="min-h-screen  py-12">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Tabs -->
      <div class="flex border-b border-gray-200 mb-8">
        <button
          class="px-4 py-2 text-lg font-semibold transition-colors duration-200"
          :class="activeTab === 'profile' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'"
          @click="activeTab = 'profile'"
        >
          Profile Info
        </button>
        <button
          class="px-4 py-2 text-lg font-semibold transition-colors duration-200"
          :class="activeTab === 'password' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'"
          @click="activeTab = 'password'"
        >
          Password
        </button>
      </div>

      <!-- Profile Info Tab -->
      <div v-if="activeTab === 'profile'" class="space-y-8">
        <div class="flex items-center space-x-6">
          <img
            :src="user.photo"
            alt="Profile"
            class="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}</h2>
            <p class="text-gray-500">{{ user.email }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-sm text-gray-500">National ID</p>
            <p class="text-gray-900">{{ user.national_id }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Phone</p>
            <p class="text-gray-900">{{ user.phone }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Gender</p>
            <p class="text-gray-900">{{ user.gender_ }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Birth Date</p>
            <p class="text-gray-900">{{ user.detail.birth_date }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Address</p>
            <p class="text-gray-900">{{ user.detail.address }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Emergency Contact</p>
            <p class="text-gray-900">{{ user.detail.emergency_contact }}</p>
          </div>
        </div>

        <!-- Edit Button -->
        <div class="flex justify-end">
          <button
            @click="startEdit"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <!-- Password Tab -->
      <div v-if="activeTab === 'password'" class="space-y-6 max-w-md">
        <div>
          <label class="block text-sm text-gray-500">Current Password</label>
          <input
            v-model="passwordForm.current"
            type="password"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm text-gray-500">New Password</label>
          <input
            v-model="passwordForm.new"
            type="password"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm text-gray-500">Confirm New Password</label>
          <input
            v-model="passwordForm.confirm"
            type="password"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          @click="updatePassword"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Update Password
        </button>
      </div>

      <!-- Edit Modal -->
      <div v-if="isEditing" class="fixed inset-0 bg-gray-50 shadow-amber-50 bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg p-8 max-w-lg w-full">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
          <div class="space-y-4">
            <div class="flex items-center space-x-4 mb-4">
              <img
                :src="tempUser.photo"
                alt="Profile"
                class="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
              <input type="file" @change="handlePhotoUpload" class="text-sm" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <input
                v-model="tempUser.first_name"
                type="text"
                placeholder="First Name"
                class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                v-model="tempUser.middle_name"
                type="text"
                placeholder="Middle Name"
                class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                v-model="tempUser.last_name"
                type="text"
                placeholder="Last Name"
                class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                v-model="tempUser.email"
                type="email"
                placeholder="Email"
                class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                v-model="tempUser.national_id"
                type="text"
                placeholder="National ID"
                class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                v-model="tempUser.phone"
                type="text"
                placeholder="Phone"
                class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                v-model="tempUser.detail.address"
                type="text"
                placeholder="Address"
                class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
              />
              <input
                v-model="tempUser.detail.emergency_contact"
                type="text"
                placeholder="Emergency Contact"
                class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
              />
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              @click="saveProfile"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Save
            </button>
            <button
              @click="cancelEdit"
              class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</MainLayout>
</template>