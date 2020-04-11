/*
 * @Date: 2020-04-11 17:49:25
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-11 17:49:25
 */
// 处理数据，当大于千万，加单位
function dealTargetNum(num) {
    if (num) {
        let str = num.toString().split('.')[0];
        if (str.length >= 17) {
            return (
                str.slice(0, str.length - 16) + '.' + str.slice(str.length - 16, str.length - 15) + '亿亿'
            );
        } else if (str.length >= 13) {
            // >=1万亿
            return (
                str.slice(0, str.length - 12) + '.' + str.slice(str.length - 12, str.length - 11) + '万亿'
            );
        } else if (str.length >= 9) {
            // >=1亿
            return str.slice(0, str.length - 8) + '.' + str.slice(str.length - 8, str.length - 7) + '亿';
        } else if (str.length >= 6) {
            // >=10万
            return str.slice(0, str.length - 4) + '万';
        } else {
            return str;
        }
    }
}