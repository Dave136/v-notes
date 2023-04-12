<template>
  <section v-if="notes.notes.length" class="mx-8 mb-6 flex w-full gap-2">
    <span class="px-5 py-2 rounded-full bg-zinc-800 text-xs cursor-pointer"
      >All</span
    >
    <span
      v-for="category in categoryStore.categories"
      :key="category.id"
      class="px-5 py-2 rounded-full bg-zinc-800 text-xs cursor-pointer"
    >
      {{ category.name }}
    </span>
    <span
      class="px-5 py-2 rounded-full bg-zinc-800 text-xs cursor-pointer"
      @click="$emit('create')"
    >
      <ph-folder :size="18" color="#fb923c" weight="thin" />
    </span>
  </section>
</template>

<script lang="ts" setup>
import { PhFolder } from '@phosphor-icons/vue';
import { useCategoryStore, useNotesStore } from '@/store';

const notes = useNotesStore();
const categoryStore = useCategoryStore();

defineEmits<{
  (e: 'create'): void;
}>();
</script>
