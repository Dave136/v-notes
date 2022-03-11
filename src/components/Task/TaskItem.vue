<template>
  <li class="bg-zinc-800 my-3 p-5 rounded-md" v-for="task in tasks" :key="task.id">
    <div class="flex items-center" @dblclick="$emit('dblclick', task)">
      <input class="form-checkbox mr-5" type="checkbox" v-model="task.done" />
      <h4 class="text-lg font-bold" :class="{ 'line-through': task.done }">{{ task.title }}</h4>
      <div class="flex-grow flex justify-end">
        <button class="bg-red-700 px-4 py-2 text-sm rounded-md hover:bg-red-800 transition ease-linear duration-200" @click="$emit('remove', task)">Delete</button>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { Task } from '@/store/useTaskStore';

type Props = {
  tasks: Task[];
};

type Emits = {
  (e: 'dblclick', task: Task): void;
  (e: 'remove', task: Task): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>