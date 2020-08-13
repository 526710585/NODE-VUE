<template>
  <div>
    <H1>文章列表</H1>
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <!-- <el-table-column prop="parent.categories.name" label="上级分类"></el-table-column> -->
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="deleteIt(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { articleUrl } from "../comm/config";
export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      var res = await this.$get(articleUrl);
      console.log(res);
      this.items = res.data;
    },
    deleteIt(data) {
      this.$confirm(`确认是否删除文章 "${data.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = data._id;
        this.delectArticle(id);
      });
    },
    async delectArticle(id) {
      let res = await this.$delete(`${articleUrl}/${id}`);
      if (res.result == 0) {
        this.getData();
        this.$message({
          type: "success",
          message: "删除成功"
        });
      } else {
        this.$message({
          type: "info",
          message: "删除失败"
        });
      }
    }
  }
};
</script>