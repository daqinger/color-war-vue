import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import rabbitTest from '@/components/rabbitTest'
import battlefield from '@/components/battlefield'
import pressureTest from '@/components/pressureTest'
import canvasTest from '@/components/canvasTest'
import info from '@/components/info'
import howtodo from '@/components/howtodo'
import phoneField from '@/components/phoneField'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: 'helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/rabbittest',
      name: 'rabbitTest',
      component: rabbitTest
    },{
      path: '/battlefield',
      name: 'battlefield',
      component: battlefield
    },{
      path: '/xx',
      name: 'pressureTest',
      component: pressureTest
    }
    ,{
      path: '/',
      name: 'canvasTest',
      component: canvasTest
    }
    ,{
      path: '/info',
      name: 'info',
      component: info
    }
    ,{
      path: '/howtodo',
      name: 'howtodo',
      component: howtodo
    }
    ,{
      path: '/phonefield',
      name: 'phonefield',
      component: phoneField
    }
  ]
})
