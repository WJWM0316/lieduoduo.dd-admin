import Vue from 'vue'
import Component from 'vue-class-component'
// import config from '@/configs'
import { getTutorDetailApi, getPositionListApi, searchPositionApi, getPositionApi, editPositionApi, addPositionApi } from 'API/position'
import SearchBar from '@/components/searchBar'

@Component({
  name: 'community-edit',
  components: {
    /*Editor*/
    SearchBar
  },

  filters: {
    // 活动周期过滤
    activityCycle (value, unit) {
      const option = {
        1: '天',
        2: '个星期',
        3: '个月',
        4: '年'
      }

      return `${value}${option[unit]}`
    }
  },

  watch: {
    form () {
    }
  }
})
export default class CommunityEdit extends Vue {
  // 列表
  deletePoster = []
  options= [
	  {
	    value: '选项1',
	    label: '黄金糕'
	   }, {
	    value: '选项2',
	    label: '双皮奶'
	   }, {
	    value: '选项3',
	    label: '蚵仔煎'
	   }, {
	    value: '选项4',
	    label: '龙须面'
	   }, {
	    value: '选项5',
	    label: '北京烤鸭'
	   }
  ]
  //职位类别
  typeList = []
  // 学历
  educationList = [
  	{
  		value: '选项1',
  		label: '初中及以下'
  	},
  	{
  		value: '选项2',
  		label: '中专/中技'
  	},
  	{
  		value: '选项3',
  		label: '高中'
  	},
  	{
  		value: '选项4',
  		label: '大专'
  	},
  	{
  		value: '选项5',
  		label: '本科'
  	},
  	{
  		value: '选项6',
  		label: '硕士'
  	},
  	{
  		value: '选项7',
  		label: '博士'
  	}
  ]
  // 经验要求
  experienceList = [
  	{
  		value: '选项1',
  		label: '不限'
  	},
  	{
  		value: '选项2',
  		label: '中专/应届生'
  	},
  	{
  		value: '选项3',
  		label: '1年以内'
  	},
  	{
  		value: '选项4',
  		label: '1-3年'
  	},
  	{
  		value: '选项5',
  		label: '3-5年'
  	},
  	{
  		value: '选项6',
  		label: '5-10年'
  	},
  	{
  		value: '选项7',
  		label: '10年以上'
  	}
  ]

  addressList = [
  	{
			value: '0',
			label: '添加新的公司地址',
		},
		{
			value: '1',
			label: '222',
		}
  ]

  // 社区分类标签
  communityTags = []

  // 表单数据
  form = {
    position_name: '', // 职位名称
    company_id: '', // 公司ID
    type: '', // 职位类型
    address_id: '', // 选择的公司地址ID
    area_id: '', // 区域ID(省，市，区的ID，级别最小的)
    lng: '', // 经度
    lat: '', // 纬度
    address: '', // 工作地址

    doorplate: '', // 工作地址-门牌
    labels: '', // 技能标签json数组[{’id’:1,’is_diy’:0},{’d’:12,’is_diy’:1}]
    emolument_min: '', // 薪资范围起点
		emolument_max: '', // 薪资范围终点
    work_experience: '', // integer(formData)	经验要求,1:不限, 2:应届生 , 3:一年以内, 4:1-3年, 5:3-5年, 6:5-10年, 7 10年以上
    education: '', // 学历要求,5 ：初中及以下，10： 中专 ，15：高中, 20: 大专, 25: 本科， 30: 硕士, 35：博士
    describe: '', // 职位描述
  }

  	// 表单验证规则
  rules = {
    position_name: [
      { required: true, message: '请填写职位名称', trigger: 'blur' },
      { min: 2, message: '职位名称不得少于2个字', trigger: 'blur' },
      { max: 30, message: '职位名称最多输入30个字', trigger: 'blur' }
    ],
    type: [
      { required: true, message: '请选择职位类型', trigger: 'blur' },
    ],
    master_intro: [
      { required: true, message: '请填写简介', trigger: 'blur' },
      { min: 2, message: '简介不得少于2个字', trigger: 'blur' },
      { max: 25, message: '简介最多输入25个字', trigger: 'blur' }
    ],
    is_course: [
      { required: true, type: 'number', message: '请选择社区分类', trigger: 'change' }
    ]
  }

  positionList = []
  secondPositionList = []
  thirdPositionList = []
  searchPosition = ''
  adressInput = ''
  adress_id_Input = ''
  pop = {
  	isShow: false,
  	type: 'position'
  }

  ajax(url,fnSucc){
    if(window.XMLHttpRequest){
      var oAjax = new XMLHttpRequest();
    }else{
      var oAjax = new ActiveXObject("Microsoft.XMLHTTP");//IE6浏览器创建ajax对象
    }
    oAjax.open("GET",url,true);//把要读取的参数的传过来。
    oAjax.send();
    oAjax.onreadystatechange = function(){
      if(oAjax.readyState==4)
      {
        if(oAjax.status==200){
            nSucc(oAjax.responseText);//成功的时候调用这个方法
        }else{
          if(fnfiled){
            fnField(oAjax.status);
          }
        }
      }
    }
  }

  // 编辑标题
  get editTitle () {
    return this.$route.query.type !== 'add' ? '编辑职位' : '添加职位'
  }

  created () {
    // this.getTagList()
    this.init()
  }

  // 搜索职位
  handleSearch (e) {
  	console.log(e)
  	searchPositionApi({
  		name: e,
  		page: 1,
  		count: 20
  	}).then(res => {
  		this.secondPositionList = []
  		this.thirdPositionList = res.data.data
  	})
  }

  addAdress () {

  }

  selectPosition (index) {
		console.log(this.secondPositionList)
  	if (!this.positionList[index].active) {
  		this.positionList.map((item,index2)=>{
  			if(index2===index){
  				item.active = true
  				item.children.map((item2)=>{
			  			item2.active = false
			  			this.thirdPositionList = item2.children
		  		})
					this.secondPositionList = item.children
  			}else {
	  			item.active = false
  			}
  		})
  	}
  	this.thirdPositionList = []
  }

  selectSecondPosition (index) {

  	if (!this.secondPositionList[index].active) {
  		this.secondPositionList.map((item,index2)=>{
  			if(index2===index){
  				item.active = true
  				this.thirdPositionList = item.children
  			}else {
	  			item.active = false
  			}
  		})
  	}else {
  		this.secondPositionList[index].active = false
  		this.thirdPositionList = []
  	}
  }

  thirdSecondPosition (item) {
  	this.pop.isShow = false
  	console.log(item)
  }

  changePosition () {
  	this.pop = {
  		isShow: true,
  		type: 'position'
  	}
  }

  // 工作地点选择 
  changeAdress (e) {
  	if(e==='0'){
  		this.pop = {
  			isShow: true,
  			type: 'addAdress'
  		}
  	}
  }

  getPositionList () {
  	getPositionListApi().then(res => {
  		res.data.data.map((item,index)=>{
  			if(index===0){
  				item.active = true
  				this.secondPositionList = item.children
  				console.log(item.children)
  			}else {
	  			item.active = false
  			}
  		})
  		this.positionList = res.data.data
  	})
  }
  /**
   * 初始化数据
   */
  async init () {
  	console.log('1111',this.$route.query)
    try {
      // 如果有id，则为编辑
      if (this.$route.query.id) {
        const id = parseInt(this.$route.query.id)
        const { data } = await getPositionApi({
        	id:id
        })

        console.log(data)
        // // 创建编辑表单数据
        // const form = {}
        // form.id = id
        // form.title = community.title
        // form.simple_intro = community.simple_intro
        // form.tags = (community.tags && community.tags.length > 0 && community.tags[0].id) || '' // 目前单选，取第一个值
        // form.master_uid = community.master_uid
        // form.join_price = parseFloat(community.join_price)
        // form.rate = parseFloat(community.rate) || ''

        // form.posters = community.posters
        // form.master_intro = community.master_intro
        // form.show_status = community.show_status.toString()
        // form.is_course = community.is_course

        // this.form = $.extend(true, {}, this.form, form)
        // this.communityIntroEditor.content = community.intro // 社区介绍
      } else {

      	this.getPositionList()
        // const res = await getCreateCommunityData({
        //   globalLoading: true
        // })
        // this.tags = reshaol
      }
    } catch (error) {
      // this.is_course = true;
      // this.$message.error(error.message)
    }
  }

  /**
   * 获取社区分类列表
   */
  async getTagList () {
    try {
      const params = {
        type: 4
      }
      this.communityTags = await getTagList(params) || []
    } catch (error) {
      this.$message.error(error.message)
    }
  }

  /**
   * 保存社区
   */
  async saveCommunity () {
    try {
      this.$store.dispatch('showAjaxLoading')
      const params = this.transformData(this.form)
      console.log('---', params)
      if (!this.$route.params.id) {
        await postCreateCommunity(params)
        this.$message.success('创建社区成功')
      } else {
        await putSaveCommunity(this.form.id, params)
        this.$message.success('保存社区成功')
      }

      this.$router.push({
        name: 'communityList'
      })
    } catch (e) {
      this.$message.error(e.message)
    } finally {
      this.$store.dispatch('hideAjaxLoading')
    }
  }

  /**
   * 将表单数据转换成提交服务器的格式
   * @param {*} form
   */
  transformData (form) {
    const newForm = $.extend(true, {}, form || {})
    // 分类标签
    if (newForm.tags) {
      newForm.tags = [newForm.tags]
    }

    // 起止时间
    if (newForm.start_time && newForm.start_time instanceof Date) {
      newForm.start_time = parseInt(newForm.start_time.getTime() / 1000)
    }
    if (newForm.end_time && newForm.end_time instanceof Date) {
      newForm.end_time = parseInt(newForm.end_time.getTime() / 1000)
    }

    if (!newForm.sort) {
      newForm.sort = 0
    }

    if (!newForm.rate) {
      newForm.rate = 0
    }

    // 如果图片路径是绝对url路径，证明没有修改过，去除参数
    if (this.$util.isAbsoulteURL(newForm.detail_img)) {
      delete newForm.detail_img
    }
    if (this.$util.isAbsoulteURL(newForm.icon)) {
      delete newForm.icon
    }
    if (this.$util.isAbsoulteURL(newForm.mini_apps_share_img)) {
      delete newForm.mini_apps_share_img
    }

    return newForm
  }

  /**
   * 检查pos
   */
  examinePos () {
    console.log('examinePos', typeof this.form.posters)
    let test = true
    let data = this.form

    if (!data.posters) { return }

    if (data.promotion_status === '3') {
      data.posters = []
      return test
    }

    if (data.posters.length < 1) {
      delete data.posters
      return test
    }

    this.form.posters.map((item, index) => {
      if (item.new_wap_file_id && item.new_applet_file_id) {
      } else {
        test = false
        this.$message.error('分销／邀请函海报上传图片不全，请重新上传')
      }
    })
    return test
  }

  /**
   * 点击增加
   */
  addPos () {
    console.log(this.form.posters.length)
    if (this.form.posters.length > 4) {
      return
    }
    let a = {
      color: '1',
      wap_file_id: 0,
      applet_file_id: 0,
      new_wap_file_id: '',
      new_applet_file_id: ''
    }
    Vue.set(this.form.posters, this.form.posters.length, a)
    /* let poList = document.getElementsByClassName('poster_blo')
    console.log(poList) */
  }

  /**
   * 点击删除
   */
  removePos (e) {
    let index = e.currentTarget.getAttribute('index')
    let data = this.form.posters
    let a = {}
    // 删除了也要提交
    if (data[index].applet_file_id) {
      a = data[index]
      a.new_wap_file_id = a.new_applet_file_id = 0
      this.deletePoster.push(a)
    }
    this.form.posters.splice(index, 1)
    console.log(a, this.deletePoster.length)
  }

  /**
   * 点击提交
   */
  handleSubmit () {
    console.log(this.form)
    let test = this.examinePos()
    this.$refs.form.validate(valid => {
      if (valid) {
        let data = this.form
        // 加上删除的
        if (this.deletePoster.length > 0) {
          console.log(data.posters, this.deletePoster)
          if (data.posters) {
            data.posters = [...data.posters, ...this.deletePoster]
          } else {
            data.posters = [...this.deletePoster]
          }
        }

        console.log(this.deletePoster)
        // 修改color
        if (data.posters && data.posters.length > 0) {
          for (let i = 0; data.posters.length > i; i++) {
            data.posters[i].color = data.posters[i].color === '1' ? '0,0,0' : '255,255,255'
          }
        }
        console.log('==========', data.posters, test)
        if (test) {
          this.saveCommunity()
        }
      } else {}
    })
  }

  popCancel () {
  	this.pop.isShow = false
  }

  /**
   * 点击取消
   */
  handleCancel () {
    this.$router.go(-1)
  }

  /**
   * 图片读取成功
   */
  handleImageLoaded () {
    this.$refs.form.validateField('detail_img')
  }

  /**
   * 列表图片读取成功
   */
  handleIconLoaded () {
    this.$refs.form.validateField('icon')
  }

  /**
   * 分享图片读取成功
   */
  handleShareImageLoaded () {
    this.$refs.form.validateField('mini_apps_share_img')
  }

  /**
   * 小程序特殊 分销／邀请海报
   */
  handlePosterX () {
    this.$refs.form.validateField('xcx_poster')
  }

  /**
   * WAP 分销／邀请海报
   */
  handlePosterW () {
    this.$refs.form.validateField('wap_poster')
  }

  /**
   * 修改生效时间
   * @param {*} range
   * @param {*} start
   * @param {*} end
   */
  handleTimeRangeChange (range, start, end) {
    this.form.start_time = start
    this.form.end_time = end
  }

  /**
   * 修改活动周期
   * @param {*} value
   */
  handleActivityCycleChange (value) {
    console.log(value)
    for (let [, item] of this.activityCycles.entries()) {
      if (item.value === value) {
        this.form.activity_cycle_unit = item.unit
        break
      }
    }
  }

  /**
   * 社区介绍失去焦点
   */
  handleCommunityIntroEditorBlur () {
  //   this.$refs.form.validateField('introduce')
  }

  /**
   * 重新设置上传的图片文件列表
   * @param {*} fileList
   */

  resetImageFileList (fileList) {
    // console.log('重新设置上传的图片文件列表', fileList)
    fileList = fileList || []
    // this.form.posters[fileList[0].aryName[0]]['new_' + fileList[0].aryName[1] + '_file_id'] = fileList[0].fileId
    /* this.form.file_ids = fileList.map(item => {
      return {
        file_id: item.fileId
      }
    })
    this.$refs.form.validateField('file_ids') */
  }

  /**
   * 上传图片成功
   * @param {*} res
   * @param {*} file
   * @param {*} fileList
   */
  handleUploadImageSuccess (res, file, fileList) {
    console.log('上传图片成功', this.form.posters)
    this.resetImageFileList(fileList)
  }

  /**
   * 上传图片失败
   * @param {*} error
   */
  handleUploadImageError (error) {
    this.$message.error(error.message)
  }

  /**
   * 移除文件
   * @param {*} file
   * @param {*} fileList
   */
  handleRemoveImage (file, fileList) {
    this.resetImageFileList(fileList)
  }
}
