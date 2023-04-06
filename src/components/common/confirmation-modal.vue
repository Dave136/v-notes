<template>
  <transition>
    <div
      v-if="show"
      class="bg-opacity-80 bg-zinc-900 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 backdrop-filter backdrop-blur-md z-10"
    >
      <div class="bg-zinc-800 px-10 py-8 rounded-md text-center">
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
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
interface Props {
  message: string;
  show: boolean;
}

defineProps<Props>();
defineEmits<{
  (e: 'action', confirmation: boolean): void;
}>();
</script>
