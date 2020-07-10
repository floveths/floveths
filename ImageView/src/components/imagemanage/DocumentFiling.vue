<template>
    
    <div class="documentFiling">

        <el-card class="box-card documentFilingHead" >
            <div slot="header" class="clearfix">
                <span>查询条件</span>
            </div>

            <div>
                <el-form :inline="true"  class="demo-form-inline">

                    <el-form-item label="单位名称">
                        <el-input v-model="voucherTypeName" @focus="dialogListVisible=true"></el-input>
                    </el-form-item>

                    <el-form-item label="会计年">
                        <el-date-picker type="year" placeholder="选择日期" value-format="yyyy" v-model="accountYear" ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="会计月">
                        <el-select v-model="accountMonth" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.label"
                            :label="item.value" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </el-card>


        <el-card>

            <el-tabs v-model="activeName" >
                <el-tab-pane label="待装册" name="first">

                    <el-card class="box-card" style="margin-bottom:20px">
                        <div slot="header" >
                            <el-button-group class="btnGroup">
                                <el-button type="danger" @click="upBox" ><i class="el-icon-s-finance"></i> 一键装册</el-button>
                                <el-button type="warning" @click="addVoucher"><i class="el-icon-document"></i> 凭证</el-button>
                                <el-button type="warning" @click="voucherScan"><i class="el-icon-printer"></i> 凭证扫描</el-button>
                                <el-button type="success" @click="voucherImage"><i class="el-icon-picture"></i> 查看凭证影像</el-button>
                                <input type="file" id="excelFile" @change="getExcelFile" single style="display:none" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" ref="excelFile">
                                <el-button type="primary" @click="importExcel"><i class="el-icon-upload"></i> 导入Excel</el-button>
                            </el-button-group>
                        </div>
                        <div >
                        
                            <el-table :data="tableData" border style="width: 100%"  >
                                <el-table-column type="selection" v-model="selType" width="35"> </el-table-column>
                                <el-table-column prop="voucherNo" label="凭证号"> </el-table-column>
                                <el-table-column prop="accountAbstract" label="摘要"> </el-table-column>
                                <el-table-column prop="orgName" label="单位名称"> </el-table-column>
                                <el-table-column prop="keyWord" label="关键词"> </el-table-column>
                                <el-table-column prop="accountYear" label="会计年"> </el-table-column>
                                <el-table-column prop="accountMonth" label="会计月"> </el-table-column>
                                <el-table-column prop="dataSource" label="数据来源"> </el-table-column>
                                <el-table-column prop="voucherTypeName" label="凭证类型"> </el-table-column>

                                <el-table-column fixed="right" label="操作" width="100">
                                    <template slot-scope="scope">
                                        <el-button type="text" @click="handleQueryVoucher(scope.row)" size="small">银行回单</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                            :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                            </el-pagination>

                        </div>
                    </el-card>


                </el-tab-pane>

                <el-tab-pane label="已装册" name="second">

                    <div>
                        <el-table :data="tableData" border style="width: 100%"  >
                            <el-table-column type="selection" v-model="selType" width="35"> </el-table-column>
                            <el-table-column prop="voucherNo" label="凭证号"> </el-table-column>
                            <el-table-column prop="accountAbstract" label="摘要"> </el-table-column>
                            <el-table-column prop="orgName" label="单位名称"> </el-table-column>
                            <el-table-column prop="keyWord" label="关键词"> </el-table-column>
                            <el-table-column prop="voucherYear" label="会计年"> </el-table-column>
                            <el-table-column prop="voucherMonth" label="会计月"> </el-table-column>
                            <el-table-column prop="dataSource" label="数据来源"> </el-table-column>
                            <el-table-column prop="voucherTypeName" label="凭证类型"> </el-table-column>

                            <el-table-column fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="handleQueryVoucher(scope.row)" size="small">银行回单</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                        :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                        </el-pagination>
                    </div>

                </el-tab-pane>
            </el-tabs>

        </el-card>


        <el-dialog title="公司列表" :visible.sync="dialogListVisible">
            <doctree @getNodeInfo='getNodeInfo' :show-checkbox="false" :treeData="treeData"></doctree>
        </el-dialog>

    </div>

</template>
<script>
import Util from '../../utils/util';
import par from '../../utils/param.js';
import DocTree from '../../components/pubcomponent/treemanage/DocumentTree'

export default {
    data : function(){
        return {
            curPage : 1,
            pageSize : 15,
            totalCount : 0,
            selType : [],
            options : par.selectOptions,
            activeName: 'first',
            accountYear : '',
            accountMonth : '',
            tableData : [],
            treeData : [],
            orgCode : '',
            voucherTypeName : '',
            dialogListVisible : false
        }
    },
    components : {
        doctree : DocTree
    },
    watch : {
        activeName : function(){
            let url = '';
            if(this.activeName == 'first'){
                url = `/archives/queryAllByVoucherType?page=${this.curPage}&limit=${this.pageSize}&orgCode=${this.orgCode}&voucherTypeName=${this.voucherTypeName}&accountYear=${this.accountYear}&accountMonth=${this.accountMonth}&voucherTypeId=`;
                
            }else if(this.activeName == 'second'){
                url = `/archives/eaArchivesListByYearAndMonthAndVoucherType?page=${this.curPage}&limit=${this.pageSize}&voucherYear=${this.accountYear}&voucherMonth=${this.accountMonth}&orgCode=${this.orgCode}`;
                
            }
            this.getTabData(url);
        }
    },
    mounted : function(){
        this.getTreeData();
        this.getTabData(`/archives/queryAllByVoucherType?page=${this.curPage}&limit=${this.pageSize}`);
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
        getNodeInfo(obj){
            
            this.orgCode = obj.orgCode;
            this.voucherTypeName = obj.orgName;
            this.dialogListVisible = false;
        },
        onSubmit(){
            let url = '';
            if(this.activeName == 'first'){
                url = `/archives/queryAllByVoucherType?page=${this.curPage}&limit=${this.pageSize}&orgCode=${this.orgCode}&voucherTypeName=${this.voucherTypeName}&accountYear=${this.accountYear}&accountMonth=${this.accountMonth}&voucherTypeId=`;
                
            }else if(this.activeName == 'second'){
                url = `/archives/eaArchivesListByYearAndMonthAndVoucherType?page=${this.curPage}&limit=${this.pageSize}&voucherYear=${this.accountYear}&voucherMonth=${this.accountMonth}&orgCode=${this.orgCode}`;
                
            }
            this.getTabData(url);
        },
        getTabData(url){
            
            this.orgCode = Util.isNullStr(this.orgCode);
            this.accountYear = Util.isNullStr(this.accountYear);
            this.accountMonth = Util.isNullStr(this.accountMonth);
            this.voucherTypeName = Util.isNullStr(this.voucherTypeName);
            Util.getRequest(url,(res)=>{
                window.console.log(res)
                if(res.body.status==200){
                    this.curPage = res.body.data.number;
                    this.totalCount = res.body.data.count;
                    this.tableData = res.body.data.data;
                }
            })
        },
        getTreeData(){
            Util.getRequest('/archives/tree',(res)=>{
                if(res.body.data.length>0){
                    this.treeData = res.body.data;
                }
            })
        },
        upBox (){
            if(this.selType.length<=0){
                Util.showModelTip('warning','请至少选中一条凭证信息!');
                return false;
            }
        },
        addVoucher(){

        },
        voucherScan(){

            if(this.selType.length<=0){
                Util.showModelTip('warning','请勾选一条要扫描的凭证');
                return false;
            }
        },
        voucherImage(){

            if(this.selType.length<=0){
                Util.showModelTip('warning','请勾选要查看凭证');
                return false;
            }

        },
        importExcel(){
            document.getElementById('excelFile').click();
        },
        getExcelFile(){
            let excel = this.$refs.excelFile;
            window.console.log(excel);
            var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
                
            formData.append("file",excel.files[0]);

            Util.postRequest('/voucher/upload/',formData,(res)=>{
                window.console.log(res);
            })
        },
        handleQueryVoucher(obj){
            Util.getRequest('/voucher/getImageList?voucherId='+obj.id,(res)=>{
                window.console.log(res);
            })
        }
        
    }
}
</script>

<style lang="less">

*{
    margin: 0px;
    padding: 0px;
}

.documentFilingHead{
    margin-bottom: 20px;
}

.form-group label{
    padding: 5px;
}

.dfselect{
    width: 195px !important;
}

</style>
