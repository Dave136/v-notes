<template>
  <basic-modal :show="show">
    <h1 class="text-xl mb-8 font-bold text-zinc-500">{{ message }}</h1>
    <button
      class="border border-zinc-600 px-4 py-2 rounded-md text-sm text-white"
      @click="$emit('action', false)"
    >
      Cancel
    </button>
    <button
      class="bg-red-500 px-5 py-2 ml-2 rounded-md text-sm text-white font-semibold"
      @click="$emit('action', true)"
    >
      Delete
    </button>
  </basic-modal>
</template>

<script lang="ts" setup>
import BasicModal from './basic-modal.vue';
interface Props {
  message: string;
  show: boolean;
}

defineProps<Props>();
defineEmits<{
  (e: 'action', confirmation: boolean): void;
}>();
</script>
