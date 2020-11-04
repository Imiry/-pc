import Vue from 'vue'
import VueRouter from 'vue-router'

// 在 VueCLI 创建的项目中 @ 表示 src 目录
// 它是 src 目录的路径别名
// 好处：它不受当前文件路径影响
// 注意：@ 就是 src 路径，后面别忘了写那个斜杠
// 使用建议：如果加载的资源路径就在当前目录下，那就正常写
//       如果需要进行父级路径查找的都使用 @
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'
import Image from '@/views/image/'
import Comment from '@/views/comment/'
import Settings from '@/views/settings/'
import Fans from '@/views/fans/'


Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {

        path: '', 
        name: 'Home',
        component: Home
      },
      {
        path: '/article',
        name: 'Article',
        component: Article
      },
      {
        path: '/publish',
        name: 'Publish',
        component: Publish
      },
      {
        path: '/image',
        name: 'Image',
        component: Image
      },
      {
        path: '/comment',
        name: 'Comment',
        component: Comment
      },
      {
        path: '/settings',
        name: 'Settings',
        component: Settings
      },
      {
        path: '/fans',
        name: 'Fans',
        component: Fans
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 解决问题：用户不可以直接访问/路径来访问系统页面，所以加上导航守卫也就是路由拦截，就是如果判断用户如果不是/login的话，首先要判断用户是否存在，存在next（），不存在next（’/login）；如果是存在就直接next()
router.beforeEach((to,from,next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if(to.path !== '/login'){
    if(user){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})


export default router
