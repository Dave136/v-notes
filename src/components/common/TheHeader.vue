<template>
  <header class="flex items-center justify-center pb-10">
    <h2 class="text-4xl text-center">{{ title }}</h2>
    <slot />
  </header>
</template>

<script lang="ts" setup>
type Props = {
  title: string;
}

defineProps<Props>();
</script>