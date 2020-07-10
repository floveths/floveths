<template>
    
    <div class="approvalBox">

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="ID"> </el-table-column>
            <el-table-column prop="orgName" label="机构名称"> </el-table-column>
            <el-table-column prop="applicationNumber" label="申请单号"> </el-table-column>
            <el-table-column prop="applicationDate" label="申请日期"> </el-table-column>
            <el-table-column prop="applicationReason" label="借阅原因"> </el-table-column>
            <el-table-column prop="borrowEndDate" label="借阅区间"></el-table-column>
            <el-table-column prop="approvalStatusName" label="审批状态"></el-table-column>
        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
        :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>

    </div>

</template>
<script>
import Util from '../../utils/util';

export default {
    data : function(){
        return {
            curPage : 1,
            pageSize : 15,
            totalCount : 0,
            tableData : []
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
      getTabData(){
        Util.getRequest(`/voucherBorrow/reviewApproval?voucherType=0&approvalStatus=1&page=${this.curPage}&limit=${this.pageSize}`,(res)=>{
          
          this.curPage = res.body.number;
          this.totalCount = res.body.count;
          this.tableData = res.body.data;
        })
      },
      upBox (){
          if(this.selType.length<=0){
              Util.showModelTip('warning','请先勾选!');
              return false;
          }
      }

    }
}
</script>
<style lang="less">
*{
    margin: 0px;
    padding: 0px;
}

.approvalBox{
    background: white;
    padding: 15px;
}
</style>
