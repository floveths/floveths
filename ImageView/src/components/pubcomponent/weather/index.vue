<template>

  <div class="containerBox">


    <div class="containerLeft">

      <div class="contentLeft">
        <div class="leftTop">
          <h4>{{date}}</h4>
          <p>2020年4月23日</p>
          <P> <i class="el-icon-delete-location"></i> {{city}}</P>
        </div>
        <div class="leftBottom">
          <h3>{{wendu}}℃</h3>
          <p>{{type}}</p>
        </div>
      </div>

      <div class="contentRight">
        <div class="rightTop">
          <ul>
            <li>降水量</li>
            <li>风向</li>
            <li>温度</li>
          </ul>
          <ul>
            <li>0%</li>
            <li>{{fengxiang}}</li>
            <li>{{temp}}</li>
          </ul>
        </div>
        <div class="rightBottom">
          <ul class="ulList">
            <li v-for="(d , index) in dataList" v-bind:key="index">
              <p><i v-bind:class="icon"></i></p>
              <p class="day">{{d.date | formatDate}}</p>
              <p>{{d.type | formatType}}</p>
            </li>
            
          </ul>
        </div>
      </div>

    </div>

    <div class="containerRight">

      <div class="dataBox">
        <div class="monthBox">
          <ul>
            <li><span>一月</span></li>
            <li><span>二月</span></li>
            <li><span>三月</span></li>
            <li><span>四月</span></li>
            <li class="active"><span>五月</span></li>
            <li><span>六月</span></li>
            <li><span>七月</span></li>
            <li><span>八月</span></li>
            <li><span>九月</span></li>
            <li><span>十月</span></li>
            <li><span>十一月</span></li>
            <li><span>十二月</span></li>
          </ul>
        </div>
        <div class="contentBoxClander">
          <div class="dataTitle">
            <div class="prev">
              <span> 上个月</span>
            </div>
            <div class="yearMonth">
              <p><span id="year"></span> · <span id="month"></span>月</p>
            </div>
            <div class="next">
              <span>下个月  </span>
            </div>
          </div>
          <div class="clanderBox">
            <div class="dataBar">
              <ul class="barUl">
                <li><span>日</span></li>
                <li><span>一</span></li>
                <li><span>二</span></li>
                <li><span>三</span></li>
                <li><span>四</span></li>
                <li><span>五</span></li>
                <li><span>六</span></li>
              </ul>
            </div>
            <div class="dataContent">
              <ul class="dataUl" id="dataUl">
                
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
    
  </div>

</template>

<script>
import util from '../../../utils/util'

export default({
  data : function(){
    return {
      icon : 'el-icon-sunny',
      date : null,
      wendu : null,
      type : null,
      city : null,
      temp : null,
      fengxiang : null,
      dataList : null,
      url : 'http://wthrcdn.etouch.cn/weather_mini?city=%E5%8C%97%E4%BA%AC'
    };
  },
  filters : {
    formatDate : function(msg){
      return msg.substring(msg.indexOf('星'),msg.length)
    }
  },
  mounted() {

    var date = new Date();
    this.getClander(date.getFullYear(),(date.getMonth()+1),date.getDate());

    util.getWeatherInfo(this.url,(res)=>{

      this.wendu = res.body.data.wendu;
      this.city = res.body.data.city;
      var data = {data : res.body.data.forecast};
      this.dataList = data.data;
      this.type = this.dataList[0].type;
      this.fengxiang = this.dataList[0].fengxiang;
      this.temp = this.dataList[0].high+'·'+this.dataList[0].low;
      
    })    
  },
  methods: {
      getClander : function(year,month,day){
				
				var li = '';
				var count = 0;
				document.getElementById('year').innerHTML = year;
				document.getElementById('month').innerHTML = month;
				/*上月*/
				var lastMonthCountDay = (new Date(year,month-1,-1).getDate()+1);
				
				/*本月*/
				var weekOfFirstDay = new Date(year,month-1,1).getDay();
				var curMonthCountDay = new Date(year,month,-1).getDate()+1;
				var dataUl = document.getElementById("dataUl");
				
				for(var s=weekOfFirstDay;s > 0;s--){
					li+='<li class="lastMonth">'+((lastMonthCountDay+1) - s)+'</li>'
					count++;
				}
				
				for(var i=1;i<=curMonthCountDay;i++){
					if(i == day){
						li+='<li class="active">'+i+'</li>';
					}else{
						li+='<li>'+i+'</li>';	
					}
					count++;
				}
				
				if(count < 42){
					//lastMonthCountDay = new Date(year,month+1,-1).getDate()+1;
					var len = 42 - count;
					for(var o=0;o<len;o++){
						li+='<li class="nextMonth">'+(o+1)+'</li>';
					}
				}
				dataUl.innerHTML = li;
				
			}
			
  }

});

</script>

<style lang="less" >
  .containerBox{

    display: flex;
    height: 100%;
    justify-content: center;
    justify-items: center;

    .containerLeft{
      height: 300px;
      width: 530px;
      display: flex;
      color: white;
      justify-content: space-between;
      border-radius: 25px;
      box-shadow: 0px 5px 20px 10px #ccc;
      
      .contentLeft{
        width: 320px;
        height: auto;
        background: linear-gradient( 135deg, #72EDF2 10%, #5151E5 100%);
        border-radius: 25px 0 0 25px;

        .leftTop{
          width: 100%;
          height: auto;
          padding: 10px 20px;
          box-sizing: border-box;
          h4{
            font-size: 14pt;
          }

        }

        .leftBottom{
          width: 100%;
          height: auto;
          padding: 10px 20px;
          font-size: 16pt;
          box-sizing: border-box;
        }

      }

      .contentRight{
        width: 100%;
        height: auto;
        padding: 20px 35px;
        background: #222831;
        border-radius: 0px 25px 25px 0px;
        box-sizing: border-box;

        .rightTop {
          display: flex;
          background: #353f4f;
          border-radius: 10px;
          justify-items: center;
          align-items: center;
          justify-content: space-between;

          ul li{
            cursor: pointer;
            margin: 10px 15px !important;
            list-style: none;
          }
        }
        
        .rightBottom{
          
          .ulList {
            width: auto;
            list-style: none;
            display: flex;
            margin-top: 15px;
            justify-content: center;
            border-radius: 10px;
            background: #353f4f;
            li{
              width: 100%;
              height: 100px;
              display: block;
              cursor: pointer;
              line-height: 30px;
              text-align: center;
              .day{
                font-size: 12px;
              }
              p{
                margin: 0px !important;
              }
            }
            li:nth-child(1){
              color: black;
              border-radius: 10px;
              background: white;
            }
            
          }
          li:hover{
            color: black;
            border-radius: 10px;
            transition: all .3s linear;
            transform: scale(1.2);
            background: white;
          }

        }

      }
    }

  .containerRight{
    width: 100%;
    height: 100%;

    .active{
        color: white;
        box-shadow: 0px 2px 4px rgb(207, 205, 205);
				background: #69c1ee !important;
			}
			.dataBox{
				width: 400px;
				height: 435px;
				margin: 0px auto;
				position: relative;
				justify-content: center;
				border-radius: 2px;
				box-sizing: border-box;
        box-shadow: 0px 5px 10px #E5E5E5;
			}
			.dataTitle{
				display: flex;
				padding: 8px;
				height: 40px;
				line-height: 25px;
				margin: 0px 0px 10px;
				text-align: center;
				align-content: center;
				vertical-align: middle;
        align-items: center;
        border-radius: 5px;
				justify-content: space-between;
				box-shadow: 0px 5px 15px #DCE4EA;
			}
			.yearMonth{
        flex: 2;
        p{
          margin-top: 15px;
        }
			}
			.prev,.next{
				flex: 1.5;
				font-size: 9pt;
			}
			.dataBar{
				width: 100%;
				height: 30px;
				padding: 0px;
			}
			.barUl{
				display: grid;
				padding: 2.5px 0px;
				list-style: none;
				background: linear-gradient(180deg,#eee,#ddd,#eee);
				grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			}
			.barUl > li{
				text-align: center;
				border-collapse: collapse;
			}
			.contentBoxClander{
				position: absolute;
				width: 100%;
				height: 100%;
				padding: 5px 5px;
				box-sizing: border-box;
				background: linear-gradient(120deg, #ffd840, #93ff4a);
			}
			.dataContent > .dataUl{
				list-style: none;
				width: auto;
				margin: 0px;
				height: 336px;
				padding: 0px;
				display: grid;
        margin-top: 8px;
        line-height: 50px;
				box-sizing: border-box;
				justify-content: center;
				text-align: center;
				align-self: center;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        li{
          margin: 1.5px;
          cursor: pointer;
          border-radius: 3px;
          border: 1px solid #ebebeb;
        }
			}
			
			.dataTitle,.dataBar{
				background: #FBFBFB;
			}
			.lastMonth,.nextMonth{
				color: #C5C5C5;
			}
			.monthBox{
				width: 100%;
				height: 100%;
				color: #666363;
				position: absolute;
				background: #fffffff0;
			}
			.monthBox ul{
				list-style: none;
				display: grid;
				justify-content: center;
				grid-template-columns: 1fr 1fr 1fr;
			}
			.monthBox ul li{
				display: block;
				text-align: center;
				line-height: 72px;
				margin: 2.5px;
				background: #FBFBFB;
				box-shadow: 0px 2px 10px #e1dede;
			}

  }

  }
</style>