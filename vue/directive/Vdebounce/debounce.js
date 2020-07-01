let callback;
export default {
  install(Vue, options = {}) {
    const name = options.directiveName || 'debounce';
    Vue.directive(name, {
      inserted(el, binding, vnode, oldVnode) {
        let params = binding.value;
        function debounce(func, wait = params.wait || 500) {
          let timer;
          return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
              func(...args);
            }, wait);
          };
        }
        callback = debounce(params.handler);
        el.addEventListener(params.event, callback);
      },
      unbind(el, binding) {
        el.removeEventListener(binding.value.event, callback);
      },
    });
  },
};
