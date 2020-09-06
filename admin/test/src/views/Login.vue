<template>
  <el-card header='请先登录' class="box-card">
    
    <el-form >
    <el-form-item label="用户名">
      <el-input v-model="model.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="model.passWord"></el-input>
    </el-form-item>

    <el-button type="primary" @click="login">登陆</el-button>

</el-form>
  </el-card>
</template>


<script>
import {loginUrl} from '../comm/config'
export default {
  data() {
    return {
      model: {},
    };
  },
  methods:{
    async login(){
      console.log(this.model);
      var res = await this.$post(loginUrl,this.model);
      localStorage.token = res.token;
      this.$store.commit("saveUserName",this.model.userName)
      this.$router.push('/')
      this.$message({
        type:'success',
        message:'登陆成功'
      })
    }
  }
};
</script>
<style lang="css">
.box-card {
  width: 25rem;
  margin: 10rem auto;
}
</style>