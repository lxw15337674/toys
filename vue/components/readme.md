# 封装组件

## orderList.vue 排序组件
### 示例
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

## positionNavigation.vue 纵向锚点导航栏
### 特性
- 会根据页面宽度显隐、避免遮挡。
- 利用scrollIntoView进行锚点定位

### 示例
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

## page-table 带分页的表格
### 特性
- 对el-table和el-pagination进行组合封装
### 例子
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

## filter-form.vue 筛选条件组件
### 特性
- 支持input输入框、select选择框、date日期选择器三种类型。
### 例子
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
## animated-integer.vue 数字跳动
### 介绍
 数字从0开始加载的动画
### 限制
- 需要引用TWEEN.js
### 示例
```
<animated-integer :value="value"></animated-integer>
```
## breadcrumb.vue 面包屑
### 介绍
根据路由地址匹配层级结构的面包屑
### 示例
```
 <g-breadcrumb></g-breadcrumb>
```

## redirect.vue  刷新当前页面
### 介绍
  利用中间页面，解决vue不能刷新当前页面的限制。
###  限制
- 需要配合vue-router
### 示例
```

this.$router.push({
      path: '/redirect/appDetail',
      query: { id: app.id },
});

// 配置路由
 {
    path: '/redirect/:routeName',
    name: 'redirect',
    component: () => import('src/views/redirect.vue'),
    hidden: true,
    meta: {
      auth: false,
    },
  },
```



## horizontal-list.vue 横向列表
### 介绍
  可以左右滚动的横向列表
### 示例
```
    <horizontal-list :data="listData"></horizontal-list>

  #data
     listData: [
        {
          title: '小明',
          icon:
            'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top-e3b63a0b1b.png',
        },
        {
          title: '小红',
          icon:
            'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top-e3b63a0b1b.png',
        },
        {
          title: '小明',
          icon:
            'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top-e3b63a0b1b.png',
        },
        {
          title: '小红小红小红小红小红小红小红小红小红小红小红小红',
          icon:
            'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top-e3b63a0b1b.png',
        },
        {
          title: '小明',
        },
        {
          title: '小红',
          icon:
            'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top-e3b63a0b1b.png',
        },
      ],
```
### demo
http://jsrun.net/jY2Kp


## file-upload.vue  上传组件封装
### 特性
  - 增加上传列表，显示速度、百分比。
  - 增加文件格式、文件大小判断。
### 示例
  配置参数
  | 参数          | 说明                           | 类型   | 是否必填 | 可选值 | 默认值 |
  | ------------- | ------------------------------ | ------ | -------- | ------ | ------ |
  | fileSizeLimit | 文件上传大小限制（以MB为单位） | Number | no       |        | 10     |
  其他参数参照el-upload，
### demo
http://jsrun.net/SY2Kp

## text-img.vue 
### 特性
  - 随机生成颜色
  - 过滤非汉字
### 介绍
  生成4字图片，
### demo
http://jsrun.net/kw2Kp

## scroll-card.vue
### 无缝滚动卡片

## virtural-scroll.vue
### 虚拟滚动

## back-top.vue 回到顶层

## chart.vue echarts组件封装