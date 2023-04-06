import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCategoryStore, type Category } from './category';

export interface NoteDTO {
  title: string;
  content: string;
  createdAt: string;
}
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface NotesStore {
  notes: Note[];
  isCreating: boolean;
  isEditing: boolean;
}

// export const useNotesStore = defineStore('notes', {
//   state: (): NotesStore => ({
//     notes: [],
//     isCreating: false,
//     isEditing: false,
//   }),
//   getters: {
//     categories(): string[] {
//       const categories = this.notes.map((note) => note.category);
//       const cleaned = [...new Set(categories)];
//       return cleaned;
//     },
//   },
//   actions: {
//     add(dto: NoteDTO) {
//       const newNote: Note = {
//         id: crypto.randomUUID(),
//         createdAt: dto.createdAt,
//         updatedAt: new Date().toISOString(),
//         title: dto.title,
//         content: dto.content,
//         category: 'Uncategorized',
//       };

//       this.notes.push(newNote);
//     },
//     update(note: Partial<Note>): void {
//       const updateList = this.notes.map((n) =>
//         n.id === note.id ? { ...n, ...note } : n,
//       );
//       this.notes = updateList;
//     },
//     remove(id: string): void {
//       this.notes = this.notes.filter((note) => note.id !== id);
//     },
//     getByCategory(category: string): Note[] {
//       const result = this.notes.filter((note) => note.category === category);
//       return result;
//     },
//   },
//   persist: true,
// });

export const useNotesStore = defineStore(
  'notes-store',
  () => {
    const notes = ref<Note[]>([]);
    const isCreating = ref<boolean>(false);
    const isEditing = ref<boolean>(false);

    const category = useCategoryStore();

    const add = (dto: NoteDTO) => {
      const newNote: Omit<Note, 'category'> = {
        id: crypto.randomUUID(),
        createdAt: dto.createdAt,
        updatedAt: new Date().toISOString(),
        title: dto.title,
        content: dto.content,
      };

      notes.value.push({
        ...newNote,
        category: category.getCategory('Uncategorized'),
      });
      category.appendNote('Uncategorized', newNote);
    };

    const getNotesList = (id: string) => {
      const found = notes.value.find((note) => note.id === id);
      const notesList = notes.value
        .filter((note) => note.category.name === found?.category.name)
        .map(({ category: _, ...rest }) => rest);

      return { notesList, found };
    };

    const update = (note: Partial<Note>) => {
      const updateList = notes.value.map((n) =>
        n.id === note.id ? { ...n, ...note } : n,
      );
      notes.value = updateList;
      const { notesList } = getNotesList(note.id as string);
      category.updateNotes(note.category?.name as string, notesList);
    };

    const remove = (id: string) => {
      const found = notes.value.find((note) => note.id === id);
      const notesList = notes.value
        .filter((note) => note.category.name !== found?.category.name)
        .map(({ category: _, ...rest }) => rest);

      notes.value = notes.value.filter((note) => note.id !== id);
      category.updateNotes(found?.category.name as string, notesList);
    };

    return { notes, isCreating, isEditing, add, update, remove };
  },
  { persist: true },
);
