<template>
  <transition>
    <div
      v-if="show"
      class="bg-opacity-80 bg-zinc-900 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 backdrop-filter backdrop-blur-md z-10"
    >
      <div class="bg-zinc-800 px-10 py-8 rounded-md text-center">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
interface Props {
  show: boolean;
}

defineProps<Props>();
defineEmits<{
  (e: 'action', confirmation: boolean): void;
}>();
</script>
