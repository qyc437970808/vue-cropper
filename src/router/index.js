import Vue from 'vue'
import Router from 'vue-router'
import cropper from '@/components/cropper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'cropper',
      component: cropper
    }
  ]
})
