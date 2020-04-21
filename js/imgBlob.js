
/**
 * @description: 创建canvas元素，渲染远程图片，一般用于上传图片后显示、图片上传服务器
 * @param {string} url 图片地址 
 * @return: 返回元素
 */

export default function imgBlob(imgUrl) {
    let c = document.createElement('canvas');
    this.imageUrl = imgUrl;
    let img = new Image();
    img.src = imgUrl;
    img.onload = function () {
        c.width = img.width;
        c.height = img.height;
        let ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        // c.toBlob((blob) => {
        //     let formData = new FormData();
        //     formData.append('file', blob, 'test.jpg');
        // }, 'image/jpeg');
    };
    return c
}