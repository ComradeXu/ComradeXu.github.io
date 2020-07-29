---
layout:     post
title:      "vue-admin-template修改"
subtitle:   "添加动态路由"
date:       2020-07-29
author:     "ComradeXu"
header-img: "img/post-bg-ios9-web.jpg"
header-mask: 0.3
catalog:    true
tags:

---


---

#### 怕忘了，mark一下

vue-admin-template(我这个是没有roles版本的)执行安装

1:..\src\store\modules\user.js文件下的

mutations中添加
```js
SET_MENUS: (state, menus) => {
	state.menus = menus
}
```
getInfo方法中添加
```js
const menus = 接口返回来的路由数组

//404必须在路由的最后，或者让后台返回404也可
menus.push({
  path:'*', redirect: '/404', hidden: true
})

//store中添加menus
commit('SET_MENUS', menus)
```

2:..\src\store\getters.js文件中添加
```js
menus: state => state.user.menus
```

3:**重点**..\src\permission.js

把后台返回的component转换过来
```js
export const loadView = (view) => {
  return require('@/views/' + view).default
  // return (resolve) =>  require([`@/views/${view}`], resolve)
}
```

遍历后台传来的路由字符串，转换为组件对象
```js
function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}
```
在路由钩子中，过滤路由，并生成路由

修改router.beforeEach路由钩子

在await store.dispatch('user/getInfo')获取动态路由后添加代码
```js
if (store.getters.menus.length < 1) {
	global.antRouter = []
	next()
}
const menus = filterAsyncRouter(store.getters.menus) // 1.过滤路由
router.addRoutes(menus) // 2.动态添加路由
global.antRouter = menus // 3.将路由数据传递给全局变量
next({ ...to, replace: true }) // 确保addRoutes已完成
```
此处{ ...to, replace: true }必须添加，否则会出现新添加路由刷新404的情况，如果添加后出现一直死循环的情况请查看const hasGetUserInfo = store.getters.name里的name有没有获取到，这个是在..\src\store\modules\user.js文件getInfo后存储的，name也可以换成其他可以验证的参数

4:合并路由

修改..\src\layout\components\Sidebar\index.vue
```js
routes() {
    return this.$router.options.routes.concat(global.antRouter)
},
```

5:遇到的坑

next({ ...to, replace: true })如果不添加，动态路由刷新会404；添加就一直死循环；原因if(hasGetUserInfo)的hasGetUserInfo验证问题
添加完后点击动态添加的路由会空白页面，我遇到的两种情况，一种是component路径没有添加对，另一种就是添加了redirect路径重定向属性，去掉即可
