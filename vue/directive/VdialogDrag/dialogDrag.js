/*
 * @Date: 2020-02-19 14:36:35
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-19 23:28:19
 */
export default {
    install(Vue, options = {}) {
        const name = options.directiveName || 'drag';

        Vue.directive(name, {
            inserted(el, binding, vnode, oldVnode) {
                const header = el.querySelector('.el-dialog__header');
                const dialog = el.querySelector('.el-dialog');

                let fullScreen = function () {
                    // 双击全屏
                    let currentStyle = {
                        height: '100VH',
                        width: '100VW',
                        marginTop: '0',
                        marginLeft: '0',
                        resize: 'none',
                    };
                    header.ondblclick = (e) => {
                        for (let item in currentStyle) {
                            [currentStyle[item], dialog.style[item]] = [
                                dialog.style[item],
                                currentStyle[item],
                            ];
                        }
                    };
                };

                let zoom = function () {
                    // 放大
                    //设置最小宽度
                    let zoomStyle = {
                        minWidth: '20vw',
                        minHeight: '20vh',
                        resize: 'both',
                        overflow: 'auto',
                    };
                    for (let [key, value] of Object.entries(zoomStyle)) {
                        dialog.style[key] = value;
                    }
                };

                let drag = function () {
                    // 拖拽
                    header.style.cursor = 'move';
                    header.draggable = true;
                    el.ondragenter = (event) => {
                        event.preventDefault();
                    };
                    el.ondragover = (event) => {
                        event.preventDefault();
                    };
                    //el-dialog默认margin-bottom：50px
                    dialog.style.marginBottom = '0';
                    let disY, disX, maxX, maxY;
                    header.addEventListener('dragstart', (event) => {
                        disX = event.clientX - dialog.offsetLeft;
                        disY = event.clientY - dialog.offsetTop;
                        event.dataTransfer.setDragImage(dialog, disX, disY);
                    });
                    header.addEventListener('dragend', function (event) {
                        let x = event.clientX - disX;
                        let y = event.clientY - disY;
                        maxX = window.innerWidth - dialog.scrollWidth;
                        maxY = window.innerHeight - dialog.scrollHeight;
                        x = x > maxX ? maxX : x;
                        x = x > 0 ? x : 0;
                        y = y > maxY ? maxY : y;
                        y = y > 0 ? y : 0;
                        dialog.style.marginLeft = `${x}px`;
                        dialog.style.marginTop = `${y}px`;
                    });
                };
                if (options.fullscreen || true) {
                    fullScreen()
                }
                if (options.zoom || true) {
                    zoom()
                }
                if (options.drag || true) {
                    drag()
                }
            },
        });
    },
};
