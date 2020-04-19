<!--
     /**
      * 组件名称
      * @desc 组件描述
      * @author lixiwang-15315
      * @date 2019/11/8
      * @param title:标题
      * @param v-model:用于自适应，获取菜单隐藏状态
      * @param data:菜单列表,对象属性参照下面
        myRoute: [
          {name: 'share',
          label: '共享概览'},
          {name: 'report',
          label: '填报概览'},
          {name: 'demand',
          label: '需求概览'}
         ]
-->

<template>
  <el-card v-show="menuShow" class="menu">
    <div class="f18 mb25">{{ title }}</div>
    <div
      v-for="(item, index) in data"
      :key="index"
      class="item cp"
      :class="{ 'is-active': activeName === item.name }"
      @click="handleClick(item.name)"
    >
      <div class="tail dib"></div>
      <div class="node"></div>
      <div class="content ml20 f17">{{ item.label }}</div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "PositionNavigation",
  model: {
    prop: "menuShow",
    event: "handleIsShow"
  },
  props: {
    data: {
      required: true,
      default: []
    },
    menuShow: {
      default: true
    },
    title: {
      default: ""
    }
  },
  data() {
    return {
      activeName: this.data[0].name
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleIsShow);
    this.handleIsShow();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleIsShow() {
      this.$emit("handleIsShow", window.innerWidth > 1345);
    },
    handleClick(name) {
      document.getElementById(name).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    },
    handleScroll() {
      for (let item of this.data) {
        let div = document.getElementById(item.name);
        let itemOffset = div.getBoundingClientRect().top + div.offsetHeight;
        if (itemOffset > 0) {
          this.activeName = item.name;
          break;
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.menu {
  width: 145px;
  box-sizing: border-box;

  .is-active.item {
    .content-container {
      background: #f3f9ff;
    }

    .node {
      background: deepBlueColor;
    }

    .content {
      color: deepBlueColor;
    }
  }

  .item {
    position: relative;

    &:hover {
      .content-container {
        background: #f3f9ff;
      }

      .content {
        color: deepBlueColor;
      }
    }

    .node {
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #c7d5f2;
      margin-right: 5px;
      z-index: 2;
    }

    .content {
      padding-bottom: 40px;
    }

    .tail {
      position: absolute;
      left: 5px;
      top: 12px;
      height: 100%;
      border-left: 2px dotted #c7d5f2;
    }
  }

  .item:last-child {
    .tail {
      display: none;
    }

    .content {
      padding-bottom: 20px;
    }
  }
}
</style>
