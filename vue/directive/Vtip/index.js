import Tip from './tip.js';
export default {
  install(Vue, options = {}) {
    const name = options.directiveName || 'tip';
    const theme = options.theme || 'dark';
    let tip = null;
    Vue.directive(name, {
      inserted(el, binding, vnode, oldVnode) {
        let props = { content: binding.value, theme: theme };
        if (!tip) {
          tip = Tip({ ...props });
          document.body.appendChild(tip.$el);
        }
        let timer;
        let isFocus = false;

        function debounce(func, wait = 500) {
          return function (...args) {
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
            tip.content = binding.value;
            tip.visible = true;
            tip.position = {
              left: event.pageX,
              top: event.pageY,
            };
          }),
        );
        el.addEventListener('mouseleave', () => {
          tip.visible = false;
          isFocus = false;
          clearTimeout(timer);
        });
      },
      unbind(el) {
        if (tip) {
          document.body.removeChild(tip.$el);
          tip = null;
        }
      },
    });
  },
};
