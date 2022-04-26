import { createApp } from 'vue'
import App from './App.vue' 
import router from './router/router.js';
import store from './store/index.js';
import ButtonComponent from './components/ButtonComponent.vue';

const app = createApp(App);

app.use(store);
app.use(router);
app.component('button-component', ButtonComponent);

app.mount('#app');
