<template>
  <div class="adminBox">
      <div v-if="!isBindAdmin">
        <header>绑定管理员</header>
        <el-form ref="form" :model="bindForm" :rules="bindRules" class="bindForm" label-width="120px" label-suffix="：" @keyup.enter="done">
            <el-form-item label="管理员账号" prop="adminUser">
                <el-input v-model="bindForm.adminUser" @blur.stop="checkUser"></el-input>
            </el-form-item>
            <p v-if="toCretedUser"><i class="el-icon-warning" style="color: #E6A23C;"></i> 该用户不存在，请先 <span class="addUser" @click.stop="addUser">添加用户</span></p>
            <div v-if="isNewUser">
                <el-form-item label="姓名">
                    <p>{{newUserInfo.name}}</p>
                </el-form-item>
                <el-form-item label="性别">
                    <P>{{newUserInfo.gender}}</p>
                </el-form-item>
                <el-form-item label="担任职务" prop="position">
                    <el-input v-model="bindForm.position"></el-input>
                </el-form-item>
                <el-form-item label="接收简历邮箱" prop="email">
                    <el-input v-model="bindForm.email"></el-input>
                </el-form-item>
                <!-- <el-form-item class="avar" label="招聘官头像">
                    <image-uploader :width="iconUploader.width"
                                    :height="iconUploader.height"
                                    type="avar"
                                    v-model="bindForm.avar"
                                    @loaded="handleIconLoaded"/>
                </el-form-item> -->
            </div>
            <el-button class="btn done" @click.stop="done" v-show="isNewUser">确定</el-button>
            <el-button class="btn" type="info" disabled v-show="!isNewUser">确定</el-button>
            <el-button class="btn" @click.stop="cancel">取消</el-button>
        </el-form>
      </div>
      <div v-else>
        <header>移除并更换管理员</header>
        <div class="removeAdmin">
            <h2>确定将<span class="companyName">【{{companyName}}】</span>移除该管理员并更换?</h2>
            <p>解绑所属公司后，在平台上关联内容将如下处理，且数据永久保留</p>
            <ul>
                <li>关闭与公司已绑定的所有职位</li>
                <li>隐藏改用户的招聘官所有信息展示</li>
                <li>终止该用户所有有关的职位发布、面试邀约、面试行程</li>
                <li>终止该用户所有权益和活动参与资格</li>
            </ul>
            <div class="nextAdmin" v-if="nextAdmin">
                <p>管理员身份和权限将自动更换到该公司所属以下招聘官</p>
                <img class="nextAvar" src="" alt="">
                <span class="nextName">名字</span>
            </div>
            <el-button class="btn done" @click.stop="removeAdmin">确定</el-button>
            <el-button class="btn" @click.stop="cancel">取消</el-button>
        </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import ImageUploader from '@/components/imageUploader'
import { checkIdentityApi, bindCompanyApi } from 'API/company'
@Component({
    name: 'adminBox',
    props: {
        isBindAdmin: {
            type: Boolean
        },
        companyName: {
            type: String,
            default: ''
        },
        nextAdmin: {
            type: Object,
            default: ''
        }
    },
    components: {
        ImageUploader
    }
})
export default class adminBox extends Vue {
    toCretedUser = false
    isNewUser = false
    newUserInfo = ''
    bindForm = {
        is_admin: 1,
        adminUser: '', // 管理员账号
        position: '', // 担任职务
        email: '',
        avatars: ''
    }
    phoneRule = (rule, value, callback) => {
        checkIdentityApi(value).then(res => {
            if (res.data.data.isExisted) {
                if (!res.data.data.isAdmin && !res.data.data.companyId) {
                    callback()
                } else {
                    callback(new Error(`该用户已绑定在${res.data.data.companyName},请重新绑定用户`))
                }
            } else {
                callback(new Error('手机号码尚未注册，请先注册用户'))
            }
        })
    }
    iconUploader = {
        point: '',
        width: 100,
        height: '',
        tips: '建议尺寸400X400px，JPG、PNG格式，图片小于5M。'
    }
    bindRules = {
        "adminUser": [
            { required: true, message: '请输入正确的手机号码', trigger: 'blur', min: 11, max: 11 },
            { validator: this.phoneRule, trigger: 'blur' } 
        ],
        "position": [
            { required: true, message: '请输入担任职务', trigger: 'blur' }
        ],
        "email": [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
    }
    async done () {
        this.$refs['form'].validate(async (valid) => {
            if (valid) {
                let res = await bindCompanyApi(this.$route.query.id, this.bindForm)
            } else {
                return false
            }
        })
    }
    cancel () {
        this.$emit('closeAdminWindow')
    }
    checkUser () {
        checkIdentityApi(this.bindForm.adminUser).then(res => {
            if (res.data.data.isExisted) {
                if (!res.data.data.isAdmin && !res.data.data.companyId) {
                    this.isNewUser = true
                    this.toCretedUser = false
                    this.bindForm.uid = res.data.data.uid
                    this.newUserInfo = {
                        name: res.data.data.realname,
                        gender: res.data.data.gender === 1? '男' : '女'
                    }
                } else {
                    new Error(`该用户已绑定在${res.data.data.companyName},请重新绑定用户`)
                    this.toCretedUser = false
                }
            } else {
                this.toCretedUser = true
                new Error('手机号码尚未注册，请先注册用户')
            }
        })
    }
    handleIconLoaded (e) {
        console.log(e)
    }
    /* 添加用户 */
    addUser () {
        this.$router.push({path: '/user/addUser'})
    }
    /* 移除管理员 */
    removeAdmin () {
        console.log("移除")
    }
    created () {}
}
</script>

<style lang="less" scoped>
.adminBox {
    header {
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        background-color: #652791;
        color: #ffffff;
    }
    overflow: hidden;
    width: 500px;
    // height: 300px;
    background-color: #ffffff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    .bindForm,
    .removeAdmin {
        padding: 20px;
        p {
            text-align: left;
            color: #000;
        }
        .btn {
            margin-top: 10px;
        }
        .addUser {
            line-height: 30px;
            color: #652791;
            cursor: pointer;
        }
        .done {
            background-color: #652791;
            color: #ffffff;
        }
        /* 移除管理员 */
        h2 {
            font-size: 16px;
            color: #000;
            .companyName {
                color: #652791;
                font-size: 16px;
            }
        }
    }
    /* 解绑单独样式 */
    .removeAdmin {
        line-height: 30px;
        text-align: left;
        ul {
            padding-left: 20px;
            li {
                color: #652791;
                list-style-type: circle;
            }
        }
        .nextAdmin {
            .nextAvar {
                display: inline-block;
                border-radius: 50%;
                width: 100px;
                height: 100px;
                background-color: #cccccc;
            }
            .nextName {
                line-height: 100px;
                padding-left: 10px;
                font-size: 20px;
                color: #652791;
            }
        }
    }
}
</style>

