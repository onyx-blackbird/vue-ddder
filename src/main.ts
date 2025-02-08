import { createApp } from 'vue';
import './style.css';
import 'vue-final-modal/style.css';
import App from './App.vue';

import { createVfm } from 'vue-final-modal';
import VueDragscroll from "vue-dragscroll";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const vfm = createVfm();
library.add(faPenToSquare, faTrashCan);

createApp(App)
	.use(vfm)
	.use(VueDragscroll)
	.mount('#app');
