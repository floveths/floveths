<template>
    
    <div class="documentFiling">

        <el-card class="box-card documentFilingHead" >
            <div slot="header" class="clearfix">
                <span>查询条件</span>
            </div>

            <div>
                <el-form :inline="true"  class="demo-form-inline">

                    <el-form-item label="公司名称">
                        <el-select v-model="compName" placeholder="请选择">
                            <el-option v-for="item in compOptions" :key="item.label"
                            :label="item.value" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="">
                        <el-input v-model="voucherCode" placeholder="请输入发票号码、发票代码" @focus="dialogListVisible=true">
                            <button style="background:transparent;border: 0px;color:#66b1ff;cursor:pointer;" slot="suffix" @click="Search" size="mini" class="el-input__icon el-icon-search"></button>
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="gSearch" icon="el-icon-search">高级搜索</el-button>
                        <el-button type="primary" @click="upFiles" icon="el-icon-upload">上传发票</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </el-card>

        <el-card style="margin-top:20px;">

            <div>
                <el-table :data="tableData" border style="width: 100%"  >
                    <el-table-column type="selection" v-model="selType" width="35"> </el-table-column>
                    <el-table-column prop="voucherNo" label="发票名称"> </el-table-column>
                    <el-table-column prop="accountAbstract" label="发票号码"> </el-table-column>
                    <el-table-column prop="orgName" label="发票代码"> </el-table-column>
                    <el-table-column prop="keyWord" label="销售方名称"> </el-table-column>
                    <el-table-column prop="voucherYear" label="价税合计"> </el-table-column>
                    <el-table-column prop="voucherMonth" label="税额"> </el-table-column>
                    <el-table-column prop="dataSource" label="金额"> </el-table-column>
                    <el-table-column prop="voucherTypeName" label="提交日期"> </el-table-column>
                    <el-table-column prop="voucherTypeName" label="凭证号"> </el-table-column>
                    <el-table-column prop="voucherTypeName" label="来源"> </el-table-column>

                    <el-table-column fixed="right" label="操作" width="90">
                        <template slot-scope="scope">
                            <el-button type="text" @click="downVoucher(scope.row)" size="small"><i class="el-icon-download"></i></el-button>
                            <el-button type="text" @click="delVoucher(scope.row)" size="small"><i class="el-icon-delete"></i></el-button>
                            <el-button type="text" @click="viewVoucher(scope.row)" size="small"><i class="el-icon-view"></i></el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>

        </el-card>

        <el-dialog title="高级搜索" :visible.sync="dialogListVisible">

            <el-form :inline="true">
                <el-form-item label="购买方名称:" :label-width="formLabelWidth">
                <el-input  autocomplete="off" v-model="buyName"></el-input>
                </el-form-item>
            
                <el-form-item label="提交人:" :label-width="formLabelWidth">
                <el-input  autocomplete="off" v-model="subUser"></el-input>
                </el-form-item>
            </el-form>

            <el-form :inline="true">
                <el-form-item label="发票类型:" :label-width="formLabelWidth">
                    <el-select v-model="ticketType" placeholder="请选择" style="width:176px;">
                        <el-option v-for="item in ticketOptions" :key="item.label"
                        :label="item.value" :value="item.label"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="销方名称:" :label-width="formLabelWidth">
                <el-input  v-model="sellName"></el-input>
                </el-form-item>
            </el-form>

            <el-form :inline="true">
                <el-form-item label="价税合计:" :label-width="formLabelWidth">
                <el-input  autocomplete="off" v-model="sumMoney"></el-input>
                </el-form-item>
            
                <el-form-item label="提交日期:" :label-width="formLabelWidth">
                    <el-date-picker v-model="daterange" type="daterange" range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="warning" size="small" @click="dialogFormVisible=false">关闭</el-button>
                <el-button type="primary" size="small" @click="saveSubInfo" >确定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="发票上传" :visible.sync="dialogUploadVisible" width="60%">
            <span>关联凭证</span>
            <el-form :inline="true">
                <el-form-item label="">
                    <el-select v-model="ticketType" size="small" placeholder="请选择公司" style="width:140px;">
                        <el-option v-for="item in ticketOptions" :key="item.label"
                        :label="item.value" :value="item.label"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="">
                    <el-select v-model="ticketType" size="small" placeholder="请选择年" style="width:140px;">
                        <el-option v-for="item in ticketOptions" :key="item.label"
                            :label="item.value" :value="item.label"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="">
                    <el-select v-model="ticketType" size="small" placeholder="请选择月" style="width:140px;">
                        <el-option v-for="item in ticketOptions" :key="item.label"
                        :label="item.value" :value="item.label"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="">
                    <el-input v-model="voucherCode" size="small" placeholder="请输入文号"  style="width:140px;">
                        <button style="background:transparent;border: 0px;color:#66b1ff;cursor:pointer;" slot="suffix" @click="Search" size="mini" class="el-input__icon el-icon-search"></button>
                    </el-input>
                </el-form-item>
                
                <el-form-item label="">
                    <input type="file" id="upElec" style="display:none" @change="getFile" ref="files">
                    <el-button type="primary" size="small" @click="openWinodwDialog" >上传发票</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>

        <transition name="up">
            <ticketviewdialog :imageViewList="ticketListInfo" v-show="viewImgDialog" @closeModel="viewImgDialog=false" ></ticketviewdialog>
        </transition>

    </div>

</template>
<script>
/* import Util from '../../utils/util'; */
/* import par from '../../utils/param.js'; */

import TicketViewDialog from '../pubcomponent/imagedialog/TicketViewDialog'

export default {
    data : function(){
        return {
            curPage : 1,
            pageSize : 15,
            totalCount : 0,
            selType : [],
            sumMoney : '',
            sellName : '',
            ticketType : '',
            buyName : '',
            subUser : '',
            compName : '',
            voucherCode : '',
            ticketOptions : [],
            compOptions : [],
            daterange : [],
            tableData : [{'voucherNo':'12154'}],
            treeData : [],
            ticketListInfo : [],
            viewImgDialog : false,
            formLabelWidth : '140px',
            dialogListVisible : false,
            dialogUploadVisible : false
        }
    },
    components : {
        'ticketviewdialog' : TicketViewDialog
    },
    mounted : function(){
        
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
        getNodeInfo(){
            
        },
        openWinodwDialog(){
            let upElec = document.getElementById('upElec');
            upElec.click();
        },
        Search(){

        },
        gSearch(){
            this.dialogListVisible = true;
        },
        upFiles(){
            this.dialogUploadVisible = true;
        },
        getFile(){
            window.console.log(this.$refs.files)
        },
        saveSubInfo(){

        },
        downVoucher(){

        },
        delVoucher(){

        },
        viewVoucher(){
            this.viewImgDialog = true;
        }
        
    }
}
</script>

<style lang="less">

*{
    margin: 0px;
    padding: 0px;
}

.el-form--inline div{
    margin: 0px 8px 0px 0px;
}

</style>
