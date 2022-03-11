<template>
  <section class="flex justify-center absolute bottom-10 w-full">
    <button
      class="w-16 h-16 text-4xl ml-2 bg-orange-500 hover:bg-orange-400 transition-all rounded-full"
      @click="$emit('click')"
    >+</button>
  </section>
</template>

<script lang="ts" setup>
defineEmits<{ (e: 'click'): void }>();
</script>