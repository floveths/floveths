<template>
    
    <div class="imageQuery">

        <el-card class="box-card" style="margin-bottom:20px">
            <div slot="header" class="clearfix">
                <span>查询条件</span>
            </div>

            <div >
                <el-form :inline="true"  class="demo-form-inline">
                    <el-form-item label="单据日期">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="billDate" ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="单据号">
                        <el-input v-model="billNum" placeholder="可模糊匹配"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

        <el-card class="box-card" style="margin-bottom:20px">

            <div >
                <el-table :data="tableData" border style="width: 100%" >
                    <el-table-column prop="billNum" label="单据号" ></el-table-column>
                    <el-table-column prop="businessSerialNo" label="业务流水" ></el-table-column>
                    <el-table-column prop="billDate" label="单据日期"></el-table-column>
                    <el-table-column prop="billTypeName" label="单据类型"></el-table-column>
                    <el-table-column prop="cash" label="金额"></el-table-column>
                    <el-table-column prop="userNum" label="制单人"></el-table-column>
                    <el-table-column prop="orgName" label="机构"></el-table-column>
                    <el-table-column prop="taskStateName" label="单据状态"></el-table-column>

                    <el-table-column fixed="right" label="影像查看" width="80">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleWatch(scope.row)" size="large"><i class="el-icon-picture"></i></el-button>
                        </template>
                    </el-table-column>

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
        billDate : '',
        billNum : '',
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
      onSubmit(){
        this.getTabData();
      },
      getTabData(){
        this.billNum = Util.isNullStr(this.billNum);
        this.billDate = Util.isNullStr(this.billDate);
        Util.getRequest(`/task/listBill?page=${this.curPage}&limit=${this.pageSize}&billDate=${this.billDate}&billNum=${this.billNum}`,(res)=>{
          this.curPage = res.body.number;
          this.totalCount = res.body.count;
          this.tableData = res.body.data;
        })
      },
      handleWatch (obj){
        
        window.open('../images/showImages.html?pk='+obj.businessSerialNo
					+'&billNum='+obj.billNum
					+'&zdr='+obj.userNum
					+'&isEdit=0');
      }
    }
  }
</script>