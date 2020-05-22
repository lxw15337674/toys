# 对话框增强

## 介绍

实现 el-dialog 可拖动、双击全屏、放大缩小

### 特性

- 利用 h5 的 draggable 属性实现拖拽
- 利用 css3 的 resize 属性实现缩放

## 用法

```
    Vue.use(dialogDrag,{directiveName:'drag'})
```

## 参数说明

| 参数          | 说明           | 类型    | 是否必填 | 可选值 | 默认值 |
| ------------- | -------------- | ------- | -------- | ------ | ------ |
| directiveName | 指令名         | String  | no       |        | drag   |
| fullscreen    | 是否可双击全屏 | Boolean | no       |        | yes    |
| zoom          | 是否可缩放     | Boolean | no       |        | yes    |
| drag          | 是否可拖拽     | Boolean | no       |        | yes    |

### demo

http://jsrun.net/mMfKp
