<template>
  <div>
    <H1>{{id?'编辑':'新建'}}分类</H1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { categoryUrl } from "../comm/config";
export default {
  data() {
    return {
      model: {},
      parents: []
    };
  },
  props: {
    id: {
      type: String
    }
  },
  watch:{
    id(newValue,oldValue){
      if(newValue==undefined){
        this.model = {};
      }
    }
  },
  created() {
    this.id&&this.findCategory();

    this.getParents();
  },
  methods: {
    async save() {
      if (this.id) {
        this.editCategory();
      } else {
        this.createCategory();
      }
    },
    async findCategory() {
      var res = await this.$get(`${categoryUrl}/${this.id}`);
      this.model = res.data;
    },
    async editCategory() {
      var res = await this.$put(`${categoryUrl}/${this.id}`, this.model);
      if (res.result == 0) {
        this.$router.push("/categories/list");
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
    async createCategory() {
      var res = await this.$post(categoryUrl, this.model);
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async getParents() {
      var res = await this.$get(categoryUrl);
      this.parents = res.data;
    }
  }
};
</script>