<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1 class="text-3xl font-bold underline">Hello world</h1>
  <div>
    <button class="p-4 bg-gray-300 rounded text-black mr-4" @click="counter.increment">Increment</button>
    <button class="p-4 bg-gray-300 rounded text-black" @click="counter.decrement">Decrement</button>
  </div>
  <div class="p-8 bg-slate-50 max-w-xs m-auto mt-6 rounded">Count {{ counter.count }}</div>
</template>

<script setup lang="ts">
import { useCounterStore } from './store/useCounterStore';

const counter = useCounterStore();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #2c3e50;
  min-height: 100vh;
}
</style>
