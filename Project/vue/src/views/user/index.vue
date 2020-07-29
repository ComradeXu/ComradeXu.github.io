<template>
  <div>
    <el-header style="height: 40px;" class="theader">
      <el-button type="success" size="mini" @click="dialogForm=true">添加</el-button>
    </el-header>
    <el-container>
      <el-main class="elTable">
        <el-table
          v-loading="loading"
          id="first_table"
          border
          :data="data"
          style="width: 100%"
          :height="sHeight-140"
          min-height="250"
          highlight-current-row>
          <el-table-column
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="last_login"
            label="最近登录">
          </el-table-column>
          <el-table-column
            prop="reg_time"
            label="注册时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
        </el-table>

        <pagination :pagesObj="pagesObj" :page.sync="pagesObj.page" :pageNum.sync="pagesObj.page_num" @pagination="fetchData" />

      </el-main>
    </el-container>
    <el-dialog
      title="添加用户"
      custom-class="diaForm"
      :visible.sync="dialogForm"
      width="600px"
      :before-close="dialogClose">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model.number="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="diaBtn">
            <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { userList,addUser } from '@/api/user'
import Pagination from '@/components/Pagination'

const sHeight_c = window.innerHeight-60;
export default {
  components: {
    Pagination
  },
  data() {
    var validateMobile = (rule, value, callback) => {
      var mobileReg = /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/
      if (value == '') {
        callback(new Error('请输入手机号'));
      } else if (!mobileReg.test(value)) {
        callback(new Error('请输入正确的手机号'));
      }else{
        callback();
      }
    };
    return {
      sHeight: sHeight_c,
      loading:false,
      data:[],
      pagesObj:{page:1,page_num:20,total:0,sizes:[10, 15, 20, 50, 100]},

      dialogForm:false,
      ruleForm: {
        username: '',
        mobile: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: validateMobile, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur' }
        ]
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading=true;
      userList(this.pagesObj.page,this.pagesObj.page_num).then(res => {
        this.data=res.data.list;
        this.loading=false;
        this.pagesObj.total=res.data.total;
        this.pagesObj.page_num=res.data.page_num;
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var datas = this.ruleForm
          var data = qs.stringify({
            username:datas.username,
            mobile:datas.mobile,
            password:datas.password
          })
          addUser(data).then(res => {
            if(res.status==1){
              this.$message.success({message: res.message,duration: 3 * 1000});
              this.dialogForm=false;
              this.fetchData()
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    dialogClose(){
      this.dialogForm=false;
    },
  }
}
</script>

<style lang="scss" scoped>
  .diaForm .el-form-item {
    margin-bottom: 22px;
  }
</style>
