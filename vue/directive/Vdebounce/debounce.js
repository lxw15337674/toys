export default {
  install(Vue, options = { directiveName='debounce' }) {
    Vue.directive(options.directiveName, {
      inserted(el, binding, vnode, oldVnode) {
        function debounce(func, wait = 1000) {
          let timer;
          return function (...args) {
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
