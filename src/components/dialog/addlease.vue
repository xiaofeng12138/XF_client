<template>
      <el-dialog title="新增租赁类型" width="30%" 
      :visible.sync="showModal"
      class="cars_dialgo_center" 
      :close-on-click-modal= false 
      @close ='closeModal'
      @opened = 'openModal'
      >

      <FormData ref="vueForm" :formData="form_data" :formItem ="formConfig" :formBtn = "btnConfig"></FormData>
        </el-dialog>
</template>

<script>
import FormData from '@c/form/index'
import {LeaseAdd,LeaseEdit} from '@/api/lease.js'
export default {
    props:{
      flagVisible:{
          type:Boolean,
          default:false
      },
      data:{
          type:Object,
          default:()=>{}
      }
    },
    components:{FormData},
    data(){
        return{
            //表单配置
            formConfig:[
                    {type:'input' ,label:'租车类型', prop:'carsLeaseTypeName',required:true},
                    {type:'disabledRadio' ,label:'禁/启状态',prop:'carsLeaseStatus',required:true},
                    {type:'Textarea' ,label:'描述',prop:'carsLeaseDesc',},
          
            ],
            btnConfig:[
                {
                    type:'danger',label:'提交',hander:()=>this.submit()
                }
            ],
            form_data:{
                carsLeaseTypeName:'',
                carsLeaseStatus:'',
                carsLeaseDesc:''
            },
            showModal:false,
        }
    },
 
    methods:{
        //新增提交
        submit(){
              this.$refs.vueForm.$refs.form.validate((valid) => {
                if (valid) {
                   this.form_data.carsLeaseTypeId ? this.editFn():this.addFn()
                } else {
                    console.log('error submit!!');
                    return false;
                 }
                });
        },
        addFn(){
            LeaseAdd({...this.form_data}).then(res=>{
               if(res.resCode == 0){
                   this.$message.success(res.message)
                   this.showModal = false
                   this.$refs.vueForm.resetForm() //清空表单
                   this.$emit('callbackComponents',{
                       function:'loadData'
                   })
               }
            })
        },
         editFn(){
            LeaseEdit({...this.form_data}).then(res=>{
               if(res.resCode == 0){
                   this.$message.success(res.message)
                   this.showModal = false
                   this.$refs.vueForm.resetForm() //清空表单
                   this.$emit('callbackComponents',{
                       function:'loadData'
                   })
               }
            })
        },
        //打开弹出框
        openModal(){
        },

        closeModal(){
            this.$refs.vueForm.resetForm()
            //删除ID属性
            delete this.form_data.carsLeaseTypeId
            this.$emit('update:flagVisible',false)
        }
    },
    watch:{
        flagVisible:{
            handler(newValue,oldvalue){
               this.showModal = newValue
            }
        },
        data:{
            handler(newValue){
                let timer = null
                timer = setTimeout(() => {
                        this.form_data = newValue
                        clearTimeout(timer)
                    }, 10);
            }
        }
    }
}
</script>
