<template>
  <div class="space-y-6 p-6">
    <SearchbarView />
    <AvatarView />
    <FormsView />
  </div>
</template>

<script setup lang="ts">
import AvatarView from '@/components/avatar/Avatar.vue'
import FormsView from '@/components/forms/DefaultInputs.vue'
import SearchbarView from '@/components/searchbar/Searchbar.vue'
</script>

<style scoped></style>
