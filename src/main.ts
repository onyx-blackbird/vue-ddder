import { createApp } from 'vue';
import { createRouter, createWebHistory, type RouteRecordSingleView } from 'vue-router';

import './style.css';
import 'vue-final-modal/style.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';

import App from './App.vue';
import EventStormView from './components/EventStormView.vue';
import GlossaryView from './components/GlossaryView.vue';

import { createVfm } from 'vue-final-modal';
import VueDragscroll from "vue-dragscroll";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleQuestion, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faAnglesLeft, faAnglesRight, faAnglesDown, faAnglesUp, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faAnglesLeft, faAnglesRight, faAnglesDown, faAnglesUp, faCircleQuestion, faPenToSquare, faTrashCan, faMinus, faPlus);

const routes: Array<RouteRecordSingleView> = [
	{ path: '/', component: EventStormView },
	{ path: '/glossary', component: GlossaryView },
];
const router = createRouter({
	history: createWebHistory(),
	routes,
})

createApp(App)
	.use(router)
	.use(createVfm())
	.use(VueDragscroll)
	.mount('#app');
