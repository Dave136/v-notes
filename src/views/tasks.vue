<template>
  <section class="mt-8">
    <message v-show="!taskStore.tasks.length && !taskStore.isCreatingTask" />
    <task-create
      v-show="taskStore.isCreatingTask"
      v-model="taskStore.isCreatingTask"
    />
    <task-update
      v-show="isUpdatingTask"
      v-model="isUpdatingTask"
      :task="selectedTask"
    />
    <task-list>
      <task-item
        v-for="task in taskStore.uncompletedTasks"
        :id="task.id"
        :key="task.id"
        :done="task.done"
        :title="task.title"
        @dblclick="selectTask(task)"
        @remove="removeTask(task)"
      />
    </task-list>
    <task-count
      v-show="taskStore.completedTasks.length"
      :tasks="taskStore.completedTasks"
    />
    <task-list>
      <task-item
        v-for="task in taskStore.completedTasks"
        :id="task.id"
        :key="task.id"
        :done="task.done"
        :title="task.title"
        @dblclick="selectTask(task)"
        @remove="removeTask(task)"
      />
    </task-list>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, Ref, ref } from 'vue';
import { Task, useTaskStore } from '@/store/task';
import useToast from '@/composables/use-toast';
import TaskList from '@/components/task/task-list.vue';
import TaskItem from '@/components/task/task-item.vue';
import TaskCount from '@/components/task/task-count.vue';
import TaskCreate from '@/components/task/task-create.vue';

import TaskUpdate from '@/components/task/task-update.vue';
import Message from '@/components/app-message.vue';

const isUpdatingTask = ref(false);
const selectedTask: Ref<Task> = ref({
  id: '',
  title: '',
  done: false,
  createdAt: '',
  updatedAt: '',
});
const taskStore = useTaskStore();
const { toast } = useToast();

const shortcuts = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'Enter') {
    taskStore.isCreatingTask = !taskStore.isCreatingTask;
    isUpdatingTask.value = false;
  }

  if (e.ctrlKey && e.key === 'ArrowUp') {
    console.log('keyup');
  }

  if (e.ctrlKey && e.key === 'ArrowDown') {
    console.log('keydown');
  }
};

const selectTask = (task: Task) => {
  selectedTask.value = { ...task };
  isUpdatingTask.value = true;

  if (taskStore.isCreatingTask) taskStore.isCreatingTask = false;
};

const removeTask = (task: Task) => {
  toast.value?.success('Task deleted successfully');
  taskStore.remove(task.id);
};

onMounted(() => {
  window.addEventListener('keyup', shortcuts);
});

onUnmounted(() => {
  window.addEventListener('keyup', shortcuts);
});
</script>
