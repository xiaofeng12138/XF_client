<template>
  <div class="mainWrap">
      <div class="title">
        <p>欢迎登录企业人事管理系统</p>
      </div>
      <div class="content">
        <div class="c_left">
          当前注册用户：{{UserNum}} 人
        </div>
        <div class="c_right">
          当前部门：{{dpNum}} 个
        </div>
      </div>
       <div class="content">
        <div class="c_left">
          当前职位数：{{JobNum}} 个
        </div>
        <div class="c_right">
          当前员工数：{{StaffNum}} 人
        </div>
      </div>
  </div>
</template>

<script>
import {queryInfo} from '@/api/login.js'
export default {
  data() {
    return {
       dpNum:0,
       JobNum:0,
       StaffNum:0,
       UserNum:0
    }
  },
  methods:{
    queryAllInfo(){
      queryInfo().then(res=>{
        this.dpNum = res.data.dpNum[0].dpNum
        this.JobNum = res.data.JobNum[0].JobNum
        this.StaffNum = res.data.StaffNum[0].StaffNum
        this.UserNum = res.data.UserNum[0].UserNum
      })
    }
  },
  mounted(){
    this.queryAllInfo()
  }
}
</script>
<style lang="scss" scoped>
.mainWrap{
  width: 100%;
  height:100%;
  background-color: pink;
  background: url('~@/assets/bg.png') no-repeat 100% 100%;
  .title{
    width: 100%;
    text-align: center;
    p{
      font-size: 40px;
      font-weight: bold;
      color: #fff;
      padding-top: 50px;
    }
  }
  .content{
    width: 100%;
    margin-top: 50px;
    display: flex;
    div{
      color: #fff;
      width: 50%;
      height: 200px;
      line-height: 200px;
      font-size: 25px;
      text-align: center;
    }
  }
}
</style>