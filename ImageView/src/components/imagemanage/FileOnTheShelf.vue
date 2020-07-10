<template>
    
    <div class="shelfBox">

        <el-card class="box-card" style="margin-bottom:20px">
            <div slot="header" class="clearfix">
                <span>查询条件</span>
            </div>

            <div >
                <el-form :inline="true"  class="demo-form-inline">

                    <el-form-item label="单位名称">
                        <el-input v-model="orgName"></el-input>
                    </el-form-item>

                    <el-form-item label="年度">
                        <el-date-picker type="year" placeholder="选择日期" value-format="yyyyy" v-model="voucherYear" ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="月度">
                        <el-select v-model="voucherMonth" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.label"
                            :label="item.value" :value="item.label"> </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" icon="el-icon-search"> 查询</el-button>
                    </el-form-item>

                </el-form>

            </div>
        </el-card>

        <div class="contentBox">
            <ul>
                <li @click="showMainSecondContent=false">待上架</li>
                <li @click="showMainSecondContent=true">已上架</li>
            </ul>
            <div class="slideBar" v-bind:style='slideBarStyle'></div>
            <div class="contentMain">
                <div class="mainFirsrt" v-show="!showMainSecondContent">

                    <div style="margin-bottom:10px;">
                        <el-button type="success" size="small"><i class="el-icon-add"></i>上架</el-button>
                    </div>

                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column fixed prop="date" label="日期" width="150"> </el-table-column>
                        <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
                        <el-table-column prop="province" label="省份" width="120"> </el-table-column>
                        <el-table-column prop="city" label="市区" width="120"> </el-table-column>
                        <el-table-column prop="address" label="地址" width="300"> </el-table-column>
                        <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                        </el-table-column>
                    </el-table>

                     <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                    :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>
                </div>
                <div class="mainSecond" v-show="showMainSecondContent">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column fixed prop="date" label="ID" width="150"> </el-table-column>
                        <el-table-column prop="name" label="姓名"> </el-table-column>
                        <el-table-column prop="province" label="省份"> </el-table-column>
                        <el-table-column prop="city" label="市区"> </el-table-column>
                        <el-table-column prop="address" label="地址"> </el-table-column>
                        <el-table-column prop="zip" label="邮编"> </el-table-column>
                        <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                        </el-table-column>
                    </el-table>

                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                    :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>

                </div>
            </div>
        </div>

        <el-dialog title="公司列表" :visible.sync="dialogListVisible">
            <doctree @getNodeInfo='getNodeInfo' :show-checkbox="false" :treeData="treeData"></doctree>
        </el-dialog>

    </div>

</template>
<script>
import Util from '../../utils/util.js';
import par from '../../utils/param.js';
import DocTree from '../../components/pubcomponent/treemanage/DocumentTree'

export default {
    data() {
      return {
        qType : 0,
        curPage : 1,
        pageSize : 15,
        totalCount : 0,
        tableData : [],
        treeData : [],
        'orgCode' : '',
        'orgName' : '',
        'voucherYear' : '',
        'voucherMonth' : '',
        'slideBarStyle' : {},
        'activeName' : 'first',
        'formLabelWidth' : '120px',
        'dialogFormVisible' : true,
        'showMainSecondContent' : false,
        options : par.selectOptions,
        dialogListVisible : false
      };
    },
    components : {
        doctree : DocTree
    },
    watch : {
        showMainSecondContent : function(){
            if(this.showMainSecondContent){
                this.qType = 1;
                this.slideBarStyle = {'transition':'all .3s linear','transform':'translate(100%,-3px)'};
            }else{
                this.qType = 0;
                this.slideBarStyle = {'transition':'all .3s linear','transform':'translate(0%,-3px)'};
            }
            this.getTabData();
        }
    },
    mounted : function(){
      this.getTabData();
    },
    methods :{
        handleSizeChange : function(size){
            
            this.pageSize = size;
            this.getTabData();
        },
        handleCurrentChange (se){

            this.curPage = se;
            this.getTabData();
        },
        getNodeInfo(obj){
            
            this.orgCode = obj.orgCode;
            this.orgName = obj.orgName;
            this.dialogListVisible = false;
        },
        onSubmit(){
            this.getTabData();
        },
        getTreeData(){
            Util.getRequest('/archives/tree',(res)=>{
                if(res.body.data.length>0){
                    this.treeData = res.body.data;
                }
            })
        },
        getTabData(){
            window.console.log(this.qType)
          let url = '';
          if(this.qType==0){
              url = `/paperEaArchives/eaArchivesList?page=${this.curPage}&limit=${this.pageSize}&orgCode=${this.orgCode}&voucherYear=${this.voucherYear}&voucherMonth=${this.voucherMonth}`
          }else{
              url = `/paperEaArchives/queryAll?orgCode=${this.orgCode}&voucherYear=${this.voucherYear}&voucherMonth=${this.voucherMonth}&page=${this.curPage}&limit=${this.pageSize}`
          }
            
        Util.getRequest(url,(res)=>{

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

.form-group{
    margin: 0px 10px !important;
}

.form-group label{
    padding: 5px;
    border-bottom: 1px solid rgb(223, 223, 223);
}

.el-pagination{
    display: inline-flex;
}

.contentBox{
    width: 100%;
    height: 100%;
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
            width: 50%;
            height: 30px;
            color: #409EFF;
            text-align: center;
            cursor: pointer;
        }
    }

    .slideBar{
        width: 50%;
        height: 3px;
        color: #409EFF;
        position: relative;
        display: block;
        background: #409EFF;
        transform: translateY(-3px);
    } 

    .contentMain{
        position: relative;

        .mainFirsrt , .mainSecond{
            position: absolute;
            width: 100%;
            height: auto;
            padding: 15px;
            background: white;
        }
    }
    
}


</style>
