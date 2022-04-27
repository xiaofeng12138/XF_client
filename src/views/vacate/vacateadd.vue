<template>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
         <el-form-item label="姓名" prop="staff_id">
            <el-select v-model="ruleForm.staff_id" placeholder="请选择员工姓名" style="width:300px">
              <el-option
                  v-for="item in canUseList"
                  :key="item.staff_id"
                  :label="item.staff_name"
                  :value="item.staff_id">
                </el-option>
              </el-select>
        </el-form-item>

        <el-form-item label="请假日期" prop="vacate_date">
           <el-date-picker
              style="width:300px"
              v-model="ruleForm.vacate_date"
              value-format = 'yyyy-MM-dd'
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              
              end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
         <el-form-item label="请假原因" prop="vacate_desc">
            <el-input type="textarea"  :rows="5" v-model="ruleForm.vacate_desc" placeholder="请输入请假原因" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button v-if="userRole == 0" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>

import {queryAllVacateUse,addvacate} from '@/api/vacate.js'
import {Addjob,queryJobById,editJobById} from '@/api/job.js'
import {queryJobBydep,AddStaff,queryStaffById,editStaffById} from '@/api/staff.js'
import  { getRole } from '@/utils/cookies.js'
import { async } from 'q';
export default {
    data() {
      return {
        userRole:getRole(),
        depList:[], //部门列表
        ruleForm: {
           staff_id:"",
           vacate_date:"",
           vacate_desc:""
        },
        rules: {
          staff_id: [{ required: true, message: '姓名不能为空', trigger: 'blur', }], 
          vacate_date: [{ required: true, message: '日期不能为空', trigger: 'blur', }], 
          vacate_desc: [{ required: true, message: '请假原因不能为空', trigger: 'blur', }],
        },
        id:this.$route.params.id || "",
        canUseList:[]
      };
    },
    methods: {
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
      //新增提交
      AddFn(requestData){
        requestData.start_date = (requestData.vacate_date[0])
        requestData.end_date = requestData.vacate_date[1]
      
        addvacate(requestData).then(res=>{
          if(res.data.code == 200){
                this.$message.success(res.data.msg)
                this.resetForm('ruleForm')
                this.queryAllVacateUseFn()
              }else{
                this.$message.error(res.data.msg)
              }
        })
      },
      //查询详情
       queryInfoDetaied(){
        if(this.id){
          queryStaffById({staff_id:this.id}).then(res=>{
            console.log(res.data.data)
             this.ruleForm = res.data.data
          })
        }
      },


      //部门可用列表查询

      queryAllVacateUseFn(){
        queryAllVacateUse().then(res=>{
          this.canUseList = res.data.data
        })
      }
    },
    mounted(){
      this.queryAllVacateUseFn();
    }
  }
</script>

<style lang="scss" scoped>

</style>
