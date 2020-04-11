<!--
 * @Date: 2020-04-11 15:45:25
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-11 16:45:30
 -->

# vue组件
## orderList.vue 排序组件
### 

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