
/**
 *
 * @author lixiwang l15315
 * @date 2020/3/31
 * desc 用于清空表单
 * 只能用于el-form组件文件，因为会清空所有data数据
 */

export default function reset(formRef, ...fields) {
    //最新的Vue已经不允许这样直接对跟实例$data进行赋值
    // this.$refs[formRef].resetFields();
    Object.assign(this.$data, this.$options.data.call(this));
    if (formRef) {
        this.$nextTick(() => {
            if (typeof formRef === 'string') {
                this.$refs[formRef].clearValidate();
                this.$refs[formRef].resetFields();
                return;
            }
            if (Array.isArray(formRef)) {
                for (let form of formRef) {
                    this.$refs[form].clearValidate();
                    this.$refs[form].resetFields();
                }
            }
        });
    }
}
