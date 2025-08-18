<script setup>
import { ref, onMounted } from "vue";

const isDark = ref(false);

const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  } else {
    isDark.value = prefersDark;
  }

  applyTheme();
};

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  applyTheme();
};

onMounted(() => {
  initializeTheme();
});
</script>

<template>
  <button
    @click="toggleTheme"
    class="flex items-center justify-center w-10 h-10 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors duration-200"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <svg
      v-if="!isDark"
      class="w-5 h-5 fill-current"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3V1M12 23V21M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22M12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </svg>

    <svg
      v-else
      class="w-5 h-5 fill-current"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 12.79C20.25 13.46 19.25 14 18 14C15.24 14 13 11.76 13 9C13 7.75 13.54 6.75 14.21 6C9.88 6.14 6.5 9.64 6.5 14C6.5 18.66 10.34 22.5 15 22.5C19.36 22.5 22.86 19.12 23 14.79C22.25 15.46 21.25 16 20 16C17.24 16 15 13.76 15 11C15 9.75 15.54 8.75 16.21 8C21.54 8.14 21 12.79 21 12.79Z"
        fill="currentColor"
      />
    </svg>
  </button>
</template>
