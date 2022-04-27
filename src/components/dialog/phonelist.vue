<template>
      <el-dialog 
      :title="title" 
      width="25%"
      :visible.sync="showModal"
      class="cars_dialgo_center" 
      :close-on-click-modal= false
       @close ='closeModal'@opened ='openModal'>
       <img v-for="(item,index) in data" :src="item" :key="index" alt="" style="width:60%;">
      </el-dialog>
</template>

<script>
import { GetBrandLogo,BrandAdd,BrandDetailded ,BrandEdit} from '@/api/brand'
import FormData from '@c/form/index'
export default {
    props:{
      title:{
          type:String,
          default:""
      },
      flagVisible:{
          type:Boolean,
          default:false
      },
      data:{
          type:Array,
          default:()=>[]
      }
    },
    components:{FormData},
    data(){
        return{
            //表单配置
            formConfig:[
                    {type:'input' ,label:'品牌名称(中文)',placeholder:'请输入品牌名称(中文)',prop:'nameCh',},
                    {type:'input' ,label:'品牌名称(英文)',placeholder:'请输入品牌名称(英文)',prop:'nameEn',},
                    {type:'solt' , soltName:'imgBox', label:'LOGO', prop:'imgUrl'},
                    {type:'radio' ,label:'禁启用',prop:'status',option:this.$store.state.config.brand_status,},
          
            ],
            btnConfig:[
                {
                    type:'danger',label:'提交',hander:()=>this.submit()
                }
            ],
            form_data:{
                nameCh:'',
                nameEn:'',
                imgUrl:'',
                status: '',
                content: '',
            },
            showModal:false,
            
            //图片显示logo路劲
            imgSrc:'',
            //车辆品牌图标
            brandLogo:[],
            //车辆品牌禁启用
            brandStatus:this.$store.state.config.brand_status,
        }
    },
    methods:{
        //打开弹出框
        openModal(){
        },
        closeModal(){
            this.$emit('update:flagVisible',false)
        }
    },
    watch:{
        flagVisible:{
            handler(newValue,oldvalue){
               this.showModal = newValue
            },
        }
    }
}
</script>
