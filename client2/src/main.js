/* eslint-disable */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/index';
import ButtonComponent from './components/ButtonComponent.vue';

const app = createApp(App);

app.use(store);
app.use(router);
app.component('button-component', ButtonComponent);

app.mount('#app');
