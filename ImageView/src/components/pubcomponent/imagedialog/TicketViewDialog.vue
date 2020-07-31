<template >
    <div >

        <div class="imgViewBox">
            <div class="closeBar"  @click="closeModel">
                <i class=" el-icon-plus" ></i>
            </div>

            <div class="imgContentBox">
                <div class="imgContentBoxLeft">

                    <div class="imgContentLeft" >
                        <i class="el-icon-arrow-left" @click="slideImgLeft"></i>
                    </div>
                    <div class="imgContentCenter">
                        <div class="contentImgBox" id="contentImgBox">
                            <img :src="'http://47.92.211.214:8080/'+imgUrl" v-bind:style="bigImgStyle" id="ImageBox"> 
                        </div>
                    </div>
                    <div class="imgContentRight" >
                        <i class="el-icon-arrow-right" @click="slideImgRight"></i>
                    </div>

                </div>

                <div class="imgContentBoxRight" >
                    <ocrtemplate :type="1" :items="ocrInfoList" ></ocrtemplate>
                </div>

            </div>

            <div class="bottomBar">
                <div class="barBox" >
                    <i class="el-icon-refresh-left" v-on:click="bigImage(3)"></i>
                    <i class="el-icon-plus" v-on:click="bigImage(1)"></i>
                    <i v-on:click="bigImage(0)"><span>1:1</span></i>
                    <i class="el-icon-minus" v-on:click="bigImage(2)"></i>
                    <i class="el-icon-refresh-right" v-on:click="bigImage(4)"></i>
                </div>
            </div>

            <smallimagelist :viewList="imageViewList" :viewCount="totalCount" :imgOffset="imgSlideOffset" :boxOffset="slideBoxOffset" :slideImgLeft="slideImgLeft" :slideImgRight="slideImgRight"></smallimagelist>

        </div>
    </div>
</template>

<script>
/* import par from '../../../utils/param.js' */
import util from '../../../utils/util'
import ocrTemplate from '../ocrtemp/OcrListTemplate'
import smallImageList from '../imagebox/SmallImageList'

export default {
    props :['imageViewList'],
    data : function(){
        return {
            'imgUrl' : '',
            'curImgIndex' : 0,
            'totalCount': 0,
            'ocrInfoList' : '',
            'bigImgStyle' : {},
            'slideBoxOffset' : 0,
            'imgSlideOffset' : 0
        };
    },
    components : {
        'ocrtemplate' : ocrTemplate,
        'smallimagelist' : smallImageList
    },
    watch : {
       imageViewList : function(){
           if(this.imageViewList.length > 0){
               this.imgUrl = this.imageViewList[0].url
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
        bigImage : function(id){
           var style = util.bigImage(id);
           this.bigImgStyle = style;
        },
        slideImgLeft(){
            this.curImgIndex--;
            if(this.curImgIndex < 0){
                util.showModelTip('warning','已经是第一张了!');
				this.curImgIndex = 0;
				return false;
            }

            if(this.slideBoxOffset > 0){
				this.slideBoxOffset -= 150;
			}else{
				this.imgSlideOffset -= 150;
            }

            this.getOcrInfo();
            this.offsetIndex = this.curImgIndex;
            this.bigImgUrl = this.imageViewList[this.curImgIndex].url;
            
        },
        slideImgRight(){
            this.curImgIndex++;
			if(this.curImgIndex >= this.totalCount){
                util.showModelTip('warning','已经是最后一张了!');
				this.curImgIndex = (this.totalCount - 1);
				return false;
            }

            if(this.slideBoxOffset < 1050){
				this.slideBoxOffset += 150;
			}else{
				this.imgSlideOffset += 150;
            }
            
            this.getOcrInfo();
            this.offsetIndex = this.curImgIndex;
            this.bigImgUrl = this.imageViewList[this.curImgIndex].url;

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
    background: rgba(243, 243, 243, 0.616);
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

        height: calc(100vh - 30vh);;
        display: flex;
        justify-content: space-between;

        .imgContentBoxLeft{
            height: calc(100vh - 30vh);;
            width: 100%;
            flex: 4;
            display: flex;
            font-size: 40pt;
            line-height: calc(100vh - 30vh);
            font-weight: 800;
            justify-content: space-between;
            .imgContentLeft,.imgContentRight{
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
            
        }

        .imgContentBoxRight{
            flex: 1;
            overflow-y: auto;
            padding-top: 40px;
            height: calc(100vh - 30vh);
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

    }


}


</style>