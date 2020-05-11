<template>
  <canvas :id="randomColor" class="text-img" width="90px" height="90px">
    浏览器不支持canvas标签
  </canvas>
</template>

<script>
export default {
  name: 'TextImg',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    randomColor() {
      return `#${Math.random()
        .toString(16)
        .slice(-6)}`;
    },
    //筛选出来汉字
    chineseText() {
      let text = '';
      let reg = /^[\u4E00-\u9FA5]+$/;
      for (let char of this.text) {
        if (reg.test(char)) {
          text += char;
        }
      }
      return text;
    },
  },
  watch: {
    text() {
      this.drawText();
    },
  },
  mounted() {
    this.drawText();
  },
  methods: {
    drawText() {
      let canvas = document.getElementById(this.randomColor);
      let context = canvas.getContext('2d');
      canvas.style.letterSpacing = '3px';
      context.fillStyle = this.randomColor;
      context.fillRect(0, 0, 90, 90);
      context.textBaseline = 'middle';
      context.fillStyle = 'white';
      context.font = '26px bold 微软雅黑';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(this.chineseText.slice(0, 2), 48, 28);
      context.fillText(this.chineseText.slice(2, 4), 48, 62);
    },
  },
};
</script>

<style lang="stylus" scoped>
.text-img {
  border-radius 5px
}
</style>
