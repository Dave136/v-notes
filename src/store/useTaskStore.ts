import { defineStore } from 'pinia';

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
    completedTasks(): Task[] {
      return this.tasks.filter((task) => task.done);
    },
    uncompletedTasks(): Task[] {
      return this.tasks.filter((task) => !task.done);
    },
  },
  actions: {
    add(task: string) {
      const id = crypto.randomUUID();
      const createdAt = new Date().toDateString();
      const updatedAt = new Date().toDateString();
      const done = false;
      const newTask: Task = { title: task, id, createdAt, updatedAt, done };

      this.tasks.push(newTask);
    },
    update(id: string, title: string) {
      this.tasks = this.tasks.map((existentTask) =>
        existentTask.id === id ? { ...existentTask, id, title } : existentTask,
      );
    },
    done(id: string) {
      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, id } : task,
      );
    },
    remove(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    getTaskById(id: string) {
      return this.tasks.filter((task) => task.id === id);
    },
  },
});
