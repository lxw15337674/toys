<!--
     /**
      * 组件名称
      * @desc 组件描述
      * @author lixiwang-15315
      * @date 2019/3/19 15:37
      * @param  参数说明 key{Number}
      * @example 调用示例
          <animated-integer :value="value"></animated-integer>
      *
      */
    -->
<template>
  <div>
    <span>{{ tweeningValue }}</span>
  </div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js';

export default {
  name: 'AnimatedInteger',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tweeningValue: 0,
    };
  },
  watch: {
    value(newValue, oldValue) {
      this.tween(oldValue, newValue);
    },
  },
  mounted() {
    this.tween(0, this.value);
  },
  methods: {
    tween: function(oldValue, newValue) {
      new TWEEN.Tween({
        number: oldValue,
      })
        .to(
          {
            number: newValue,
          },
          1000,
        )
        .onUpdate((tween) => {
          this.tweeningValue = tween.number.toFixed(0);
        })
        .start();

      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      animate();
    },
  },
};
</script>
