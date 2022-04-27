<template>
    <div class="wrap">
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
import { queryVacatelist,delvacate} from '@/api/vacate.js'
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
                    label:'开始日期',
                    prop:'start_date',
                },
                {
                    label:'结束日期',
                    prop:'end_date',
                },
                {
                    label:'请假原因',
                    prop:'vacate_desc',
                },
                {
                    label:'提交日期',
                    prop:'create_time',
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

        //分页
        currentPageChange(page){
            this.pageNum = page
            this.queryStaffList()
        },

        handleDelete(index, row) {  
                this.$confirm('是否确认当前数据', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                    }).then(() => {
                        let data = {
                            staff_id:row.staff_id,
                            vacate_id:row.vacate_id
                        }
                        delvacate(data).then((res)=>{
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

        //职位列表查询
        queryStaffList(){
            queryVacatelist().then(res=>{
                this.tableData = res.data.data
                this.total = res.data.count
            })
        }
    },
    mounted(){
        this.queryStaffList()
    }
    
}
</script>

<style lang='scss'>
.search_wrap{
    height: 70px;
    width: 100%;
}
</style>

