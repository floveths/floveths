<template>
    
    <div class="documentRead">

        <el-card class="box-card" >
            <div slot="header" class="clearfix">
                <span>查询条件</span>
            </div>

             <el-form :inline="true"  class="demo-form-inline">
                <el-row>

                    <el-col :span="8">
                        <el-form-item label="目录:" size="small" label-width="80px">
                            <el-select v-model="catalog" placeholder="请选择">
                                <el-option v-for="item in catalogOptions" :key="item.label"
                                :label="item.value" :value="item.label"> </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="会计期间:" size="small" label-width="80px">
                            <el-date-picker
                            v-model="dateRange"
                            type="daterange"
                            range-separator="—"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="单位:" size="small" label-width="80px">
                            <el-input v-model="orgName" placeholder="模糊查询"></el-input>
                        </el-form-item>
                    </el-col>
                    
                </el-row>

                <el-row>

                    <el-col :span="8">
                        <el-form-item label="题名:" size="small" label-width="80px">
                            <el-input v-model="titleName" placeholder="模糊查询"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="文号:" size="small" label-width="80px">
                            <el-input v-model="docNum" placeholder="模糊查询" ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="关键字:" size="small" label-width="80px">
                            <el-input v-model="keyCode" placeholder="模糊查询"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>

                    <el-col :span="8">
                        <el-form-item label="摘要:"  size="small" label-width="80px">
                            <el-input v-model="abstract" placeholder="模糊查询"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" >
                        <el-form-item size="small" label="责任人:" label-width="80px">
                            <el-input v-model="personLiable" placeholder="模糊查询"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item size="small" label-width="80px" style="margin: 0px 82px;">
                            <el-button type="primary" icon="el-icon-search" @click="queryData">查询</el-button>
                            <el-button type="success" icon="el-icon-info" @click="resetData">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>

             </el-form>

        </el-card>

        <el-card style="margin-top:20px">

            <div>
                <el-table :data="tableData" border style="width: 100%"  >
                    <el-table-column prop="id" label="ID"> </el-table-column>
                    <el-table-column prop="fileCabinetName" label="题名"> </el-table-column>
                    <el-table-column prop="fileCabinetAdd" label="文号"> </el-table-column>
                    <el-table-column prop="fileCabinetArea" label="关键字"> </el-table-column>
                    <el-table-column prop="strUsers" label="摘要"> </el-table-column>
                    <el-table-column prop="fileCabinetAdd" label="责任人"> </el-table-column>
                    <el-table-column prop="fileCabinetArea" label="所属日期"> </el-table-column>
                    <el-table-column prop="strUsers" label="单位"> </el-table-column>
                    <el-table-column prop="fileCabinetAdd" label="册号"> </el-table-column>
                    <el-table-column prop="fileCabinetArea" label="序号"> </el-table-column>
                    <el-table-column prop="strUsers" label="归档状态"> </el-table-column>
                    <el-table-column fixed="right" label="存储位置" > </el-table-column>
                </el-table>

                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>
        </el-card>

    </div>

</template>

<script>
/* import Util from '../../utils/util';
import par from '../../utils/param.js'; */
/* import DocTree from '../../components/pubcomponent/treemanage/DocumentTree' */

export default {
    data : function(){
        return {
            id : '',
            curPage : 1,
            pageSize : 15,
            totalCount : 0,
            catalog : '',
            orgName : '',
            titleName : '',
            docNum : '',
            keyCode : '',
            abstract : '',
            dateRange : [],
            tableData : [],
            personLiable : '',
            catalogOptions : [],
        }
    },
    components : {
        /* doctree : DocTree */
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
        queryData(){

        },
        resetData(){
            this.dateRange = [];
            this.catalog = this.orgName = this.titleName = this.docNum = this.keyCode = this.abstract = this.personLiable = '';
            
        }
        
    }
}
</script>

<style lang="less">

*{
    margin: 0px;
    padding: 0px;
}

.el-form-item__content div{
    width: 210px !important;
}
</style>
