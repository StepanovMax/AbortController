import './style.css';

import { createApp, h } from 'vue';

import AppLayout from './App.vue';
import { setupLayouts } from 'virtual:generated-layouts';

const app = createApp(AppLayout);

import { createRouter, createWebHistory } from 'vue-router';

import routes from '~pages';

const routesWithLayouts = setupLayouts(routes);

const router = createRouter({
    routes: routesWithLayouts,
    history: createWebHistory(),
});

app.use(router);

app.mount('#app');
