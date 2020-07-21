<template>
  <div>
    <H1>{{id?'编辑':'新建'}}英雄</H1>
    <el-form label-width="120px" @submit.native.prevent="save">

      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="分类" >
        <el-select v-model="model.categories" placeholder="请选择" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>


       <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="难度">
         <!-- <span class="demonstration">默认不区分颜色</span> -->
        <el-rate v-model="model.scores.difficulty" :max='10' ></el-rate>
      </el-form-item>

      <el-form-item label="技能">
         <!-- <span class="demonstration">默认不区分颜色</span> -->
        <el-rate v-model="model.scores.skill" :max='10' ></el-rate>
      </el-form-item>
      <el-form-item label="攻击">
         <!-- <span class="demonstration">默认不区分颜色</span> -->
        <el-rate v-model="model.scores.attack" :max='10' ></el-rate>
      </el-form-item>
      <el-form-item label="生存">
         <!-- <span class="demonstration">默认不区分颜色</span> -->
        <el-rate v-model="model.scores.existence" :max='10' ></el-rate>
      </el-form-item>


      <el-form-item label="顺风出装" >
        <el-select v-model="model.equipment.winning" placeholder="请选择" multiple>
          <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="逆风出装" >
        <el-select v-model="model.equipment.losing" placeholder="请选择" multiple>
          <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

  
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { heroUrl,uploadUrl,categoryUrl,itemUrl } from "../comm/config";
export default {
  data() {
    return {
      model: {
        scores:{
          difficulty:0,
          skill:0,
          attack:0,
          existence:0,
        },
        equipment:{
          winning:[],
          losing:[]
        }
      },
      uploadUrl:uploadUrl,
      categories:[],//英雄分类
      items:[],//物品分类
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
    this.findHeroCategories();
    this.findItems();
    console.log(uploadUrl);
    this.id && this.findItem();
    // this.getParents();
  },
  methods: {
    async findHeroCategories(){
      var res = await this.$get(categoryUrl);
      // console.log(res);
      this.categories = res.data.filter((item)=>{
        return item.parent&&item.parent.name=='hero'
      })
    },
    async findItems(){
      var res = await this.$get(itemUrl);
      // console.log(res);
      // this.categories = res.data.filter((item)=>{
      //   return item.parent&&item.parent.name=='hero'
      // })
      this.items = res.data;
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
      var res = await this.$get(`${heroUrl}/${this.id}`);
      this.model = res.data;
    },
    async editItem() {
      var res = await this.$put(`${heroUrl}/${this.id}`, this.model);
      if (res.result == 0) {
        this.$router.push("/heroes/list");
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
      var res = await this.$post(heroUrl, this.model);
      this.$router.push("/heroes/list");
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
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .el-form .el-form-item .el-rate{
    line-height: 40px;
  }
  .el-form .el-form-item .el-rate .el-rate__item{
    font-size:medium;
  }
</style>