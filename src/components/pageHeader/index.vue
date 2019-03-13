<template>
	<header id="page-header">
		  <el-breadcrumb separator="/">
        <el-breadcrumb-item v-if="haveParent" :to="{ path: `${parentPath}` }">{{parentName}}</el-breadcrumb-item>
        <el-breadcrumb-item><a>{{nowLinkName}}</a></el-breadcrumb-item>
      </el-breadcrumb>
      
			<ul class="navigation">
				<!--	<li>
					<i class="el-icon-bell"></i>
				</li> -->
				<!--<li @click="toLogin">-->
				  <!--登录-->
					<!--<el-dropdown trigger="hover" @command="todoAction" placement="bottom">
					  <div class="el-dropdown-link" style="color:#354048">
					  	<img :src="userInfos.avatarInfo.middleUrl" alt="" v-if="userInfos.avatarInfo">
					    <span style="margin-left: 10px;">欢迎登录，&nbsp;&nbsp;{{userInfos.realname}}</span>
					    <i class="el-icon-caret-bottom el-icon--right"></i>
					  </div>
					  <el-dropdown-menu slot="dropdown">
					  	<el-dropdown-item command="switch">切换员工端</el-dropdown-item>
					    <el-dropdown-item command="modify">修改密码</el-dropdown-item>
					    <el-dropdown-item command="out">退出登录</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>-->
				<!--</li>-->
				<li style="position: relative;">
				  <img v-if="avar" :src="avar" class="avar" />
				  <span>欢迎登陆猎多多，{{userName}}</span>
				  <i class="icon iconfont iconloeft_down" :class="{hide: !isShow, show: isShow}" @click.stop="showExit"></i>
				  <span class="exit" @click="toLogin" :class="{hideBox: !isShow, showBox: isShow}">退出登录</span>
				</li>
			</ul>
	</header>
</template>
<style lang="less">
#page-header{
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
	height: 60px;
	background: #fff;
	text-align: right;
	font-size: 14px;
	box-shadow: 0px 2px 8px 0px rgba(29,45,53,0.06);
	position: fixed;
	top: 0;
	left: 200px;
	right: 0;
	z-index: 999;
	.el-icon-bell{
		font-size: 18px;
	}
	section {
		position: fixed;
		height: 60px;
		left: 200px;
		right: 0;
	}
	.navigation {
		margin-right: 40px;
		li{
		  color: #354048;
			display: inline-block;
			line-height: 60px;
			margin-left: 35px;
			.avar {
			  margin-right: 5px;
			}
			.icon::before {
			  cursor: pointer;
			  color: #354048;
			  transition: 0.5s ease;
			}
			.hide::before {
			  display: inline-block;
			  transform: rotateZ(-180deg);
			}
			.show::before{
			  display: inline-block;
        transform: rotateZ(0deg);
			}
			.exit{
			  cursor: pointer;
			  position: absolute;
			  bottom: -30px;
			  right: 5px;
			  background-color: #FFFFFF;
			  line-height: 20px;
			  padding: 10px;
			  box-shadow: 1px 3px 10px 0px rgba(0,0,0,0.3);
			  transition: 0.5s ease;
			  overflow: hidden;
			  &:hover {
			    color: #354048;
			  }
			}
			.hideBox{
			  padding: 0;
			  height: 0;
      }
      .showBox{
        padding: 10px;
        height: 20px;
      }
		}
		img {
			width: 34px;
			height: 34px;
			background: rgba(0,0,0,.1);
			border-radius: 50%;
			display: inline-block;
			vertical-align: middle;
			cursor: pointer;
		}
	}
	.el-dropdown-link {
		i {
			font-size: 12px;
		}
	}
}
</style>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getAccessToken, removeAccessToken } from 'API/cacheService'

@Component({
  watch: {
    '$route': {
      handler (route) {
        this.avar = sessionStorage.getItem('avar')
        this.userName = sessionStorage.getItem('name')
        this.nowLinkName = route.meta.title
        if (route.meta.haveParent) {
          console.log(route.meta.haveParent, 999)
          this.haveParent = true
          this.parentPath = route.meta.parentPath
          this.parentName = route.meta.parentName
        } else {
          this.haveParent = false
        }
      },
      immediate: true
    }
  }
//	methods: {
//  ...mapActions(['logoutApi'])
//},
//computed: {
//  ...mapGetters([
//    'userInfos'
//  ])
//}
})
export default class ComponentHeader extends Vue {
  nowLinkName = ''
  haveParent = false
  parentPath = ''
  parentName = ''
  avar = ''
  userName = ''
  isShow = false
  toLogin () {
    removeAccessToken()
    this.$router.push({
      path: '/login'
    })
  }
  showExit () {
    this.isShow = !this.isShow
  }
//	todoAction(command) {
//		const company = process.env.NODE_ENV === 'development' ? process.env.VUE_APP__TEST_COMPANY : Cookies.get('code')
//		switch(command) {
//			case 'out':
//				this.logoutApi({code : Cookies.get('code')})
//				break
//			case 'modify':
//				this.$router.push({name: 'editMember',query: {user_id: this.userInfos.id } })
//				break
//			case 'switch':
//				window.location.replace(`${process.env.VUE_APP_STAFF_URL}/${company}/index`)
//				break
//			default:
//				break
//		}
//	}
}
</script>