<script setup>
import AppSidebar from "./Components/AppSidebar.vue";
import AppHeader from "./Components/AppHeader.vue";
import { useSidebar } from "@/composables/useSidebar";
const { isExpanded, isHovered } = useSidebar();
</script>

<template>
  <div class="min-h-screen xl:flex">
    <AppSidebar />
    <div
      class="flex-1 transition-all duration-300 ease-in-out"
      :class="[isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]']"
    >
      <AppHeader />
      <div class="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 relative">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
