<template>

  <div>

    <el-card class="box-card" style="margin-bottom:20px">
      <div slot="header" class="clearfix">
        <span>查询条件</span>
      </div>

      <div >

        <el-form :inline="true"  class="demo-form-inline">

          <el-form-item label="用户名">
              <el-input  placeholder="可模糊匹配" v-model="username"></el-input>
          </el-form-item>

          <el-form-item label="昵称">
              <el-input  placeholder="可模糊匹配" v-model="nickname"></el-input>
          </el-form-item>

          <el-form-item label="角色">
              <el-select v-model="role" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.label" 
                  :label="item.value" :value="item.label"> </el-option>
              </el-select>
          </el-form-item>

          <el-form-item>
              <el-button type="primary" v-on:click="searchBtn"><i class="el-icon-search"></i>搜索</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-card>


    <el-card class="box-card" style="margin-bottom:20px">
      <div slot="header" >
        <el-button-group class="btnGroup">
          <el-button type="success" @click="dialogFormVisible = true" icon="el-icon-plus">新增</el-button>
          <el-button type="primary" @click="updateUser" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" @click="deleteUser" icon="el-icon-delete-solid">删除</el-button>
        </el-button-group>

        <el-button-group class="btnGroup">
          <el-button type="warning" @click="resetPwd" icon="el-icon-key">重置密码</el-button>
          <el-button type="primary" @click="asyncUser" icon="el-icon-refresh">用户同步</el-button>
          <el-button type="success" @click="exportUser" icon="el-icon-position">用户导出</el-button>
          <el-button type="success" @click="compRole" icon="el-icon-s-platform">机构权限</el-button>
        </el-button-group>
      </div>

      <div >
        
        <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="username" label="用户名"> </el-table-column>
          <el-table-column prop="nickname" label="昵称"> </el-table-column>
          <el-table-column prop="phone" label="手机"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间"> </el-table-column>
          <el-table-column prop="modifyTime" label="更新时间"> </el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.state" v-if="scope.row.username=='admin'" active-value="1" inactive-value="0" disabled></el-switch>
              <el-switch v-model="scope.row.state" v-else active-value="1" inactive-value="0" @change="changeState(scope.row)"></el-switch>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
        :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>

      </div>
    </el-card>

    <el-dialog title="用户管理..." :visible.sync="dialogFormVisible">
        <el-form >
            <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input  autocomplete="off" v-model="username" placeholder="用户名"></el-input>
            </el-form-item>
        </el-form>
        <el-form >
            <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input  autocomplete="off" v-model="password" placeholder="密码"></el-input>
            </el-form-item>
        </el-form>
        <el-form >
            <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input  autocomplete="off" v-model="nickname" placeholder="昵称"></el-input>
            </el-form-item>
        </el-form>
        <el-form >
            <el-form-item label="生日" :label-width="formLabelWidth">
            <el-input  autocomplete="off" v-model="birthday"></el-input>
            </el-form-item>
        </el-form>
        <el-form >
            <el-form-item label="性别" :label-width="formLabelWidth">
              <template>
                <el-radio v-model="radio" label="1">男</el-radio>
                <el-radio v-model="radio" label="2">女</el-radio>
              </template>
            </el-form-item>
        </el-form>
        <el-form >
            <el-form-item label="手机" :label-width="formLabelWidth">
            <el-input  autocomplete="off" v-model="phonenumber" placeholder="手机号"></el-input>
            </el-form-item>
        </el-form>
        <el-form >
            <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input  autocomplete="off" v-model="telephone" placeholder="电话"></el-input>
            </el-form-item>
        </el-form>
        <el-form >
            <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input  autocomplete="off" v-model="email" placeholder="邮箱"></el-input>
            </el-form-item>
        </el-form>
        <el-form >
            <el-form-item label="角色" :label-width="formLabelWidth">
              <template>
                系统管理员 <el-switch v-model="value1" active-value="1630e2d1-ddc1-4cd9-9c27-cfaa882d0463" inactive-value="''"></el-switch>
                专岗 <el-switch v-model="value2" active-value="d0480e92-d9bd-45c7-ad80-0afb99567458" inactive-value="''"></el-switch>
                发票管理 <el-switch v-model="value3" active-value="7d3ca979-8e19-43eb-86cd-be913d40ffc9" inactive-value="''"></el-switch>
                邮包管理 <el-switch v-model="value4" active-value="13e8b40d-b981-42ef-a2b2-3e2bccbecb6a" inactive-value="''"></el-switch>
                测试角色 <el-switch v-model="value5" active-value="a23943d4-87d7-4602-a46a-0fe0e82c2c51" inactive-value="''"></el-switch>
              </template>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" @click="addUser">保 存</el-button>
            <el-button type="success" size="small" @click="dialogFormVisible=false">关 闭</el-button>
        </div>
    </el-dialog>

  </div>
  
</template>

<script>
import Util from '../../utils/util';

  export default {
    data() {
      return {
        curPage : 1,
        pageSize : 15,
        totalCount : 0,
        tableData : [],
        radio: '1',
        role : '',
        username : '',
        nickname : '',
        password : '',
        birthday : '',
        phonenumber : '',
        telephone : '',
        email : '',
        value1 : '',
        value2 : '',
        value3 : '',
        value4 : '',
        value5 : '',
        options : [
          {
            label : '1630e2d1-ddc1-4cd9-9c27-cfaa882d0463',
            value : '系统管理员'
          },
          {
            label : 'd0480e92-d9bd-45c7-ad80-0afb99567458',
            value : '专岗'
          },
          {
            label : '7d3ca979-8e19-43eb-86cd-be913d40ffc9',
            value : '发票管理'
          },
          {
            label : '13e8b40d-b981-42ef-a2b2-3e2bccbecb6a',
            value : '邮包管理'
          },
          {
            label : 'a23943d4-87d7-4602-a46a-0fe0e82c2c51',
            value : '测试角色'
          }
        ],
        multipleSelection : [],
        formLabelWidth : '85px',
        dialogFormVisible : false
      }
    },
    mounted : function(){
      this.getTabData();
    },
    methods : {
      getTabData(){
          Util.getRequest(`/user/list?page=${this.curPage}&limit=${this.pageSize}`,(res)=>{
              this.curPage = res.body.number;
              this.totalCount = res.body.count;
              //this.tableData = res.body.data;
          });
      },
      handleSizeChange : function(size){
        
        this.pageSize = size;
        this.getTabData();
      },
      handleCurrentChange (se){

        this.curPage = se;
        this.getTabData();
      },
      addUser : function(){

        
        var parm = {
            sex :this.radio,
            role :"a23943d4-87d7-4602-a46a-0fe0e82c2c51",
            username :this.username ,
            nickname :this.nickname ,
            password :this.password ,
            birthday :this.birthday ,
            phone :this.phonenumber,
            telephone :this.telephone,
            email :this.email,
            ids:this.value1+','+this.value2+','+this.value3+','+this.value4+','+this.value5
        }
        window.console.log(parm);
        Util.postRequest('/user/save',{parm},(res)=>{
          window.console.log(res);
        });

      },
      searchBtn : function(){
        Util.getRequest(`/user/list?page=${this.curPage}&limit=${this.pageSize}&username=${this.username}&nickname=${this.nickname}&role=${this.role}`,(res)=>{
          this.tableData = res.body.data;
        });
      },
      updateUser : function(){

        let func = function(){
          window.console.log(1)
        }
        Util.showConfirm(this,'dl','l',func);

        if(this.multipleSelection.length<=0){
            Util.showTips('warning','请先勾选要更新的用户!','top-left');
            return false;
        }else if(this.multipleSelection.length>1){
            Util.showTips('warning','只能勾选一个要更新的用户!','top-left');
            return false;
        }else{
           window.console.log(1)
        }

      },
      deleteUser : function(){

        if(this.multipleSelection.length<=0){
            Util.showTips('warning','请先勾选要删除的用户!','top-left');
            return false;
        }else if(this.multipleSelection.length>1){
            Util.showTips('warning','只能勾选一个要删除的用户!','top-left');
            return false;
        }else{
          let func = function(){
            Util.deleteRequest();
          }
          Util.showConfirm(this,'确定更新吗?','提示!',func);
        }

      },
      resetPwd : function(){

        if(this.multipleSelection.length<=0){
          Util.showTips('warning','请先勾选要重置密码的用户!','top-left');
          return false;
        }else if(this.multipleSelection.length>1){
          Util.showTips('warning','只能勾选一个要重置密码的用户!','top-left');
          return false;
        }else{
          Util.postRequest('/user/resetPwd',{id:this.multipleSelection[0].id},(res)=>{
            window.console.log(res);
          });
        }

      },
      asyncUser : function(){

        let func = function(){
          Util.getRequest('/syncUser');
        }
        Util.showConfirm(this,'确定同步NC用户吗?','提示!',func);

      },
      exportUser : function(){
        window.location.href = '/user/downloadAllUser';
      },
      handleSelectionChange : function(row){
        this.multipleSelection.push(row);
      },
      compRole (){
        /* /user/getDepartTreeJson */

        if(this.multipleSelection.length <= 0){
          Util.showTips('warning','请先选择要查看的权限!','top-left');
          return false;
        }

        Util.postRequest(`/user/getDepartTreeJson`,{username:this.multipleSelection[0].username},(res)=>{
          window.console.log(res);
        }) 

      },
      changeState(row){

        Util.postRequest('/user/enable',{id:row.id,state:0},(res)=>{
          window.console.log(res);
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .btnGroup{
    margin: 0px 2px;
  }
</style>