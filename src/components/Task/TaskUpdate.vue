<template>
  <section class="bg-zinc-800 p-5 mx-5 rounded-lg">
    <div class="p-2">
      <div>
        <input
          placeholder="Tap 'Enter' to create tasks"
          class="form-input outline-none border-none focus:ring-transparent bg-transparent rounded-md"
          type="text"
          v-model="task.title"
          @keyup.enter="updateTask"
        />
      </div>
      <div class="mt-5 flex justify-end">
        <button class="text-gray-400 mr-5" @click="$emit('update:modelValue', false)">Cancel</button>
        <button
          class="text-orange-500 transition-all"
          :class="{ 'text-gray-50': !task.title.length, 'hover:text-orange-400': task.title.length }"
          @click="updateTask"
        >Done</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Task, useTaskStore } from '@/store/useTaskStore';

type Props = {
  modelValue: boolean;
  task: Task;
}

type Emits = {
  (e: 'update:modelValue', value: boolean): void
}

const taskStore = useTaskStore();

const emits = defineEmits<Emits>();
const props = defineProps<Props>();


const updateTask = () => {
  if (!props.task.title) return;

  taskStore.update(props.task.id, props.task.title);
  emits('update:modelValue', false);
}
</script>