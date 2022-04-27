<template>
  <el-row :gutter="20">
      <el-col :span="8">
          <el-select  v-model="search_key" placeholder="请选择" @change="entryInput" >
                    <el-option v-for="(item,index) in select_Value" :label="item.label" :value="item.value" :key="index"></el-option>
          </el-select>
      </el-col>
      <el-col :span="16">
           <el-input  placeholder="请输入关键字" v-model="search_value" @input = "entryInput"></el-input>
      </el-col>
  </el-row>
</template>

<script>
export default {
    props:{
        options:{
            type:Array,
            default:[]
        }
    },
    data() {
        return {
            search_key:'',
            search_value:'',
            select_Value:[],
            config_options:this.$store.state.config.keyWord_options
        }
    },
    methods:{
        clear(){
            this.search_key = ''
            this.search_value = ''
        },
        //输入文字时触发事件
        entryInput(value){
            let keyword = {}
            keyword.key = this.search_key
            keyword.value = this.search_value
            this.$emit('update:value',keyword) //反向修改父组件的数值
        },
        initOptions(){
              let optinonsItem = []
              this.options.forEach((item)=>{
                const data =  this.config_options.filter(ele => ele.value == item)
                optinonsItem = optinonsItem.concat(data)
              })
              this.select_Value = optinonsItem
        }
    },
    watch:{
        options:{
            handler(newValue){
                this.initOptions()
            },
            immediate:true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
