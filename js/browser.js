/**
 * 判断浏览器类型
 * @author lxw-15315
 * @date 2018/9/28
 */
var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
var browser = '';

// 判断是否Opera浏览器
if (userAgent.indexOf('Opera') > -1) {
    browser = 'Opera';
} else if (userAgent.indexOf('Firefox') > -1) {
    browser = 'FF';
} // 判断是否Firefox浏览器
else if (userAgent.indexOf('Chrome') > -1) {
    browser = 'Chrome';
} // 谷歌浏览器
else if (userAgent.indexOf('Safari') > -1) {
    browser = 'Safari';
} // 判断是否Safari浏览器
else if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    browser = 'IE';
} // 判断是否IE浏览器

export default browser;
