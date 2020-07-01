# 事件触发防抖

## 介绍

对事件（例如 input、change、click）触发进行防抖。

## 特性

- 可以链式调用事件

## 用法

```
    Vue.use(Vdebounce,{directiveName:'debounce'})
```

## 参数说明

| 参数          | 说明   | 类型   | 是否必填 | 可选值 | 默认值   |
| ------------- | ------ | ------ | -------- | ------ | -------- |
| directiveName | 指令名 | String | no       |        | debounce |

## 传递参数
| 参数          | 说明   | 类型   | 是否必填 | 可选值 | 默认值   |
| ------------- | ------ | ------ | -------- | ------ | -------- |
| event | 事件名 | String | true       |        |  |
| handler | 调用函数 | function | true       |        |  |
| wait | 间隔事件 | number | no       |        | 500 |
## demo

```HTML
    <el-input  v-debounce="{ event: 'scroll', handler: handleScroll, wait: 100 }">
    </el-input>
```
