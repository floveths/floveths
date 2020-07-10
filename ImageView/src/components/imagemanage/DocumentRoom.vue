<template>
    
    <div class="roomBox">


        <el-card>
            <div style="margin-bottom:10px;">
                <el-button type="primary" @click="addDocRoom"><i class="el-icon-plus"></i> 新增档案室</el-button>
            </div>

            <div>
                <el-table :data="tableData" border style="width: 100%"  >
                    <el-table-column prop="id" label="ID"> </el-table-column>
                    <el-table-column prop="fileCabinetName" label="档案室名称"> </el-table-column>
                    <el-table-column prop="fileCabinetAdd" label="档案室地址"> </el-table-column>
                    <el-table-column prop="fileCabinetArea" label="档案室面积"> </el-table-column>
                    <el-table-column prop="strUsers" label="档案室管理员"> </el-table-column>
                    <el-table-column fixed="right" label="操作" width="140">
                        <template slot-scope="scope">
                            <el-tag @click="handleLookClick(scope.row)" type="primary" size="mini">查看</el-tag>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <el-tag @click="handleEditClick(scope.row)" type="success" size="mini">编辑</el-tag>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <el-tag @click="handleDelClick(scope.row)" type="danger" size="mini">删除</el-tag>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>
        </el-card>

        <el-dialog title="档案室管理..." :visible.sync="dialogFormVisible">
            <el-form >
                <el-form-item label="档案室名称" :label-width="formLabelWidth">
                <el-input  autocomplete="off" v-model="docName"></el-input>
                </el-form-item>
            </el-form>
            <el-form >
                <el-form-item label="档案室管理员" :label-width="formLabelWidth">
                <el-input  autocomplete="off" v-model="docUser"></el-input>
                </el-form-item>
            </el-form>
            <el-form >
                <el-form-item label="档案室面积" :label-width="formLabelWidth">
                <el-input  autocomplete="off" v-model="docArea"></el-input>
                </el-form-item>
            </el-form>
            <el-form >
                <el-form-item label="档案室地址" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="docAddr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-show="isLook" size="small" @click="saveDocInfo">保 存</el-button>
                <el-button type="danger" size="small" @click="dialogFormVisible=false">关 闭</el-button>
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
        type : 0,
        curPage : 1,
        pageSize : 15,
        totalCount : 0,
        tableData : [],
        docName : '',
        docAddr : '',
        docArea : '',
        docUser : '',
        isLook : true,
        'formLabelWidth' : '100px',
        'dialogFormVisible' : false
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
        getTabData(){
            Util.getRequest(`/archivesBorrow/allFileRoom?page=${this.curPage}&limit=${this.pageSize}`,(res)=>{
                this.curPage = res.body.number;
                this.totalCount = res.body.count;
                //this.tableData = res.body.data;
            })
        },
        addDocRoom(){
            this.type = 1;
            this.docUser = this.docName =
            this.docAddr = this.docArea = '';
            this.dialogFormVisible=true;
        },
        saveDocInfo(){
            Util.valideInput(this.docUser,'管理员');
            Util.valideInput(this.docName,'档案室名称');
            Util.valideInput(this.docAddr,'档案室地址');
            Util.valideInput(this.docArea,'档案室面积');

            let url = ''
            let param = {
                'id' : '',
                'strUsers' : this.docUser,
                'fileCabinetName' : this.docName,
                'fileCabinetAdd' : this.docAddr,
                'fileCabinetArea' : this.docArea
            };
            if(this.type == 1){
                url = '/archivesBorrow/addFileRoomManage';
            }else if(this.type == 2){
                param.id = this.id;
                url = '/archivesBorrow/saveFileRoom';
            }
            
            Util.postRequest(url,param,(res)=>{
                window.console.log(res);
            })

        },
        handleLookClick(obj){
            this.isLook = false;
            this.docUser = obj.strUsers;
            this.docName = obj.fileCabinetName;
            this.docAddr = obj.fileCabinetAdd;
            this.docArea = obj.fileCabinetArea;
            this.dialogFormVisible = true;
        },
        handleEditClick(obj){
            this.type = 2;
            this.id = obj.id;
            this.isLook = true;
            this.docUser = obj.strUsers;
            this.docName = obj.fileCabinetName;
            this.docAddr = obj.fileCabinetAdd;
            this.docArea = obj.fileCabinetArea;
            this.dialogFormVisible=true;
        },
        handleDelClick(obj){
            this.id = obj.id;
            let func = function(){
                Util.postRequest('/archivesBorrow/archivesDelete',{id:this.id},(res)=>{
                    window.console.log(res);
                });
            }
            Util.showConfirm(this,'确认删除吗?','提示!',func);
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
