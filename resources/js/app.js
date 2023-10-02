import Vue from 'vue'

//Main page
import App from './app.vue'
import { store } from './store/index';
Vue.config.productionTip = false;
Vue.config.devtools = false;

const app = new Vue({
    el: '#app',
    store: store,
    template: '<App/>',
    components: { App }
});