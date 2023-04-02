<template>
  <transition mode="out-in" appear>
    <section class="p-6 text-center text-gray-400">
      <div class="flex items-center justify-center mb-6">
        <ph-check-square :size="32" color="#ffffff" weight="thin" />
        <h3 class="text-2xl ml-2">No tasks yet</h3>
      </div>
      <span
        >Press
        <kbd class="p-1 bg-gray-700 text-gray-200 rounded-md">ctrl</kbd> +
        <kbd class="p-1 bg-gray-700 text-gray-200 rounded-md">enter</kbd> to
        create a new task</span
      >
    </section>
  </transition>
</template>

<script lang="ts" setup>
import { PhCheckSquare } from '@phosphor-icons/vue';
</script>
