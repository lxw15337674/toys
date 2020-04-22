# 混入方法
## paramCache-mix.js 缓存页面参数
### 特性
- 利用mixins、生命周期、sessionStorage
### 用法
    1. 引用mixins
    2. 执行this.$setCache(page,parmas)方法 （created,mounted下皆可）
### 参数说明
参数 | 说明 | 类型 | 是否必填 | 可选值 | 默认值
---|---|---|---|---|---
page | 需要跳转缓存的页面 | array | yes |  | 
params | 缓存参数 |Object |yes
### demo
```
    mixins:[paramCache],
    mounted(){
        this.setCache(['detail'],{params:this.params})
    }
```

## keepAlive-mix.js 缓存vue组件
### 用途
缓存组件
### 特性
- 利用keepalive的include属性
### 用法
    1.在app.vue进行keepalive配置
    2.在使用的vue组件引入mixins
    3.在路由表配置需要缓存页面的cachePages
### 限制
    1.include只能缓存跟组件，不能缓存子组件。因为刷新跟组件，子组件就会重新刷新。
    2.使用该mixins需要配置cachePages(需要跳转缓存的页面)。
    3.需要配合vuex和vue-router使用
### demo
```
#app.vue
<keep-alive :include="includeList">
    <router-view></router-view>
</keep-alive>

computed: {
includeList() {
    return this.$store.state.keepAlive.includeList;
    },
},

#vue-router
{
path: '/searchResult',
component: () => import('src/views/search-result/search-result.vue'),
name: 'searchResult',
meta: {
    title: '搜索结果',
    auth: false,
    cachePages: ['appDetail', 'catalogDetail', 'noticeDetail'],
},
}
#vuex  
const mutations = {
  //缓存当前组件
  addInclude: (state, name) => {
    state.includeList.push(name);
  },
  //删除缓存组件
  deleteInclude: (state, name) => {
    state.includeList = state.includeList.filter((item) => {
      return item !== name;
    });
  },
  cleanInclude: (state) => {
    state.includeList = [];
  },
};


#example.vue
import keepAlive from 'src/mixins/keepAlive-mix';
mixins: [keepAlive],


```