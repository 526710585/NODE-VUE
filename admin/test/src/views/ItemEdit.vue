<template>
  <div>
    <H1>{{id?'编辑':'新建'}}物品</H1>
    <el-form label-width="120px" @submit.native.prevent="save">

      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
       <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :headers="getAuthHeaders()"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { itemUrl,uploadUrl } from "../comm/config";
export default {
  data() {
    return {
      model: {},
      uploadUrl:uploadUrl,
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
    console.log(uploadUrl);
    this.id && this.findItem();
    // this.getParents();
  },
  methods: {
    upload(event, file, fileList){
      console.log(event,file);
    },
    afterUpload(res){
      console.log(res);
      this.$set(this.model,'icon',res.url)
    },
    async save() {
      if (this.id) {
        this.editItem();
      } else {
        this.createItem();
      }
    },
    async findItem() {
      var res = await this.$get(`${itemUrl}/${this.id}`);
      this.model = res.data;
    },
    async editItem() {
      var res = await this.$put(`${itemUrl}/${this.id}`, this.model);
      if (res.result == 0) {
        this.$router.push("/items/list");
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
    async createItem() {
      var res = await this.$post(itemUrl, this.model);
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    }

  }
};
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>