<template>
    <div>
         <el-cascader  :class="{'cascader':isNull}" :placeholder="initValue" v-model="value" :props="props" @change = 'changeValue'></el-cascader>
    </div>
</template>
<script>
import { GetCity} from '@/api/parking.js'
export default {
    props:{
        areaValue:{
            type:String,
            default:""
        },
        mapLocation:{
            type:Boolean,
            default:false
        }
    },
    data() {
        const _this = this
        return {
            value:'',
            address:[],
            addressData:{},
            props: {
                lazy: true,
                lazyLoad (node, resolve) {
                    const { level } = node;
                    let requestData={}
                    const jsonType ={
                          0:{type:'province'},
                          1:{type:'city',code:'province'},
                          2:{type:'area',code:'city'},
                          3:{type:'street',code:'area'},
                    }
                    if(jsonType[level].code){ requestData[`${jsonType[level].code}_code`] = node.value}
                    requestData.type = jsonType[level].type
                    GetCity(requestData).then(res=>{
                        let data = res.data.data
                        let upValue = (jsonType[level].type).toUpperCase ()
                        // console.log((jsonType[level].type).toUpperCase ())
                        data.forEach((item)=>{
                                item.label = item[`${upValue}_NAME`]
                                item.value = item[`${upValue}_CODE`]
                                if(level === 3){ item.leaf = level >= 3 }
                        })
                        _this.addressData[jsonType[level].type] = data
                  
                     resolve(res.data.data)
                    })
                    if(node.level !== 0){
                     _this.getaddress(node)
                    }
                }
            },
            initValue:'请选择省市区',
            isNull:false
        }
    },
    methods:{
        initDefault(value){
            if(value){
               this.initValue = value.split(',').join(' / ')
               this.isNull = true
            }
        },
       clearArea(){
           this.value = ''
       },
        changeValue(e){
            this.$emit('update:areaValue', e.join()) //修改父组件传过来的值
            let code = e[e.length - 1]
            let streetData = this.addressData.street
            let newStreet = streetData.filter(item => item.STREET_CODE == code)[0].STREET_NAME
            this.address[3] = newStreet
            if(this.mapLocation){
                this.$emit('callback',this.address.join(""))
            }
        },
         getaddress(node){
            let index =  node.level - 1;
            this.address[index] = node.label
            if(this.mapLocation){
                this.$emit('callback',this.address.join(""))
            }
        },
    }
}
</script>

