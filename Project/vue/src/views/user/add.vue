<template>
  <div>
    <el-header style="height: 40px;" class="theader">
      <el-button type="primary" size="mini" @click="dialogForm=true">添加</el-button>
    </el-header>
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { addUser } from '@/api/user'
  export default {
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
            { validator: validateMobile, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ruleForm {
    max-width: 600px;
  }
</style>
