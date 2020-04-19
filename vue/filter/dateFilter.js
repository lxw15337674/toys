/**
 * 用于处理后端未转换的时间数据（例如：2019-02-15T08:44:15.000+0000）
 * @author lxw-15315
 * @date 2019/2/27
 * @param date{string,Date} 需要处理的时间数据
 * @param fmt{string} 需要返回的时间格式，默认为年月日，年月日:'yyyy-MM-dd'，年月日时分秒:'yyyy-MM-dd hh:mm:ss'，
 * @param errorMessage{string} 如果数据为空，返回的数据，默认为'无'
 * @return fmt{string}
 * @example
 * 返回年月日时分秒：date2|formatDate('yyyy-MM-dd hh:mm:ss')
 * 返回年月日：date3|formatDate
 */
export function formatDate(date, fmt = 'yyyy-MM-dd', errorMessage = '无') {
    if (date === null || date === undefined) {
        // 无数据时返回'无'
        return errorMessage;
    }
    if (typeof date === 'string') {
        date = new Date(date);
    }
    if (/(y+)/.test(fmt)) {
        // 年份
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getUTCMinutes(),
        's+': date.getUTCSeconds(),
    };

    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';

            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : _pageLeftZero(str));
        }
    }
    return fmt;
}

function _pageLeftZero(str) {
    return ('00' + str).substr(str.length);
}
