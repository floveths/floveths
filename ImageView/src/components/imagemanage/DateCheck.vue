<template>
    <div class="DateBox">

        <el-card class="box-card documentFilingHead" >
            <div slot="header" class="clearfix">
                <span>添加条件</span>
            </div>

            <el-row type="flex" class="row-bg" :gutter="24" justify="center">
                <el-col :span="8" >

                    <el-form  label-width="120px">
                        <el-form-item label="节假日日期">
                            <el-date-picker  v-model="holiday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
                        </el-form-item>
                    </el-form>
                    
                </el-col>
                <el-col :span="8" >

                    <el-form  label-width="100px">
                        <el-form-item label="备注">
                            <el-input v-model="remark"></el-input>
                        </el-form-item>
                    </el-form>

                </el-col>
                <el-col :span="8" >
                    <el-button type="primary" @click="addDateCheck"><i class="el-icon-plus"></i>  添加</el-button>
                </el-col>

            </el-row>

            <div class="dateMain">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="id" label="ID"> </el-table-column>
                    <el-table-column prop="checkDate" label="过滤日期"> </el-table-column>
                    <el-table-column prop="remark" label="备注"> </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">

                        <template slot-scope="scope">
                            <!-- <el-button @click="handleEditClick(scope.row)" type="text" size="small">修改</el-button> -->
                            <el-button type="text" @click="handleDelClick(scope.row)" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>
        </el-card>

        <!-- <el-dialog title="节假日管理" :visible.sync="dialogFormVisible">

            <el-form >
                <el-form-item label="日期" >
                    <el-input type="text" v-model="cdate"></el-input>
                </el-form-item>

                <el-form-item label="备注" >
                    <el-input type="textarea" v-model="remark1"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveCheckDate" size="small">修 改</el-button>
                <el-button type="danger" @click="dialogFormVisible=false" size="small">关 闭</el-button>
            </div>
            
        </el-dialog> -->

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
            holiday : '',
            id : '',
            remark : '',
            remark1 : '',
            checkDate : '',
            dialogFormVisible : false
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
            Util.getRequest(`/DateCheck/getAllCheckDate?page=${this.curPage}&limit=${this.pageSize}`,(res)=>{
                this.curPage = res.body.number;
                this.totalCount = res.body.count;
                this.tableData = res.body.data;
            });
        },
        addDateCheck (){
            Util.valideInput(this.holiday,'日期');
            Util.postRequest(`/DateCheck/addCheckDate`,{"cdate": this.holiday, "remark": this.remark},(res)=>{
                if(res.body.status==200){
                    Util.showTips('success','添加成功!','top-left');
                }   
                this.getTabData();
            })
        },
        handleEditClick (obj){
            this.id = obj.id;
            this.checkDate = obj.checkDate;
            this.remark1 = obj.remark;
            this.dialogFormVisible = true;
        },
        handleDelClick(obj){
            let func = function(){
                var id = obj.id;
                Util.postRequest(`/DateCheck/deleteCheckDate`,{id: id},(res)=>{
                    if(res.body.status==200){
                        Util.showTips('success','删除成功!','top-left');
                    }   
                    this.getTabData();
                })
            }
            Util.showConfirm(this,'确定删除吗?','提示!',func);
            
        },
        saveCheckDate (){
            Util.valideInput(this.checkDate,'日期');
            var data = {id: this.id,"cdate": this.checkDate, "remark": this.remark1};
            Util.postRequest(`/DateCheck/updateDateCheck`,data,(res)=>{
                if(res.body.status==200){
                    Util.showTips('success','修改成功!','top-left');
                }   
                this.getTabData();
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

</style>
