<template>
    <div class="wrap">
        <div class="search_wrap">
                <el-form :inline="true" :model="searchModel" class="demo-form-inline">
                    <el-row >
                        <el-col :span="5">
                            <el-form-item label="部门名称:" label-width="120">
                                <el-input v-model="searchModel.dep_name" placeholder="请输入部门名称"></el-input>
                            </el-form-item>
                        </el-col>
                            <el-col :span="6">
                                <el-form-item label="部门状态:" label-width="120">
                                    <el-select v-model="searchModel.dep_status" placeholder="请选择部门状态">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="启用" value="0"></el-option>
                                    <el-option label="禁用" value="1"></el-option>
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
                       v-else-if="item.slotName == 'switch'"
                       :key="index"
                       :prop="item.prop"
                       :width="item.width || ''"
                       :label="item.label"
                       align="center"
                     >
                     <template slot-scope="scope" >
                        
                       <el-switch
                            v-model="scope.row.dep_status === 0 ? true : false"
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
import { queryDepList,changeDepStatus,delDepartment} from '@/api/department.js'
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
                dep_name:"",
                dep_status:""
            },
            tableData:[],
            tableConfig:[
                {
                  slotName:'num',
                  label:'序号',
                  width:'80'
                },
                {
                    label:'部门名称',
                    prop:'dep_name',
                },
                {
                    label:'部门人数',
                    prop:'dep_num',
                },
                {
                    label:'部门状态',
                    prop:'dep_status',
                    slotName:'switch'
                },
                {
                    label:'部门描述',
                    prop:'dep_desc',
                },
                {
                    label:'部门添加时间',
                    prop:'time',
                },
                {
                  slotName:'operate',
                  label:'操作',
                },
            ]
        }
    },
    
    methods:{

        edit(index,row){
            this.$router.push({
                name: 'DepartmentAdd',
                params: {
                    id:row.dep_id
                }
            })
        },
        //修改部门状态
        changeStatus(e){
            let requestData ={
                dep_id:e.dep_id,
                dep_status:e.dep_status === 0 ? 1 : 0
            }
            changeDepStatus(requestData).then(res=>{
                if(res.data.code == 200){
                    this.$message.success(res.data.msg)
                    this.queryDepartmentList()
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
            this.queryUserList()
        },
        //修改权限
        changeRole(index,row){
            this.radio = row.role
            this.showModal = true
            this.updateId = row._id
        },


       

        handleDelete(index, row) {  
                this.$confirm('是否确认当前部门', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                    }).then(() => {
                        let data = {
                            dep_id:row.dep_id
                        }
                        delDepartment(data).then((res)=>{
                        if(res.data.code == '200'){
                            this.$message.success(res.data.msg)
                            this.queryDepartmentList();
                        }else{
                            this.$message.error(res.data.msg)
                          }
                        })
                    }).catch(() => {
                });
        },
        onSubmit(){
            this.queryDepartmentList()
        },

        //部门列表查询
        queryDepartmentList(){
            let requestData ={}
            for(let i in this.searchModel){
                if(this.searchModel[i]){
                   requestData[i] = this.searchModel[i]
                }
            }
            requestData.pageNum = this.pageNum
            queryDepList(requestData).then(res=>{
                this.tableData = res.data.data
                this.total = res.data.count
            })
        }
    },
    mounted(){
        this.queryDepartmentList()
    }
    
}
</script>

<style lang='scss'>
.search_wrap{
    height: 70px;
    width: 100%;
}
</style>

