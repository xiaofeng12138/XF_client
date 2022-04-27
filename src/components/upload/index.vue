<template>
    <div>
        <el-upload
            class="avatar-uploader"
            action="http://up.qiniup.com"
            :show-file-list="false"
            :data="requsetUpload"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import {getQiniuToken} from '@/api/common.js'
export default {
    data() {
      return {
        imageUrl:'',
        requsetUpload:{}
      };
    },
    beforeMount(){
      this.getToken()
    },
    methods: {
      getToken(){
        let requsetData ={
           ak:'DDinTpKdKIJi9NA0q2nMoJV-296wps2DYD5JUxb8',
           sk:'POvLMBoC-EnwHWvwaJVkCjzLVvYuGl9TOVnzBpRv',
           buckety:'xiaofenggeg'
        }
         getQiniuToken(requsetData).then(res=>{
            this.requsetUpload.token = res.data.token
         })
      },
      handleAvatarSuccess(res, file) {
        let src = `http://llc.xiaofenggege.com/${res.key}`;
        this.imageUrl = src
        this.$emit('update:value',this.imageUrl)
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        let fileName = file.name;
        let key = encodeURI(fileName)
        this.requsetUpload.key = key
        return isLt2M;
      }
    },
    props:{
      imgSrc:{
        type:String,
        default:''
      }
    },
    watch:{
      imgSrc:{
        handler(newvalue){
            this.imageUrl = newvalue
        },immediate:true
      }
    }
}
</script>
<style lang="scss" >
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


