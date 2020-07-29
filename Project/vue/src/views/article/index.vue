<template>
  <div>
    <!-- <el-header style="height: 40px;" class="theader"> -->
      <!-- <el-row type="flex" class="row-bg" justify="space-between"> -->
        <!-- <el-col :span="8"> -->
          <!-- <el-button type="success" size="mini" @click="add()">添加</el-button> -->
          <!-- <el-button type="primary" size="mini" @click="friendlys()">一键检测</el-button> -->
        <!-- </el-col> -->
        <!-- <el-col :span="16" class="topR"> -->
          <!-- <el-button size="mini" class="btn fr" @click="fetchData">搜索</el-button> -->
          <!-- <el-input
            ref="eltlb"
            v-model="nameKeys"
            class="fr"
            size="mini"
            style="width: 120px;"
            placeholder="请输入网站名称"
            @keyup.enter.native="KeyUpEscs(nameKeys)"
            @blur="KeyUpEscs(nameKeys)"
          /> -->
          <!-- <el-input
            ref="eltlb"
            v-model="nameKey"
            class="fr"
            size="mini"
            style="width: 120px;"
            placeholder="请输入公司名称"
            @keyup.enter.native="KeyUpEsc(nameKey)"
            @blur="KeyUpEsc(nameKey)"
          /> -->
        <!-- </el-col> -->
      <!-- </el-row> -->
    <!-- </el-header> -->

    <el-container class="cotent">
      <el-main class="elTable">
        <el-table
          id="first_table"
          v-loading="loading"
          border
          :data="data"
          style="width: 100%"
          :height="sHeight-140"
          min-height="250"
          highlight-current-row
          @sort-change="sort_change"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column
            fixed
            prop="id"
            label="ID"
            sortable="custom"
            width="80"
            show-overflow-tooltip
          />
          <!-- <el-table-column prop="bd_status" label="链接分类" /> -->
          <!-- <el-table-column prop="mbd_status" label="对方行业" /> -->
          <el-table-column prop="title" label="名称" />

          <el-table-column prop="status" label="状态" width="240">
            <template slot-scope="scope">
                <el-tag>{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="内容" >
           
          </el-table-column>
          <el-table-column prop="inputtime" label="添加时间" width="360" />

          <!-- <el-table-column prop="content" label="备注信息" /> -->
          <!-- <el-table-column
            fixed="right"
            align="center"
            label="操作"
            min-width="120"
            width="120"
            class-name="opaA"
          >
            <template slot-scope="scope"> -->
              <!-- <a href="javascript:;" @click="onefriendlys(scope.row)">子级</a> -->
              <!-- <a href="javascript:;">修改</a> -->
              <!-- <a href="javascript:;">删除</a> -->
            <!-- </template> -->
          <!-- </el-table-column> -->
        </el-table>
        <div class="elPages ml20">
          <el-pagination
            :current-page="pagesObj.page"
            :page-sizes="pagesObj.sizes"
            :page-size="pagesObj.page_num"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagesObj.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-main>
    </el-container>

    <el-dialog title="输入" :visible.sync="centerDialogVisible" width="680px" center>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px">
       <el-row>
          <el-col :span="24">
            <el-form-item label="栏目" prop="title">
              <el-input v-model="ruleForm.title" placeholder="请输入栏目" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addfriendlys('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getquanzhong,
  addlanmu
} from '@/api/article'
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'

const sHeight_c = window.innerHeight - 60
export default {
  data () {
    return {
      ruleForm: {
        title:''
      },
      centerDialogVisible: false,
      rules: {
        title: [{
          required: true,
          message: '请填写栏目',
          trigger: 'blur'
        }]
      },
      sHeight: sHeight_c,
      loading: false,
      name: '',
      data: [],
      nameKey: null,
      nameKeys: null,
      parentid:'',
      pagesObj: {
        page: 1,
        page_num: 15,
        total: 0,
        sizes: [10, 15, 20, 50, 100]
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    add () {
      this.centerDialogVisible = true
    },
    KeyUpEsc (e) {
      this.nameKey = e
      this.fetchData()
    },
    KeyUpEscs (e) {
      this.nameKeys = e
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      getquanzhong(this.pagesObj.page, this.pagesObj.page_num).then(res => {
          
             res.data.list.forEach(val => {
               val.inputtime = val.inputtime.replace(/T/g,' ')
             });
          this.data = res.data.list


        this.loading = false
        this.pagesObj.total = res.data.total_num
        this.pagesObj.page_num = Number(res.data.page_num)
      })
    },
    // 单条检测
    onefriendlys (row) {
      console.log(row)
         this.$router.push({name:'收集1',params: {parentid:row.id}})
    },
   // 添加
    addfriendlys (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addlanmu(this.ruleForm,0).then(res => {
            this.centerDialogVisible = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.fetchData()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
   

    search_x () {

    },
    sort_change (da) {
      if (da.prop) this.order_file = da.prop
      if (da.order) this.order_type = (da.order === 'descending') ? 'desc' : 'asc'
      if (da.order) this.get_data()
    },
    // 多选框
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      this.pagesObj.page_num = val
      this.pagesObj.page = 1
      this.fetchData()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.pagesObj.page = val
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__body {
  text-align: initial;
  padding: 10px 40px 10px 0px !important;
}

.box-card {
  margin: 10px 0;
}

.topX {
  width: 120px;
}

.opaA {
  a {
    color: #396fff;
    padding: 0 6px;
  }
}

.dialog >>> .el-dialog__body {
  padding: 10px 56px 10px 0px !important;
}
.theader .el-button:last-of-type {
  margin: 0;
}
.topR {
  .btn {
    margin-top: 5px !important;
    height: 28px;
  }
  .fr {
    float: right;
    margin-left: 10px !important;
  }
}
</style>
