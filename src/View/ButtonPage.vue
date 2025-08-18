<script setup>
import Button from "@/Components/ui/Button.vue";
import MainLayout from "@/Layout/MainLayout.vue";
import { ref } from "vue";

// State for interactive examples
const isLoading = ref(false);

const handleAsyncAction = async () => {
  isLoading.value = true;
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isLoading.value = false;
  alert("Action completed!");
};

const handleClick = (message) => {
  alert(message);
};
</script>

<template>
  <MainLayout>
    <div class="p-8 space-y-12 max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Reusable Button Component
        </h1>
        <p class="text-lg text-gray-600">
          A comprehensive button component with multiple variants, sizes, and
          states
        </p>
      </div>

      <!-- Sizes -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Sizes</h2>
        <div class="flex items-center gap-4 flex-wrap">
          <Button size="xs" @click="() => handleClick('Extra Small')"
            >Extra Small</Button
          >
          <Button size="sm" @click="() => handleClick('Small')">Small</Button>
          <Button size="md" @click="() => handleClick('Medium')">Medium</Button>
          <Button size="lg" @click="() => handleClick('Large')">Large</Button>
          <Button size="xl" @click="() => handleClick('Extra Large')"
            >Extra Large</Button
          >
        </div>
      </section>

      <!-- Variants -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Variants</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="primary" @click="() => handleClick('Primary')"
            >Primary</Button
          >
          <Button variant="secondary" @click="() => handleClick('Secondary')"
            >Secondary</Button
          >
          <Button variant="success" @click="() => handleClick('Success')"
            >Success</Button
          >
          <Button variant="danger" @click="() => handleClick('Danger')"
            >Danger</Button
          >
          <Button variant="warning" @click="() => handleClick('Warning')"
            >Warning</Button
          >
          <Button variant="outline" @click="() => handleClick('Outline')"
            >Outline</Button
          >
          <Button variant="ghost" @click="() => handleClick('Ghost')"
            >Ghost</Button
          >
          <Button variant="link" @click="() => handleClick('Link')"
            >Link</Button
          >
        </div>
      </section>

      <!-- Button Types -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Button Types (for forms)</h2>
        <form
          class="space-y-4"
          @submit.prevent="handleClick('Form submitted!')"
        >
          <div class="flex gap-4">
            <Button type="submit" variant="primary">Submit</Button>
            <Button type="reset" variant="secondary">Reset</Button>
            <Button
              type="button"
              variant="outline"
              @click="() => handleClick('Just a button')"
              >Button</Button
            >
          </div>
        </form>
      </section>

      <!-- Custom Styling -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Custom Styling</h2>
        <div class="flex items-center gap-4 flex-wrap">
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-none"
            @click="() => handleClick('Custom gradient')"
          >
            Custom Gradient
          </Button>
          <Button
            className="rounded-full"
            variant="outline"
            @click="() => handleClick('Rounded full')"
          >
            Rounded Full
          </Button>
        </div>
      </section>
    </div>
  </MainLayout>
</template>
