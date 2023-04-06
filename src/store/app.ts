import { defineStore } from 'pinia';

interface AppStore {
  showBtn: boolean;
}

export const useAppStore = defineStore('app-store', {
  state: (): AppStore => ({
    showBtn: true,
  }),
});
