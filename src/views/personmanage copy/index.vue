<template>
    <div class="wrap">
        <div class="search_wrap">
                <el-form :inline="true" :model="searchModel" class="demo-form-inline">
                    <el-row >
                        <el-col :span="4">
                            <el-form-item label="姓名:" label-width="120">
                                <el-input v-model="searchModel.name"></el-input>
                            </el-form-item>
                        </el-col>
                            <el-col :span="5">
                                <el-form-item label="居住类型:" label-width="150">
                                    <el-select v-model="searchModel.livetype" >
                                    <el-option label="常住" value="1"></el-option>
                                    <el-option label="暂住" value="2"></el-option>
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
                            size="mini" 
                            v-if="userRole == 0"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                     </el-table-column>

                     <el-table-column
                       v-else
                       :key="index"
                       :prop="item.prop"
                       :width="item.width || ''"
                       :label="item.label"
                       :formatter="item.formatterFn"
                       align="center"
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

import { queryUserInfo,updateRole,delUserInfo } from '@/api/user.js'
import  { getRole } from '@/utils/cookies.js'
export default {

    data() {
        return {
             userRole:getRole(),
             total:0,
             updateId:"",
             pageNum:1,
             pageSize:10,
             searchModel: {
                name: '',
                livetype: ''
            },
            tableData:[],
            tableConfig:[
                {
                  slotName:'num',
                  label:'序号',
                  width:'80'
                },
                {
                    label:'姓名',
                    prop:'name',
                },
                {
                    label:'性别',
                    prop:'sex',
                    formatterFn:(value,column)=>{
                       return value.sex == 1? '男':'女'
                    }

                },
                {
                    label:'身份证号',
                    prop:'idcard',
                },
                {
                    label:'联系电话',
                    prop:'phone',
                },
                {
                    label:'居住类型',
                    prop:'livetype',
                    formatterFn:(value,column)=>{
                       return value.livetype == 1 ? '常住':'暂住'
                    }
                },
                {
                    label:'家庭地址',
                    prop:'address',
                },
                {
                    label:'婚姻状况',
                    prop:'marry',
                    formatterFn:(value,column)=>{
                       return value.marry == 1 ? '已婚':'未婚'
                    }
                },
                {
                    label:'录入日期',
                    prop:'time',
                    width:200
                },
                {
                    label:'备注',
                    prop:'remark',
                },
                {
                  slotName:'operate',
                  label:'操作',
                    width:200
                },
            ]
        }
    },
    
    methods:{
        //分页
        currentPageChange(page){
            this.pageNum = page
            this.queryUserList()
        },
        //修改权限
        edit(index,row){
            this.$router.push({
                name: 'PersonAdd',
                params: {
                    id: row._id
                }
            })
        },


       submitRole(){
            let requestData = {
                id:this.updateId,
                role:this.radio
            }
            updateRole(requestData).then(res=>{
                if(res.data.code === "200" ){
                    this.$message.success(res.data.msg)
                    this.showModal = false
                    this.queryUserList()
                }else{
                    this.$message.error(res.data.msg)
                }
             })
        },

        handleDelete(index, row) {  
                this.$confirm('是否确认删除当前人口信息', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                    }).then(() => {
                        let data = {
                            id:row._id
                        }
                        delUserInfo(data).then((res)=>{
                        if(res.data.code == '200'){
                            this.$message.success(res.data.msg)
                            this.queryUserList();
                        }else{
                            this.$message.error(res.data.msg)
                          }
                        })
                    }).catch(() => {
                });
        },
        onSubmit(){
            this.queryUserList()
        },

        //用户查询接口
        queryUserList(){
            let requestData ={
                pageNum:this.pageNum,
                name:this.searchModel.name,
                livetype:this.searchModel.livetype
            }
            queryUserInfo(requestData).then(res=>{
                this.tableData = res.data.data
                this.total = res.data.count
            })
        }
    },
    mounted(){
        this.queryUserList()
    }
    
}
</script>

<style lang='scss'>
.search_wrap{
    height: 70px;
    width: 100%;
}
</style>

