<template>
  <section class="bg-zinc-800 p-5 mx-5 rounded-lg">
    <div class="p-2">
      <div>
        <input
          v-model="title"
          placeholder="Tap 'Enter' to create tasks"
          class="form-input outline-none border-none focus:ring-transparent bg-transparent rounded-md"
          type="text"
          @keyup.enter="updateTask"
        />
      </div>
      <div class="mt-5 flex justify-end">
        <button
          class="text-gray-400 mr-5"
          @click="$emit('update:modelValue', false)"
        >
          Cancel
        </button>
        <button
          class="transition-all"
          :class="{
            'text-orange-400': task.title.length,
            'text-gray-50': !task.title.length,
            'hover:text-orange-500': task.title.length,
          }"
          @click="updateTask"
        >
          Done
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Task, useTaskStore } from '@/store/useTaskStore';
import useToast from '@/composables/useToast';

type Props = {
  modelValue: boolean;
  task: Task;
};

type Emits = {
  (e: 'update:modelValue', value: boolean): void;
};

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const title = ref(props.task.title);
const taskStore = useTaskStore();
const { toast } = useToast();

const updateTask = () => {
  if (!props.task.title) {
    toast.value.error('Task title cannot be empty');
    return;
  }

  taskStore.update(props.task.id, props.task.title);
  toast.value.success('Task updated successfully');
  emits('update:modelValue', false);
};
</script>
