<template>
      <el-dialog title="车辆自定义属性添加" width="30%" :visible.sync="showModal"class="cars_dialgo_center" :close-on-click-modal= false @close ='closeModal'@opened = 'openModal'>

      <FormData ref="vueForm" :formData="form_data" :formItem ="formConfig" :formBtn = "btnConfig"></FormData>
        </el-dialog>
</template>

<script>
import FormData from '@c/form/index'
import {CarsAttrAdd} from '@/api/carstype.js'
export default {
    props:{
      flagVisible:{
          type:Boolean,
          default:false
      },
      data:{
          type:Object,
          default:()=>({})
      }
    },
    components:{FormData},
    data(){
        return{
            //表单配置
            formConfig:[
                    {type:'input' ,label:'当前属性', prop:'typeValue',disabled:true},
                    {type:'input' ,label:'字段',prop:'key',},
                    {type:'input' ,label:'文本',prop:'value',},
          
            ],
            btnConfig:[
                {
                    type:'danger',label:'提交',hander:()=>this.submit()
                }
            ],
            form_data:{
                key:'',
                value:'',
                typeValue:''
            },
            showModal:false,
        }
    },
    methods:{
         //清除表单函数
        resetForm(){
             
        },
        //新增提交
        submit(){
            const requsetData ={
                typeId:this.data.id,
                key:this.form_data.key,
                value:this.form_data.value
            }
            CarsAttrAdd(requsetData).then(res=>{
               if(res.resCode == 0){
                   this.$message.success(res.message)
                   this.$refs.vueForm.resetForm() //清空表单
               }
            })
        },
        //打开弹出框
        openModal(){
            // this.$refs.vueForm.resetForm() //清空表单
        },

        closeModal(){
            this.resetForm()
            this.$emit('update:flagVisible',false)
        }
    },
    watch:{
        flagVisible:{
            handler(newValue,oldvalue){
               this.showModal = newValue
            },
        },
        data:{
            handler(newValue){
                this.form_data.typeValue = newValue.value
            },
        }
    }
}
</script>
