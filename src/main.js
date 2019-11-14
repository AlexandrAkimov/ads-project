import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import BuyModalComponent from './components/Shared/BuyModal'
import * as fb from 'firebase'
import router from './router'
import store from './store'
Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModalComponent)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyC2TWw8R-QP8q9LwzCWfJjdoQHP446Pue8",
      authDomain: "itc-ads-788d3.firebaseapp.com",
      databaseURL: "https://itc-ads-788d3.firebaseio.com",
      projectId: "itc-ads-788d3",
      storageBucket: "itc-ads-788d3.appspot.com",
      messagingSenderId: "704274821352",
      appId: "1:704274821352:web:7a16281d06cd67bf"
    }
    fb.initializeApp(firebaseConfig);
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid);
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')