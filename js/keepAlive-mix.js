/**
 * 缓存组件，通过keepalive的include属性
 * 参考 https://segmentfault.com/a/1190000015630901
 * 根据当前路由的缓存页面数组（meta.cachePages）判断是否缓存，如果跳转对应页面，则缓存该页面组件，如果不是则清空缓存。
 * 注意：
 * 1.include只能缓存根组件，不能缓存子组件。因为刷新根组件，子组件就会重新刷新。
 * 2.使用该mix需要配置cachePages
 * @author lixiwang l15315
 * @date 2019/8/21
 */

export default {
  //缓存页面组件
  created() {
    this.$store.commit('keepAlive/addInclude', this.$options.name);
  },
  beforeRouteLeave(to, from, next) {
    if (!this.$route.meta.cachePages) {
      console.error('未配置meta.cachePages，无法缓存该页面组件，请检查');
    }
    //如果跳转的不是后退页面，则删除页面组件缓存
    if (this.$route.meta.cachePages.indexOf(to.name) === -1) {
      this.$store.commit('keepAlive/deleteInclude', this.$options.name);
    }
    next();
  },
};
