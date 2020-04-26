<template>
  <div class="horizontal-list">
    <div class="arrow-content">
      <i v-show="!leftmost" class="arrow el-icon-arrow-left" @click="indexChange(-1)"></i>
    </div>
    <div class="card-content">
      <div class="card-list" :style="offset">
        <div v-for="(item, index) in data" :key="index">
          <div class="content-card" @click="itemClick(item)">
            <div class="content-container">
              <el-image :src="item.icon"></el-image>
              <div class="theme-name" :title="item.title">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="arrow-content">
      <i v-show="!rightmost" class="arrow el-icon-arrow-right" @click="indexChange(1)"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorizontalList",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    itemWidth: {
      type: Number,
      default: 160
    }
  },
  data() {
    return {
      offsetIndex: 0
    };
  },
  computed: {
    offset() {
      return {
        right: `${this.offsetIndex * this.itemWidth}px`
      };
    },
    leftmost() {
      return this.offsetIndex === 0;
    },
    rightmost() {
      if (this.data.length < 6) {
        return true;
      } else {
        return this.offsetIndex + 6 >= this.data.length;
      }
    }
  },
  methods: {
    indexChange(number) {
      this.offsetIndex += number;
    },
    itemClick(item) {
      this.$emit("itemClick", item);
    }
  }
};
</script>

<style scoped lang="stylus">
.horizontal-list {
  min-height: 225px;
  display: flex;
  align-items: center;

  .arrow-content {
    width: 120px;
    text-align: center;
    cursor: pointer;

    .arrow {
      font-size: 50px;
      color: #47a2ff;
    }
  }

  .card-content {
    width: 960px;
    overflow: hidden;

    .card-list {
      display: flex;
      align-items: center;
      margin: 0 auto;
      position: relative;
      transition: right 0.5s ease;

      .content-card {
        text-align: center;
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 160px;

        .content-container {
          cursor: pointer;

          .el-image__error, .el-image {
            width: 150px;
            height: 150px;

            &:hover {
              opacity: 0.8;
            }
          }

          .theme-name {
            margin-top: 10px;
            color: #47a2ff;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
        }
      }
    }
  }
}
</style>
