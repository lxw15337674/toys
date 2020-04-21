# 记录一些封装的组件、方法
## todo
- 用[在线IDE](http://jsrun.net/)写一下demo
- imgBlob.js 功能拆分

## css 
### basic.css
基本样式

## js
#### brower.js 浏览器判断
#### download.js 下载文件
#### formatXml.js xml格式化
#### imgBlob.js 截取图片
##### 用途
  将远程的图片用canvas显示出来，进行blob转换，并上传。
##### 用法
需要在dom上存一个隐藏的canvas元素，
```
<canvas id="myCanvas" style="display: none"></canvas>
```
##### todo
  待功能拆分。
#### regexpRules.js 校验规则整理
#### typeCheck.js 判断数据类型

## vue
### componetns 封装组件
#### orderList.vue 排序组件
##### 例子
```
 <order-list v-model="params" :order-list="orderList"></order-list>

// 排序配置
orderList:[
      {
          label: '时间排序',
          value: 'time',
        },
        {
          label: '数量排序',
          value: 'number',
        },
],
//父组件数据请求参数
 params: {
        dir: 'desc',
        orderBy: 'needCount',
      },
```
#### positionNavigation.vue 纵向锚点导航栏
##### 特性
- 会根据页面宽度显隐、避免遮挡。
- 利用scrollIntoView进行锚点定位

##### 例子
```
   <position-navigation
        ref="menu"
        title="数据画像"
        :data="myRoute"
         v-model="menuShow"
      ></position-navigation>
      <div class="content-container" :style="menuShowStyle">
        <div v-for="item in myRoute" :id="item.name" :key="item.name">
          <component :is="item.name"></component>
        </div>
      </div>

      //锚点数据对象
       myRoute: [
        {
          name: 'catalog',
          label: '目录概览',
        },
        {
          name: 'share',
          label: '共享概览',
        },
        {
          name: 'report',
          label: '填报概览',
        },
        {
          name: 'demand',
          label: '需求概览',
        },
      ],
      // 菜单显隐状态
      menuShow:false
```

#### page-table 带分页的表格
##### 特性
- 对el-table和el-pagination进行组合封装
##### 例子
```

 <g-pageTable
    border
    v-loading="loading"
    :total="total"
    :tableData="tableData"
    :tableCols="tableCols"
    v-model="params"
  >
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="danger" plain size="mini" @click="deleteOne(scope.row)"
          >删除
        </el-button>
      </template>
    </el-table-column>
  </g-pageTable>

# data
loading: false,
tableCols: [
  { prop: 'loginName', label: '用户名' },
  { prop: 'ipAddress', label: 'ip地址' },
  { prop: 'status', label: '状态' },
  { prop: 'loginTime', label: '时间' },
  { prop: 'msg', label: '详情', width: '150' },
],
total: 0,
params: {
  page: 1,
  pageSize: 10,
  dir: 'desc',
  field: 'loginTime',
},
tableData:[]
```

#### filter-form.vue 筛选条件组件
##### 特性
- 支持input输入框、select选择框、date日期选择器三种类型。
##### 例子
```
  <g-filter-form v-model="selForm" :filterArray="filterArray"> </g-filter-form>
    selForm: {
    userId: '',
    dateSelect: '',
    status: '',
  },
  filterArray: [
    { type: 'input', label: '用户名', field: 'userId' },
    {
      type: 'select',
      label: '状态',
      field: 'status',
      options: [
        {
          label: '正常',
          value: 0,
        },
        {
          label: '异常',
          value: 1,
        },
      ],
    },
    {
      type: 'date',
      label: '日期',
      field: 'dateSelect',
    },
  ],
```
### filter 过滤器
#### dataFilter.js 数据过滤器
##### 用途
用于处理对象数据为null情况下的显示问题

#### dateFIlter.js filter时间过滤器
##### 用途
用于处理后端未转换的时间数据（例如：2019-02-15T08:44:15.000+0000）

####  numberTransformation.js 进行数字转换，增加单位
### directive 自定义指令
#### drag.js el-dialog增强
##### 特性
- 配合自定义指令，实现el-dialog可拖动、双击全屏、放大缩小
- 利用h5的draggable属性
##### Demo
http://jsrun.net/mMfKp

### mixins 混入方法
#### formCheck-mix.js  表单校验
##### 用途
利用async-validator的表单校验，解决分页表单的校验
##### 参数说明
参数 | 说明 | 类型 | 是否必填 | 可选值 | 默认值
---|---|---|---|---|---
data | 校验数据 | Array | yes |  | 
rules |  校验规则 | object | yes |  | 
resolve | 校验成功调用 | function | yes |  | 
reject | 校验失败调用 | function | yes |  | 

#### paramCache-mix.js 缓存页面参数
##### 特性
    1.利用mixins、生命周期、sessionStorage
##### 用法
    1.引用mixins
    2.执行this.$setCache(page,parmas)方法 （created,mounted下皆可）
##### 参数说明
参数 | 说明 | 类型 | 是否必填 | 可选值 | 默认值
---|---|---|---|---|---
page | 需要跳转缓存的页面 | array | yes |  | 
params | 缓存参数 |Object |yes
##### demo
```
    mixins:[paramCache],
    mounted(){
        this.setCache(['detail'],{params:this.params})
    }
```

#### keepAlive-mix.js 缓存vue组件
##### 用途
缓存组件
##### 特性
- 利用keepalive的include属性
##### 用法
1.在app.vue进行keepalive配置
2.在使用的vue组件引入mixins
3.在路由表配置需要缓存页面的cachePages
##### 限制
1.include只能缓存跟组件，不能缓存子组件。因为刷新跟组件，子组件就会重新刷新。
2.使用该mixins需要配置cachePages(需要跳转缓存的页面)。
3.需要配合vuex和vue-router使用
##### demo
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


### utils 工具方法
#### batch-import.js 批量导入
##### 特性
- 利用webpack的require.context
##### 用途
导入某个文件夹下全部文件或组件

####  formReset.js 清空对话框表单数据
##### 特性
- 利用$options还原表单初始化数据，清空表单校验提示
##### 参数说明
参数 | 说明 | 类型 | 是否必填 | 可选值 | 默认值
---|---|---|---|---|---
formRef | 表单ref | Array | yes |  | 
##### 限制
-  只能用于单独的el-form组件，因为会清空所有data数据（待后期完善）
##### 用法
- 绑定在el-dialog的@closed方法

#### request.js 二次axios，加了async和防抖、节流、消息提示、错误处理等功能 


