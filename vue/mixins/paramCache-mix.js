/**
 *
 * @author lixiwang l15315
 * @date 2020/1/7
 */
export default {
  data() {
    return {
      _cachePages: [],
      _cacheParams: {},
    };
  },
  beforeRouteLeave(to, from, next) {
    if (!this._cachePages) {
      console.error('未配置跳转缓存的页面，请检查');
      next();
    }
    if (!this._cacheParams) {
      console.error('未配置缓存参数，请检查');
      next();
    }
    if (this._cachePages.indexOf(to.name) !== -1) {
      sessionStorage.setItem(
        from.name,
        JSON.stringify({
          _cachePages: this._cachePages,
          _cacheParams: this._cacheParams,
        }),
      );
    }
    next();
  },
  beforeRouteEnter(to, from, next) {
    let cache = JSON.parse(sessionStorage.getItem(to.name));
    if (cache) {
      let _cachePages = cache._cachePages;
      if (_cachePages && _cachePages.indexOf(from.name) === -1) {
        sessionStorage.removeItem(to.name);
      }
    }
    next();
  },
  created() {
    let params = JSON.parse(sessionStorage.getItem(this.$route.name));
    if (params) {
      Object.assign(this, params._cacheParams);
      sessionStorage.removeItem(this.$route.name);
    }
  },
  methods: {
    setCache(pages, params) {
      this._cachePages = pages;
      this._cacheParams = params;
    },
  },
};
