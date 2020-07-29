<template>
  <div>
    <el-header style="height: 40px;" class="theader">
      <el-button type="primary" size="mini" @click="addMenu(0)">添加</el-button>
    </el-header>
    <el-container>
      <el-main class="elTable elTablePage">

        <el-table
          v-loading="loading"
          border
          row-key="id"
          :data="data"
          style="width: 100%"
          :height="sHeight-90"
          min-height="250"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          highlight-current-row>
          <el-table-column prop="name" label="菜单名称" />
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="orders" label="排序" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="path" label="路由" />
          <el-table-column prop="style" label="图标" />
          <el-table-column prop="user_name" label="添加人" />
          <el-table-column prop="input_date" label="添加时间" />
          <el-table-column prop="remarks" label="备注" />
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            min-width="120"
            class-name="opaA">
            <template slot-scope="scope">
              <a href="javascript:;" @click="addMenu(scope.row.id)" :hidden="scope.row.parentid != 0">添加</a>
              <a href="javascript:;" @click="delMenu(scope.row.id)">删除</a>
            </template>
          </el-table-column>
        </el-table>

      </el-main>
    </el-container>
    <el-dialog
      title="添加菜单"
      custom-class="diaForm"
      :visible.sync="dialogForm"
      width="600px"
      :before-close="dialogClose">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px">
          <el-form-item label="名称" prop="name">
            <el-input size="small" v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="路由" prop="path">
            <el-input size="small" v-model="ruleForm.path" placeholder="例：content"></el-input>
          </el-form-item>
          <el-form-item label="Vue模板" prop="vuepath">
            <el-input size="small" v-model="ruleForm.vuepath" placeholder="例：content/index"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="style">
            <el-input size="small" v-model="ruleForm.style"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio v-model="ruleForm.status" :label="99">启用</el-radio>
            <el-radio v-model="ruleForm.status" :label="1">停用</el-radio>
          </el-form-item>
          <el-form-item label="排序" prop="orders">
            <el-input size="small" v-model="ruleForm.orders"></el-input>
          </el-form-item>
          <el-form-item label="重定向" prop="redirect">
            <el-input size="small" v-model="ruleForm.redirect" placeholder="暂时没用"></el-input>
          </el-form-item>
          <el-form-item label="API" prop="api">
            <el-input size="small" v-model="ruleForm.api" placeholder="为空即可"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
          </el-form-item>
          <el-form-item class="diaBtn">
            <el-button size="small" type="primary" @click="submitForm('ruleForm','iframeClose')">保存并关闭</el-button>
            <el-button size="small" type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button size="small" @click="resetForm">取消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { add,del,menuList } from '@/api/menu'
import Pagination from '@/components/Pagination'
import { getInfo } from '@/api/user'
import store from '@/store'

const sHeight_c = window.innerHeight-60;


export default {
  components: {
    Pagination
  },
  data() {
    return {
      loading:false,
      dialogForm:false,
      data:[],
      ruleForm: {
        name:'',
        path:'',
        vuepath:'',
        style:'',
        status: 99,
        orders:200,
        remarks:'',
        redirect:'',
        api:'',
      },
      parent_id: '0',
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        path: [{ required: true, message: '请输入路由', trigger: 'blur' }],
        vuepath: [{ required: true, message: '请输入Vue模板', trigger: 'blur' }],
        style: [{ required: true, message: '请输入图标', trigger: 'blur' }],
      },
      sHeight: sHeight_c,
      tagSize:'small',

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading=true;
      menuList().then(res => {
        this.data=res.data.list;
        this.loading=false;
      })
    },
    dialogClose(){
      this.dialogForm=false;
    },
    submitForm(formName,x){  //保存修改或者添加
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var datas = this.ruleForm
          var data = qs.stringify({
            name: datas.name,
            path: datas.path,
            vuepath: datas.vuepath,
            style: datas.style,
            status: datas.status,
            orders: datas.orders,
            remarks: datas.remarks,
            parent_id: this.parent_id,
            redirect:datas.redirect,
            api:datas.api,
            workflow_id:0,
            blank:1,

          })
          add(data).then(res => {
            if(x=='iframeClose'){
              this.dialogForm=false;
            }
            this.$message.success({ message: res.message, duration: 3 * 1000 })
            this.ruleForm = {
              name:'',
              path:'',
              vuepath:'',
              style:'',
              status: 99,
              orders:200,
              remarks:'',
              parent_id: '0',
            };
            this.fetchData()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(){  //取消添加
      this.dialogForm=false;
      this.ruleForm = {
        id: "0",
        name:'',
        path:'',
        vuepath:'',
        style:'',
        status: 99,
        orders:200,
        remarks:'',
        parent_id: '0',
      };
    },
    addMenu(id){
      this.parent_id=id;
      this.dialogForm=true;
      // getInfo().then(res => {
      //   console.log(res)
      // })
    },
    delMenu(id){
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = qs.stringify({
          id: id
        })
        del(data).then(res => {
          this.$message.success({ message: res.message, duration: 3 * 1000 })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .uploader {
    display: inline-block;
  }
  .theader .el-button:last-of-type {
    margin-right: 10px;
  }
</style>
