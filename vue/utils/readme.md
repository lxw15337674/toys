# 工具方法
## batch-import.js 批量导入
### 特性
- 利用webpack的require.context
### 用途
导入某个文件夹下全部文件或组件

##  formReset.js 清空对话框表单数据
### 特性
- 利用$options还原表单初始化数据，清空表单校验提示
### 参数说明
参数 | 说明 | 类型 | 是否必填 | 可选值 | 默认值
---|---|---|---|---|---
formRef | 表单ref | Array、String | yes |  | 
### 限制
-  只能用于单独的el-form组件，因为会清空所有data数据（待后期完善）
### 用法
- 绑定在el-dialog的@closed方法

## axios axios二次封装


