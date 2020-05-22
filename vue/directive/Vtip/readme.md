# 消息提示

## 特性

- 支持 dark/light 主题

## 用法

```
    Vue.use(Vtip,{directiveName:'tip',theme:'dark'})
```

## 参数说明

| 参数          | 说明       | 类型   | 是否必填 | 可选值     | 默认值 |
| ------------- | ---------- | ------ | -------- | ---------- | ------ |
| directiveName | 指令名     | String | no       |            | tip    |
| theme         | 提示框主题 | Object | no       | dark,light | dark   |

## demo

```
    <div v-tip='李希望'>lixiwang</div>
```
