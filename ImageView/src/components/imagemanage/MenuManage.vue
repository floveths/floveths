<template>
    
    <div class="menuBox">

        <el-card class="box-card" style="margin-bottom:20px">

            <div style="margin-bottom:20px;">
               <el-button type="primary" @click="onSubmit" size="small" icon="el-icon-plus"> 添加</el-button>
            </div>

            <el-table :data="tableData" border style="width: 100%" :tree-props="{children: 'children'}" @selection-change="handleSelectionChange">
                <el-table-column prop="name" label="名称"> </el-table-column>
                <el-table-column prop="href" label="链接"> </el-table-column>
                <el-table-column prop="permission" label="权限"> </el-table-column>
                <el-table-column prop="type" label="类型"> </el-table-column>
                <el-table-column prop="sort" label="排序"> </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <i class="el-icon-edit" @click="handleEditClick(scope.row)"></i>
                        <i class="el-icon-delete" @click="handleDelClick(scope.row)"></i>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>
    </div>

</template>
<script>
import Util from '../../utils/util';

export default {
    data : function(){
        return {
            newArr : [],
            tableData : []
        }
    },
    methods : {
        getTabData(){
            Util.getRequest('/menu/list',(res)=>{
                window.console.log(res);
            })
        },
        makeData(arr){
            window.console.log(arr)
            /* if(arr.length>0){
                for(let i=0;i<arr.length;i++){
                    if(arr[i].parentId==0){
                        this.newArr.push(arr[i])
                    }
                }
                for(let k=0;k<this.newArr.length;k++){
                    for(let q=0;q<arr.length;q++){
                        if(this.newArr[k].parentId==arr[q].id){
                            this.newArr[k].children.push(arr[q]);
                        }
                    }
                }
                this.tableData = this.newArr;
            } */
        },
        handleEditClick(obj){
            window.console.log(obj)
        },
        handleDelClick(obj){
            window.console.log(obj)
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
