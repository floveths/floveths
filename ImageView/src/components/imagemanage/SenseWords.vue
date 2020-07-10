<template>
    
    <div class="senseBox">

        <el-card>
            <div style="margin-bottom:10px;">
                <el-button type="primary" size="small" @click="dialogFormVisible=true"><i class="el-icon-plus"></i> 新增</el-button>
            </div>

            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column prop="id" label="Id" > </el-table-column>
                <el-table-column prop="senseWordName" label="过滤名称" > </el-table-column>
                <el-table-column prop="senseWordValue" label="过滤内容" > </el-table-column>
                <el-table-column  label="操作" width="65px">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handleDeleteClick(scope.row.id)" icon="el-icon-delete" size="mini"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
            :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </el-card>

        <el-dialog title="敏感词管理" :visible.sync="dialogFormVisible">

            <el-form >
                <el-form-item label="过滤名称">
                    <el-select v-model="senseWordName" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.label" 
                        :label="item.value" :value="item.label"> </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="过滤内容" >
                    <el-input type="textarea" v-model="senseWordValue"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveSenseWords" size="small">保 存</el-button>
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
        curPage : 1,
        pageSize : 15,
        totalCount : 0,
        tableData : [],
        options : [
            {
                label : '销售货方——名称',
                value : '销售货方——名称'
            }
        ],
        senseWordName : '',
        senseWordValue : '',
        formLabelWidth : '85px',
        dialogFormVisible : false
      };
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
        saveSenseWords : function(){
            var data = {'senseWordValue':this.senseWordValue,'senseWordName':this.senseWordName}
            Util.postRequest(`/senseWords/saveSenseWords`,data,(res)=>{
                window.console.log(res);
            });
        },
        handleDeleteClick : function(id){
            
            Util.postRequest(`/senseWords/delete`,{id:id},(res)=>{
                window.console.log(res);    
            })
        },
        getTabData(){
            this.senseWordName = Util.isNullStr(this.senseWordName);
            this.senseWordValue = Util.isNullStr(this.senseWordValue);
            Util.getRequest(`/senseWords/list?page=${this.curPage}&limit=${this.pageSize}`,(res)=>{
                this.curPage = res.body.number;
                this.totalCount = res.body.count;
                this.tableData = res.body.data;
            });
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
