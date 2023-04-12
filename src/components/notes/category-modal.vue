<template>
  <basic-modal :show="showModal">
    <h3 class="mb-4">New category</h3>
    <input
      v-model="name"
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
import { computed, ref } from 'vue';
import BasicModal from '../common/basic-modal.vue';
import { useCategoryStore } from '@/store';

interface Props {
  show: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void;
}>();

const name = ref<string>('');
const category = useCategoryStore();

const showModal = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value),
});

const createCategory = () => {
  if (!name.value.length) return;

  category.create(name.value);
  showModal.value = false;
  name.value = '';
};
</script>
