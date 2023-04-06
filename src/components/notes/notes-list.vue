<template>
  <ul class="flex flex-col gap-4 mx-6">
    <transition-group name="list">
      <li
        v-for="note in notesStore.notes"
        :key="note.id"
        class="w-full p-6 rounded-md bg-black bg-opacity-30 relative"
      >
        <h4 class="font-bold mb-2">{{ note.title }}</h4>
        <p class="text-sm text-gray-600">{{ note.content }}</p>
        <small class="text-xs text-gray-600 text-opacity-80">{{
          // new Intl.DateTimeFormat('es-VE', {
          //   dateStyle: 'medium',
          //   timeStyle: 'short',
          // }).format(new Date(note.createdAt))
          note.createdAt
        }}</small>

        <div class="absolute top-2 right-2 inline-block">
          <!-- Dropdown toggle button -->
          <button
            class="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-black dark:bg-opacity-10 focus:outline-none"
            @click="openMenu(note.id)"
          >
            <svg
              class="w-5 h-5 text-gray-800 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
              />
            </svg>
          </button>

          <!-- Dropdown menu -->
          <transition name="dropdown" mode="out-in">
            <div
              v-show="menu.active && menu.id === note.id"
              class="absolute right-0 z-20 w-32 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-zinc-900"
              @click="
                () => {
                  menu.active = false;
                  menu.id = '';
                }
              "
            >
              <a
                href="#"
                class="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                @click="$emit('update', note)"
              >
                <ph-pencil :size="16" color="#ffffff" weight="thin" />
                Edit
              </a>
              <a
                href="#"
                class="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                @click="$emit('delete', note.id)"
              >
                <ph-trash-simple size="16" color="#ffffff" weight="thin" />
                Delete
              </a>
            </div>
          </transition>
        </div>
      </li>
    </transition-group>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { PhPencil, PhTrashSimple } from '@phosphor-icons/vue';
import { useNotesStore, type Note } from '@/store';

defineEmits<{
  (e: 'update', note: Note): void;
  (e: 'delete', id: string): void;
}>();

const menu = ref({
  id: '',
  active: false,
});

const notesStore = useNotesStore();

const openMenu = (id: string) => {
  menu.value.id = id;
  menu.value.active = !menu.value.active;
};
</script>

<style>
/* we will explain what these classes do next! */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease-in;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}
</style>
