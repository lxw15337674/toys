// typeof 只能判断基本类型 string,number,boolean, undefined,object
// null 会被判断成 object
// 比较全面的是使用 Object.prototype.toString 方法，只需要对返回值进行字符串分割即可
const typeCheck = (obj) => {
    return Object.prototype.toString.call(obj).replace(/^.{8}(.+)]$/, (m, $1) => $1.toLowerCase());
};

console.log(typeCheck("str"));
console.log(typeCheck(1));
console.log(typeCheck(() => null));
console.log(typeCheck({ a: 1 }));
console.log(typeCheck([1, 2, 3]));
console.log(typeCheck(new Set([1, 2, 3])));