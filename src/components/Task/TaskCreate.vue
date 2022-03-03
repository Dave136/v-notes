<template>
  <section class="bg-zinc-800 p-5 mx-5 rounded-lg">
    <div class="p-2">
      <div>
        <input
          placeholder="Tap 'Enter' to create tasks"
          class="form-input outline-none border-none focus:ring-transparent bg-transparent rounded-md"
          type="text"
          v-model="task"
          @keyup.enter="createTask"
        />
      </div>
      <div class="mt-5 flex justify-end">
        <button class="text-gray-400 mr-5" @click="$emit('update:modelValue', false)">Cancel</button>
        <button
          class="text-orange-500 transition-all"
          :class="{ 'text-gray-50': !task.length, 'hover:text-orange-400': task.length }"
          @click="createTask"
        >Done</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useTaskStore } from '@/store/useTaskStore';

type Props = {
  modelValue: boolean;
}

type Emits = {
  (e: 'update:modelValue', value: boolean): void
}

const task = ref('');
const taskStore = useTaskStore();

const emits = defineEmits<Emits>();
defineProps<Props>();


const createTask = () => {
  if (!task.value) return;

  taskStore.add(task.value);
  emits('update:modelValue', false);
  task.value = '';
}
</script>