<!--
     /**
      * @name 筛选条件组件
      * @author lj-16076、lxw-15315
      * @date 2020/3/25
      * @desc
      * @param:
          params[Object] 通过v-model传递,参数对象,
          filterArray[Array]:
          筛选条件列表,共分为三种类型，通过type区分,分别为input输入框、select选择框、date日期选择器,配置例子如下
             filterArray: [
              { type: 'input',
              label: '用户名',
               field: 'userId' },
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
      */
 -->

<template>
  <transition name="el-zoom-in-top">
    <el-form
      v-if="filterArray.length > 0"
      :inline="true"
      :model="internalParams"
      class="form-inline"
      size="mini"
      @submit.native.prevent
    >
      <el-form-item
        v-for="(item, index) in filterArray"
        :key="index"
        :label="item.label"
        style="margin-right: 20px"
      >
        <el-input
          v-if="item.type === 'input'"
          size="small"
          v-model="internalParams[item.field]"
          :placeholder="`请输入${item.label}检索`"
          clearable
          suffix-icon="el-icon-search"
        ></el-input>
        <el-select
          v-if="item.type === 'select'"
          v-model="internalParams[item.field]"
          :placeholder="`请选择${item.label}检索`"
          filterable
          clearable
          size="small"
        >
          <el-option
            v-for="option in item.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          size="small"
          v-if="item.type === 'date'"
          v-model="internalParams[item.field]"
          type="daterange"
          align="right"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%;"
          unlink-panels
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
  </transition>
</template>
<script>
export default {
  name: 'filter-form',
  model: {
    prop: 'params',
    event: 'changeParams',
  },
  props: {
    // 组件功能配置
    filterArray: {
      required: true,
      type: Array,
      default() {
        return [];
      },
    },
    // 检索条件
    params: {
      required: true,
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      internalParams: JSON.parse(JSON.stringify(this.params)), // el-form中绑定的数据
      timeCombineStr: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
    };
  },
  watch: {
    internalParams: {
      deep: true,
      handler(val) {
        this.$emit('changeParams', val);
      },
    },
  },
  methods: {},
};
</script>

<style scoped lang="stylus"></style>
