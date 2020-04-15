<!--
     /**
      * @name 带分页的表格
      * @author lxw-15315
      * @date 2020/3/25
      * @desc
      * @Params:{param}通过v-model传递，参数对象, {tableData}表格数据。{tableCols}表格列属性，total{}总页数
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
        <template slot-scope="scope">{{ scope.$index + (params.page - 1) * params.pageSize + 1 }}</template>
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
      class="mt20 pagination"
      align="right"
      :current-page="params.page"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "app",
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
    total: {}
  },
  data() {
    return {};
  },
  computed: {
    //如果超出最大页数，会回到最后一页
    maxPage() {
      let maxPage = Math.ceil(this.total / this.params.pageSize);
      if (maxPage < 1) {
        maxPage = 1;
      }
      return maxPage;
    }
  },
  watch: {
    params: {
      deep: true,
      handler(val) {
        this.$emit("changeValue", val);
      }
    },
    maxPage(val) {
      if (this.params.page > val) {
        this.params.page = val;
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.params.pageSize = val;
    },
    handleCurrentChange(val) {
      this.params.page = val;
    }
  }
};
</script>
<style lang="stylus" scoped></style>
