<!--
 * @Date: 2020-04-11 15:44:24
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-11 17:56:11
 -->
<!--
 * @Date: 2020-04-11 15:44:24
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-11 17:50:55
 -->

# js
## formCheck-mix.js 
### 用途
利用async-validator的表单校验，解决分页表单的校验
### 参数说明
参数 | 说明 | 类型 | 是否必填 | 可选值 | 默认值
---|---|---|---|---|---
data | 校验数据 | Array | yes |  | 
rules |  校验规则 | object | yes |  | 
resolve | 校验成功调用 | function | yes |  | 
reject | 校验失败调用 | function | yes |  | 


## request.js 
### 二次axios，加了async和防抖、节流、消息提示、错误处理等功能 

##  formReset.js
### 用途
 清空对话框表单数据
### 特性
- 利用$options还原表单初始化数据，清空表单校验提示
### 参数说明
参数 | 说明 | 类型 | 是否必填 | 可选值 | 默认值
---|---|---|---|---|---
formRef | 表单ref | Array | yes |  | 

### 限制
-  只能用于单独的el-form组件，因为会清空所有data数据（待后期完善）
### 用法
- 绑定在el-dialog的@closed方法

## keepAlive-mix
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

## paramCache-mix
### 用途
缓存页面参数
### 特性
    1.利用mixins、生命周期、sessionStorage
### 用法
    1.引用mixins
    2.执行this.$setCache(page,parmas)方法 （created,mounted下皆可）
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

## regexpRules.js
### 用途
校验规则整理
## formatXml.js
### 用途
xml格式化
## download.js
### 用途
下载文件
## numberTransformation.js
### 用途
进行数字转换，增加单位
## browser.js
### 用途
判断浏览器类型


# Vue filter 自定义过滤器
## dataFilter.js 数据过滤器
### 用途
用于处理对象数据为null情况下的显示问题

## dateFIlter.js 时间过滤器
### 用途
用于处理后端未转换的时间数据（例如：2019-02-15T08:44:15.000+0000）

## Vue批量导入 batch-import.js
### 特性
- 利用webpack的require.context
### 用途
导入某个文件夹下全部文件或组件