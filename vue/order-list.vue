<!--
/ @author lixiwang l15315
* @date 2019/11/29
* @description 排序筛选 
       -->
<template>
  <div class="order-list">
    <el-button
      v-for="order in orderList"
      :key="order.value"
      :class="{ 'rank-active': params.orderBy === order.value }"
      @click="rankChange(order.value)"
    >
      {{ order.label }}
      <template v-if="params.orderBy === order.value">
        <template v-if="params.dir === 'desc'">
          <i class="iconfont icon-paixu-jiangxu"></i>
        </template>
        <template v-else>
          <i class="iconfont icon-paixu-shengxu"></i>
        </template>
      </template>
    </el-button>
  </div>
</template>

<script>
export default {
  name: "OrderList",
  model: {
    prop: "params",
    event: "changeValue"
  },
  props: {
    params: {
      required: true,
      type: Object
    },
    orderList: {
      required: true,
      type: Array
    }
  },
  methods: {
    rankChange(val) {
      if (this.params.orderBy === val) {
        this.params.dir = this.params.dir === "desc" ? "asc" : "desc";
      } else {
        this.params.dir = "desc";
      }
      this.params.orderBy = val;
      this.$emit("changeValue");
    }
  }
};
</script>

<style scoped lang="stylus">
.order-list {
  padding-left: 10px;

  .el-button {
    padding: 5px 10px;
    background: transparent;
    text-align: left;
  }

  .iconfont {
    font-size: 15px;
  }

  .rank-active {
    color: deepBlueColor;
    border-color: deepBlueColor;
    padding: 4px 8px;
  }
}
</style>
