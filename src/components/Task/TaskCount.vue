<template>
  <div class="flex ml-5">
    <span>Completed {{ tasks.length }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from '@/store/useTaskStore';

type Props = {
  tasks: Task[];
};

defineProps<Props>();
</script>
