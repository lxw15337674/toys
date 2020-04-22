# 表单校验
## 用途
利用async-validator的表单校验，解决分页表单的校验
## 参数说明
参数 | 说明 | 类型 | 是否必填 | 可选值 | 默认值
---|---|---|---|---|---
data | 校验数据 | Array | yes |  | 
rules |  校验规则 | object | yes |  | 
resolve | 校验成功调用 | function | yes |  | 
reject | 校验失败调用 | function | yes |  | 