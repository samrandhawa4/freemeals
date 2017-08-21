import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Croppa from 'vue-croppa'
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App'
import Auth from './packages/auth/Auth'
import routes from './router'
import 'vue-croppa/dist/vue-croppa.css'
Vue.use(VueRouter)
Vue.use(Croppa)
Vue.use(Vuetify)
Vue.use(VueResource)
Vue.use(Auth)

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCCXHxG8QZUmNhhAUXUlZ3vTbbzpumtpH0',
    libraries: 'places'
  }
})

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach(
  (to, from, next) => {
    if (to.matched.some(record => record.meta.guest)) {
      if (Vue.auth.isAuthenticated()) {
        next({
          path: '/posts'
        })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.auth)) {
      if (!Vue.auth.isAuthenticated()) {
        next({
          path: '/signin'
        })
      } else {
        next()
      }
    } else {
      next()
    }
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
