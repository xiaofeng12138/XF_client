<template>
    <div>
     <el-form  inline ref="form"  :model="form_data" >
            <el-form-item v-for="(item,index) in formItem" :key="index" :label="item.label" :prop="item.prop" :rules="item.rules">
             <!-- input -->
            <el-input  v-if="item.type === 'input'" v-model="form_data[item.prop]" :placeholder="item.placeholder" :style="{'width':item.width}" :disabled="item.disabled"></el-input>
              <!-- select -->
            <el-select  v-if="item.type === 'select'" v-model="form_data[item.prop]" :style="{'width':item.width}">
               <el-option v-for="(tt,index) in item.options" :key="index" :label="tt.label" :value="tt.value"></el-option>
            </el-select>

            <!-- 省市区 -->
            <div v-if="item.type === 'city'">
                <CityArea  ref="city_temp" :areaValue.sync = 'city_type' />
            </div>
            <!-- 关键字 -->
            <div v-if="item.type === 'keyword'">
                <KeyWord ref="keyword_temp" :options="item.options" :value.sync = 'keyWord' />
            </div>
             <!-- slot -->
            <slot v-if="item.type == 'solt'" :name="item.soltName"></slot>
        </el-form-item>
        <!-- 按钮部分 -->
        <el-form-item>
          <el-button type="danger" @click="search">搜索</el-button>
          <el-button v-if="buttonConfig.resetButton" type="danger" @click="resetFn">重置</el-button>
            <template v-for="(item,index) in formHander">
              <router-link v-if="item.elememt === 'link'" :to="item.router"  :key="index" style="margin-left:15px">
                  <el-button  :type="item.type">{{item.label}}</el-button>
              </router-link>

               <el-button style="margin-left:15px" v-if="item.elememt === 'button'" :type="item.type" @click="item.handler && item.handler()">{{item.label}}</el-button>
            </template>
        </el-form-item>
        
     </el-form>
    </div>
</template>
<script>
import CityArea from '../cascader/index'
import KeyWord from '../keyword/index'
export default {
  components:{CityArea,KeyWord},
    props:{
       formItem:{
           type:Array,
           default:()=>[]
       },
       buttonConfig:{
         type:Object,
         default:()=>{}
       },
       formHander:{
           type:Array,
           default:()=>[]
       },
    },
    data(){
        return{
          keyWord:{},
          city_type:'',
          form_data:{}
        }
    },
    methods:{
      // download(){
      //   alert('3333')
      // },
      //重置函数
      resetFn(){
         this.$refs.form.resetFields();
         if(this.$refs.city_temp){this.$refs.city_temp[0].clearArea()}
         if(this.$refs.keyword_temp){this.$refs.keyword_temp[0].clear()}
      },
      //搜索
        search(){
          let requestObj ={}
          for(let key in this.form_data){
            if(this.form_data[key]){
              requestObj[key] = this.form_data[key]
            }
          }
          if(this.$refs.keyword_temp && this.keyWord.key && this.keyWord.value){
               requestObj[this.keyWord.key]  =  this.keyWord.value
          }
          //处理省市区字段
          if(this.$refs.city_temp && this.city_type){
               requestObj.area  =  this.city_type
          }
          this.$emit('componentFn',{
            function:'search',
            data:requestObj
          })
        },
      //重置表单
        resetForm(){
          this.$refs.form.resetFields()
        },
        initFormData(){
           this.formItem.forEach((item)=>{
                if(item.type === 'select'){this.selectOption(item)}
           })
        },
        //字段初始化
        initFormFeild(){
          let newobj = {}
           this.formItem.forEach((item)=>{
                if(item.prop){
                  newobj[item.prop] = ''
                }
           })
           this.form_data = newobj
        },
        //下拉选项
        selectOption(data){
          const options = this.$store.state.config[data.options]
          if(options){
             data.options = options
          }
        }
    },

  watch: {
    formItem: {
      handler(newValve) {
        this.initFormData();
        this.initFormFeild()
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

