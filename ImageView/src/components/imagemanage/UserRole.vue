<template>

  <div class="userROle">

    <el-card class="box-card" style="margin-bottom:20px">
      <div slot="header" >
         <el-button type="primary" @click="addUserRole" size="small" icon="el-icon-plus">新增</el-button>
      </div>

      <div>
        <el-table :data="tableData" border style="width: 100%"  >
          <el-table-column  prop="id" label="ID"> </el-table-column>
          <el-table-column  prop="name" label="角色"> </el-table-column>
          <el-table-column  prop="description" label="描述"> </el-table-column>
          <el-table-column  prop="createTime" label="创建时间"> </el-table-column>
          <el-table-column  prop="modifyTime" label="更新时间"> </el-table-column>

          <el-table-column prop="address" width="70px"  label="操作">
            <template slot-scope="scope">
              <el-button @click="handleEditClick(scope.row)" type="text" size="small"><i class="el-icon-edit"></i></el-button>
              <el-button @click="handleDelClick(scope.row)" type="text" size="small"><i class="el-icon-delete"></i></el-button>
            </template>
          </el-table-column>

        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
        :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>

      </div>
    </el-card>

    <el-dialog title="角色管理" :visible.sync="dialogFormVisible">

      <div class="dialogContent">
      
        <ul class="dialogUl">
          <li>
            <el-form class="demo-form-inline">
              <el-form-item label="角色">
                <el-input   placeholder="角色" v-model="userRole"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="userDes" ></el-input>
              </el-form-item>
            </el-form>
          </li>
          <li>
            <doctree @getNodeInfo='getNodeInfo' :show-checkbox="true" :treeData="treeData"></doctree>
          </li>
        </ul>
        <div class="dialogBottom">
          <el-button type="primary">{{btnText}}</el-button>
          <el-button type="success" @click="dialogFormVisible=false">返回</el-button>
        </div>
      </div>        

    </el-dialog>

  </div>
  
</template>

<script>
import Util from '../../utils/util';
import DocTree from '../../components/pubcomponent/treemanage/DocumentTree'

  export default {
    data() {
      return {
        curPage : 1,
        pageSize : 15,
        totalCount : 0,
        userRole : '',
        userDes : '',
        btnText : '',
        tableData: [],
        treeData: [],
        dialogFormVisible : false
      }
    },
    components : {
        doctree : DocTree
    },
    mounted : function(){
      this.getTabData();
    },
    methods : {
      handleSizeChange : function(size){
            
        this.pageSize = size;
        this.getTabData();
      },
      handleCurrentChange (se){

        this.curPage = se;
        this.getTabData();
      },
      addUserRole : function(){
        this.btnText = '保存';
        this.dialogFormVisible = true;
      },
      handleEditClick : function(obj){
        this.btnText = '修改';
        
        this.userRole = obj.name;
        this.userDes = obj.description;
        this.dialogFormVisible = true;
      },
      handleDelClick :  function(obj){
        ///role/queryPmsTree
        window.console.log(obj);

        if(obj.name=='系统管理员'){
          Util.showModelTip('warning','系统管理员不能删除!');
          return false;
        }else{
          let func = function(){
            Util.postRequest('delete',{id : obj.id},(res)=>{
              window.console.log(res);
            });
          }

          Util.showConfirm(this,'确定删除吗?','警告!',func);
        }

      },
      getTabData(){
        Util.getRequest(`/role/list?page=${this.curPage}&limit=${this.pageSize}`,(res)=>{
            this.curPage = res.body.number;
            this.totalCount = res.body.count;
            //this.tableData = res.body.data;
        });
      },
      getTreeData(){
        Util.getRequest(`/role/queryPmsTree`,(res)=>{
          window.console.log(res);
        });
      },
      getNodeInfo(obj){
            
          this.orgCode = obj.orgCode;
          this.orgName = obj.orgName;
          this.dialogFormVisible = false;
      }
    }
  }
</script>

<style lang="less" >
  .btnGroup{
    margin: 0px 2px;
  }
  .dialogContent{
    width: 100%;
    height: auto;
  }
  .dialogUl{
    display: flex;
    list-style: none;

    li{
      flex: 1;
    }

  }
  .dialogUl li:nth-last-child(1){
    height: 240px;
    overflow-y: scroll;
  }
  .dialogBottom{
    display: flex;
    width: 240px;
    margin: 5px auto;
    justify-content: space-between;
  }
</style>