<template>
    
    <div class="borrowBox">

        

        <div class="contentBox">
            <ul>
                <li @click="showMainContent(1)">待审批</li>
                <li @click="showMainContent(2)">审批通过</li>
                <li @click="showMainContent(3)">驳回</li>
                <li @click="showMainContent(4)">过期</li>
            </ul>
            <div class="slideBar" v-bind:style='slideBarStyle'></div>
            <div class="contentMain">
                <div class="mainFirsrt" v-show="showMainFirstContent">

                     <div style="margin-bottom:10px;">
                        <el-button type="primary" size="small" @click="dialogFormVisible=!dialogFormVisible"><i class="el-icon-plus"></i>&nbsp;借阅申请</el-button>
                    </div>

                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" > </el-table-column>
                        <el-table-column prop="orgName" label="机构名称" > </el-table-column>
                        <el-table-column prop="applicationDate" label="申请日期" > </el-table-column>
                        <el-table-column prop="applicationNumber" label="申请单号" > </el-table-column>
                        <el-table-column prop="applicationReason" label="借阅原因" > </el-table-column>
                        <el-table-column prop="borrowStartDate" label="借阅区间" > </el-table-column>
                        <el-table-column  prop="borrowEndDate" label="结束日期" > </el-table-column>
                        <el-table-column prop="approvalStatusName"  label="审批状态" > </el-table-column>
                        <el-table-column prop="approvalOpinion" label="审批意见" > </el-table-column>
                        
                        <el-table-column fixed="right" label="操作" >
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
                <div class="mainSecond" v-show="showMainSecondContent">
                    
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" > </el-table-column>
                        <el-table-column prop="orgName" label="机构名称" > </el-table-column>
                        <el-table-column prop="applicationDate" label="申请日期" > </el-table-column>
                        <el-table-column prop="applicationNumber" label="申请单号" > </el-table-column>
                        <el-table-column prop="applicationReason" label="借阅原因" > </el-table-column>
                        <el-table-column prop="borrowStartDate" label="借阅区间" > </el-table-column>
                        <el-table-column  prop="borrowEndDate" label="结束日期" > </el-table-column>
                        <el-table-column prop="approvalStatusName"  label="审批状态" > </el-table-column>
                        <el-table-column prop="approvalOpinion" label="审批意见" > </el-table-column>
                    </el-table>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                    :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>

                </div>
                <div class="mainThird" v-show="showMainThirdContent">
                    
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" > </el-table-column>
                        <el-table-column prop="orgName" label="机构名称" > </el-table-column>
                        <el-table-column prop="applicationDate" label="申请日期" > </el-table-column>
                        <el-table-column prop="applicationNumber" label="申请单号" > </el-table-column>
                        <el-table-column prop="applicationReason" label="借阅原因" > </el-table-column>
                        <el-table-column prop="borrowStartDate" label="借阅区间" > </el-table-column>
                        <el-table-column  prop="borrowEndDate" label="结束日期" > </el-table-column>
                        <el-table-column prop="approvalStatusName"  label="审批状态" > </el-table-column>
                        <el-table-column prop="approvalOpinion" label="审批意见" > </el-table-column>
                    </el-table>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                    :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>

                </div>
                <div class="mainFourth" v-show="showMainFourthContent">
                    
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" > </el-table-column>
                        <el-table-column prop="orgName" label="机构名称" > </el-table-column>
                        <el-table-column prop="applicationDate" label="申请日期" > </el-table-column>
                        <el-table-column prop="applicationNumber" label="申请单号" > </el-table-column>
                        <el-table-column prop="applicationReason" label="借阅原因" > </el-table-column>
                        <el-table-column prop="borrowStartDate" label="借阅区间" > </el-table-column>
                        <el-table-column  prop="borrowEndDate" label="结束日期" > </el-table-column>
                        <el-table-column prop="approvalStatusName"  label="审批状态" > </el-table-column>
                        <el-table-column prop="approvalOpinion" label="审批意见" > </el-table-column>
                    </el-table>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                    :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>

                </div>
            </div>
        </div>

        <el-dialog title="借阅申请" :visible.sync="dialogFormVisible">
            <el-form >
                <el-form-item label="借阅单位" :label-width="formLabelWidth">
                <el-input  autocomplete="off" v-model="orgName" ></el-input>
                </el-form-item>
            </el-form>
            <el-form >
                <el-form-item label="借阅时间" :label-width="formLabelWidth">
                <el-date-picker v-model="borrowDate" type="monthrange"
                    range-separator="至" value-format="yyyy-MM"
                    start-placeholder="开始月份" end-placeholder="结束月份">
                </el-date-picker>
                </el-form-item>
            </el-form>
            <el-form >
                <el-form-item label="凭证类型" :label-width="formLabelWidth">
                <el-input autocomplete="off" v-model="documentType"></el-input>
                </el-form-item>
            </el-form>
            <el-form >
                <el-form-item label="档案时间" :label-width="formLabelWidth">
                <el-date-picker v-model="documentDate" type="monthrange"
                    range-separator="至" value-format="yyyy-MM"
                    start-placeholder="开始月份" end-placeholder="结束月份">
                </el-date-picker>
                </el-form-item>
            </el-form>
            <el-form >
                <el-form-item label="借阅原因" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="applicationReason"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="saveInfo">保 存</el-button>
                <el-button type="danger" size="small" @click="closeDialog">关 闭</el-button>
            </div>
        </el-dialog>

    </div>

</template>
<script>
import Util from '../../utils/util';

export default {
    data() {
      return {
        id: '1',
        curPage : 1,
        pageSize : 15,
        totalCount : 0,
        tableData : [],
        'orgName' : '',
        'borrowDate' : [],
        'documentType' : '',
        'documentDate' : '',
        'applicationReason' : '',
        'slideBarStyle' : {},
        'activeName' : 'first',
        'formLabelWidth' : '85px',
        'dialogFormVisible' : false,
        'showMainFirstContent' : true,
        'showMainSecondContent' : false,
        'showMainThirdContent' : false,
        'showMainFourthContent' : false
      };
    },
    mounted:function(){
        this.getTabData(this.id);
    },
    methods :{
        handleSizeChange : function(size){

            this.pageSize = size;
            this.getTabData(this.id);
        },
        handleCurrentChange (se){

            this.curPage = se;
            this.getTabData(this.id);
        },
        getTabData(id){
            Util.getRequest(`/archivesBorrow/list?status=${id}&page=${this.curPage}&limit=${this.pageSize}`,(res)=>{
                this.curPage = res.body.number;
                this.totalCount = res.body.count;
                this.tableData = res.body.data;
            })
        },
        showMainContent : function(id){
            
            this.curPage = 1;
            switch(id){
                case 1:
                        this.id = id;
                        this.getTabData(id);
                        this.showMainFirstContent = true;
                        this.showMainSecondContent = this.showMainThirdContent = this.showMainFourthContent = false;
                        this.slideBarStyle = {'transition':'all .3s linear','transform':'translate(0%,-3px)'};
                    break;
                case 2:
                        this.id = id;
                        this.getTabData(id);
                        this.showMainSecondContent = true;
                        this.showMainFirstContent = this.showMainThirdContent = this.showMainFourthContent = false;
                        this.slideBarStyle = {'transition':'all .3s linear','transform':'translate(100%,-3px)'};
                    break;
                case 3:
                        this.id = id;
                        this.getTabData(id);
                        this.showMainThirdContent = true;
                        this.showMainFirstContent = this.showMainSecondContent = this.showMainFourthContent = false;
                        this.slideBarStyle = {'transition':'all .3s linear','transform':'translate(200%,-3px)'};
                    break;
                case 4:
                        this.id = id;
                        this.getTabData(id);
                        this.showMainFourthContent = true;
                        this.showMainFirstContent = this.showMainSecondContent = this.showMainThirdContent = false;
                        this.slideBarStyle = {'transition':'all .3s linear','transform':'translate(300%,-3px)'};
                    break;
            }
        },
        saveInfo (){

            Util.valideInput(this.orgName,'借阅单位');
            Util.valideInput(this.borrowDate,'借阅时间');
            Util.valideInput(this.documentType,'档案时间');
            Util.valideInput(this.applicationReason,'借阅原因');

            Util.postRequest(`/archivesBorrow/saveArchivesBorrow?eaArchivesId=`,{},(res)=>{
                window.console.log(res);
            })

        },
        closeDialog(){
            this.dialogFormVisible = true;   
        },
        handleDelClick(obj){
            var id = obj.id;
            let func = function(){
                Util.postRequest('/archivesBorrow/delete',{id:id},()=>{
                    this.getTabData(this.id);
                    Util.showTips('success','删除成功!','top-left');
                });
            }

            Util.showConfirm(this,'确定删除吗?','提示',func);

        }
    }
}
</script>

<style lang="less">
*{
    margin: 0px;
    padding: 0px;
    text-decoration: none;
}

.borrowBox{
    padding: 20px 5px;
}

.el-date-editor--monthrange.el-input, .el-date-editor--monthrange.el-input__inner{
    width: 100% !important;
}

.el-pagination{
    display: inline-flex;
}

.contentBox{
    width: 100%;
    height: auto;
    padding-top: 15px;
    background: white;

    > ul {
        list-style: none;
        display: flex;
        margin: 0px;
        justify-content: center;
        align-content: center;
        align-items: center;
        border-bottom: 3px solid #d5d5d5;
        li{
            width: 25%;
            height: 30px;
            color: #409EFF;
            text-align: center;
            cursor: pointer;
        }
    }

    .slideBar{
        width: 25%;
        height: 3px;
        color: #409EFF;
        position: relative;
        display: block;
        background: #409EFF;
        transform: translateY(-3px);
    } 

    .contentMain{
        position: relative;

        .mainFirsrt , .mainSecond, .mainThird, .mainFourth{
            position: absolute;
            width: 100%;
            height: auto;
            padding: 15px;
            background: white;
        }
    }
    
}
</style>
