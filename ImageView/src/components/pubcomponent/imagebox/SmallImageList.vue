<template>
    <div class="SmallImageList">

        <div class="smallImgView" >
            <div class="smallSlideLeft">
                <i class="el-icon-arrow-left" v-on:click="slideImgLeft"></i>
            </div>

                <div class="smallViewContent">
                    <ul class="smallImgList" id="smallImgList" :style="{'width':ulWidth+'px','transition':'all .5s','margin-left':'-'+imgOffset+'px'}"> 
                        <li v-for="(item,i) in viewList" :key="i" >
                            <div v-if="item.fileStatu=='A'" class="imgJjrTip" ></div>
                            <div v-if="item.fileStatu=='B'" class="imgMgcTip" ></div>
                            <div v-if="item.fileStatu=='C'" class="imgTsfpTip" ></div>
                            <div v-if="item.fileStatu=='D'" class="imgFpcwTip" ></div>
                            <img class="smallImg" v-bind:src="'http://47.92.211.214:8080'+item.surl" @click="viewBigImgByIndex(i)"/>
                            <input type="checkbox" v-bind:id="i" v-bind:value="item.fileId" @click="pickImg" class="smallImgCheckBox"/>
                            <label v-bind:for="i" class="smallCheckLabel"/>
                            <input type="text" :value="item.fileName" class="imgName"/>
                        </li>
                    </ul>
                    <div class="slideBox" :style="{'transition':'all .5s','margin-left':boxOffset+'px'}"></div>
                </div>
            
            <div class="smallSlideRight">
                <i class="el-icon-arrow-right" @click="slideImgRight"></i>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    props : ['viewList','viewCount','imgOffset','boxOffset'],
    data : function(){
        return {
            ulWidth : 0
        }
    },
    watch :{
        viewCount:function(){
            this.ulWidth = this.viewCount * 150;
        }
    },
    methods : {
        pickImg(e){
            this.$emit('pickImg',e.target.value);
        },
        slideImgLeft(){
            this.$emit('slideImgLeft')
        },
        slideImgRight(){
            this.$emit('slideImgRight')
        },
        viewBigImgByIndex(index){
            this.$emit('viewByIndex',index);
        }
    }
    
}
</script>

<style lang="less">

.smallImgView{
	width: 1265px;
	height: 120px;
	margin: 0px auto;
	border-radius: 10px;
	overflow-x: hidden;
	position: relative;
	box-shadow: 0px 8px 15px #DDD;
    background: white;
    
    .smallSlideLeft,.smallSlideRight{
        top: 0;
        z-index: 999;
        width: 30px;
        height: 100%;
        font-size: 16pt;
        line-height: 120px;
        cursor: pointer;
        position: absolute;
    }

    .smallSlideLeft{
        left: 0;
        margin-left: 5px;
    }

    .smallSlideRight{
        right: 0;
        margin-right: -5px;
    }

}

.smallViewContent{
    display: block;
    width: 95%;
    height: 100%;
    margin: 0px auto;
    overflow: hidden;
    position: relative;
    margin-bottom: 0px !important;
}

.smallImgList{
    list-style: none;
    display: inline-block;
    padding: 0px;
    margin: 0px auto;
    overflow-x: scroll;
    position: absolute;
    margin-bottom: 0px !important;

    li{
        float: left;
        width: 140px;
        height: 100%;
        z-index: 999;
        margin: 5px ;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        background: #eaeaea;
        box-shadow: 2px 2px 4px #c6c6c6;
    }

    .smallImg{
        height: 80px;
        cursor: pointer;
        margin: 2px auto;
        display: block;
        border-radius: 5px;
        border: 1px solid #dbdbdb;
    }
    .smallImgCheckBox {
        display: none;
    }

    .smallImgCheckBox+.smallCheckLabel {
        border: 1px solid #dedede;
        padding: 10px ;
        border-radius: 5px;
        display: inline-block ;
        position: absolute;
        top: 0 ;
        margin: 5px 110px;
        cursor: pointer;
        z-index: 999;
        box-shadow: 2px 2px 5px #d5d5d5 inset;
    }

    .smallImgCheckBox:checked+.smallCheckLabel::after {
        content: "";
        display: block;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 20px;
        height: 20px;
        background-image: url("../../../assets/img/box-y.png");
    }

    .imgName{
        height: 18px;
        border: 1px;
        font-size: 8pt;
        color: rgb(51, 51, 51);
        background: transparent;
    }

    div{
        color: white;
        position: absolute;
    }

}

.slideBox{
    top: 0;
    width: 150px;
    height: 115px;
    position: absolute;
    border-radius: 10px;
    border: 2px solid #3ecbf2;
}

.imgJjrTip{
	width: 110px;
	height: 35px;
	background: rgb(255, 148, 48);
	z-index: 10;
	transform: skewY(-45deg);
	margin-left: -22px;
}

.imgJjrTip::before{
	content: '节假日票据';
	margin-left: 20px;
	font-size: 8pt;
	margin-top: 11px;
	position: absolute;
	transform: skew(28deg);
}

.imgMgcTip{
	width: 80px;
	height: 35px;
	background: rgb(209, 235, 67);
	z-index: 10;
	transform: skewY(-45deg);
	margin-left: -5px;
}

.imgMgcTip::before{
	content: '敏感词发票';
	margin-left: 5px;
	font-size: 8pt;
	margin-top: 11px;
	position: absolute;
	transform: skew(30deg);
}

.imgTsfpTip{
	width: 80px;
	height: 35px;
	background: rgb(255, 139, 45);
	z-index: 10;
	transform: skewY(-45deg);
	margin-left: -5px;
}

.imgTsfpTip::before{
	content: '特殊商品发票';
	margin-left: 5px;
	font-size: 8pt;
	margin-top: 11px;
	position: absolute;
	transform: skew(30deg);
}

.imgFpcwTip{
	width: 80px;
	height: 35px;
	background: rgb(255, 103, 33);
	z-index: 10;
	transform: skewY(-45deg);
	margin-left: -5px;
}

.imgFpcwTip::before{
	content: '发票信息错误';
	margin-left: 5px;
	font-size: 8pt;
	margin-top: 11px;
	position: absolute;
	transform: skew(30deg);
}

</style>
