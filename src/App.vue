<template>
  <Container>
    <Wrapper>
      <TheHeader title="V-Notes App" />
      <Message v-show="!taskStore.getTasks.length && !isCreatingTask" />
      <TaskCreate v-show="isCreatingTask" v-model="isCreatingTask" />
      <TaskUpdate v-show="isUpdatingTask" v-model="isUpdatingTask" :task="selectedTask" />
      <TaskList>
        <TaskItem :tasks="taskStore.uncompletedTasks" @dblclick="selectTask" @remove="removeTask" />
      </TaskList>
      <TaskCount :tasks="taskStore.completedTasks" v-show="taskStore.getTasks.length" />
      <TaskList>
        <TaskItem :tasks="taskStore.completedTasks" @remove="removeTask" />
      </TaskList>
      <ActionButton @click="isCreatingTask = !isCreatingTask" />
    </Wrapper>
  </Container>
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
import Container from '@/components/common/Container.vue';
import Wrapper from '@/components/common/Wrapper.vue';
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
}

const selectTask = (task: Task) => {
  selectedTask.value = { ...task };
  isUpdatingTask.value = true;

  if (isCreatingTask.value) isCreatingTask.value = false;
}

const removeTask = (task: Task) => {
  toast.value.success('Task deleted successfully');
  taskStore.remove(task.id);
}

onMounted(() => {
  window.addEventListener('keyup', shortcuts);
});

onUnmounted(() => {
  window.addEventListener('keyup', shortcuts);
})
</script>
