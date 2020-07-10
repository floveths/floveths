<template>
    
    <div class="approvalBox">

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="ID"> </el-table-column>
            <el-table-column prop="orgName" label="机构名称"> </el-table-column>
            <el-table-column prop="applicationNumber" label="申请单号"> </el-table-column>
            <el-table-column prop="applicationDate" label="申请日期"> </el-table-column>
            <el-table-column prop="applicationReason" label="借阅原因"> </el-table-column>
            <el-table-column prop="borrowStartDate" label="开始日期"></el-table-column>
            <el-table-column prop="borrowEndDate" label="结束日期"></el-table-column>
            <el-table-column prop="approvalStatusName" label="审批状态"></el-table-column>
            <el-table-column prop="borrowEndDate" label="结束日期"></el-table-column>
            <el-table-column prop="approvalOpinion" label="审批意见"></el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-tag type="primary" @click="handleVoucher(scope.row)"  size="mini">审批</el-tag>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-tag type="danger" @click="handleGetBack(scope.row)"  size="mini">驳回</el-tag>
                </template>
            </el-table-column>
            
        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
        :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>


         <el-dialog title="审批意见..." :visible.sync="dialogFormVisible">
            
            <el-form >
                <el-form-item :label="infoTitle" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="information"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveFormInfo" size="small">保 存</el-button>
                <el-button type="danger" @click="dialogFormVisible=false" size="small">关 闭</el-button>
            </div>
        </el-dialog>

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
            tableData : [],
            infoId : '',
            infoType : 1,
            infoTitle : '',
            information : '',
            formLabelWidth : '100px',
            dialogFormVisible : false
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
        Util.getRequest(`/archivesBorrow/queryAllByStatus?page=${this.curPage}&limit=${this.pageSize}`,(res)=>{
          this.curPage = res.body.number;
          this.totalCount = res.body.count;
          this.tableData = res.body.data;
        })
      },
      handleVoucher(obj){
          window.console.log(obj)
          this.infoType = 1;
          this.infoId = obj.id;
          this.infoTitle = '审批意见';
      },
      handleGetBack(obj){
          this.infoType = 2;
          this.infoId = obj.id;
          this.infoTitle = '驳回意见';
      },
      saveFormInfo(){
        Util.valideInput(this.information,this.infoTitle);

        var state = '';
        if(this.infoType==1){
            state = 2;
        }else if(this.infoType==2){
            state = 3;
        }
        var params ={"id": this.infoId,"approvalOpinion": this.information,"status":state};
        Util.postRequest("/archivesBorrow/savePaperApprovalOpinion",params,(res)=>{
            window.console.log(res);
        });

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

.el-tag{
    cursor: pointer;
}
</style>
