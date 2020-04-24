<!--用于刷新当前路由-->
<script>
export default {
  name: 'RedirectVue',
  beforeCreate() {
    const { params, query } = this.$route;
    const { routeName } = params;
    this.$router.replace({ name: routeName, params: query });
  },
  render: function(h) {
    return h();
  },
};
</script>

<style scoped></style>
