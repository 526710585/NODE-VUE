<template>
  <div>
    <H1>分类列表</H1>
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
        items:[]
    };
  },
  created(){
      
  },
  methods: {
      
  },
};
</script>