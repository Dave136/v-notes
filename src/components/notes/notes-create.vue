<template>
  <transition mode="out-in" appear>
    <section class="bg-zinc-800 p-5 mx-5 mb-4 rounded-lg">
      <div class="p-2">
        <div>
          <input
            v-model="title"
            placeholder="Title"
            class="form-input outline-none text-2xl border-none focus:ring-transparent bg-transparent rounded-md"
            type="text"
            @keyup.enter="createNote"
          />
          <p class="text-xs pl-4 text-gray-500">
            {{
              new Intl.DateTimeFormat('es-VE', {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(new Date())
            }}
            | {{ totalCount }}
          </p>
          <textarea
            v-model="content"
            class="mt-4 w-full form-input outline-none border-none bg-transparent rounded-md mx-1 focus:ring-transparent"
            placeholder="Start typing"
          ></textarea>
        </div>
        <div class="mt-5 flex justify-end">
          <button class="text-gray-400 mr-5" @click="notes.isCreating = false">
            Cancel
          </button>
          <button
            class="transition-all"
            :class="{
              'text-orange-400': title.length,
              'text-gray-50': !title.length,
              'hover:text-orange-400': title.length,
            }"
            @click="createNote"
          >
            Create
          </button>
        </div>
      </div>
    </section>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useNotesStore, type NoteDTO } from '@/store';
import useToast from '@/composables/use-toast';

const title = ref('');
const content = ref('');
const currentDate = ref(new Date().toISOString());
const notes = useNotesStore();
const { toast } = useToast();

const totalCount = computed(() => title.value.length + content.value.length);

const createNote = () => {
  if (!title.value) {
    toast.value?.error('You cannot create an empty note!');
    return;
  }

  const payload: NoteDTO = {
    title: title.value,
    content: content.value,
    createdAt: currentDate.value,
  };

  notes.add(payload);
  toast.value?.success('Note created successfully');

  title.value = '';
  content.value = '';
  currentDate.value = '';
  notes.isCreating = false;
};
</script>
