<template>
  <basic-modal :show="showModal">
    <h3 class="mb-4">New category</h3>
    <input
      class="form-input block mb-4 bg-transparent rounded-md"
      type="text"
      placeholder="Unnamed category"
    />
    <div class="flex">
      <button
        class="border border-zinc-600 flex-1 px-4 py-2 rounded-md text-sm text-white"
        @click="showModal = false"
      >
        Cancel
      </button>
      <button
        class="bg-blue-500 flex-1 px-5 py-2 ml-2 rounded-md text-sm text-white font-semibold"
        @click="createCategory"
      >
        Create
      </button>
    </div>
  </basic-modal>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BasicModal from '../common/basic-modal.vue';
interface Props {
  show: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void;
}>();

const showModal = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value),
});

const createCategory = () => {
  console.log('creating a new category');
};
</script>
