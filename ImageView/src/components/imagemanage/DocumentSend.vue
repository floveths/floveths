<template>
    <div class="sendBox">

        <div class="contentBox">
            <ul>
                <li @click="showMainContent(1)">未归还</li>
                <li @click="showMainContent(2)">已归还</li>
            </ul>
            <div class="slideBar" v-bind:style='slideBarStyle'></div>
            <div class="contentMain">
                <div class="mainFirsrt" v-show="!showMainSecondContent">

                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column  prop="date" label="ID"> </el-table-column>
                        <el-table-column prop="date" label="单位名称" > </el-table-column>
                        <el-table-column prop="name" label="借出日期" > </el-table-column>
                        <el-table-column prop="province" label="借用开始时间" > </el-table-column>
                        <el-table-column prop="city" label="借用结束时间"> </el-table-column>
                        <el-table-column prop="address" label="是否超期"></el-table-column>
                        <el-table-column  prop="zip" label="超期时间/天" > </el-table-column>
                        <el-table-column label="操作" width="100"> </el-table-column>
                    </el-table>

                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                    :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>
                </div>
                <div class="mainSecond" v-show="showMainSecondContent">
                    
                     <el-table :data="tableData" border style="width: 100%">
                        <el-table-column  prop="date" label="ID"> </el-table-column>
                        <el-table-column prop="date" label="单位名称" > </el-table-column>
                        <el-table-column prop="name" label="借出日期" > </el-table-column>
                        <el-table-column prop="province" label="借用开始时间" > </el-table-column>
                        <el-table-column prop="city" label="借用结束时间"> </el-table-column>
                        <el-table-column prop="address" label="归还日期"></el-table-column>
                        <el-table-column label="操作" width="100"> </el-table-column>
                    </el-table>

                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                    :page-sizes="[15, 20, 25, 35]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>

                </div>
            </div>
        </div>

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
        'slideBarStyle' : {},
        'showMainSecondContent' : false
      };
    },
    watch : {
        showMainSecondContent : function(){
            if(this.showMainSecondContent){
                this.slideBarStyle = {'transition':'all .3s linear','transform':'translateY(-3px) translateX(100%)'};
            }else{
                this.slideBarStyle = {'transition':'all .3s linear','transform':'translateY(-3px) translateX(0%)'};
            }
        }
    },
    mounted : function(){
        this.getTabData(1);
    },
    methods: {
        handleSizeChange : function(size){
        
            this.pageSize = size;
            this.getTabData();
        },
        handleCurrentChange (se){

            this.curPage = se;
            this.getTabData();
        },
        getTabData(id){
            Util.getRequest(`/paperVoucherBorrow/queryAllStay?state=${id}&page=${this.curPage}&limit=${this.pageSize}`,(res)=>{
                this.curPage = res.body.number;
                this.totalCount = res.body.count;
                this.tableData = res.body.data;
            })
        },
        showMainContent (id){
            this.curPage = 1;
            switch(id){
                case 1:
                        this.getTabData(id);
                        this.showMainSecondContent  = false;
                    break;
                case 2:
                        this.getTabData(id);
                        this.showMainSecondContent = true;
                    break;
            }
        }
    }

}
</script>
<style lang="less">

*{
    margin: 0px;
    padding: 0px;
}

.el-pagination{
    display: inline-flex;
}

.sendBox{
    background: white;
    height: 100%;
    display: block;
    padding: 20px 5px;

    .contentBox{
        width: 100%;
        height: auto;
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
            background: white;

            .mainFirsrt , .mainSecond{
                position: absolute;
                width: 100%;
                height: auto;
                padding-top: 15px;
                background: white;
            }
        }
        
    }

}

</style>
