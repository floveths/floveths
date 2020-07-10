<template>

    <div class="jvmMonitor">

        <el-card>

            <el-tag type="success" class="bageBox">

                <span><i class="el-icon-loading"></i>上次更新时间：{{updateInfo}}</span>
                <button type="button" class="updataInfo" @click="updataInfo">立即更新</button>
            </el-tag>

            <table class="table  table-hover  table-light">

                <thead>
                    <tr>
                        <td><span>参数</span></td>
                        <td><span>描述</span></td>
                        <td><span>当前值</span></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tabData" v-bind:key="index">
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                </tbody>

            </table>

        </el-card>

    </div>

</template>
<script>
import Util from '../../../utils/util.js'

export default {
    data : function(){
        return {
            updateInfo:'',
            tabData : []
        }
    },
    beforeMount : function(){

        let time = window.localStorage.getItem('serverInfoTime');
        this.updateInfo = time;

    },
    methods : {
        updataInfo (){

            let d = new Date();
            let month = (d.getMonth+1);
            let str = `${d.getFullYear()}年 ${month}月 ${d.getDate()}日 ${d.getHours()}时 ${d.getMinutes()}分 ${d.getSeconds()}秒`;
            
            Util.getRequest('',(res)=>{
               window.console.log(res);
               window.localStorage.setItem(str);
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

.jvmMonitor{
    margin-right: 15px;
}

.bageBox{
    margin: 10px 0px;
}

.updataInfo{
    width: auto;
    height: auto;
    border: 0px;
    margin: 0px 25px;
    cursor: pointer;
    color: rgb(111, 158, 247);
    background: transparent;
}

</style>
