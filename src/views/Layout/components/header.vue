<template>
<el-row>
  <el-col :span="12">
  <span class="menu-btn" @click="switchAside">
    <svg-icon icon="menuBtn" className="icon-menu-btn"></svg-icon>
  </span>
  </el-col>
  <el-col :span="12">
    <span class="logout" @click="logout">
      <svg-icon icon="logout" className="icon-logout"></svg-icon>
    </span>
    <div class="face-info">
      <img src="../../../assets/face.png" :alt="username">
      <span class="name">{{ username }}</span>
    </div>
  </el-col>
</el-row>
</template>

<script>
import {getUsername,removeCookie,removeUsername} from "@/utils/cookies";
export default {
  data(){
     return {
        username:getUsername()
     }
  },
  methods:{
    switchAside(){
      this.$store.commit('app/SET_COLLAPSE')
    },
    logout(){
        this.$confirm('是否确认退出', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center:true
        }).then(() => {
           removeCookie()
           removeUsername()
           this.$message.success('退出成功')
           this.$router.push('/login')
        }).catch(() => {});
    }
  },
}
</script>
<style lang="scss" scoped>
.menu-btn { 
  display: inline-block;
  padding-top: 24px;
  cursor: pointer;
}
.logout {
  float: right;
  border-left: 1px solid #ededed;
  width: 75px;
  text-align: center;
  line-height: 75px;
  font-size: 25px;
  margin-right: -20px;
  cursor: pointer;
}
.face-info {
  float: right;
  padding: 18px 30px 0 0;
  img {
    display: inline-block;
    vertical-align: middle;
    border-radius: 100px;
    margin-right: 18px;
  }
}
</style>