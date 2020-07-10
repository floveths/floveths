<template>
    <div class="uploadBox">

        <div class="uploadBarBox">
            <span v-show="$store.state.uploadProgress>=100" style="position:absolute;right:0;top:0;margin:25px;cursor:pointer;"><i class="el-icon-close" @click="closeImgUpload"></i></span>

            <div class="flagBox">
                <span><p class="curImg">当前第{{$store.state.curUploadCount}}张</p><p class="totalImg">共{{$store.state.uploadImgCount}}张影像</p></span>
            </div>

            <div class="uploadContent">
                <div class="textBox">
                    <span class="slideText" v-bind:style="{'transform': 'translateX('+(10*$store.state.uploadProgress)+'%)'}">{{$store.state.uploadProgress}}%</span>
                </div>

                <ul class="uploadBarUl">
                    <li class="sl-ro" v-bind:style="{'width':$store.state.uploadProgress+'%'}"></li>
                    <li class="sl-ro" v-bind:style="{'width':$store.state.uploadProgress+'%'}"></li>
                    <li class="sl-ro" v-bind:style="{'width':$store.state.uploadProgress+'%'}"></li>
                    <li class="sl-ro" v-bind:style="{'width':$store.state.uploadProgress+'%'}"></li>
                    
                    <li class="sl-ro" v-bind:style="{'width':$store.state.uploadProgress+'%'}"></li>
                    <li class="sl-ro" v-bind:style="{'width':$store.state.uploadProgress+'%'}"></li>
                    <li class="sl-ro" v-bind:style="{'width':$store.state.uploadProgress+'%'}"></li>
                    <li class="sl-ro" v-bind:style="{'width':$store.state.uploadProgress+'%'}"></li>
                </ul>
            </div>

        </div>

    </div>

</template>
<script>

export default {
    methods : {
        closeImgUpload:function(){
            this.$store.commit('showImageUpload')
        }
    }
}
</script>

<style lang="less">

*{
    margin: 0px;
    padding: 0px;
}

.uploadBox{
    position: fixed;
    top: 0;
    background: rgba(232, 232, 232, 0.5);
    width: 100%;
    z-index: 999;
    height: 100%;
}

.uploadBarBox{
	width: 850px;
	height: 420px;
	margin: 100px auto;
	padding: 80px;
	box-sizing: border-box;
	position: relative;
	border: 1px solid #f2f2f2;
	border-radius: 8px;
    box-shadow: 0px 5px 25px#aeaeae;
    background: linear-gradient(120deg,#f1fff4,#edf8ff);

    .flagBox{
        width: auto;
        height: auto;
        padding: 10px 35px;
        display: block;
        position: absolute;
        border-radius: 5px;
        background: #6edfff;
        box-shadow: 0px 5px 10px #e3e3e3;
    }

    .flagBox p{
        text-align: center;
        color: white;
        margin-top: 5px;
    }

    .curImg{
        font-size: 14pt;
    }

    .totalImg{
        font-size: 16pt;
    }

    .uploadContent{
        width: 475px;
        height: auto;
        margin: 150px auto;

        .uploadBarUl{
            width: 475px;
            height: 40px;
            list-style: none;	
            margin: 10px 22px 0px !important;
            transform-style: preserve-3d;
            transform: rotateY(5deg) rotateX(-5deg);
            animation: uploadProgress 5s infinite normal;
        }

        .uploadBarUl li{
            width: 475px;
            height: 40px;
            position: absolute;
            box-shadow: 2px 3px 7px #deffec;
        }

        .uploadBarUl li:nth-child(1){
            transform: translateZ(20px);
            background: #f6f6f626;
            border: 1px solid #def0ff;
        }

        .uploadBarUl li:nth-child(2){
            transform: translateY(-20px) rotateX(90deg);
            background: #f6f6f626;
            border: 1px solid #def0ff;
        }

        .uploadBarUl li:nth-child(3){
            transform: translateZ(-20px);
            background: #f6f6f626;
            border: 1px solid #def0ff;
        }

        .uploadBarUl li:nth-child(4){
            background: #f6f6f626;
            border: 1px solid #def0ff;
            transform: translateY(20px) rotateX(-90deg);
        }

        .uploadBarUl li:nth-child(5){
            width: 0%;
            transform: translateZ(20px);
            box-shadow: 0px 2px 5px #b5f1ff;
            background: linear-gradient(120deg, #b2ff86, #8ae3ff);
        }

        .uploadBarUl li:nth-child(6){
            width: 0%;
            box-shadow: 0px 2px 5px #b5f1ff;
            transform: translateY(-20px) rotateX(90deg);
            background: linear-gradient(120deg, #b2ff86, #8ae3ff);
        }

        .uploadBarUl li:nth-child(7){
            width: 0%;
            box-shadow: 0px 2px 5px #b5f1ff;
            transform: translateZ(-20px);
            background: linear-gradient(120deg, #b2ff86, #8ae3ff);
        }

        .uploadBarUl li:nth-child(8){
            width: 0%;
            box-shadow: 0px 2px 5px #b5f1ff;
            transform: translateY(20px) rotateX(-90deg);
            background: linear-gradient(120deg, #b2ff86, #8ae3ff);
        }

        .textBox{
            width: 475px;
            height: 45px;
            margin: 0px auto;
            display: block;
            margin-top: -10px;
            margin-left: 22px;
        }

    }

    
}

.flagBox:before{
	content: '';
	position: absolute;
	margin-top: -30px;
	transform: translateX(40px);
	border-bottom: 10px solid #2bd1ff;
	border-top: 10px solid transparent;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;	
}

.flagBox:after{
	content: '';
	position: absolute;
	width: 15px;
	height: 120px;
	margin-top: 10px;
	background: #6edfff;
	transform: translateX(40px);
	box-shadow: 0px 5px 10px #6f97e3 inset;
}

.slideText:before{
	content: '';
	position: absolute;
	margin-top: 40px;
	transform: translateX(10px);
	border-bottom: 10px solid transparent;
	border-top: 10px solid #49e2ff;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
}

.slideText{
	width: 45px;
	height: 40px;
	display: block;
	text-align: center;
	line-height: 40px;
	background:	#49e2ff;
	color:	white;
	border-bottom: 1px solid #49e2ff;
    transform:  translateX(-45%);
    transition: all .35s linear;
	box-shadow: 0px 5px 8px #a6f0ff;
}

@keyframes uploadProgress{
    0%{
        transition:all 1s;
        transform:rotateX(0deg);
    }
    25%{
        transition:all 1s;
        transform:rotateX(-90deg);
    }
    50%{
        transition:all 1s;
        transform:rotateX(-180deg);
    }
    75%{
        transition:all 1s;
        transform:rotateX(-270deg);
    }
    100%{
        transition:all 1s;
        transform:rotateX(-360deg);
    }
}


</style>
