import { createApp } from 'vue';
import './style.css';
import 'vue-final-modal/style.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import App from './App.vue';

import { createVfm } from 'vue-final-modal';
import VueDragscroll from "vue-dragscroll";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleQuestion, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faAnglesLeft, faAnglesRight, faAnglesDown, faAnglesUp, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faAnglesLeft, faAnglesRight, faAnglesDown, faAnglesUp, faCircleQuestion, faPenToSquare, faTrashCan, faMinus, faPlus);

createApp(App)
	.use(createVfm())
	.use(VueDragscroll)
	.mount('#app');
