<template>
      <el-dialog :title= "data.parkingName" @opened ="openModal" :visible.sync="showModal" class="cars_dialgo_center" :close-on-click-modal= false @close ='closeModal'>
       
      <div style="height:500px">
          <Amap ref="amap" />
      </div>
     </el-dialog>
</template>

<script>
import Amap from '@/views/Amap/index'
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
    components:{Amap},
    data(){
        return{
            showModal:false,
          
        }
    },
    methods:{
        //打开弹出窗
        openModal(){
            this.$refs.amap.mapCreate()  //重新创建地图
            //DOM加载完成后执行
            this.$nextTick(()=>{
                let lnglatArray = this.data.lnglat.split(',')
                let lnglat = {
                    lon:lnglatArray[0],
                    lat:lnglatArray[1],
                }
               this.$refs.amap.setMarker(lnglat)
            })
        },
        closeModal(){
            this.$emit('update:flagVisible',false)
            
            //销毁地图
            this.$refs.amap.Destory()
        }
    },
    watch:{
        flagVisible:{
            handler(newValue,oldvalue){
               this.showModal = newValue
            },
             immediate:true
        }
    }
}
</script>
