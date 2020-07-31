<template >
    <div >

        <div class="correctImgViewBox">
            <div class="closeBar"  @click="closeModel">
                <i class=" el-icon-plus" ></i>
            </div>

            <div class="imgContentBox">
                <div class="imgContentBoxLeft">

                    <div class="imgContentCenter">
                        <div class="contentImgBox" id="contentImgBox">
                            <img :src="imgSrc" v-bind:style="bigImgStyle" id="ImageBox"> 
                        </div>
                    </div>

                </div>

            </div>

            <div class="bottomBar">

                <div class="rotateBar" >
                    <i class="el-icon-plus" v-on:click="bigImage(1)"></i>
                    <span >0°</span>
                    <div class="rotateBarContent">
                        <p class="rotateText" id="rotateText" >0°</p>
                        <div class="rotateProgress" id="rotateProgress"></div>
                        <div class="rotateCircle" id="rotateCircle" ></div>
                    </div>
                    <span>360°</span>
                    <i class="el-icon-minus" v-on:click="bigImage(2)"></i>
                </div>
                
            </div>

        </div>
    </div>
</template>

<script>
import par from '../../../utils/param.js'
import util from '../../../utils/util'

export default {
    props :['imgSrc'],
    data : function(){
        return {
            'bigImgStyle' : {}
        };
    },
    mounted : function(){

        util.moveImage('contentImgBox','ImageBox');
        this.bigImgStyle = util.scrollImage('ImageBox');

        window.setTimeout(()=>{
            this.slideBarToTransfer();
        },500)
        
    },
    methods : {
        closeModel (){
            this.$emit('closeModel');
        },
        bigImage : function(id){
           var style = util.bigImage(id);
           this.bigImgStyle = style;
        },
        slideBarToTransfer(){
            
            let pageX = 0;
            let Left = 0;
            let _this = this;

            var circle = document.getElementById('rotateCircle');
            var rotateText = document.getElementById("rotateText");
            var rotateProgress = document.getElementById("rotateProgress");

            circle.onmousedown = function(e){

                Left = circle.style.marginLeft;
                if(Left==''||Left==null){
                    Left = 0;
                }else{
                    Left = parseInt(Left);
                }
                window.onmousemove = function(es){
                    
                    pageX = (es.pageX - e.pageX) + Left;
                    if(pageX <= 0){
                        pageX = 0;
                    }else if(pageX >= 220){
                        pageX = 220;
                    }
                    
                    circle.style.marginLeft = pageX +'px';
                    rotateProgress.style.width = pageX + 'px';
                    par.rotatez = Math.floor(pageX * 1.64);
                    rotateText.innerText =  par.rotatez + '°';
                    _this.bigImage('r');

                }
            }
            
            window.onmouseup = function(){
                window.onmousemove = null;
                return false;
            }
            
        }
    }
 
}
</script>

<style lang="less" >

*{
    margin: 0px;
    padding: 0px;
}

.correctImgViewBox{
    width: 100vw;
    height: 100vh;
    position: fixed;
    //background: rgb(238, 238, 238);
    background: #ecececed;
    top: 0;
    left: 0;
    z-index: 999;

    .closeBar{
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0;
        z-index: 99999;
        font-size: 25pt;
        cursor: pointer;
        transform: rotateZ(45deg);
    }

    .imgContentBox{

        display: flex;
        justify-content: space-between;

        .imgContentBoxLeft{
            height: 90vh;
            width: 100%;
            flex: 4;
            display: flex;
            font-size: 40pt;
            line-height: 80vh;
            font-weight: 800;
            justify-content: space-between;
            .imgContentLeft{
                flex: 1;
                cursor: pointer;
            }
            .imgContentCenter{
                width: auto;
                overflow: hidden;
                height: 100%;
                flex: 20;
                .contentImgBox{
                    width: 100%;
                    height: 100%;
                    position: relative;
                    img{
                        margin: auto;
                        max-width: 100%;
                        display: block;
                        height: auto;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                    }
                    
                }
            }
            .imgContentRight{
                flex: 1;
                cursor: pointer;
            }
        }

        .imgContentBoxRight{
            flex: 1;
            height: 90vh;
            padding-top: 45px;
        }

    }
    .bottomBar{
        height: 36px;
        margin: 10px auto;
        border-radius: 10px;
        position: relative;

        .barBox{
            width: 200px;
            height: 100%;
            background:white;
            margin: auto;
            border-radius: 5px;
            box-shadow: 2px 4px 8px#848383;
        }

        .barBox > i{
            cursor: pointer;
            color: #534c4c;
            font-size: 12pt;
            width: 30px;
            height: 30px;
            display: inline-block;
            border-radius: 50%;
            text-align: center;
            line-height: 28px;
            margin: 2px 5px;
            border: 2px solid #757373;
            box-shadow: 2px 2px 4px #ccc inset;
        }

        .rotateBar{
            width: 396px;
            height: 45px;
            display: inline-block;
            margin: 10px auto 15px;
            position: absolute;
            right: 0;
            left: 0;
            background: #ffffffbd;
            border-radius: 5px;
            padding: 15px 10px;

            > i{
                float: left;
                border: 1px solid;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                text-align: center;
                line-height: 24px;
                margin-top: -2px;
            }
        }

        .rotateBar span{
            display: block;
            float: left;
            margin: -2px 15px ;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            text-align: center;
            font-size: 8pt;
            line-height: 22px;
            border: 1px solid rgb(44, 44, 44);
        }

        .rotateBar img{
            width: 24px;
            height: 24px;
            display: block;
            float: left;
            margin-top: -3px;
            cursor: pointer;
        }

        .rotateBarContent{
            display: block;
            width: 220px;
            height: 6px;
            float: left;
            background: #e4ffb3;
            margin-top: 5px;
            border-radius: 5px;
            position: relative;
        }

        .rotateText{
            text-align: center;
            margin: -20px 0px 0px 0px;
        }

        .rotateProgress{
            width: 0px;
            background: #5ad9ff;
            height: 100%;
            border-radius: 4px;
            margin-top: -4px;
        }

        .rotateCircle{
            width: 10px;
            height: 10px;
            background: #ff9130;
            border-radius: 50%;
            position: absolute;
            top: -2px;
            left: -6px;
            cursor: pointer;
        }

        .cutSamllImg{
            width: auto;
            height: auto;
            margin-bottom: 20px;
            position: absolute;
            bottom: 10px;
            right: 0;
            left: 0;
            margin: 0px 35px;
            background: white;
            border-radius: 5px;
            box-shadow: 0px 2px 10px rgb(190, 190, 190);
            > div{
                width: 120px;
                height: auto;
                float: left;
                margin: 5px;
                cursor: pointer;
                border-radius: 5px;
                border: 2.5px solid rgb(211, 239, 255);
                
                > img{
                    width: 100%;
                    border-radius: 5px;
                    background-size: contain;
                }        
            }
        }
    
    }


}


</style>