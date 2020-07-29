<template>
  <div class="dashboard-container">
    <div class="dashboard-text">index22222222222</div>
  </div>
</template>

<script>
import { getInfo } from '@/api/user'
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'

export default {
  data() {
    return {
    }
  },
  created() {
    console.log(this.$router.options)
    console.log(global.antRouter)
    // this.getInfo()
  },
  methods: {
    getInfo() {
      getInfo().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
