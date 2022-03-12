import { defineStore } from 'pinia';
import * as storage from '@/utils/localStorage';

export interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStore {
  tasks: Task[];
}

export const useTaskStore = defineStore('task', {
  state: (): TaskStore => ({
    tasks: [],
  }),
  getters: {
    getTasks(): Task[] {
      return this.tasks.length ? this.tasks : storage.getStorage(storage.Keys.Task);
    },
    completedTasks(): Task[] {
      return this.getTasks.filter((task) => task.done);
    },
    uncompletedTasks(): Task[] {
      return this.getTasks.filter((task) => !task.done);
    },
  },
  actions: {
    add(task: string) {
      const id = crypto.randomUUID();
      const createdAt = new Date().toDateString();
      const updatedAt = new Date().toDateString();
      const done = false;
      const newTask: Task = { title: task, id, createdAt, updatedAt, done };
      const taskStorage = this.getTasks;
      
      taskStorage.push(newTask);
      storage.saveStorage(storage.Keys.Task, taskStorage);
      this.tasks = taskStorage;
    },
    update(id: string, title: string) {
      this.tasks = this.tasks.map((existentTask) =>
        existentTask.id === id ? { ...existentTask, id, title } : existentTask,
      );
      storage.saveStorage(storage.Keys.Task, this.tasks);
    },
    done(id: string) {
      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, id } : task,
      );
      storage.saveStorage(storage.Keys.Task, this.tasks);
    },
    remove(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      storage.saveStorage(storage.Keys.Task, this.tasks);
    },
    getTaskById(id: string) {
      return this.tasks.filter((task) => task.id === id);
    },
  },
});
