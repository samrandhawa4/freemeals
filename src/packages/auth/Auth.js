export default function (Vue) {
  Vue.auth = {

    setToken (token) {
      localStorage.setItem('token', token)
    },
    setUser (user) {
      const userOb = JSON.stringify(user)
      localStorage.setItem('user', userOb)
    },
    getToken () {
      var token = localStorage.getItem('token')
      if (!token) {
        return null
      } else {
        return token
      }
    },
    getUser () {
      if (this.getToken()) {
        var user = localStorage.getItem('user')
        if (!user) {
          return null
        } else {
          return JSON.parse(user)
        }
      }
    },
    destroyToken () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    isAuthenticated (router) {
      if (this.getToken()) {
        return true
      } else {
        return false
      }
    }
  }
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: () => {
        return Vue.auth
      }
    }
  })
}
