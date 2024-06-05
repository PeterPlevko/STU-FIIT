import Vue from 'vue';
import './bootstrap';

Vue.component("broadcaster", require("./components/Broadcaster.vue").default);
Vue.component("viewer", require("./components/Viewer.vue").default);

const app = new Vue({
    el: '#app'
});

