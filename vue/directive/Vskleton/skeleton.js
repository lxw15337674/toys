export default {
  install(Vue, options = { directiveName="skeleton" }) {
    Vue.directive(options.directiveName, {
      inserted(el, binding, vnode, oldVnode) {
        el.style.backgroundColor = '#f2f3f5';
        let img = new Image();
        img.src = binding.value;
        img.onload = function () {
          el.style.backgroundImage = `url(${binding.value})`;
          el.style.backgroundColor = '';
        };
      },
    });
  },
};
