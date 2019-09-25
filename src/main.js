import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Vueaxios from "vue-axios";
import antDesign from "./ant.design.config";
import VueLazyload from "vue-lazyload";

import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);

Vue.use(Vueaxios, axios);
Vue.use(antDesign);

Vue.use(VueLazyload, {
  error: require("./assets/lazyload_true.png"),
  loading: require("./assets/lazyload_false.png")
});

axios.defaults.baseURL = "https://music.niubishanshan.top/api/v2/music";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
