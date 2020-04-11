/*
 * @Date: 2020-04-11 16:47:23
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-11 17:19:18
 */
/**
* 用于分页数据的后台校验
* @author lixiwang l15315
* @date 2019/8/22
* @params data[array]:校验数据，rules[object]：规则校验，resolve[function]：校验成功调用，reject[function]：校验失败调用
* @returns reject(index,errors)，index:校验失败位置,errors:错误详细信息
* @todo 利用web worker重写，优化校验性能。
*/
import schema from 'async-validator';

export default {
    methods: {
        async formCheck(data, rules, resolve, reject) {
            //后台数据校验
            let validator = new schema(rules);
            for (let i = 0; i < data.length; i++) {
                await validator.validate(data[i], (errors) => {
                    if (errors) {
                        reject(i, errors);
                    }
                });
            }
            resolve();
        },
    },
};
