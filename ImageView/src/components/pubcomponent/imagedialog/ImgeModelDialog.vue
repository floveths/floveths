<template >
    <div >

        <div class="imgViewBox">
            <div class="closeBar"  @click="closeModel">
                <i class=" el-icon-plus" ></i>
            </div>

            <div class="imgContentBox">
                <div class="imgContentBoxLeft">

                    <div class="imgContentLeft" v-show="showBar">
                        <i class="el-icon-arrow-left" @click="slideImgLeft"></i>
                    </div>
                    <div class="imgContentCenter">
                        <div class="contentImgBox" id="contentImgBox">
                            <img :src="imgUrl" v-bind:style="bigImgStyle" id="ImageBox"> 
                        </div>
                    </div>
                    <div class="imgContentRight" v-show="showBar">
                        <i class="el-icon-arrow-right" @click="slideImgRight"></i>
                    </div>

                </div>

                <div class="imgContentBoxRight" v-show="showOcrList" >
                    <ocrtemplate :type="1" :items="ocrInfoList" :offsetstyle="''"></ocrtemplate>
                </div>
            </div>

            <div class="bottomBar">
                <div class="barBox" v-if="showBar">
                    <i class="el-icon-refresh-left" v-on:click="bigImage(3)"></i>
                    <i class="el-icon-plus" v-on:click="bigImage(1)"></i>
                    <i v-on:click="bigImage(0)"><span>1:1</span></i>
                    <i class="el-icon-minus" v-on:click="bigImage(2)"></i>
                    <i class="el-icon-refresh-right" v-on:click="bigImage(4)"></i>
                </div>
                <div class="rotateBar" v-if="!showBar">
                    <i class="el-icon-plus" v-on:click="bigImage(1)"></i>
                    <span >0°</span>
                    <div class="rotateBarContent">
                        <p class="rotateText" id="rotateText" >0°</p>
                        <div class="rotateProgress" id="rotateProgress"></div>
                        <div class="rotateCircle" id="rotateCircle" @mousedown="slideBarToTransfer"></div>
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
import ocrTemplate from '../ocrtemp/OcrListTemplate'

export default {
    props :['imgSrc','showBar','ticketId','appPoolData'],
    data : function(){
        return {
            'bigImgStyle' : {},
            'imgUrl' : '',
            'ocrInfoList' : [],
            'showOcrList' : true,
            'fromAppPool' : false,
            'totalCount': 0
        };
    },
    components : {
        'ocrtemplate' : ocrTemplate
    },
    watch : {
        imgSrc  (){
            this.imgUrl = this.imgSrc;
        },
        appPoolData (){
            
            if(this.appPoolData.length > 0){
                this.fromAppPool = true;
                this.totalCount = this.appPoolData.length;
            }else{
                this.totalCount = this.$store.state.imgTotalCount;
            }
        },
        ticketId : function(){
            if(this.ticketId!=''||this.ticketId!=null&&this.showBar==true){

                let id = this.ticketId;
                util.getRequest(`/webShowImage/invoiceInfo/${id}`,(res)=>{
                    window.console.log(res);

                    /* if(res.body.status == "200"||res.body.status == 200){
                        if(res.body.data.length>0){
                            this.showOcrList = true;
                            this.ocrInfoList = res.body.data;
                        }else{
                            this.showOcrList = false;
                        }
                        
                    } */

                })

            }
        }
    },
    mounted : function(){

        util.moveImage('contentImgBox','ImageBox');
        this.bigImgStyle = util.scrollImage('ImageBox');
        
    },
    methods : {
        closeModel (){
            this.$emit('closeModel',{'close':false,'rotate':this.showBar,'fileId':this.ticketId});
        },
        bigImage : function(id){
           var style = util.bigImage(id);
           this.bigImgStyle = style;
        },
        slideImgLeft : function(){
            let curIndex = this.$store.state.curImgIndex;
            
            if(curIndex <= 1){
                util.showModelTip('warning','已经是第一张图片了');
                return false;
            }else{
                curIndex--;
                if(this.fromAppPool){
                
                    this.imgUrl = par.imgTotalArr[curIndex-1].imageSrc;
                    this.getOcrInfo(par.imgTotalArr[(curIndex-1)].imgFielId);    
                }else{
                    
                    this.imgUrl = par.imgTotalArr[curIndex-1].imageSrc;
                    this.getOcrInfo(par.imgTotalArr[(curIndex-1)].imgFielId);
                }

                this.$store.commit('changeImgIndex',curIndex);
                let ImageBox = document.getElementById('ImageBox');
                ImageBox.style.marginTop = 'auto';
                ImageBox.style.marginLeft = 'auto';
            }
        },
        slideImgRight : function(){
            let curIndex = this.$store.state.curImgIndex;
            
            if(curIndex >= this.totalCount){
                util.showModelTip('warning','已经是最后一张图片了');
                return false;
            }else{
                
                curIndex++;
                if(this.fromAppPool){
                    this.imgUrl = this.appPoolData[curIndex].url;

                }else{
                    
                    this.imgUrl = par.imgTotalArr[(curIndex-1)].imageSrc;
                    this.getOcrInfo(par.imgTotalArr[(curIndex-1)].imgFielId);
                }

                this.$store.commit('changeImgIndex',curIndex);
                let ImageBox = document.getElementById('ImageBox');
                ImageBox.style.marginTop = 'auto';
                ImageBox.style.marginLeft = 'auto';
                
            }
        },
        getOcrInfo(id){
            
            util.getRequest(`/webShowImage/invoiceInfo/${id}`,(res)=>{

                if(res.body.status == "200"||res.body.status == 200){
                    if(res.body.data.length>0){
                        this.showOcrList = true;
                        this.ocrInfoList = res.body.data;
                    }else{
                        this.showOcrList = false;
                    }
                    
                }
            });
        },
        slideBarToTransfer(e){
            
            let pageX = 0;
            let offSetX =0;
            let cirCleleft = 0;
            var circle = document.getElementById('rotateCircle');
            var rotateText = document.getElementById("rotateText");
            var rotateProgress = document.getElementById("rotateProgress");

            pageX = e.pageX;
            let _this = this;
            document.onmousemove = function(es){
                
                offSetX = es.pageX;
                if(offSetX - pageX > 220){
                    cirCleleft = 220;
                }else if(offSetX - pageX <= 0){
                    var left = parseInt(circle.style.marginLeft);
                    
                    cirCleleft = (left - (pageX - offSetX));
                    if(cirCleleft <= 0){
                        cirCleleft = 0;
                    }
                }else{
                    cirCleleft = (offSetX-pageX);
                }
                
                circle.style.marginLeft = cirCleleft +'px';
                rotateProgress.style.width = cirCleleft + 'px';
                par.rotatez = Math.floor(cirCleleft * 1.64);
                rotateText.innerText =  par.rotatez + '°';
                _this.bigImage('r');
            }
            
            document.onmouseup = function(){
                document.onmousemove = null;
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

.imgViewBox{
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
            overflow-y: auto;
        }

    }
    .bottomBar{
        height: 36px;
        margin: 10px auto;
        border-radius: 10px;

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

    
    }


}


</style>