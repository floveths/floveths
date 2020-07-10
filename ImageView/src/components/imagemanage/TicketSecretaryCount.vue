<template>
    <div class="secretaryBox">

        <el-card class="box-card documentFilingHead" >

            <div class="dateMain">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column fixed prop="triggerTime" label="调用时间"> </el-table-column>
                    <el-table-column prop="triggerStatue" label="调用状态" > </el-table-column>
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
    data : function(){
        return {
            curPage : 1,
            pageSize : 15,
            totalCount : 0,
            tableData : []
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
            Util.getRequest(`/ticketSecretaryCount/list?page=${this.curPage}&limit=${this.pageSize}`,(res)=>{
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
}

</style>
