import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const NoteView = () => import('./views/notes.vue');
const TaskView = () => import('./views/tasks.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: NoteView,
  },
  {
    path: '/tasks',
    component: TaskView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
