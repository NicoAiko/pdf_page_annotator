import { createRouter, createWebHashHistory } from 'vue-router';
import Main from '../components/Main.vue';

const routes = [{ path: '/', name: 'Main', component: Main }];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
