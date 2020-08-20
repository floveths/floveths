<template >
    <div class="imgViewBox">
        <div class="closeBar"  @click="closeModel">
            <i class=" el-icon-plus" ></i>
        </div>

        <div class="imgContentBox">
            <div class="imgContentBoxLeft">

                <div class="imgContentLeft" v-show="barType==1">
                    <i class="el-icon-arrow-left" @click="slideImgLeft"></i>
                </div>
                <div class="imgContentCenter">
                    <div class="contentImgBox" id="contentImgBox">
                        <img :src="imgUrl" v-bind:style="bigImgStyle" id="ImageBox"> 
                    </div>
                </div>
                <div class="imgContentRight" v-show="barType==1">
                    <i class="el-icon-arrow-right" @click="slideImgRight"></i>
                </div>

            </div>

            <div class="imgContentBoxRight" v-show="showOcrList" >
                <ocrtemplate :type="1" :items="ocrInfoList" ></ocrtemplate>
            </div>
        </div>

        <div class="bottomBar">
            <div class="barBox" v-if="barType==1">
                <i class="el-icon-refresh-left" v-on:click="oprateBigImage(3)"></i>
                <i class="el-icon-plus" v-on:click="oprateBigImage(1)"></i>
                <i v-on:click="oprateBigImage(0)"><span>1:1</span></i>
                <i class="el-icon-minus" v-on:click="oprateBigImage(2)"></i>
                <i class="el-icon-refresh-right" v-on:click="oprateBigImage(4)"></i>
            </div>

            <div class="cutSamllImg" v-if="barType==2">

                <div v-for="(item,i) in cutImgList" :key="i">
                    <img :src="item.imgUrl" :id="item.fileId" @mouseover="getCurImgOcrInfo" />
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
    props :['imgSrc','barType','ticketId','appPoolData'],
    data : function(){
        return {
            'bigImgStyle' : {},
            'imgUrl' : '',
            'totalCount': 0,
            'cutImgList' : [],
            'ocrInfoList' : [],
            'showOcrList' : false,
            'fromAppPool' : false
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
            if(this.ticketId!=''||this.ticketId!=null&&this.barType==1||this.barType==3){

                let id = this.ticketId;
                this.getOcrInfo(id);
                if(this.barType == 3){
                    //cutImgList
                    util.getRequest(`/imageServices/getImageCats?fileId=${this.ticketId}`,(res)=>{
                        window.console.log(res);
                        if(res.body.status==200){
                            this.cutImgList = res.body.data.imgList;
                        }
                    });
                }
            }
        }
    },
    mounted : function(){

        util.moveImage('contentImgBox','ImageBox');
        this.bigImgStyle = util.scrollImage('ImageBox');
    },
    methods : {
        closeModel (){
            this.$emit('closeModel');
        },
        oprateBigImage : function(id){
           var style = util.oprateBigImage(id);
           this.bigImgStyle = style;
        },
        slideImgLeft : function(){

            let curIndex = this.$store.state.curImgIndex;
            if((curIndex-1) < 0){
                util.showModelTip('warning','已经是第一张图片了');
                return false;
            }else{
                curIndex--;
                this.loadImage(curIndex);
            }
        },
        slideImgRight : function(){
            let curIndex = this.$store.state.curImgIndex;
            
            if((curIndex+1) >= this.totalCount){
                util.showModelTip('warning','已经是最后一张图片了');
                return false;
            }else{
                curIndex++;
                this.loadImage(curIndex);
            }
        },
        getOcrInfo(id){
            
            util.getRequest(`/webShowImage/invoiceInfo/${id}`,(res)=>{

                if(res.body.status == "200"||res.body.status == 200){
                    if(res.body.data.length>0 &&res.body.data!=null){
                        this.showOcrList = true;
                        this.ocrInfoList = res.body.data;
                    }else{
                        this.showOcrList = false;
                    }
                    
                }
            });
        },
        loadImage(curIndex){
            if(this.fromAppPool){
                
                this.imgUrl = this.appPoolData[curIndex].url;
            }else{
                
                let pId = par.imgViewArr[curIndex].pId;
                let cId = par.imgViewArr[curIndex].cId;

                pId = pId.split('-');
                cId = cId.split('-');
                let type = par.imgViewArr[curIndex].type;
                if(type == 'i' || type == 'u'){
                    this.imgUrl = par.imgData[pId[1]].children[cId[1]].imageSrc;
                }else if(type == 's'){
                    let fileId = par.imgData[pId[1]].children[cId[1]].fielId;
                    var msg = {
                        "InterFace" : "GetFullImage",
                        "FileId" : fileId 
                    };
                    util.sendInfo(JSON.stringify(msg));
                    window.setTimeout(() => {
                        util.showBigImgFromActive(null,(res)=>{
                            this.imgUrl = res;
                        });
                    }, 1500);
                }
                
                this.getOcrInfo(par.imgData[pId[1]].children[cId[1]].fielId);
            }

            this.$store.commit('changeImgIndex',curIndex);
            let ImageBox = document.getElementById('ImageBox');
            ImageBox.style.marginTop = 'auto';
            ImageBox.style.marginLeft = 'auto';
        },
        getCurImgOcrInfo(e){
            let id = e.target.id;
            this.getOcrInfo(id);
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
            padding-top: 45px;
            overflow-y: scroll;
        }

    }
    .bottomBar{
        height: 30px;
        margin: 10px auto;
        border-radius: 10px;
        position: relative;

        .barBox{
            width: 175px;
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
            width: 25px;
            height: 25px;
            display: inline-block;
            border-radius: 50%;
            text-align: center;
            line-height: 22px;
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