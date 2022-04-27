<template>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
        <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入姓名" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
            <el-input v-model="ruleForm.idcard" placeholder="请输入身份证号" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="居住类型" prop="livetype">
            <el-radio-group v-model="ruleForm.livetype">
              <el-radio :label="1">常住</el-radio>
              <el-radio :label="2">暂住</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="居住地址" prop="address">
            <el-input v-model="ruleForm.address" placeholder="请输入居住地址" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="婚姻状况" prop="marry">
            <el-radio-group v-model="ruleForm.marry">
              <el-radio :label="1">已婚</el-radio>
              <el-radio :label="2">未婚</el-radio>
            </el-radio-group>
        </el-form-item>
         <el-form-item label="联系电话"  prop="phone">
            <el-input  v-model="ruleForm.phone" placeholder="请输入联系电话" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="身份证上传" style="width:400px">
            <el-upload
              class="avatar-uploader"
              action="http://up.qiniup.com"
              :data="uploadData"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"  style="border:1px dashed #ccc"></i>
            </el-upload>
        </el-form-item>


         <el-form-item label="备注" prop="remark">
            <el-input type="textarea" :rows="3"  v-model="ruleForm.remark" placeholder="请输入备注" style="width:500px"></el-input>
        </el-form-item>
       
        <el-form-item>
            <el-button  v-if="userRole == 0" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>

import  { getRole } from '@/utils/cookies.js'
import {userAdd,getToken,addUserInfo,queryDetailed,updateUserInfo} from '@/api/user.js'
export default {
    data() {
      return {
        userRole:getRole(),
        id:this.$route.params.id,
        imageUrl:'',
        uploadData:{
           token:'',
           key:''
        },
        ruleForm: {
           name:"",
           sex:"",
           idcard:"",
           phone:"",
           livetype:"",
           address:"",
           remark:"",
           marry:"",
           imgsrc:""
        },
        rules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur', }],
          sex: [{ required: true, message: '请选择性别', trigger: 'blur', }],
          idcard: [ { required: true, message: '请输入身份证号', trigger: 'blur' }],
          livetype: [{ required: true, message: '请选择居住类型', trigger: 'blur', }],
          address: [],
          remark: [],
          marry: [],
          phone:[]
        }
      };
    },
    methods: {
       //文件上传
      handleAvatarSuccess(res,file){
         let src = `http://llc.xiaofenggege.com/${res.key}`;
         this.imageUrl = src
      },
      beforeAvatarUpload(file){
        let fileSize = file.size/1024/1000
        if(fileSize>1){
          this.$message.error('请上传大小1M以下的图片')
          return false
        }
        let houzhui =  ( file.name).split('.')[1]
        let fileName =  (Math.floor(Math.random()*(100000000 - 1) + 100000000) +'.'+ houzhui); 
        this.uploadData.key = fileName;
      },

      //获取token
      getTokenFn(){
        getToken().then(r=>{
           this.uploadData.token = r.data.token
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.id ? this.editFn(formName) : this.addFn(formName)
          } else {
            this.$message.error('必填项不能为空');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.imageUrl = ''
      },
      queryInfoDetaied(){
        if(this.id){
          queryDetailed({id:this.id}).then(res=>{
             this.ruleForm = res.data.data
             this.imageUrl = res.data.data.imgsrc
          })
        }
      },

      //编辑接口
      editFn(formName){
        let requestData = {}
          requestData = JSON.parse(JSON.stringify(this.ruleForm))
          requestData.imgsrc = this.imageUrl
          requestData.id = this.id
          updateUserInfo(requestData).then(res=>{
            if(res.data.code == 200){
                  this.$message.success(res.data.msg)
                  this.resetForm(formName)
                }else{
                  this.$message.error(res.data.msg)
                }
          })
      },

      //添加接口
      addFn(formName){
        let requestData = {}
          requestData = JSON.parse(JSON.stringify(this.ruleForm))
          requestData.imgsrc = this.imageUrl
          addUserInfo(requestData).then(res=>{
            if(res.data.code == 200){
                  this.$message.success(res.data.msg)
                  this.resetForm(formName)
                }else{
                  this.$message.error(res.data.msg)
                }
          })
      },
    },
    mounted(){
      this.getTokenFn()
      this.queryInfoDetaied()
    }
  }
</script>

<style lang="scss">
 .avatar-uploader .el-upload {
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
