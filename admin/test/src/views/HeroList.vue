<template>
  <div>
    <H1>物品列表</H1>
    <el-table :data="heroes" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column  label="图片">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50" fit="cover" :src="scope.row.icon"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/heroes/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="deleteIt(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { heroUrl } from "../comm/config";
export default {
  data() {
    return {
      heroes: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      var res = await this.$get(heroUrl);
      console.log(res);
      this.heroes = res.data;
    },
    deleteIt(data) {
      this.$confirm(`确认是否删除物品 "${data.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = data._id;
        this.delectCategory(id);
      });
    },
    async delectCategory(id) {
      let res = await this.$delete(`${heroUrl}/${id}`);
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