import { createApp } from 'vue';
import './style.css';
import 'vue-final-modal/style.css';
import App from './App.vue';
import { createVfm } from 'vue-final-modal';
import VueDragscroll from "vue-dragscroll";

const app = createApp(App);

const vfm = createVfm();
app.use(vfm);
app.use(VueDragscroll);
app.mount('#app');
