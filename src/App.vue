<template>
  <app-container>
    <app-wrapper>
      <nav class="flex gap-12 items-center justify-center">
        <router-link to="/">
          <ph-book
            :size="42"
            :color="iconStyle('/').color"
            :weight="iconStyle('/').weight"
          />
        </router-link>
        <router-link to="/tasks">
          <ph-check-square
            :size="42"
            :color="iconStyle('/tasks').color"
            :weight="iconStyle('/tasks').weight"
          />
        </router-link>
      </nav>
      <router-view />
      <action-button v-show="appStore.showBtn" @click="handleClick" />
    </app-wrapper>
  </app-container>
</template>

<script lang="ts" setup>
import { PhBook, PhCheckSquare } from '@phosphor-icons/vue';
import { useRoute } from 'vue-router';
import AppContainer from '@/components/common/app-container.vue';
import AppWrapper from '@/components/common/app-wrapper.vue';
import ActionButton from '@/components/common/action-button.vue';
import { useTaskStore, useAppStore, useNotesStore } from '@/store';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

const route = useRoute();
const taskStore = useTaskStore();
const appStore = useAppStore();
const notesStore = useNotesStore();

interface IconStyle {
  color: string;
  weight:
    | 'fill'
    | 'bold'
    | 'thin'
    | 'light'
    | 'regular'
    | 'duotone'
    | undefined;
}

const { isCreating, isEditing } = storeToRefs(notesStore);
const { isCreatingTask } = storeToRefs(taskStore);

const iconStyle = (path: string): IconStyle => ({
  color: route.path === path ? '#fb923c' : '#f2f2f2',
  weight: route.path === path ? 'fill' : 'thin',
});

const showFloatingBtn = () => {
  if (
    taskStore.isCreatingTask ||
    notesStore.isCreating ||
    notesStore.isEditing
  ) {
    appStore.showBtn = false;
    return;
  }

  appStore.showBtn = true;
};

const handleClick = () => {
  const isHomePath = route.path === '/';

  if (!isHomePath) {
    taskStore.isCreatingTask = !taskStore.isCreatingTask;
    showFloatingBtn();
    return;
  }

  notesStore.isCreating = !notesStore.isCreating;
  showFloatingBtn();
};

watch([isCreating, isEditing, isCreatingTask], showFloatingBtn);
</script>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
