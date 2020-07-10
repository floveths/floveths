<template>
    
    <div class="specialBox">

        <el-card class="box-card" style="margin-bottom:20px">
            <div style="margin-bottom:10px;">
                <el-button type="primary" size="small" @click="dialogFormVisible=true"><i class="el-icon-plus"></i> 新增</el-button>
            </div>

            <el-table :data="tableData" border style="width: 100%" >
                
                <el-table-column prop="id" label="ID"> </el-table-column>
                <el-table-column prop="specialCommodityName" label="服务名称"> </el-table-column>
                <el-table-column prop="remark" label="备注"> </el-table-column>
                <el-table-column fixed="right" label="操作"  width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleEditClick(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="handleDelClick(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
            :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </el-card>

        <el-dialog title="特殊商品管理" :visible.sync="dialogFormVisible">

            <el-form >
                <el-form-item label="服务名称" :label-width="formLabelWidth">
                <el-input type="text" v-model="specialCommodityName" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveSpecialCommodity"  size="small">保 存</el-button>
                <el-button type="danger" @click="dialogFormVisible=false" size="small">关 闭</el-button>
            </div>
        </el-dialog>

    </div>

</template>
<script>
import Util from '../../utils/util';

export default {
    data() {
      return {
        id : '',
        curPage : 1,
        pageSize : 15,
        totalCount : 0,
        tableData : [],
        specialCommodityName : '',
        formLabelWidth : '85px',
        dialogFormVisible : false
      };
    },
    mounted : function(){
        this.getTabData();
    },
    methods : {
        getTabData(){
            Util.getRequest(`/BuyerManage/getAllBuyerManage?page=${this.curPage}&limit=${this.pageSize}`,(res)=>{
                this.curPage = res.body.number;
                this.totalCount = res.body.count;
                this.tableData = res.body.data;
            });
        },
        handleSizeChange : function(size){
        
            this.pageSize = size;
            this.getTabData();
        },
        handleCurrentChange (se){

            this.curPage = se;
            this.getTabData();
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
        saveSpecialCommodity(){
            if(this.specialCommodityName==null||this.specialCommodityName==''){
                Util.showTips('warning','服务名称不能为空!','top-left');
                return false;
            }
            var data = '';
            if(this.id==null||this.id==''){
                data = {specialCommodityName:this.specialCommodityName};
            }else{
                data = {id: this.id,specialCommodityName:this.specialCommodityName};
            }
            Util.postRequest(`/specialCommodity/saveSpecialCommodity`,data,(res)=>{
                this.id = '';
                if(res.body.status==200){
                    Util.showTips('success','保存成功!','top-left');
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
    text-decoration: none;
}

</style>
