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
      :class="{ 'rank-active': internalParams.orderBy === order.value }"
      @click="rankChange(order.value)"
    >
      {{ order.label }}
      <template v-if="internalParams.orderBy === order.value">
        <template v-if="internalParams.dir === 'desc'">
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
  computed: {
    internalParams: {
      get() {
        return { ...this.params };
      },
      set(val) {
        this.$emit("changeValue", val);
      }
    }
  },
  methods: {
    rankChange(val) {
      if (this.internalParams.orderBy === val) {
        this.internalParams.dir =
          this.internalParams.dir === "desc" ? "asc" : "desc";
      } else {
        this.internalParams.dir = "desc";
      }
      this.internalParams.orderBy = val;
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
