<template>
  <section class="p-6 text-center text-gray-400">
    <div class="flex items-center justify-center mb-6">
      <h3 class="text-2xl mr-2">No tasks yet</h3>
      <Icon size="48">
        <Create class="text-gray-700 opacity-50" />
      </Icon>
    </div>
    <span
      >Press <kbd class="p-1 bg-gray-700 text-gray-200 rounded-md">ctrl</kbd> +
      <kbd class="p-1 bg-gray-700 text-gray-200 rounded-md">enter</kbd> to
      create a new task</span
    >
  </section>
</template>

<script lang="ts" setup>
import Create from '@vicons/ionicons5/Create';
import { Icon } from '@vicons/utils';
</script>
