<template>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
         
        <el-form-item label="姓名" prop="staff_name">
            <el-input v-model="ruleForm.staff_name" placeholder="请输入员工姓名" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="性别" prop="staff_sex">
            <el-radio-group v-model="ruleForm.staff_sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            </el-radio-group>
        </el-form-item>
         <el-form-item label="年龄" prop="staff_age">
            <el-input v-model="ruleForm.staff_age" placeholder="请输入员工年龄" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="手机号码" prop="staff_phone">
            <el-input v-model="ruleForm.staff_phone" placeholder="请输入员工手机号码" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="毕业院校" prop="staff_school">
            <el-input v-model="ruleForm.staff_school" placeholder="请输入员工毕业院校" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="所学专业" prop="staff_major">
            <el-input v-model="ruleForm.staff_major" placeholder="请输入员工专业" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="毕业证上传" style="width:400px">
            <el-upload
              class="avatar-uploader"
              action="http://up.qiniup.com"
              :data="uploadData"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="状态" prop="staff_status">
            <el-radio-group v-model="ruleForm.staff_status">
            <el-radio :label="0">在职</el-radio>
            <el-radio :label="1" disabled>休假</el-radio>
            <el-radio :label="2">离职</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="所属部门" prop="dep_id">
            <el-select v-model="ruleForm.dep_id" placeholder="请选择部门名称" style="width:300px" @change='changeDepName'>
              <el-option
                  v-for="item in depList"
                  :key="item.dep_id"
                  :label="item.dep_name"
                  :value="item.dep_id">
                </el-option>
              </el-select>
        </el-form-item>
         <el-form-item label="职位" prop="job_id">
            <el-select v-model="ruleForm.job_id" placeholder="请选择部门名称" style="width:300px">
              <el-option
                  v-for="item in jobList"
                  :key="item.job_id"
                  :label="item.job_name"
                  :value="item.job_id">
                </el-option>
              </el-select>
        </el-form-item>

         <el-form-item label="员工描述" prop="staff_desc">
            <el-input type="textarea"  :rows="5" v-model="ruleForm.staff_desc" placeholder="请输入员工描述" style="width:300px"></el-input>
        </el-form-item>

        

       
        <el-form-item>
            <el-button v-if="userRole == 0" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>

import {AddDepartment,queryDepById,editDepById,queryUseDepList} from '@/api/department.js'
import {Addjob,queryJobById,editJobById} from '@/api/job.js'
import {queryJobBydep,AddStaff,queryStaffById,editStaffById,getToken} from '@/api/staff.js'
import  { getRole } from '@/utils/cookies.js'
export default {
    data() {
      return {
        uploadData:{
           token:'',
           key:''
        },
        
        imageUrl:'',
        userRole:getRole(),
        depList:[], //部门列表
        ruleForm: {
           staff_name:"",
           staff_sex:0,
           staff_phone:"",
           staff_status:0,
           dep_id:'',
           job_id:"",
           staff_age:"",
           staff_school:"",
           staff_major:"",
           staff_desc:""
        },
        rules: {
          staff_name: [{ required: true, message: '姓名不能为空', trigger: 'blur', }], 
          staff_sex: [{ required: true, message: '性别不能为空', trigger: 'blur', }], 
          staff_phone: [{ required: true, message: '手机号码不能为空', trigger: 'blur', }],
          staff_status: [{ required: true, message: '状态不能为空', trigger: 'blur', }],
          dep_id: [{ required: true, message: '部门不能为空', trigger: 'blur', }],
          job_id: [{ required: true, message: '职位不能为空', trigger: 'blur', }],
          staff_age: [{ required: true, message: '年龄不能为空', trigger: 'blur', }],
          staff_school: [{ required: true, message: '毕业院校不能为空', trigger: 'blur', }],
          staff_major: [{ required: true, message: '专业不能为空', trigger: 'blur', }],
          staff_desc: [{ required: true, message: '员工描述不能为空', trigger: 'blur', }],
          staff_byz: [{ required: true, message: '毕业证不能为空', trigger: 'blur', }],
          
        },
        id:this.$route.params.id || "",
        jobList:[]
      };
    },
    methods: {
      //文件上传
      handleAvatarSuccess(res,file){
         let src = `http://llc.xiaofenggege.com/${res.key}`;
         this.imageUrl = src
      },
      beforeAvatarUpload(file){
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

      //选择部门
      changeDepName(e){
        this.ruleForm.job_id =''
        queryJobBydep({dep_id:e}).then(res=>{
          this.jobList = res.data.data
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let requestData = JSON.parse(JSON.stringify(this.ruleForm))
            requestData.staff_picurl = this.imageUrl
            this.id ? this.EditFn(requestData) : this.AddFn(requestData)
          } else {
            this.$message.error('必填项不能为空');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.imageUrl = ""
      },

      //编辑提交
      EditFn(requestData){
        editStaffById(requestData).then(res=>{
          if(res.data.code == 200){
                this.$message.success(res.data.msg)
                this.resetForm('ruleForm')
              }else{
                this.$message.error(res.data.msg)
              }
        })
      },

      //新增提交
      AddFn(requestData){
        AddStaff(requestData).then(res=>{
          if(res.data.code == 200){
                this.$message.success(res.data.msg)
                this.resetForm('ruleForm')
              }else{
                this.$message.error(res.data.msg)
              }
        })
      },


      //查询详情
       queryInfoDetaied(){
        if(this.id){
          queryStaffById({staff_id:this.id}).then(res=>{
             this.ruleForm = res.data.data
             this.imageUrl =  res.data.data.staff_picurl
          })
        }
      },


      //部门可用列表查询

      queryAllUseList(){
        queryUseDepList().then(res=>{
          this.depList = res.data.data
        })
      }
    },
    mounted(){
      this.queryAllUseList();
      this.queryInfoDetaied();
      this.getTokenFn()
    }
  }
</script>

<style lang="scss" scoped>

</style>
