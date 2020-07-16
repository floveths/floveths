<template>

    <div class="serverMonitor">

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

        <el-card style="margin-top:30px;">
            <div id="myChart" :style="{width: '1100px', height: '450px'}"></div>
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
                legend: {
                    data: ['招商银行', '浦发银行', '广发银行', '上海银行']
                },
                color:['#F56C6C'],
                tooltip: {
                  trigger: 'axis'   // axis   item   none三个值
                },
                xAxis: {
                    type: 'category',   // 还有其他的type，可以去官网喵两眼哦
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],   // x轴数据
                    name: '日期',   // x轴名称
                    // x轴名称样式
                    nameTextStyle: {
                        fontWeight: 600,
                        fontSize: 18
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '纵轴名称',   // y轴名称
                    // y轴名称样式
                    nameTextStyle: {
                        fontWeight: 600,
                        fontSize: 18
                    }
                },
                series: [
                    {
                        name: '招商银行',
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    },
                    {
                        name: '浦发银行',
                        data: [620, 711, 823, 934, 1445, 1456, 1178],
                        type: 'line'
                    },
                    {
                        name: '广发银行',
                        data: [612, 920, 1140, 1160, 1190, 1234, 1321],
                        type: 'line'
                    },
                    {
                        name: '上海银行',
                        data: [234, 320, 453, 567, 789, 999, 1200],
                        type: 'line'
                    }
                ]
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

.serverMonitor{
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
