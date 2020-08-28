import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f3dd4c08 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _19b4e031 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _1d1f6e57 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _2c240517 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _2cc6a316 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _7a42803f = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _12ee4864 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _f3dd4c08,
    children: [{
      path: "",
      component: _19b4e031,
      name: "home"
    }, {
      path: "/login",
      component: _1d1f6e57,
      name: "login"
    }, {
      path: "/register",
      component: _1d1f6e57,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _2c240517,
      name: "profile"
    }, {
      path: "/settings",
      component: _2cc6a316,
      name: "settings"
    }, {
      path: "/editor",
      component: _7a42803f,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _12ee4864,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
