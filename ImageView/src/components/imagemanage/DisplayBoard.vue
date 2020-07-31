<template>

    <div class="DisplayMonitor">

        <el-card>

            <el-form :inline="true"  class="demo-form-inline">
                <el-form-item label="公司名称" size="mini">
                    <el-select v-model="compName" placeholder="请选择">
                        <el-option v-for="item in compOptions" :key="item.label"
                        :label="item.value" :value="item.label"></el-option>
                    </el-select>
                </el-form-item>


                <el-date-picker v-model="dateRange" size="mini" type="daterange"
                range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>

            </el-form>

            <div id="myChart" :style="{width: '1100px', height: '450px'}"></div>
        </el-card>

    </div>

</template>
<script>
import Util from '../../utils/util.js'

export default {
    data : function(){
        return {
            updateInfo:'',
            tabData : [],
            compName : '',
            dateRange : ['2019-12','2020-07'],
            compOptions : []
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

.DisplayMonitor{
    margin-right: 15px;
}


</style>
