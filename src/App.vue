<template>
  <AppContainer>
    <AppWrapper>
      <TheHeader title="V-Notes App" />
      <Message v-show="!taskStore.getTasks.length && !isCreatingTask" />
      <TaskCreate v-show="isCreatingTask" v-model="isCreatingTask" />
      <TaskUpdate v-show="isUpdatingTask" v-model="isUpdatingTask" :task="selectedTask" />
      <TaskList>
        <TaskItem v-for="task in taskStore.uncompletedTasks" :id="task.id" :key="task.id" :done="task.done"
          :title="task.title" @dblclick="selectTask(task)" @remove="removeTask(task)" />
      </TaskList>
      <TaskCount v-show="taskStore.getTasks.length" :tasks="taskStore.completedTasks" />
      <TaskList>
        <TaskItem v-for="task in taskStore.completedTasks" :id="task.id" :key="task.id" :done="task.done"
          :title="task.title" @dblclick="selectTask(task)" @remove="removeTask(task)" />
      </TaskList>
      <ActionButton @click="isCreatingTask = !isCreatingTask" />
    </AppWrapper>
  </AppContainer>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, Ref, ref } from 'vue';
import { Task, useTaskStore } from '@/store/useTaskStore';
import useToast from '@/composables/useToast';
import TheHeader from '@/components/common/TheHeader.vue';
import TaskList from '@/components/Task/TaskList.vue';
import TaskItem from '@/components/Task/TaskItem.vue';
import TaskCount from '@/components/Task/TaskCount.vue';
import TaskCreate from '@/components/Task/TaskCreate.vue';
import AppContainer from '@/components/common/AppContainer.vue';
import AppWrapper from '@/components/common/AppWrapper.vue';
import ActionButton from '@/components/common/ActionButton.vue';
import TaskUpdate from '@/components/Task/TaskUpdate.vue';
import Message from '@/components/Message.vue';

const isCreatingTask = ref(false);
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
    isCreatingTask.value = !isCreatingTask.value;
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

  if (isCreatingTask.value) isCreatingTask.value = false;
};

const removeTask = (task: Task) => {
  toast.value.success('Task deleted successfully');
  taskStore.remove(task.id);
};

onMounted(() => {
  window.addEventListener('keyup', shortcuts);
});

onUnmounted(() => {
  window.addEventListener('keyup', shortcuts);
});
</script>
