<template>

    <div class="fileUploadBoxMain" v-show="$store.state.showFileProgressBar">

        <div class="fileUploadBarBox" >
            <div class="fileUploadBarTitle">
                <span>进度...</span>
                <span><i class="el-icon-close" v-show="isComplite" @click="$store.commit('showFileProgressBar')"></i></span>
            </div>
            <div class="fileUploadBoxContent">
                <ul>
                    <li class="contentLI">
                        <div>文件名</div>
                        <div>大小</div>
                        <div>进度</div>
                        <div>状态</div>
                    </li>
                    <li class="contentLI contentLIInfo" v-for="(d,id) in fileData" :key="id">
                        <div><img :src="d.sFileIcon" /> <span>{{d.fileName}}</span></div>
                        <div>{{d.fileSize}}</div>
                        <div>
                            <div class="fileProgressBar">
                                <div class="fileProgressBarContent" v-bind:style="{'width': d.progressBar+'%'}"></div>
                            </div>
                            <span>{{d.progressBar}}%</span>
                        </div>
                        <div>{{d.fileState}}</div>
                    </li>
                    
                </ul>
            </div>
        </div>

    </div>

</template>
<script>
import par from '../../../utils/param.js'

export default {
    data : function(){
        return {
            fileData : par.fileData,
            isComplite : true //par.uploadFileIsComplite
        }
    },
    watch : {
        fileData : function(){
            this.$store.commit('showFileProgressBar');
            
        }
    }
}

</script>
<style lang="less">
*{
    margin: 0;
    padding: 0;
}

.fileUploadBoxMain{
    width: 100%;
    height: 100%;
    background: #0000;
    position: absolute;
    z-index: 999;
}

.fileUploadBarBox{
        width: 520px;
        height: 560px;
        position: absolute;
        overflow: hidden;
        /* top: 0;
        left: 0; */
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 99;
        background: white;
        border-radius: 5px;
        box-shadow: 0px 4px 8px #ccc;
    .fileUploadBarTitle{
        height: 35px;
        display: flex;
        font-size: 12pt;
        cursor: pointer;
        padding: 5px 25px;
        justify-content: space-between;
        border-bottom: 1px solid #eaeaea;
    }
    .fileUploadBoxContent{
        width: 550px;
        height: 525px;
        padding: 5px 10px;
        overflow-y: scroll;

        > ul{
            width: 100%;
            height: 100%;
        }
        .contentLI{
            list-style: none;
            display: flex;
            text-align: center;
            > div{
                height: 30px;
                text-align: center;
                padding: 2px;
                line-height: 30px;
                font-size: 10pt;
                box-sizing: border-box;
                border-bottom: 1px solid rgb(238, 238, 238);
                > img{
                    width: 28px;
                    float: left;
                }
            }
        }

        .fileProgressBar{
            width: 75%;
            height: 6px;
            background: rgb(238, 238, 238);
            border-radius: 5px;
            display: block;
            position: relative;
            margin: 10px auto;
            border: 1px solid #c0eaff;

            .fileProgressBarContent{
                width: 0%;
                height: 4px;
                position: absolute;
                border-radius: 5px;
                transition: all .4s linear;
                background: linear-gradient(120deg,#abf7ff,#a1cfff);
            }
        }
    }

}

.contentLI > div:nth-child(1){
    width: 40%;
    text-align: left;
    display: block;
}
.contentLI > div:nth-child(2){
    width: 10%;
    display: block;
}
.contentLI > div:nth-child(3){
    width: 35%;
    display: inline-flex;
}
.contentLI > div:nth-child(4){
    width: 15%;
    text-align: center;
    display: block;
}
.fileContentBox:hover > .fileListName{
    transition: all .4s linear;
    transform: translateY(-93px);
}
</style>
