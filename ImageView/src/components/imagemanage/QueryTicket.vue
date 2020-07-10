<template>
    <div>

        <el-card class="box-card" style="margin-bottom:20px">
            <div slot="header" class="clearfix">
                <span>查询条件</span>
            </div>

            <div >

                <el-form :inline="true" >

                    <el-form-item label="发票代码">
                        <el-input v-model="invoiceCode"></el-input>
                    </el-form-item>

                    <el-form-item label="发票编号">
                        <el-input  v-model="invoiceNumber"></el-input>
                    </el-form-item>

                    <el-form-item label="发票状态">
                        <el-select v-model="accountState" placeholder="请选择">
                            <el-option v-for="item in stateOptions" :key="item.value"
                            :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="发票类型">
                        <el-select v-model="accountType" placeholder="请选择">
                            <el-option v-for="item in typeOptions" :key="item.value"
                            :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" ><i class="el-icon-search"></i> 查询</el-button>
                    </el-form-item>
                </el-form>
                
            </div>
        </el-card>

        <el-card class="box-card" style="margin-bottom:20px">
            <div slot="header" >
                <el-button-group class="btnGroup">
                    <!-- <el-button type="primary">扫码查验</el-button> -->
                    <el-button type="primary" @click="exportExcel" size="small"><i class="el-icon-share"></i> 导出Excel</el-button>
                    <!-- <el-button type="primary">专票认证</el-button> -->
                </el-button-group>
            </div>
            <div >
            
                <el-table :data="tableData" border style="width: 100%" >
                    <el-table-column type="selection" width="35"> </el-table-column>
                    <el-table-column prop="type" label="发票类型" > </el-table-column>
                    <el-table-column prop="checkInvoice" label="发票状态" > </el-table-column>
                    <el-table-column prop="invoiceCode" label="发票代码"> </el-table-column>
                    <el-table-column prop="invoiceNumber" label="发票号码" > </el-table-column>
                    <el-table-column prop="invoiceDate" label="开票日期" > </el-table-column>
                    <el-table-column prop="lowercase" label="价税合计"> </el-table-column>
                    <el-table-column prop="sumAmount" label="开票金额" > </el-table-column>
                    <el-table-column prop="sumTax" label="合计税额"> </el-table-column>
                    <el-table-column prop="buyerName" label="购方名称"> </el-table-column>
                    <el-table-column prop="buyerNo" label="购方税号" > </el-table-column>
                    <el-table-column prop="sellerName" label="销方名称" > </el-table-column>
                    <el-table-column prop="sellerNo" label="销方税号"> </el-table-column>
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
        curPage : 1,
        pageSize : 15,
        totalCount : 0,
        tableData : [],
        invoiceCode : '',
        accountState : '',
        accountType : '',
        invoiceNumber : '',
        stateOptions : [
            {
                value:"0",label:"已识别"
            },{
                value:"1",label:"已查验"
            },{
                value:"2",label:"已认证"
            }
        ],
        typeOptions : [
            {
                value:"100",label:"专票"
            },{
                value:"101",label:"普票"
            },{
                value:"103",label:"卷票"
            }
        ]
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
      onSubmit(){
        this.getTabData();
      },
      getTabData(){
        Util.getRequest(`/invoice/list?page=${this.curPage}&limit=${this.pageSize}&invoiceCode=${this.invoiceCode}&invoiceNumber=${this.invoiceNumber}&checkInvoice=${this.accountState}&type=${this.accountType}`,(res)=>{
          this.curPage = res.body.number;
          this.totalCount = res.body.count;
          this.tableData = res.body.data;
        })
      },
      exportExcel(){

          /* Util.getRequest(`/invoice/getExcelDataCount`,()=>{
                
          }) */
          window.location.href = '/invoice/exportExcel';
      }
    }
  }
</script>

<style lang="less">
*{
    margin: 0px;
    padding: 0px;
}

.form-group label{
    padding: 5px;
}

.qselect{
    width: 195px;
}

</style>

