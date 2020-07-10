<template>
    <div class="DateBox">

        <el-card class="box-card " >
            <div slot="header" class="clearfix">
                <span>添加条件</span>
            </div>

            <el-row type="flex" class="row-bg" :gutter="24" justify="center">
                <el-col :span="8" >

                    <el-form ref="form" label-width="120px">
                        <el-form-item label="公司名称" >
                            <el-input placeholder="公司名称" v-model="compName" ></el-input>
                        </el-form-item>
                    </el-form>
                    
                </el-col>
                <el-col :span="8" >

                    <el-form ref="form" label-width="100px">
                        <el-form-item label="纳税识别号">
                            <el-input placeholder="纳税识别号" v-model="seriaNum" ></el-input>
                        </el-form-item>
                    </el-form>

                </el-col>
                <el-col :span="8" >
                    <el-button type="primary" @click="addManage"><i class="el-icon-plus"></i>  添加</el-button>
                </el-col>

            </el-row>

            <div class="dateMain">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="id" label="ID"> </el-table-column>
                    <el-table-column prop="compName" label="购方公司名称"> </el-table-column>
                    <el-table-column prop="seriaNo" label="购方公司税号"> </el-table-column>
                    
                    <el-table-column fixed="right" label="操作"  width="100">
                        <template slot-scope="scope">
                            <!-- <el-button @click="handleEditClick(scope.row)" type="text" size="small">修改</el-button> -->
                            <el-button @click="handleDelClick(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            
            </div>
        </el-card>

       <!--  <el-dialog title="特殊商品管理" :visible.sync="dialogFormVisible">

            <el-form >
                <el-form-item label="服务名称" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="specialCommodityName" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveBuyerManage"  size="small">保 存</el-button>
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
            'holiday' : '',
            curPage : 1,
            pageSize : 15,
            totalCount : 0,
            tableData : [],
            compName : '',
            seriaNum : '',
            dialogFormVisible : false
        }
    },
    mounted (){
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
            Util.getRequest(`/BuyerManage/getAllBuyerManage?page=${this.curPage}&limit=${this.pageSize}`,(res)=>{
                this.curPage = res.body.number;
                this.totalCount = res.body.count;
                this.tableData = res.body.data;
            });
        },
        addManage(){
            if(this.compName == null||this.compName == ""){
                Util.showTips('warning','请先输入公司名称！','top-left');
                return false;
            }
            if(this.seriaNum == null||this.seriaNum == ''){
                Util.showTips('warning','请先输入纳税识别号！','top-left');
                return false;
            }
            Util.postRequest(`/BuyerManage/addBuyerManage`,{"compName": this.compName, "seriaNum": this.seriaNum},()=>{
                //Util.showModelTip('success','添加成功!');
                this.getTabData();
            });
            
        },
        handleEditClick(obj){
            this.id = obj.id;
            this.specialCommodityName = obj.specialCommodityName
            this.dialogFormVisible = true;
        },
        handleDelClick(obj){

            let func = function(){
                window.console.log(obj);
                var id = obj.id;
                
                Util.postRequest(`/specialCommodity/delete`,{id: id},(res)=>{
                    if(res.body.status==200){
                        Util.showTips('success','删除成功!','top-left');
                    }   
                    this.getTabData();
                })
            }
            Util.showConfirm(this,'确定删除吗?','提示!',func);

        },
        saveBuyerManage(){

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
