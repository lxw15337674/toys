<!--
 * @Date: 2020-04-11 15:45:25
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-11 16:45:30
 -->

# vue组件
## orderList.vue 排序组件
### 例子
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

### 例子
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

### page-table 带分页的表格
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

### filter-form.vue 筛选条件组件
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