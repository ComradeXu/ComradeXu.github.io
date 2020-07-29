<template>
  <div>
    <el-header style="height: 40px;" class="theader">
      <el-button type="primary" size="mini" @click="dialogForm=true">添加</el-button>
    </el-header>
    <el-container>
      <el-main class="elTable">

        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" style="width:500px">
          <el-form-item label="名称" prop="name">
            <el-input size="small" v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="路由" prop="path">
            <el-input size="small" v-model="ruleForm.path"></el-input>
          </el-form-item>
          <el-form-item label="Vue模板" prop="vuepath">
            <el-input size="small" v-model="ruleForm.vuepath"></el-input>
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
          <el-form-item label="父级路由" prop="redirect">
            <el-input size="small" v-model="ruleForm.redirect"></el-input>
          </el-form-item>
          <el-form-item label="API" prop="api">
            <el-input size="small" v-model="ruleForm.api"></el-input>
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

        <div style="display:none">
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
            type="selection"
            width="55">
          </el-table-column>
          <!-- sortable="custom" -->
          <el-table-column
            fixed
            prop="id"
            label="ID"
            width="80"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="url"
            label="路径"
            width="300">
            <template slot-scope="scope">
              <a :href="scope.row.url" target="_blank">{{scope.row.url}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="bd_status"
            label="百度收录状态"
            width="120">
            <template slot-scope="scope">
              <pathTag :status="scope.row.bd_status" site="1" :id="scope.row.id" @checkStutas="checkStutas" />
            </template>
          </el-table-column>
          <el-table-column
            prop="mbd_status"
            label="手机端百度"
            width="120">
            <template slot-scope="scope">
              <pathTag :status="scope.row.mbd_status" site="2" :id="scope.row.id" @checkStutas="checkStutas" />
            </template>
          </el-table-column>
          <el-table-column
            prop="bd_kztime"
            label="百度快照时间"
            width="180">
            <template slot-scope="scope">
              {{scope.row.bd_kztime=='None'?'-':scope.row.bd_kztime}}
            </template>
          </el-table-column>
          <el-table-column
            prop="sg_status"
            label="搜狗收录状态"
            width="120">
            <template slot-scope="scope">
              <pathTag :status="scope.row.sg_status" site="3" :id="scope.row.id" @checkStutas="checkStutas" />
            </template>
          </el-table-column>
          <el-table-column
            prop="msg_status"
            label="手机端搜狗"
            width="120">
            <template slot-scope="scope">
              <pathTag :status="scope.row.msg_status" site="4" :id="scope.row.id" @checkStutas="checkStutas" />
            </template>
          </el-table-column>
          <el-table-column
            prop="sg_kztime"
            label="搜狗快照时间"
            width="180">
            <template slot-scope="scope">
              {{scope.row.sg_kztime=='None'?'-':scope.row.sg_kztime}}
            </template>
          </el-table-column>
          <el-table-column
            prop="sll_status"
            label="360收录状态"
            width="120">
            <template slot-scope="scope">
              <pathTag :status="scope.row.sll_status" site="5" :id="scope.row.id" @checkStutas="checkStutas" />
            </template>
          </el-table-column>
          <el-table-column
            prop="msll_status"
            label="手机端360"
            width="120">
            <template slot-scope="scope">
              <pathTag :status="scope.row.msll_status" site="6" :id="scope.row.id" @checkStutas="checkStutas" />
            </template>
          </el-table-column>
          <el-table-column
            prop="sll_kztime"
            label="360快照时间"
            width="180">
            <template slot-scope="scope">
              {{scope.row.sll_kztime=='None'?'-':scope.row.sll_kztime}}
            </template>
          </el-table-column>
          <el-table-column
            prop="sm_status"
            label="神马收录状态"
            width="120">
            <template slot-scope="scope">
              <pathTag :status="scope.row.sm_status" site="7" :id="scope.row.id" @checkStutas="checkStutas" />
            </template>
          </el-table-column>
          <el-table-column
            prop="input_date"
            label="创建时间"
            width="180">
            <template slot-scope="scope">
              {{scope.row.input_date=='None'?'-':scope.row.input_date}}
            </template>
          </el-table-column>
          <el-table-column
            prop="last_check"
            label="上次检测时间"
            width="180">
            <template slot-scope="scope">
              {{scope.row.last_check=='None'?'-':scope.row.last_check}}
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="80">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="用户"
            width="80">
          </el-table-column>
        </el-table>

        <pagination :pagesObj="pagesObj" :page.sync="pagesObj.page" :pageNum.sync="pagesObj.page_num" @pagination="fetchData" />


        </div>

        <!-- <div class="elPages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagesObj.page"
            :page-sizes="pagesObj.sizes"
            :page-size="pagesObj.page_num"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagesObj.total">
          </el-pagination>
        </div> -->

      </el-main>
    </el-container>
    <el-dialog
      title="批量检测"
      custom-class="diaForm"
      :visible.sync="dialogForm"
      width="900px"
      :before-close="dialogClose">
        <el-form :model="ruleForm" ref="ruleForm">
          <el-form-item>

          </el-form-item>
          <el-form-item class="diaBtn">
            <el-button type="info" size="small" @click="dialogForm=false">取消</el-button>
            <el-button type="primary" size="small" @click="submitForm">确定</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { add,menuList } from '@/api/menu'
import Pagination from '@/components/Pagination'

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
        parent_id: '1',
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        path: [{ required: true, message: '请输入路由', trigger: 'blur' }],
        vuepath: [{ required: true, message: '请输入Vue模板', trigger: 'blur' }],
        style: [{ required: true, message: '请输入图标', trigger: 'blur' }],
      },
      sHeight: sHeight_c,
      tagSize:'small',
      pagesObj:{page:1,page_num:20,total:0,sizes:[10, 15, 20, 50, 100]},

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      menuList().then(res => {
        console.log(res)
      })
      // this.loading=true;
      // pathList(this.pagesObj.page,this.pagesObj.page_num).then(res => {
      //   this.data=res.data.list;
      //   this.loading=false;
      //   this.pagesObj.total=res.data.total;
      //   this.pagesObj.page_num=res.data.page_num;
      // })
    },
    search_x(){

    },
    sort_change(da){
      if(da.prop) this.order_file=da.prop;
      if(da.order) this.order_type=(da.order=='descending')?'desc':'asc';
      if(da.order) this.fetchData();
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
            parent_id: datas.parent_id,
            redirect:datas.redirect,
            api:datas.api,
            workflow_id:0,
            blank:1,

          })
          console.log(data)
          add(data).then(res => {
            if(x=='iframeClose'){
              this.dialogForm=false;
            }
            if (res.status == 1) {
              this.$message.success({ message: res.message, duration: 3 * 1000 })
            }
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
            // this.fetchData()
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
    // submitForm(){
    //   var data = qs.stringify({
    //     classid:this.chkFlats,
    //     id:this.chkIds
    //   })
    //   if(this.chkFlats==''){
    //     this.$message.error({message: '请选择检测平台',duration: 3 * 1000});
    //     return
    //   }
    //   if(this.chkIds==''){
    //     this.$message.error({message: '请选择检测id',duration: 3 * 1000});
    //     return
    //   }
    //   this.chkFun(data);
    //   this.fetchData()
    //   this.dialogForm=false;
    // },
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
