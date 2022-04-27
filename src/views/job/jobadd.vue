<template>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
         <el-form-item label="部门名称" prop="dep_id">
            <el-select v-model="ruleForm.dep_id" placeholder="请选择部门名称" style="width:300px">
              <el-option
                  v-for="item in depList"
                  :key="item.dep_id"
                  :label="item.dep_name"
                  :value="item.dep_id">
                </el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="职位名称" prop="job_name">
            <el-input v-model="ruleForm.job_name" placeholder="请输入部门名称" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="职位人数" prop="job_num">
            <el-input v-model="ruleForm.job_num" placeholder="请输入部门人数" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="职位禁启用" prop="job_status">
            <el-radio-group v-model="ruleForm.job_status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
        </el-form-item>

         <el-form-item label="职位描述" prop="job_desc">
            <el-input type="textarea"  :rows="5" v-model="ruleForm.job_desc" placeholder="请输入部门描述" style="width:300px"></el-input>
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
import  { getRole } from '@/utils/cookies.js'
import { async } from 'q';
export default {
    data() {
      return {
        userRole:getRole(),
        depList:[], //部门列表
        ruleForm: {
           dep_id:"",
           job_name:"",
           job_num:"",
           job_desc:"",
           job_status:0
        },
        rules: {
          dep_id: [{ required: true, message: '部门名称不能为空', trigger: 'blur', }], 
          job_name: [{ required: true, message: '职位名称不能为空', trigger: 'blur', }], 
          job_num: [{ required: true, message: '职位人数不能为空', trigger: 'blur', }],
        },
        id:this.$route.params.id || "",
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let requestData = JSON.parse(JSON.stringify(this.ruleForm))
            this.id ? this.EditFn(requestData) : this.AddFn(requestData)
          } else {
            this.$message.error('必填项不能为空');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //编辑提交
      EditFn(requestData){
        editJobById(requestData).then(res=>{
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
        Addjob(requestData).then(res=>{
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
          queryJobById({job_id:this.id}).then(res=>{
             this.ruleForm = res.data.data
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
      this.queryInfoDetaied()
    }
  }
</script>

<style lang="scss" scoped>

</style>
