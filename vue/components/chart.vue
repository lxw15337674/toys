<template>
  <div class="chart" :class="className" :style="{ height: height, width: width }"></div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chart: null
    };
  },
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    optionsData: {
      default: () => {
        return {};
      }
    },
    seriesData: {
      type: [Object,Array]
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.setOptions();
      }
    }
  },
  computed: {
    options() {
      return {...this.optionsData, series: this.seriesData };
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
    },
    setOptions() {
      this.chart.setOption(this.options);
    }
  },
  mounted() {
    this.initChart();
    this.setOptions();
    let vue = this
    let debounce = function(func, wait = 50) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          //将实际的this和参数传入用户实际调用的函数
          func.apply(vue, args);
        }, wait);
      };
    };
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 500);
    window.addEventListener("resize", this.__resizeHanlder);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.__resizeHanlder);
    this.chart.dispose();
  }
};
</script>

<style lang="stylus" scoped>

</style>
