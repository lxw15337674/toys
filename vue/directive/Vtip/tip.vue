<template>
  <transition name="v-tip-fade">
    <div
      id="_tip"
      class="tip"
      :class="theme"
      :style="tipStyle"
      v-show="visible"
    >
      {{ content }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "tip",
  mounted() {},
  computed: {
    tipStyle() {
      let x = this.position.left + 10;
      let y = this.position.top + 15;
      return { left: `${x}px`, top: `${y}px` };
    },
  },
  data() {
    return {};
  },

  props: {
    theme: {
      type: String,
      default: "light",
      validator: function (value) {
        return ["dark", "light"].indexOf(value) !== -1;
      },
    },
    content: {
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    // 相对元素的位置
    position: {
      type: Object,
      default: () => {
        return {
          left: 0,
          top: 0,
        };
      },
    },
  },
};
</script>

<style scoped>
.tip {
  box-sizing: border-box;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 999;
  border-radius: 4px;
  padding: 7px 10px;
  font-size: 12px;
  line-height: 1.2;
  min-width: 10px;
  word-wrap: break-word;
}
.dark {
  background: #303133;
  color: #fff;
}
.light {
  color: #303133;
  background: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  border: 1px solid #d9d9d9;
}

.v-tip-fade-enter-active,
.v-tip-fade-leave-active {
  transition: opacity 0.3s;
}
.v-tip-fade-enter,
.v-tip-fade-leave-to {
  opacity: 0;
}
</style>
