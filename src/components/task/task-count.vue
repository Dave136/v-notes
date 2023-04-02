<template>
  <transition mode="out-in" appear>
    <div class="flex ml-5">
      <span>Completed {{ tasks.length }}</span>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import type { Task } from '@/store/task';

type Props = {
  tasks: Task[];
};

defineProps<Props>();
</script>
