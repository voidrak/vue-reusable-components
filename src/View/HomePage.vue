<script setup>
import Popup from "@/Components/Popup.vue";
import MainLayout from "@/Layout/MainLayout.vue";
import { ref } from "vue";

const showPopupCenter = ref(false);
const showPopupRight = ref(false);
</script>

<template>
  <MainLayout>
    <div class="relative">
      <div
        class="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        @click="showPopupCenter = true"
      >
        Open Popup Center
      </div>
      <div
        class="absolute top-24 right-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        @click="showPopupRight = true"
      >
        Open Popup Right
      </div>
      <h1 class="text-red-400 text-4xl mt-16 ml-8">
        Welcome to the Home Page!
      </h1>
      <h1 class="text-red-400 text-2xl uppercase">
        Do not Forget to create new branch
      </h1>
      <ul class="ml-48 mt-10">
        <li class="font-bold">Create New View in view folder</li>
        <li class="font-bold">
          You Can Access the primary color using the below
        </li>
        <li class="font-semibold">primary-25: #f2f7ff;</li>
        <li class="">primary-50: #ecf3ff;</li>
        <li class="">primary-100: #dde9ff;</li>
        <li class="">primary-200: #c2d6ff;</li>
        <li class="">primary-300: #9cb9ff;</li>
        <li class="">primary-400: #7592ff;</li>
        <li class="">primary-500: #465fff;</li>
        <li class="">primary-600: #3641f5;</li>
        <li class="">primary-700: #2a31d8;</li>
        <li class="">primary-800: #252dae;</li>
        <li class="">primary-900: #262e89;</li>
        <li class="">primary-950: #161950;</li>
      </ul>
    </div>
    <popup v-model="showPopupRight" title="Right Popup" position="right">
      <h1 class="text-red-400 text-4xl">Welcome to the Home Page!</h1>
      <div class="bg-white w-24 h-24">Hello</div>
      <ul class="">
        <li class="font-bold">Create New View in view folder</li>
        <li class="font-bold">
          You Can Access the primary color using the below
        </li>
        <li class="font-semibold">primary-25: #f2f7ff;</li>
        <li class="">primary-50: #ecf3ff;</li>
        <li class="">primary-100: #dde9ff;</li>
        <li class="">primary-200: #c2d6ff;</li>
        <li class="">primary-300: #9cb9ff;</li>
        <li class="">primary-400: #7592ff;</li>
        <li class="">primary-500: #465fff;</li>
        <li class="">primary-600: #3641f5;</li>
        <li class="">primary-700: #2a31d8;</li>
        <li class="">primary-800: #252dae;</li>
        <li class="">primary-900: #262e89;</li>
        <li class="">primary-950: #161950;</li>
      </ul>
    </popup>
    <popup v-model="showPopupCenter" title="Center Popup" position="center">
      <h1 class="text-red-400 text-4xl">Welcome to the Home Page!</h1>
      <div class="bg-white w-24 h-24">Hello</div>
      <ul class="">
        <li class="font-bold">Create New View in view folder</li>
        <li class="font-bold">
          You Can Access the primary color using the below
        </li>
        <li class="font-semibold">primary-25: #f2f7ff;</li>
        <li class="">primary-50: #ecf3ff;</li>
        <li class="">primary-100: #dde9ff;</li>
        <li class="">primary-200: #c2d6ff;</li>
        <li class="">primary-300: #9cb9ff;</li>
        <li class="">primary-400: #7592ff;</li>
        <li class="">primary-500: #465fff;</li>
        <li class="">primary-600: #3641f5;</li>
        <li class="">primary-700: #2a31d8;</li>
        <li class="">primary-800: #252dae;</li>
        <li class="">primary-900: #262e89;</li>
        <li class="">primary-950: #161950;</li>
      </ul>
    </popup>
  </MainLayout>
</template>
