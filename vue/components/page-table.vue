<!--
     /**
      * @name 带分页的表格
      * @author lxw-15315
      * @date 2020/3/25
      * @desc
      * @param:param[Object]:通过v-model传递，参数对象, tableData[Array]表格数据。tableCols[Array]表格列属性，total[number]总页数
      */
       -->

<template>
  <div>
    <el-table
      tooltip-effect="dark"
      stripe
      border
      :data="tableData"
      style="width: 100%"
      v-on="$listeners"
      v-bind="$attrs"
    >
      <el-table-column label="序号" width="80">
        <template
          slot-scope="scope"
        >{{ scope.$index + (internalParams.page - 1) * internalParams.pageSize + 1 }}</template>
      </el-table-column>
      <el-table-column
        v-for="col in tableCols"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :key="col.prop"
        show-overflow-tooltip
      ></el-table-column>
      <slot></slot>
    </el-table>
    <el-pagination
      class="pagination"
      align="right"
      :current-page="internalParams.page"
      :page-sizes="[5, 10, 20]"
      :page-size="internalParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  model: {
    prop: "params",
    event: "changeValue"
  },
  props: {
    params: {
      required: true,
      type: Object
    },
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tableCols: {
      type: Array,
      default: function() {
        return [];
      }
    },
    total: {
      type: Number
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
  watch: {
    internalParams: {
      deep: true,
      handler(val, oldVal) {
        if (val.page === oldVal.page && val.page !== 1) {
          this.internalParams = { ...this.internalParams, page: 1 };
        }
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.internalParams = { ...this.internalParams, pageSize: val };
    },
    handleCurrentChange(val) {
      this.internalParams = { ...this.internalParams, page: val };
    }
  }
};
</script>
<style lang="stylus" scoped>
.pagination {
  margin-top: 20px;
}
</style>
