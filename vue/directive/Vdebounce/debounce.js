export default {
  install(Vue, options = {}) {
    const name = options.directiveName || 'debounce';
    Vue.directive(name, {
      inserted(el, binding, vnode, oldVnode) {
        function debounce(func, wait = 1000) {
          let timer;
          return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
              func();
            }, wait);
          };
        }

        el.addEventListener(binding.arg, debounce(binding.value));
      },
    });
  },
};
