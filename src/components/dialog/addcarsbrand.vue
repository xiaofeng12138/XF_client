<template>
      <el-dialog title="新增品牌车辆" :visible.sync="showModal"class="cars_dialgo_center" :close-on-click-modal= false @close ='closeModal'@opened = 'openModal'>

      <FormData ref="vueForm" :formData="form_data" :formItem ="formConfig" :formBtn = "btnConfig">
           <template v-slot:imgBox = 'slotData'>
                 <div class="img_upload_wrap">
                    <div class="upload_img">
                        <img v-show="imgSrc" :src="imgSrc">
                    </div>
                    <div class="img_list">
                        <ul>
                            <li v-for="(item,index) in brandLogo" @click="imgSrc = item.img"> <img :src="item.img" :alt="item.name" ></li>
                        </ul>
                    </div>
                </div>
            </template>
        </FormData>


        <!-- <el-form :model="form" ref="form">
            <el-form-item label="品牌名称（中文）" label-width="120px" prop="nameCh">
                <el-input v-model="form.nameCh" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="品牌名称（英文）" label-width="120px" prop="nameEn">
                <el-input v-model="form.nameEn" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="LOGO" label-width="120px">
                <div class="img_upload_wrap">
                    <div class="upload_img">
                        <img v-show="imgSrc" :src="imgSrc">
                    </div>
                    <div class="img_list">
                        <ul>
                            <li v-for="(item,index) in brandLogo" @click="imgSrc = item.img"> <img :src="item.img" :alt="item.name" ></li>
                        </ul>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="禁启用" label-width="120px" prop="status">
                <el-radio-group v-model="form.status">
                   <el-radio v-for="(item,index) in brandStatus" :key="index"  :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
           </el-form-item>
            <el-form-item  label-width="120px">
                 <el-button  type="danger" @click="submit">提交</el-button>
           </el-form-item>
        </el-form> -->
        </el-dialog>
</template>

<script>
import { GetBrandLogo,BrandAdd,BrandDetailded ,BrandEdit} from '@/api/brand'
import FormData from '@c/form/index'
export default {
    props:{
      flagVisible:{
          type:Boolean,
          default:false
      },
      configId:{
          type:String,
          default:""
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
         //清除表单函数
        resetForm(){
             for(let key in this.form_data){
                 this.form_data[key] = ''
             }
             this.imgSrc = ''
        },
        //新增提交
        submit(){
            let _that = this
            this.form_data.imgUrl = this.imgSrc
            if(this.configId){
               this.editSubmit() 
               this.closeModal()
               _that.$emit("tt")
            }else{
                 BrandAdd(this.form_data).then(res=>{
                if(res.resCode == 0){
                    this.$message.success(res.message)
                    this.showModal = false
                    this.closeModal()
                     _that.$emit("tt")
                    
                }
             })
          }
           
        },

        //编辑提交
        editSubmit(){
            let requsetData = JSON.parse(JSON.stringify(this.form_data))
            requsetData.id = this.configId
            BrandEdit(requsetData).then(res=>{
                if(res.resCode == 0){
                    this.$message.success(res.message)
                    // this.resetForm()
                    this.showModal = false
                }
            })
        },
       
        //打开弹出框
        openModal(){
            this.getDetailed()
            if(this.brandLogo.length >0){return false }
            GetBrandLogo().then(res=>{
                if(res.data){
                    this.brandLogo = res.data
                }
            })
        },

        //获取编辑详情
        getDetailed(){
            if(!this.configId){ return false }
            let requsetData ={
                id:this.configId
            }
            BrandDetailded(requsetData).then(res=>{
                this.form_data = res.data
                this.imgSrc = res.data.imgUrl
            })
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
        }
    }
}
</script>
