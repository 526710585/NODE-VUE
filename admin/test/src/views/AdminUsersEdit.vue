<template>
  <div>
    <H1>{{id?'编辑':'新建'}}管理员</H1>
    <el-form label-width="120px" @submit.native.prevent="save">

      <el-form-item label="账号">
        <el-input v-model="model.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.passWord"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { adminUsersUrl } from "../comm/config";
export default {
  data() {
    return {
      model: {}
    };
  },
    watch:{
    id(newValue,oldValue){
      if(newValue==undefined){
        this.model = {};
      }
    }
  },
  props: {
    id: {
      type: String
    }
  },
  created() {
    this.id && this.findAdminUsers();
    // this.getParents();
  },
  methods: {

    async save() {
      if (this.id) {
        this.editAdminUsers();
      } else {
        this.createAdminUsers();
      }
    },
    async findAdminUsers() {
      var res = await this.$get(`${adminUsersUrl}/${this.id}`);
      this.model = res.data;
    },
    async editAdminUsers() {
      var res = await this.$put(`${adminUsersUrl}/${this.id}`, this.model);
      if (res.result == 0) {
        this.$router.push("/admin_users/list");
        this.$message({
          type: "success",
          message: "修改成功"
        });
      } else {
        this.$message({
          type: "success",
          message: "修改失败"
        });
      }
    },
    async createAdminUsers() {
      var res = await this.$post(adminUsersUrl, this.model);
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    }

  }
};
</script>
<style>

  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>