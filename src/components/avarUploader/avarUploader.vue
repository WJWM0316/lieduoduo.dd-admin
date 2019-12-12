<template>
  <div class="avarBox" :style="{width: width + 'px',height: height + 'px'}" @click.stop="uploadAvar">
    <input type="file" class="addBtn" accept="image/*" @change="handleChangeFile">
    <i class="el-icon-plus add"></i>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { uploadApi } from 'API/commont'
@Component({
  name: 'avarBox',
  props: {
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    }
  }
})
export default class avarUploader extends Vue {
  /**
   * 选择文件
   */
  handleChangeFile (event) {
    let file = null
    const files = event.target.files
    if (!files || files.length <= 0) {
      this.$message.error('文件选择错误')
      return
    }
    file = files[0]
    // 判断文件类型
    if (!/^image\//.test(file.type)) {
      this.$message.error('图片文件格式不正确')
      return
    }
    // 判断文件大小
    if (file.size > 1024 * 1024 * this.maxFileSize) {
      this.$message.error(`图片文件大小不能超过${this.maxFileSize}M`)
      return
    }

    this.$emit('before-load', file)
    this.getImageURL(file)
        .then(url => {
          file.preview = url
          file.uploadType = this.type
          this.previewSrc = url
          this.handleIconLoaded(file)
        }).catch(e => {
          this.$emit('load-error', e)
        })
  }
  /**
   * 获取单个图片的url
   * @param {Object} file
   */
  getImageURL (file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.onload = (event) => {
        resolve(event.target.result)
      }

      fileReader.onerror = (event) => {
        reject(event)
      }

      fileReader.readAsDataURL(file)
    })
  }

  handleIconLoaded (e) {
    let formData = new FormData()
    formData.append('attach_type', 'img')
    formData.append('img', e)
    uploadApi(formData).then(res => {
      this.$emit('getImg', res.data.data)
    })
  }

  uploadAvar () {

  }
}
</script>
<style lang="less" scoped>
.avarBox {
  position: relative;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  .addBtn {
    opacity: 0;
    width: 100%;
    height: 100%;
  }
  .add {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>

