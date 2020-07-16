<template>

    <div class="tomcatMonitor">


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
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>

        </el-card>

        <div id="myChart" :style="{width: '1100px', height: '450px'}"></div>

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
    mounted(){
        this.drawLine();
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

        },
        drawLine(){
        // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                color:['#67C23A'],
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子",'短裤','短袖','羽绒服','鞋子','帽子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20,78,45,62,50,35]
                }]
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

.tomcatMonitor{
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
