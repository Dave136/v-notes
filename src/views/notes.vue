<template>
  <section class="mt-8">
    <notes-category @create="showCreateCategoryModal = true" />
    <notes-create v-show="notesStore.isCreating" />
    <notes-update
      v-if="notesStore.isEditing && noteUpdate?.id"
      :note="noteUpdate"
    />
    <notes-list
      v-show="!notesStore.isCreating && !notesStore.isEditing"
      @update="handleUpdate"
      @delete="handleDelete"
    />
    <confirmation-modal
      message="Are you sure to delete this note?"
      :show="showConfirmation"
      @action="action"
    />
    <category-modal v-model:show="showCreateCategoryModal" />
  </section>
</template>

<script lang="ts" setup>
import { useNotesStore, type Note } from '@/store';
import NotesCreate from '../components/notes/notes-create.vue';
import NotesUpdate from '../components/notes/notes-update.vue';
import NotesList from '../components/notes/notes-list.vue';
import NotesCategory from '../components/notes/notes-category.vue';
import ConfirmationModal from '../components/common/confirmation-modal.vue';
import CategoryModal from '../components/notes/category-modal.vue';
import { ref, type Ref } from 'vue';

const notesStore = useNotesStore();
const noteUpdate = ref<Note>() as Ref<Note>;
const showConfirmation = ref<boolean>(false);
const showCreateCategoryModal = ref<boolean>(false);
const noteId = ref<string>('');

const handleUpdate = (note: Note) => {
  noteUpdate.value = note;
  notesStore.isEditing = true;
};

const handleDelete = (id: string) => {
  noteId.value = id;
  showConfirmation.value = true;
};

const action = (confirmation: boolean) => {
  if (!confirmation) {
    noteId.value = '';
    showConfirmation.value = false;
    return;
  }

  notesStore.remove(noteId.value);
  showConfirmation.value = false;
};
</script>
