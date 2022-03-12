<template>
  <li class="bg-zinc-800 my-3 p-5 rounded-md" v-for="task in tasks" :key="task.id">
    <div class="flex items-center" @dblclick="$emit('dblclick', task)">
      <input class="form-checkbox mr-5" type="checkbox" v-model="task.done" />
      <h4 class="text-md font-bold truncate" :class="{ 'line-through': task.done }">{{ task.title }}</h4>
      <div class="flex-grow flex justify-end">
        <button class="flex" @click="$emit('remove', task)">
          <Icon size="24">
            <Trash class="text-red-500 hover:text-red-800 transition ease-linear duration-200" />
          </Icon>
        </button>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import Trash from '@vicons/ionicons5/Trash';
import { Icon } from '@vicons/utils';
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