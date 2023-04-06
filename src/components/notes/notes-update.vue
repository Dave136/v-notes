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
            @keyup.enter="updateNote"
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
          <button class="text-gray-400 mr-5" @click="notes.isEditing = false">
            Cancel
          </button>
          <button
            class="transition-all"
            :class="{
              'text-orange-400': title.length,
              'text-gray-50': !title.length,
              'hover:text-orange-400': title.length,
            }"
            @click="updateNote"
          >
            Update
          </button>
        </div>
      </div>
    </section>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useNotesStore, type NoteDTO, type Note } from '@/store';
import useToast from '@/composables/use-toast';

interface Props {
  note: Note;
}

const props = defineProps<Props>();

const title = ref(props.note?.title);
const content = ref(props.note?.content);
const currentDate = ref(new Date().toISOString());
const notes = useNotesStore();
const { toast } = useToast();

const totalCount = computed(
  () => title?.value?.length + content?.value?.length,
);

const updateNote = () => {
  if (!title.value) {
    toast.value?.error('You cannot create an empty note!');
    return;
  }

  const payload: NoteDTO = {
    ...props.note,
    title: title.value,
    content: content.value,
    createdAt: currentDate.value,
  };

  notes.update(payload);
  toast.value?.success('Note update with successfull');
  notes.isEditing = false;
};
</script>
