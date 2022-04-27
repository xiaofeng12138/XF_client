<template>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
        <el-form-item label="部门名称" prop="dep_name">
            <el-input v-model="ruleForm.dep_name" placeholder="请输入部门名称" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="部门人数" prop="dep_num">
            <el-input v-model="ruleForm.dep_num" placeholder="请输入部门人数" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="部门禁启用" prop="dep_status">
            <el-radio-group v-model="ruleForm.dep_status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
        </el-form-item>

         <el-form-item label="部门描述" prop="dep_desc">
            <el-input type="textarea"  :rows="5" v-model="ruleForm.dep_desc" placeholder="请输入部门描述" style="width:300px"></el-input>
        </el-form-item>

        

       
        <el-form-item>
            <el-button v-if="userRole == 0" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>

import {AddDepartment,queryDepById,editDepById} from '@/api/department.js'
import  { getRole } from '@/utils/cookies.js'
export default {
    data() {
      return {
        userRole:getRole(),
        ruleForm: {
           dep_name:"",
           dep_num:"",
           dep_desc:"",
           dep_status:0
        },
        rules: {
          dep_name: [{ required: true, message: '部门名称不能为空', trigger: 'blur', }], 
          dep_num: [{ required: true, message: '部门人数不能为空', trigger: 'blur', }],
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
        editDepById(requestData).then(res=>{
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
        AddDepartment(requestData).then(res=>{
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
          queryDepById({dep_id:this.id}).then(res=>{
             this.ruleForm = res.data.data
          })
        }
      },
    },
    mounted(){
      this.queryInfoDetaied()
    }
  }
</script>

<style lang="scss" scoped>

</style>
