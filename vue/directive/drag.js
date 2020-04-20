/*
 * @Date: 2020-02-19 14:36:35
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-19 23:28:19
 */
import Vue from 'vue';
Vue.directive('dialogDrag', {
    inserted(el, binding, vnode, oldVnode) {
        const header = el.querySelector('.el-dialog__header');
        const dialog = el.querySelector('.el-dialog');
        let currentStyle = {
            height: '100VH',
            width: '100VW',
            marginTop: '0',
            marginLeft: '0',
            resize: 'none',
        };
        // 双击最大
        header.ondblclick = (e) => {
            for (let item in currentStyle) {
                [currentStyle[item], dialog.style[item]] = [dialog.style[item], currentStyle[item]];
            }
        };
        // 放大
        dialog.style.resize = 'both';
        dialog.style.overflow = 'auto';
        // 拖拽
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
            x = x < 0 ? 0 : x;
            x = x > maxX ? maxX : x;
            y = y < 0 ? 0 : y;
            y = y > maxY ? maxY : y;
            dialog.style.marginLeft = `${x}px`;
            dialog.style.marginTop = `${y}px`;
        });
    },
});
