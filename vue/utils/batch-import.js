/**
 * @ClassName 
 * @Description : 引入全局组件
 * @Params :
 * @Return : 
 * @Author : l15315 李希望
 * @Date : 2020/4/16 16:01
*/
const requireGlobalComponent = require.context('./global-components', false, /\.vue$/);
requireGlobalComponent.keys().forEach((fileName) => {
    const componentConfig = requireGlobalComponent(fileName);
    const componentName = `g-${fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')}`;
    Vue.component(componentName, componentConfig.default);
});