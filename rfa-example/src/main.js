// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import vueResource from 'vue-resource'
import './stylus/main.styl'
import App from './App'
import Search from './components/Search'
import GeoMap from './components/GeoMap'
import Properties from './components/Properties'
import router from './router'
import Datepicker from 'vuejs-datepicker'
import Moment from "moment"
import VueMomentJS from "vue-momentjs"
import * as VueGoogleMaps from 'vue2-google-maps'

var moment = require('moment');

Vue.use(VueMomentJS)
Vue.use(Moment)
Vue.use(Vuetify)
Vue.use(vueResource)
Vue.use(Datepicker)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvWE_sIwKbWkiuJQOf8gSk9qzpO96fhfY',
  }
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, Search, GeoMap, Properties, Datepicker, Moment, VueMomentJS }
})
