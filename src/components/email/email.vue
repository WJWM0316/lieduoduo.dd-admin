<template>
    <div class="email">
        <div class="header">验证公司邮箱</div>
        <el-form :rules="rule" :model="form">
            <el-form-item label-width="100px" label-position="left" label="公司邮箱" style="width: 400px;" prop="email">
                <el-input v-model="form.email" style="width: 300px;"></el-input>
            </el-form-item>

            <el-form-item label-width="100px" label-position="left" label="邮箱验证码" style="width: 400px;" prop="code">
                <el-input v-model="form.code" style="width: 300px;"></el-input>
            </el-form-item>
        </el-form>
        <div class="sendEmail" @click.stop="sendEmail">发送验证码到对方邮箱</div>
        <div class="btn">
            <el-button class="define" @click.stop="save">确定</el-button>
            <el-button @click.stop="cancel">取消</el-button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { sendEmailApi } from 'API/company'
@Component({
    name: 'email',
    props: {
        companyName: {
            type: String
        }
    }
})
export default class emailCheck extends Vue {
    form = {
        email: '',
        code: '',
        company_id: 0
    }
    rule = {
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
    }
    save () {
        if (!this.form.email || !this.form.code) return
        let param = Object.assign({}, this.form, {company_name: this.companyName})
        this.$emit('save', param)
    }
    cancel () {
        this.$emit('close')
    }
    /* 发送校验 */
    sendEmail () {
        if (!this.form.email) return
        let param = {
            email: this.form.email,
            company_id: this.form.company_id,
            company_name: this.companyName
        }
        sendEmailApi(param).then(res => {
            this.$message({
              message: '邮件已发送到邮箱，请登录邮箱查看',
              type: 'success'
            })
        })
    }
}
</script>

<style lang="less" scoped="scoped">
.email {
    overflow: hidden;
    width: 500px;
    height: 330px;
    background-color: #ffffff;
    border-radius: 8px;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    .header{
        color: #fff;
        line-height: 50px;
        font-size: 15px;
        width: 100%;
        height: 50px;
        background-color: #652791;
        margin-bottom: 30px;
    }
    .sendEmail{
        text-align: left;
        padding-left: 100px;
        color: #652791;
    }
    .btn{
        margin-top: 30px;
        .define{
            background-color: #652791;
            color: #fff;
        }
    }
}
</style>