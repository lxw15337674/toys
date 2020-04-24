<template>
  <el-breadcrumb
    separator="/"
    class="app-breadcrumb"
    :class="havePadding ? 'padding' : ''"
  >
    <span
      class="fl back iconfont icon-ai207"
      style="padding-right: 10px;font-weight: bolder"
      @click="back"
      >&nbsp;返回上一级
      <span style="padding-right: 5px;padding-left: 5px;">|</span>
    </span>
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="index">
      <a style="color: #6B7D99;" @click.prevent="handleLink(item)">{{
        item.label
      }}</a>
    </el-breadcrumb-item>
    <!--    //去尾，因为要考虑到动态路由的情况，所以最后一次直接通过route.name获取-->
    <el-breadcrumb-item :key="$route.name">
      <slot name="prefix"></slot>
      <span style="color:#47A2FF">{{ $route.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import matchRouteName from 'src/util/matchRouteName';

export default {
  name: 'Breadcrumb',
  props: {
    havePadding: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showBreadcrumb: true,
    };
  },
  computed: {
    levelList() {
      let result = [];
      //这里不能用route.matched进行切分了，因为路由规则不同，只能通过切分路径来进行分层。
      // //处理第一次加载时，path为'/'的情况
      // if (this.$route.path === '/') {
      //   return [];
      // }
      //掐头去尾，要单独处理
      this.$route.path
        .split('/')
        .slice(1, -1)
        .map((name) => {
          let route = matchRouteName(this.$router.options.routes, name);
          //还要去掉重定向的路由
          if (route && !route.redirect) {
            result.push(route);
          }
        });
      return result;
    },
  },
  methods: {
    back() {
      this.$router.history.go(-1);
    },
    handleLink(route) {
      // if (route.redirect) {
      //   this.$router.push(route.redirect);
      //   return;
      // }
      this.$router.push({ name: route.pathName });
    },
  },
};
</script>

<style scoped>
.app-breadcrumb {
  font-size: 16px;
  line-height: 20px;
}

.padding {
  padding: 15px 0px;
}

.back {
  cursor: pointer;
  color: #6b7d99;
}

.back:hover {
  font-weight: bolder;
  color: #42a4f5;
}

/*.app-breadcrumb.el-breadcrumb {*/
/*  display: inline-block;*/
/*  font-size: 14px;*/
/*  line-height: 50px;*/
/*  margin-left: 8px;*/
/*}*/

/*.no-redirect {*/
/*  color: #97a8be;*/
/*  cursor: text;*/
/*}*/
</style>
