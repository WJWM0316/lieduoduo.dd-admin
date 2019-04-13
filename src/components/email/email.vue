<template>
    <div class="email">
        <div class="header">验证公司邮箱</div>
        <el-form>
            <el-form-item label-width="100px" label-position="left" label="公司邮箱" style="width: 400px;">
                <el-input v-model="form.email" style="width: 300px;"></el-input>
            </el-form-item>

            <el-form-item label-width="100px" label-position="left" label="邮箱验证码" style="width: 400px;">
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
@Component({
    name: 'email'
})
export default class emailCheck extends Vue {
    form = {
        email: '',
        code: ''
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