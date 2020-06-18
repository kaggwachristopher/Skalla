/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import store from "./store";
import Axios from "axios";
import ArgonDashboard from "./plugins/argon-dashboard";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js"

Vue.config.productionTip = false;

//set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

//set base Url 
if (process.env.NODE_ENV === 'production'){
  Axios.defaults.baseURL="http://skalla256.herokuapp.com/"
}else{
  Axios.defaults.baseURL="http://localhost:8081/"
}

// Vue.prototype.$http = Axios;
// const token = localStorage.getItem("token");

// if (token) {
//   Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
// }

Vue.use(ArgonDashboard);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
