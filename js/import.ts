type environment = 'production' | 'development';

/**
 * 不同环境下执行不同的导入方式，用于vue-router组件导入。
 * - 在生产环境中才使用懒加载，加快首屏开启速度。
 - 在开发环境不使用懒加载，加快编译速度。
 *
 * @param env { environment} 编译环境
 * @return {function} 导入函数
 */
export function _import(env: environment = 'production'): Function {
    switch (env) {
        case 'development':
            return (file) => require('@/views/' + file + '.vue').default;
        default:
            return (file) => () => import('@/views/' + file + '.vue');
    }
}

export function importMixins(context): Array<Object> {
    return context.keys().reduce((modules, moduleName) => {
        modules.push(context(moduleName).default || context(moduleName));
        return modules;
    }, []);
}

export function importComponents(context): Object {
    const modules = {};
    context.keys().forEach((fileName) => {
        const name = fileName
            .split('/')
            .pop()
            .replace(/\.\w+$/, '');
        modules[name] = context(fileName).default || context(fileName);
    });
    return modules;
}
