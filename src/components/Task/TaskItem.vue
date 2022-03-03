<template>
  <li class="bg-zinc-800 my-3 p-5 rounded-md">
    <div class="flex items-center" @dblclick="$emit('dblclick')">
      <input :checked="done" class="form-checkbox mr-5" type="checkbox" @change="toggleDone" />
      <h4 class="text-md font-bold truncate" :class="{ 'line-through': done }">
        {{ title }}
      </h4>
      <div class="flex-grow flex justify-end">
        <button class="flex" @click="$emit('remove')">
          <Icon size="24">
            <Trash class="text-red-500 hover:text-red-800 transition ease-linear duration-200" />
          </Icon>
        </button>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { useTaskStore } from '@/store/useTaskStore';
import Trash from '@vicons/ionicons5/Trash';
import { Icon } from '@vicons/utils';
import useToast from '@/composables/useToast';

type Props = {
  id: string;
  title: string;
  done: boolean;
};

type Emits = {
  (e: 'dblclick'): void;
  (e: 'remove'): void;
  (e: 'update:done', value: boolean): void;
};

defineEmits<Emits>();
const props = defineProps<Props>();

const taskStore = useTaskStore();
const { toast } = useToast();

const toggleDone = () => {
  taskStore.toggleDone(props.id);

  toast.value.default(
    `Task ${props.title} ${!props.done ? 'completed!' : 'uncompleted'}`,
  );
};
</script>
