/**
 * 用于处理对象数据为null情况下的显示问题
 * @author lxw-15315
 * @date 2019/7/06
 * @param value{string,Date} 需要处理的数据
 * @param text{string} 如果数据为空，返回的数据，默认为'无'
 * @param 处理多层属性情况,按层级返回属性数组，例如显示a.b.c, property=[b,c]
 */
export function dataFilter(obj, property = [], text = '无') {
    if (value) {
        let value = value;
        for (let item of property) {
            if (value[item]) {
                value = value[item];
            } else {
                return text;
            }
        }
        return value;
    }
    return text;
}

// export function dataFilter(value, text = '无') {
//     return value || text;
//   }
