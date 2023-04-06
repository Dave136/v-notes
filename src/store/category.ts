import { defineStore } from 'pinia';
import type { Note } from './notes';

type NoteCategory = Omit<Note, 'category'>;

export interface Category {
  id: string;
  name: string;
  notes: NoteCategory[];
}

interface CategoryStore {
  categories: Category[];
}

const defaultCategories: Category[] = [
  {
    id: crypto.randomUUID(),
    name: 'Uncategorized',
    notes: [],
  },
];

export const useCategoryStore = defineStore('category-store', {
  state: (): CategoryStore => ({
    categories: defaultCategories,
  }),
  actions: {
    getCategory(name: string): Category {
      return this.categories.filter(
        (category) => category.name.toLowerCase() === name.toLowerCase(),
      )[0];
    },
    create(category: string): void {
      const newCategory = {
        id: crypto.randomUUID(),
        name: category,
        notes: [],
      };

      this.categories.push(newCategory);
    },
    appendNote(name: string, note: NoteCategory): void {
      this.categories.map((category) =>
        category.name.toLowerCase() === name.toLowerCase()
          ? category.notes.push(note)
          : category,
      );
    },
    updateNotes(name: string, notes: NoteCategory[]): void {
      this.categories.map((category) =>
        category.name.toLowerCase() === name.toLowerCase()
          ? (category.notes = notes)
          : category,
      );
    },
  },
  persist: true,
});
