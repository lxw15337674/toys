<template>
  <div class="scroll-card" ref="scrollCard" :style="cardStyle">
    <div class="scroll" ref="scroll">
      <slot></slot>
      <div class="faker-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "scrollCard",
  props: {
    visibleHeight: {
      type: [String, Number],
      default: 180
    },
    waitTime: {
      type: [String, Number],
      default: 0
    },
    step: {
      type: Number,
      default: 18
    },
    hoverStop: {
      type: Boolean,
      default: true
    },
    //TODO
    scrollDirection: {
      type: Number,
      default: 0
    }
  },
  computed: {
    cardStyle() {
      return `height:${this.visibleHeight}px`;
    }
  },
  data() {
    return {
      isHover: false,
      scrollTop: 0,
      scrollLeft: 0
    };
  },
  mounted() {
    this.startScroll();
    this.hoverStopHandle();
  },
  methods: {
    hoverStopHandle() {
      if (this.hoverStop) {
        this.$el.addEventListener("mouseenter", () => {
          this.isHover = true;
        });
        this.$el.addEventListener("mouseleave", () => {
          this.isHover = false;
        });
      }
    },
    startScroll() {
      let currentStep = 0;
      let scrollTop = 0;
      let scrollLeft = 0;
      let vue = this;
      function move() {
        if (!vue.isHover && vue.$refs.scroll) {
          if (scrollTop >= vue.$refs.scroll.offsetHeight / 2) {
            scrollTop = 0;
          }
          scrollTop++;
          vue.$refs.scroll.style.transform = `translate(${scrollLeft}px,${scrollTop}px)`;
        }
      }
      function step() {
        if (!vue.isHover) {
          if (currentStep >= vue.step) {
            currentStep = 0;
            if (vue.waitTime) {
              setTimeout(step, vue.waitTime);
              return;
            }
          }
          currentStep++;
          move();
        }
        window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }
  }
};
</script>

<style lang="stylus" scoped>
.scroll-card {
  overflow: hidden;
}
</style>
