import tip from './tip.js';
export default {
  install(Vue, options = {}) {
    const name = options.directiveName || 'tip';
    const theme = options.theme || 'dark';
    Vue.directive(name, {
      inserted(el, binding, vnode, oldVnode) {
        let props = { content: binding.value, theme: theme };
        if (!Vue.prototype.$tip) {
          let Tip = tip({ ...props });
          document.body.appendChild(Tip.$el);
          Vue.prototype.$tip = Tip;
        }
        let timer;
        let isFocus = false;

        function debounce(func, wait = 500) {
          return function(...args) {
            if (!isFocus) {
              clearTimeout(timer);
              timer = setTimeout(() => {
                func(...args);
                isFocus = true;
              }, wait);
            }
          };
        }

        el.addEventListener(
          'mousemove',
          debounce((event) => {
            let Tip = Vue.prototype.$tip;
            Tip.content = binding.value;
            Tip.visible = true;
            Tip.position = {
              left: event.pageX,
              top: event.pageY,
            };
          }),
        );
        el.addEventListener('mouseleave', () => {
          Vue.prototype.$tip.visible = false;
          isFocus = false;
          clearTimeout(timer);
        });
      },
    });
  },
};
