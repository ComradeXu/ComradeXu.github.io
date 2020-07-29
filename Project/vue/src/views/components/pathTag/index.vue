<template>
  <el-button v-if="status=='收录'" type="success" :size="tagSize" :id="id" :site="site" disabled>{{status}}</el-button>
  <el-button v-else-if="status=='未收录'" type="info" :size="tagSize" :id="id" :site="site" @click="checkStutas">{{status}}</el-button>
  <el-button v-else-if="status=='未检测'" type="danger" :size="tagSize" :id="id" :site="site" @click="checkStutas">{{status}}</el-button>
  <el-button v-else-if="status=='检测中'" type="warning" :size="tagSize" :id="id" :site="site" disabled icon="el-icon-loading">{{status}}</el-button>
  <el-button v-else type="primary" :size="tagSize" :id="id" :site="site" @click="checkStutas">{{status}}</el-button>
</template>

<script>

export default {
  name: 'pathTag',
  props: {
    status: String,
    tagSize: {
      type: String,
      default: 'mini'
    },
    id: {
      type: [String,Number]
    },
    site: String,
  },
  methods:{
    checkStutas(){
      this.$emit('checkStutas', this.id,this.site);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
