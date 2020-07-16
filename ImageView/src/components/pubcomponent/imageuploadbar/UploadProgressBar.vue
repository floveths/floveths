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

                    <li class="sl-ro" style="transform: rotateX(0deg) translateZ(15px);"></li>
                    <li class="sl-ro" style="transform: rotateX(45deg) translateZ(15px);"></li>
                    <li class="sl-ro" style="transform: rotateX(90deg) translateZ(15px);"></li>
                    <li class="sl-ro" style="transform: rotateX(135deg) translateZ(15px);"></li>
                    
                    <li class="sl-ro" style="transform: rotateX(180deg) translateZ(15px);"></li>
                    <li class="sl-ro" style="transform: rotateX(225deg) translateZ(15px);"></li>
                    <li class="sl-ro" style="transform: rotateX(270deg) translateZ(15px);"></li>
                    <li class="sl-ro" style="transform: rotateX(315deg) translateZ(15px);"></li>

                    <li class="sl-rob" v-bind:style="{'width':$store.state.uploadProgress+'%'}" style="transform: rotateX(0deg) translateZ(10px);"></li>
                    <li class="sl-rob" v-bind:style="{'width':$store.state.uploadProgress+'%'}" style="transform: rotateX(45deg) translateZ(10px);"></li>
                    <li class="sl-rob" v-bind:style="{'width':$store.state.uploadProgress+'%'}" style="transform: rotateX(90deg) translateZ(10px);"></li>
                    <li class="sl-rob" v-bind:style="{'width':$store.state.uploadProgress+'%'}" style="transform: rotateX(135deg) translateZ(10px);"></li>
                                    
                    <li class="sl-rob" v-bind:style="{'width':$store.state.uploadProgress+'%'}" style="transform: rotateX(180deg) translateZ(10px);"></li>
                    <li class="sl-rob" v-bind:style="{'width':$store.state.uploadProgress+'%'}" style="transform: rotateX(225deg) translateZ(10px);"></li>
                    <li class="sl-rob" v-bind:style="{'width':$store.state.uploadProgress+'%'}" style="transform: rotateX(270deg) translateZ(10px);"></li>
                    <li class="sl-rob" v-bind:style="{'width':$store.state.uploadProgress+'%'}" style="transform: rotateX(315deg) translateZ(10px);"></li>


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
        width: 505px;
        height: auto;
        margin: 150px auto;

        .uploadBarUl{
            width: 455px;
            height: 15px;
            list-style: none;	
            margin: 10px 22px 0px !important;
            transform-style: preserve-3d;
            transform: rotateY(5deg) rotateX(-5deg);
            animation: uploadProgress 5s infinite normal;
        }

        .uploadBarUl li{
            width: 455px;
            position: absolute;
            box-shadow: 2px 3px 7px #deffec;
        }

        .uploadBarUl .sl-ro{
            height: 15px;
            border-radius: 5px;
            background:  #6eb9ff52;
        }

        .uploadBarUl .sl-rob{
            height: 10px;
            transition: all 0.3s linear;
            background: linear-gradient(120deg, #b2ff86, #ffad55);
        }

        .textBox{
            width: 455px;
            height: 45px;
            margin: 0px auto;
            display: block;
            margin-left: 20px;
        }

    }

    
}

.flagBox:before{
	content: '';
	position: absolute;
    margin-top: -30px;
    margin-left: 20px;
	transform: translateX(20px);
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
    margin-left: 20px;
	background: #6edfff;
	transform: translateX(20px);
	box-shadow: 0px 5px 10px #6f97e3 inset;
}

.slideText:before{
	content: '';
	position: absolute;
	margin-top: 45px;
	transform: translateX(12px);
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
    bottom: 15px;
    position: relative;
    margin-left: -20px;
	border-bottom: 1px solid #49e2ff;
    transform:  translateX(-45%);
    transition: all .35s linear;
	box-shadow: 0px 5px 8px #a6f0ff;
}

@keyframes uploadProgress{
    0%{
        transition:all .5s;
        transform:rotateX(0deg);
    }
    12.5%{
        transition:all .5s;
        transform:rotateX(-45deg);
    }
    25%{
        transition:all .5s;
        transform:rotateX(-90deg);
    }
    37.5%{
        transition:all .5s;
        transform:rotateX(-135deg);
    }
    50%{
        transition:all .5s;
        transform:rotateX(-180deg);
    }
    62.5%{
        transition:all .5s;
        transform:rotateX(-225deg);
    }
    80%{
        transition:all 1s;
        transform:rotateX(-270deg);
    }
    82.5%{
        transition:all 1s;
        transform:rotateX(-315deg);
    }
    100%{
        transition:all .5s;
        transform:rotateX(-360deg);
    }
}


</style>
