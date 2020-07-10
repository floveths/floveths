<template>

  <div>

    <el-card class="box-card" style="margin-bottom:20px">
      <div slot="header" class="clearfix">
        <span>查询条件</span>
      </div>

      <div>

        <el-form :inline="true" >

            <el-form-item label="单据日期">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择单据日期"  v-model="qdate" ></el-date-picker>
            </el-form-item>

            <el-form-item label="单据号">
                <el-input  v-model="billNum" placeholder="可模糊匹配"></el-input>
            </el-form-item>

            <el-form-item label="业务流水">
                <el-input v-model="businessSerialNo" placeholder="可模糊匹配"></el-input>
            </el-form-item>

            <el-form-item label="单据类型名称">
                <el-input v-model="billTypeName" placeholder="可模糊匹配"></el-input>
            </el-form-item>

            <el-form-item label="机构名称">
                <el-input v-model="orgName" placeholder="可模糊匹配"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>

      </div>
    </el-card>


    <el-card class="box-card" style="margin-bottom:20px">
      <div slot="header" >
        <el-button-group class="btnGroup">
          <el-button type="primary">人工登记</el-button>
          <el-button type="primary">扫码登记</el-button>
        </el-button-group>

        <el-button-group class="btnGroup">
          <el-button type="primary" @click="singleScan" >单笔扫描</el-button>
          <el-button type="primary">批量扫描</el-button>
        </el-button-group>
      </div>

      <div >
        
        <el-table :data="tableData" border style="width: 100%" @select="handleSelectionChange" >
          <el-table-column type="selection" width="35" > </el-table-column>
          <el-table-column prop="billNum" label="单据号"> </el-table-column>
          <el-table-column prop="businessSerialNo" label="业务流水"> </el-table-column>
          <el-table-column prop="billDate" label="单据日期"> </el-table-column>
          <el-table-column prop="billTypeName" label="单据类型"> </el-table-column>
          <el-table-column prop="cash" label="金额"> </el-table-column>
          <el-table-column prop="userId" label="制单人"> </el-table-column>
          <el-table-column prop="orgName" label="机构"> </el-table-column>
          <el-table-column prop="taskStateName" label="单据状态"></el-table-column>
        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
          :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>

      </div>
    </el-card>


  </div>
  
</template>

<script>
import Util from '../../utils/util';

  export default {
    data() {
      return {
        qdate : '',
        orgName : '',
        billNum : '',
        billTypeName : '',
        businessSerialNo : '',
        curPage : 1,
        pageSize : 15,
        totalCount : 0,
        tableData : [],
        selectArr : []
      }
    },
    mounted : function(){
      this.getTabData();
    },
    methods :{
      handleSizeChange : function(size){
        
        this.pageSize = size;
        this.getTabData();
      },
      handleCurrentChange (se){

        this.curPage = se;
        this.getTabData();
      },
      handleSelectionChange (se){
        
        this.selectArr = se;
      },
      getTabData(){
        this.qdate = Util.isNullStr(this.qdate);
        this.orgName = Util.isNullStr(this.orgName);
        this.billNum = Util.isNullStr(this.billNum);
        this.billTypeName = Util.isNullStr(this.billTypeName);
        this.businessSerialNo = Util.isNullStr(this.businessSerialNo);
        Util.getRequest(`/task/listBill?page=${this.curPage}&limit=${this.pageSize}&billDate=${this.qdate}&billNum=${this.billNum}&businessSerialNo=${this.businessSerialNo}&billTypeName=${this.billTypeName}&orgName=${this.orgName}`,(res)=>{
          this.curPage = res.body.number;
          this.totalCount = res.body.count;
          this.tableData = res.body.data;
        })
      },
      onSubmit(){
        this.getTabData();
      },
      singleScan(){
        if(this.selectArr.length <= 0){
          Util.showModelTip('warning','请勾选一条要扫描的单据');
          return false;
        }
        if(this.selectArr.length > 1){
          Util.showModelTip('warning','一次只能勾选一条要扫描的单据');
          return false;
        }

        //var task = this.selectArr[0];

        /* var url = '/H5/ImagesScan.html?scantype=' + 1 +
                    '&BusinessSerialNo=' + task.businessSerialNo +
                    '&billNum=' + task.billNum +
                    '&userNo=' + [[${userNo}]] +
                    '&departnum=' + task.orgCode +
                    '&billtypename='+task.billTypeName +
                    '&systemcode=' + task.systemCode +
                    '&SaveType=' + 2 +
                    '&userid=' + [[${userId}]];
                window.open(url); */

      }
    }
  }
</script>

<style lang="less" scoped>
  .btnGroup{
    margin: 0px 2px;
  }
</style>