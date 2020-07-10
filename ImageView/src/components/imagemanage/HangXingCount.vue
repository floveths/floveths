<template>
    <div class="hangXinBox">

        <el-card class="box-card documentFilingHead" >

            <div class="dateMain">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="fileId" label="文件编号"></el-table-column>
                    <el-table-column prop="fileName" label="文件名称"> </el-table-column>
                    <el-table-column prop="triggerTime" label="验真时间" ></el-table-column>
                    <el-table-column prop="triggerStatue" label="验真状态"> </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">

                        <template slot-scope="scope">
                            <el-button @click="handleInfoClick(scope.row)" type="text" size="large"><i class="el-icon-document"></i></el-button>
                            <el-button @click="handleExportClick(scope.row)" type="text" size="large"><i class="el-icon-download"></i></el-button>
                        </template>

                    </el-table-column>
                </el-table>

                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>
        </el-card>


        <el-dialog title="航信验真发票信息..." :visible.sync="dialogFormVisible">

            <el-form :label-position="labelPosition" label-width="180px" >
                <el-form-item label="发票代码">
                    <el-input v-model="invoiceCode"></el-input>
                </el-form-item>
                <el-form-item label="发票号码">
                    <el-input v-model="invoiceNumber" ></el-input>
                </el-form-item>
                <el-form-item label="开票日期">
                    <el-input v-model="invoiceDate"></el-input>
                </el-form-item>
                <el-form-item label="购方名称">
                    <el-input v-model="buyerName"></el-input>
                </el-form-item>
                <el-form-item label="购方税号">
                    <el-input v-model="buyerNo"></el-input>
                </el-form-item>
                <el-form-item label="购方开户行">
                    <el-input v-model="buyerAccount"></el-input>
                </el-form-item>
                <el-form-item label="购货方纳税地址和电话">
                    <el-input v-model="buyerAddr"></el-input>
                </el-form-item>
                <el-form-item label="发票金额">
                    <el-input v-model="sumAmount"></el-input>
                </el-form-item>
                <el-form-item label="合计税额">
                    <el-input v-model="sumTax"></el-input>
                </el-form-item>
                <el-form-item label="大写金额">
                    <el-input v-model="uppercase"></el-input>
                </el-form-item>
                <el-form-item label="价税合计">
                    <el-input v-model="lowercase"></el-input>
                </el-form-item>
                <el-form-item label="销方名称">
                    <el-input v-model="sellerName"></el-input>
                </el-form-item>
                <el-form-item label="销方税号">
                    <el-input v-model="sellerNo"></el-input>
                </el-form-item>
                <el-form-item label="销售货方纳税地址和电话">
                    <el-input v-model="sellerAddr"></el-input>
                </el-form-item>
                <el-form-item label="销货方纳税账户">
                    <el-input v-model="sellerAccount"></el-input>
                </el-form-item>
                <el-form-item label="收款人">
                    <el-input v-model="payee"></el-input>
                </el-form-item>
                <el-form-item label="复合人">
                    <el-input v-model="checker"></el-input>
                </el-form-item>
                <el-form-item label="开票人">
                    <el-input v-model="issuer"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
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
            'holiday' : '',
            curPage : 1,
            pageSize : 15,
            totalCount : 0,
            tableData : [],
            formLabelWidth : '80px',
            labelPosition: 'left',
            dialogFormVisible : true,
            invoiceCode : '',
            invoiceNumber : '',
            invoiceDate : '',
            buyerName : '',
            buyerNo : '',
            buyerAccount : '',
            buyerAddr : '',
            sumAmount : '',
            sumTax : '',
            uppercase : '',
            lowercase : '',
            sellerName : '',
            sellerNo : '',
            sellerAddr : '',
            sellerAccount : '',
            payee : '',
            checker : '',
            issuer : ''
        }
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
        getTabData(){
            Util.getRequest(`/hangXingCount/list?page=${this.curPage}&limit=${this.pageSize}`,(res)=>{
                this.curPage = res.body.number;
                this.totalCount = res.body.count;
                this.tableData = res.body.data;
            });
        },
        handleInfoClick(obj){
            var id = obj.fileId;
            Util.getRequest(`http://localhost:8081/hangXingCount/ocrInfoShow?fileId=${id}`,(res)=>{
                window.console.log(res);

                /*this.invoiceCode = res.body.data,
                this.invoiceNumber = res.body.data,
                this.invoiceDate = res.body.data,
                this.buyerName = res.body.data,
                this.buyerNo = res.body.data,
                this.buyerAccount = res.body.data,
                this.buyerAddr = res.body.data,
                this.sumAmount = res.body.data,
                this.sumTax = res.body.data,
                this.uppercase = res.body.data,
                this.lowercase = res.body.data,
                this.sellerName = res.body.data,
                this.sellerNo = res.body.data,
                this.sellerAddr = res.body.data,
                this.sellerAccount = res.body.data,
                this.payee = res.body.data,
                this.checker = res.body.data,
                this.issuer = res.body.data*/

            })
        },
        handleExportClick : function(obj){
            var id = obj.id;
            window.location.href = '/hangXingCount/exportExcel?fileId='+id;
        }
    }
}
</script>
<style lang="less">

*{
    margin: 0px;
    padding: 0px;
}

</style>
