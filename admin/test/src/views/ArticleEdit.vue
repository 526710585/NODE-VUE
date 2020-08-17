<template>
  <div>
    <H1>{{id?'编辑':'新建'}}文章</H1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.categories" multiple placeholder="请选择">
          <el-option
            v-for="item in articleCategories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor
          id="editor"
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="model.content"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { categoryUrl, articleUrl ,uploadUrl } from "../comm/config";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {
        categories: [],
        title: "",
      },
      categories: [],
    };
  },
  computed: {
    articleCategories() {
      return this.categories.filter((item) => {
        return item.parent && item.parent.name === "news";
      });
    },
  },
  props: {
    id: {
      type: String,
    },
  },
  watch: {
    id(newValue, oldValue) {
      if (newValue == undefined) {
        this.model = {};
      }
    },
  },
  created() {
    this.id && this.findArticle();

    this.getParents();
  },
  methods: {
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("file", file);

      var res = await this.$post(uploadUrl,formData)
      console.log(res);
      let url = res.url; // Get url from response
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
  
    },
    async save() {
      if (this.id) {
        this.editArticle();
      } else {
        this.createArticle();
      }
    },
    async findArticle() {
      var res = await this.$get(`${articleUrl}/${this.id}`);
      this.model = res.data;
    },
    async editArticle() {
      var res = await this.$put(`${articleUrl}/${this.id}`, this.model);
      if (res.result == 0) {
        this.$router.push("/articles/list");
        this.$message({
          type: "success",
          message: "修改成功",
        });
      } else {
        this.$message({
          type: "success",
          message: "修改失败",
        });
      }
    },
    async createArticle() {
      var res = await this.$post(articleUrl, this.model);
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async getParents() {
      var res = await this.$get(categoryUrl);
      this.categories = res.data;
    },
  },
};
</script>