import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import rabbitTest from '@/components/rabbitTest'
import battlefield from '@/components/battlefield'
import pressureTest from '@/components/pressureTest'
import canvasShow from '@/components/canvasShow'
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
      path: '/pressureTest',
      name: 'pressureTest',
      component: pressureTest
    }
    ,{
      path: '/',
      name: 'canvasShow',
      component: canvasShow
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
