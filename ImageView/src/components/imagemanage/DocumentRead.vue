<template>
    
    <div class="documentRead">

        <el-card class="box-card" >
            <div slot="header" class="clearfix">
                <span>查询条件</span>
            </div>

            <div >
                <el-form :inline="true"  class="demo-form-inline">

                    <el-form-item label="单位名称">
                        <el-input v-model="orgName" @focus="dialogListVisible=true"></el-input>
                    </el-form-item>

                    <el-form-item label="会计年">
                        <el-date-picker type="year" placeholder="选择日期" value-format="yyyy" v-model="accountYear" ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="会计月">
                        <el-select v-model="accountMonth" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.label"
                            :label="item.value" :value="item.label"> </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i> 查询</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-card>

        <el-card style="margin-top:20px">

            <div class="separateBox">
                <el-breadcrumb separator="~~">
                <el-breadcrumb-item>档案册数</el-breadcrumb-item>
                <el-breadcrumb-item>共有 {{pageCount}} 册</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class=" row">

                <div class="col-md-2" v-for="(d,index) in tableData" :key="index">
                    <div class="docBox">
                        <ul class="docList">
                            <li>全宗号<br>{{d.fondsID}}</li>
                            <li>目录号<br>{{d.catalogueId}}</li>
                            <li>案卷号<br>{{d.filesId}}</li>
                            <li>年度<br>{{d.voucherYear}}年</li>
                            <li>月份<br>{{d.voucherMonth}}月</li>
                            <li>共{{d.totalNumber}}册</li>
                            <li>当前第{{d.currentNumber}}册</li>
                            <li>保管期限<br>{{d.storageTime}}</li>
                        </ul>
                        <div class="docBtn">
                            <el-button type="primary" size="mini" @click="openDocument(d.id)">打开</el-button>
                            <el-button type="success" size="mini" @click="openDocCover(d.id)">封面</el-button>
                        </div>
                    </div>
                </div>
                
            </div>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
            :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>

        </el-card>

        <div class="dialogTable">
            <el-dialog title="凭证信息..." :visible.sync="dialogTableVisible" >
                <el-table :data="gridData" border>
                    <el-table-column property="id" label="ID" ></el-table-column>
                    <el-table-column property="keyWord" label="关键词" ></el-table-column>
                    <el-table-column property="accountAbstract" label="摘要" ></el-table-column>
                    <el-table-column property="accountYear" label="会计年"></el-table-column>
                    <el-table-column property="accountMonth" label="会计月" ></el-table-column>
                    <el-table-column property="dataSource" label="数据来源" ></el-table-column>
                    <el-table-column property="saveType" label="存储形式"></el-table-column>
                    <el-table-column property="voucherState" label="凭证状态"></el-table-column>
                    <el-table-column property="voucherTypeName" label="凭证类型"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleVoucherClick(scope.row)" type="text" size="small"><i class="el-icon-tickets"></i> </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="curPage1"
                :page-sizes="[15, 20, 25, 35]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="totalCount1">
                </el-pagination>

            </el-dialog>
        </div>

        <div class="dialogForm">
            <!--startprint-->
            <el-dialog title="凭证信息..." :visible.sync="dialogFormVisible" >
                <el-form  label-width="80px" size="small" >
                    <el-col :span="11">
                        <el-form-item label="单位名称">
                            <el-input v-model="orgName" readonly></el-input>
                        </el-form-item>
                    </el-col>                
                    <el-col class="line" :span="5"></el-col>
                    <el-col :span="11">
                        <el-form-item label="装订日期">
                             <el-date-picker v-model="bindingTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" name="cd"> </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="年度">
                            <el-input v-model="voucherYear" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="8"></el-col>
                    <el-col :span="11">
                        <el-form-item label="月度">
                            <el-input v-model="voucherMonth" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="本月共">
                            <el-input v-model="totalNumber" readonly></el-input>
                        </el-form-item>
                        
                    </el-col>
                    <el-col class="line" :span="5"></el-col>
                    <el-col :span="11">
                        <el-form-item label="本册是第">
                            <el-input v-model="currentNumber" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="凭证数量">
                            <el-input v-model="voucherNumber" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="5"></el-col>
                    <el-col :span="11">
                        <el-form-item label="附件数量">
                            <el-input v-model="attachmentNumber" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="装订人">
                            <el-input v-model="binding" name="cd" type="text"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="5"></el-col>
                    <el-col :span="11">
                        <el-form-item label="会计主管">
                            <el-input v-model="accountantOfficer" name="cd" type="text"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col >
                        <el-form-item label="备注信息">
                            <el-input type="textarea" id="cd" v-model="remark"></el-input>
                        </el-form-item>
                    </el-col>
    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click="saveInfo"><i class="el-icon-s-order"></i> 保 存</el-button>
                    <el-button type="success" size="small" @click="printInfo"><i class="el-icon-printer"></i> 打 印</el-button>
                    <el-button type="danger" size="small" @click="dialogFormVisible=false"><i class="el-icon-close"></i> 关 闭</el-button>
                </div>
            </el-dialog>
            <!--endprint-->
        </div>

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
            id : '',
            curPage : 1,
            pageSize : 15,
            totalCount : 0,
            curPage1 : 1,
            pageSize1 : 15,
            totalCount1 : 0,
            tableData : [],
            gridData : [],
            orgCode : '',
            orgName : '',
            binding : '',
            remark : '',
            treeData : [],
            pageCount : 0,
            accountYear : '',
            accountMonth : '',
            bindingTime : '',
            voucherYear : '',
            voucherMonth : '',
            totalNumber : '',
            currentNumber : '',
            voucherNumber : '',
            accountantOfficer : '',
            attachmentNumber : '',
            options : par.selectOptions,
            dialogTableVisible : false,
            dialogFormVisible : false,
            dialogListVisible : false
        }
    },
    components : {
        doctree : DocTree
    },
    watch : {
        totalNumber : function(){
            this.totalNumber = this.totalNumber+' 册';
        },
        currentNumber : function(){
            this.currentNumber = this.currentNumber+' 册';
        }
    },
    mounted(){
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
        handleSizeChange1 : function(size){
        
            this.pageSize1 = size;
            this.getGridTabData();
        },
        handleCurrentChange1 (se){

            this.curPage1 = se;
            this.getGridTabData();
        },
        getTreeData(){
            Util.getRequest('/archives/tree',(res)=>{
                if(res.body.data.length>0){
                    this.treeData = res.body.data;
                }
            })
        },
        getTabData(){
            
            Util.getRequest(`/archives/eaArchivesList?page=${this.curPage}&limit=${this.pageSize}&orgCode=${this.orgCode}&voucherYear=${this.accountYear}&voucherMonth=${this.accountMonth}`,(res)=>{
                if(res.body.status == 200){
                    this.curPage = res.body.number;
                    this.totalCount = res.body.count;
                    this.tableData = res.body.data;
                }
            })
        },
        getNodeInfo(obj){
            
            this.orgCode = obj.orgCode;
            this.orgName = obj.orgName;
            this.dialogListVisible = false;
        },
        onSubmit(){
            this.getTabData();
        },
        openDocument(id){
            window.console.log(id)
            this.id = id;
            this.getGridTabData();
        },
        openDocCover(id){
            this.id = id;
            Util.getRequest('/archives/voucherCover?id='+id,(res)=>{
                window.console.log(res);
            })
            this.dialogFormVisible = true;
        },
        getGridTabData(){
            Util.getRequestByAjax(`/voucher/getImageList`,{"voucherId": this.id},'text',(res)=>{
                window.console.log(res);
            })
        },
        printInfo(){
            window.print();
        },
        saveInfo(){
            var data = {
                id : this.id,
                orgName : this.orgName,
                binding : this.binding,
                remark : this.remark,
                accountYear : this.accountYear,
                accountMonth : this.accountMonth,
                bindingTime : this.bindingTime,
                voucherYear : this.voucherYear,
                voucherMonth : this.voucherMonth,
                totalNumber : this.totalNumber,
                currentNumber :this.currentNumber,
                voucherNumber :this.voucherNumber,
                accountantOfficer :this.accountantOfficer,
                attachmentNumber : this.attachmentNumber
            }
            
            Util.postRequest('/archives/saveVoucherCover',data,(res)=>{
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

input[name='cd'],#cd{
    background: #eef6ff !important;
}

.form-group{
    margin: 0px 10px !important;
}

.form-group label{
    padding: 5px;
    border-bottom: 1px solid rgb(223, 223, 223);
}

.separateBox{
    width: auto;
    height: 50px;
    display: block;
    padding: 15px;
    background: rgb(255, 255, 255);
}

.docBox{
    margin-bottom: 15px;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    border: 1px solid rgb(140, 206, 250);
    box-shadow: 3px 3px 15px #aaa5a5;
    .docList{
        list-style: none;
        width: 100%;
        height: auto;
        position: relative;
        padding: 5px 5px 100px 5px;
        background: #7ec5ff;
        border-radius: 5px;
        margin-bottom: 0px;
        cursor: pointer;
        li{
            height: 55px;
            padding-top: 5px;
            text-align: center;
            background: white;
            border-bottom: 1px solid rgb(212, 212, 212);
        }

    }
    .docList::before{
        content: '';
        position: absolute;
        width: 35px;
        height: 35px;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        margin-bottom: 25px;
        border-radius: 50%;
        background: white;
        box-shadow: inset 3px 5px 10px rgb(150, 150, 150);
    }
    .docList li:nth-child(1){
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .docList li:nth-last-child(1){
        border-bottom: 0px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .docBtn{
        width: 100%;
        height: 75px;
        display: flex;
        cursor: pointer;
        position: absolute;
        align-items: center;
        padding: 20px 10px;
        border-radius: 5px;
        justify-content: space-between;
        background: rgba(246, 246, 206, 0.54);
    }
}

.docBox:hover .docBtn{
    transition: all .3s linear;
    transform: translateY(-75px);
}

.dialogTable .el-dialog{
    width: 90% !important;
}

.dialogForm .el-dialog{
    width: 52% !important;
}

</style>
