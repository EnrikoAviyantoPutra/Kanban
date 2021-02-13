import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue'
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { LoaderPlugin } from 'vue-google-login';

Vue.use(LoaderPlugin, {
       client_id: "382446582515-unphondongv9fuasfg9r40mq3ovg1nck.apps.googleusercontent.com"
   });
   
new Vue({
    render: h=> h(App),
    
}).$mount('#app') 
