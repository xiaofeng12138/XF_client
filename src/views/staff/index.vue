<template>
    <div class="wrap">
        <div class="search_wrap">
                <el-form :inline="true" :model="searchModel" class="demo-form-inline">
                    <el-row >
                        <el-col :span="5">
                            <el-form-item label="员工姓名:" label-width="120">
                                <el-input v-model="searchModel.staff_name" placeholder="请输入员工姓名"></el-input>
                            </el-form-item>
                        </el-col>
                            <el-col :span="6">
                                <el-form-item label="员工状态:" label-width="120">
                                    <el-select v-model="searchModel.staff_status" placeholder="请选择员工状态">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="在职" value="0"></el-option>
                                    <el-option label="请假" value="1"></el-option>
                                     <el-option label="离职" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                              <el-form-item>
                                <el-button type="success" @click="onSubmit">查询</el-button>
                            </el-form-item>
                          </el-col>
                    </el-row>
                </el-form>
           
        </div>
        <div class="tableList">
            <el-table border :data='tableData' style="width:100%">
                <template v-for="(item,index) in tableConfig " >
                     <el-table-column
                       v-if="item.slotName == 'num'"
                       :key="index"
                       :width="item.width || ''"
                       :label="item.label"
                       align="center"
                     >
                        <template slot-scope="scope">
                            {{(pageNum - 1 )* pageSize + scope.$index + 1}}
                        </template>
                     </el-table-column>
             
                    <el-table-column
                        v-else-if="item.slotName == 'operate'"
                        :key="index"
                        :width="item.width || ''"
                        :label="item.label"
                        align="center"
                        >
                         <template slot-scope="scope">
                                <el-button
                                v-if="userRole == 0"
                                size="mini"
                                type="success"
                                @click="edit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                v-if="userRole == 0"
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                    </el-table-column>
                    <el-table-column
                        v-else-if="item.slotName == 'byz'"
                        :key="index"
                        :width="item.width || ''"
                        :label="item.label"
                        align="center"
                        >
                        <template slot-scope="scope" style="text-align:center">
                               <img :src="scope.row.staff_picurl" :width = 'item.imgWidth || 50'  alt="">
                        </template>
                    </el-table-column>
                    <el-table-column
                       v-else-if="item.slotName == 'switch'"
                       :key="index"
                       :prop="item.prop"
                       :width="item.width || ''"
                       :label="item.label"
                       align="center"
                     >
                     <template slot-scope="scope" >
                        
                       <el-switch
                            v-model="scope.row.job_status === 0 ? true : false"
                            @change ='changeStatus(scope.row)'
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                        
                     </template>
                    </el-table-column>

                     <el-table-column
                       v-else
                       :key="index"
                       :prop="item.prop"
                       :width="item.width || ''"
                       :label="item.label"
                       align="center"
                       :formatter ="item.FormatterFn"
                     >
                     </el-table-column>
                </template>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next,total"
                :total="this.total"
                @current-change="currentPageChange"
                style="float:right;margin-top:20px"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>

import  { getRole } from '@/utils/cookies.js'
import { queryAllJobListNotPage} from '@/api/job.js'
import {staffList,delStaff} from '@/api/staff.js'
import {queryUseDepList} from '@/api/department'
export default {

    data() {
        return {
             userRole:getRole(),
             total:0,
             radio:'1',
             updateId:"",
             showModal:false,
             pageNum:1,
             pageSize:10,
             searchModel: {
                staff_name:"",
                staff_status:""
            },
            tableData:[],
            tableConfig:[
                {
                  slotName:'num',
                  label:'序号',
                  width:'80'
                },
                {
                    label:'员工姓名',
                    prop:'staff_name',
                },
                {
                    label:'所属部门',
                    prop:'dep_id',
                    FormatterFn:(value,column)=>{
                        let newArray =[]
                         newArray = this.filterDepList.filter((item)=> item.dep_id == value.dep_id)
                        if(newArray.length >0){
                            return newArray[0].dep_name
                        }else{
                            return ''
                        }
                    },
                },{
                    label:'职位名称',
                    prop:'job_id',
                    FormatterFn:(value,column)=>{
                        let newArray =[]
                         newArray = this.filterJobList.filter((item)=> item.job_id == value.job_id)
                        if(newArray.length >0){
                            return newArray[0].job_name
                        }else{
                            return ''
                        }
                    },
                },
                //  {
                //     label:'员工性别',
                //     prop:'staff_sex',
                //     FormatterFn:(value,column)=>{
                //         console.log(value)
                //         return value.staff_sex == 0? '男' :'女'
                //     },
                   
                // },
                // {
                //     label:'员工年龄',
                //     prop:'staff_age',
                // },
                {
                    label:'电话号码',
                    prop:'staff_phone',
                },
                // {
                //     label:'毕业院校',
                //     prop:'staff_school',
                // },
                // {
                //     label:'专业名称',
                //     prop:'staff_major',
                // },
                  {
                    label:'员工状态',
                    prop:'staff_status',
                    FormatterFn:(value,column)=>{
                        return value.staff_status == 0 ? '在职' : value.staff_status == 1 ? '休假':'离职';
                    },
                },    {
                    label:'员工描述',
                    prop:'staff_desc',
                },
                {
                    label:'入职日期',
                    prop:'staff_date',
                },
                {
                  slotName:'byz',
                  label:'毕业证',
                },
                {
                  slotName:'operate',
                  label:'操作',
                },
            ],
            filterDepList:[],
            filterJobList:[]
        }
    },
    
    methods:{

        //查询部门匹配
        queryDepAllList(){
           queryUseDepList().then(res=>{
               this.filterDepList =res.data.data
           })
        },

        //查询职位匹配
        queryJobAllList(){
           queryAllJobListNotPage().then(res=>{
               this.filterJobList =res.data.data
           })
        },
        edit(index,row){
            this.$router.push({
                name: 'StaffAdd',
                params: {
                    id:row.staff_id
                }
            })
        },
        //修改职位状态
        changeStatus(e){
            console.log(e)
            let requestData ={
                job_id:e.job_id,
                job_status:e.job_status === 0 ? 1 : 0
            }
            changeJobStatus(requestData).then(res=>{
                if(res.data.code == 200){
                    this.$message.success(res.data.msg)
                    this.queryjobList()
                }else{
                     this.$message.error(res.data.msg)
                }
            }).catch(error=>{
                 console.log(error)
            })
            
            
        },
        //分页
        currentPageChange(page){
            this.pageNum = page
            this.queryStaffList()
        },
        //修改权限
        changeRole(index,row){
            this.radio = row.role
            this.showModal = true
            this.updateId = row._id
        },

        handleDelete(index, row) {  
                this.$confirm('是否确认当前员工', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                    }).then(() => {
                        let data = {
                            staff_id:row.staff_id
                        }
                        delStaff(data).then((res)=>{
                        if(res.data.code == '200'){
                            this.$message.success(res.data.msg)
                            this.queryStaffList();
                        }else{
                            this.$message.error(res.data.msg)
                          }
                        })
                    }).catch(() => {
                });
        },
        onSubmit(){
            this.queryStaffList()
        },

        //职位列表查询
        queryStaffList(){
            let requestData ={}
            for(let i in this.searchModel){
                if(this.searchModel[i]){
                   requestData[i] = this.searchModel[i]
                }
            }
            requestData.pageNum = this.pageNum
            staffList(requestData).then(res=>{
                this.tableData = res.data.data
                this.total = res.data.count
            })
        }
    },
    mounted(){
        this.queryStaffList()
        this.queryDepAllList()
        this.queryJobAllList()
    }
    
}
</script>

<style lang='scss'>
.search_wrap{
    height: 70px;
    width: 100%;
}
</style>

