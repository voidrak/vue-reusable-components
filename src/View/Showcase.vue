<template>
  <MainLayout>
    <div class="space-y-6 p-6">
      <SearchbarView />
      <AvatarView />
      <FormsView />
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import AvatarView from "@/components/avatar/Avatar.vue";
import FormsView from "@/components/forms/DefaultInputs.vue";
import SearchbarView from "@/components/searchbar/Searchbar.vue";
import MainLayout from "@/Layout/MainLayout.vue";
</script>

<style scoped></style>
