<template>
  <div class="elPages">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :current-page="pagesObj.page"
      :page-sizes="pagesObj.sizes"
      :page-size="pagesObj.page_num"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagesObj.total">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  props: {
    pagesObj: [Array,Object],
    page: {
      type: Number,
      default: 1
    },
    pageNum: {
      type: Number,
      default: 20
    },
    autoScroll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.pageNum
      },
      set(val) {
        this.$emit('update:pageNum', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.currentPage=1
      this.$emit('pagination', { page: this.currentPage, page_num: val })
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, page_num: this.pageSize })
    }
  }
}
</script>

<style scoped>

</style>
