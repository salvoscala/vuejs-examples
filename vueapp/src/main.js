// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import App from './App'
import Users from './components/Users'
import Test from './components/Test'
import Vuetify from 'vuetify'

Vue.use(vueResource)
Vue.use(VueRouter)
Vue.use(Vuetify)

const routes = [
	{path: '/users', component: Users},
	{path: '/test', component: Test}
];

const router = new VueRouter({
	routes: routes,
	mode: 'history',
})

/* eslint-disable no-new */
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
