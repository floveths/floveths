<template>

    <div class="initStateBoxMain" >

        <div class="initStateBarBox" >
            
            <div class="initStateBarTitle">
                <span v-if="!$store.state.initImportComplete">加载中...</span>
                <span v-if="$store.state.initImportComplete">加载完成</span>
                <span><i class="el-icon-close" v-show="$store.state.initImportComplete||$store.state.initImportCount==0" @click="closeInitProgress"></i></span>
            </div>
            <div class="initStateBoxContent">
                
                <ul class="initImgUl" v-show="$store.state.initImportCount>0">
                    <li class="initContentLIHead"><span>影像列表...</span></li>
                    <li class="initContentLI">
                        <div >文件名</div>
                        <div >文件大小</div>
                        <div >状态</div>
                    </li>
                    <div  v-for="(d,id) in initImgData" :key="id">
                        <li class="initContentLI initContentLIInfo" v-for="(c,i) in d.children" :key="i">
                            <div><i class="el-icon-picture"></i> {{c.imgName}}</div>
                            <div>{{c.fileSize}}</div>
                            <div v-if="!c.show"><i class="el-icon-loading"></i></div>
                            <div v-else><i class="el-icon-circle-check"></i></div>
                        </li>
                    </div>
                </ul>

                <ul class="initFileUl" v-show="initFileData.length>0">
                    <li class="initContentLIHead"><span>附件列表...</span></li>
                    <li class="initContentLI">
                        <div>文件名</div>
                        <div>文件大小</div>
                        <div>状态</div>
                    </li>
                    <li class="initContentLI initContentLIInfo" v-for="(c,i) in initFileData" :key="i">
                        <div ><i class="el-icon-document"></i> {{c.fileName}}</div>
                        <div>{{c.fileSize}}</div>
                        <div v-if="c.state==0"><i class="el-icon-loading"></i></div>
                        <div v-else-if="c.state==1"><i class="el-icon-circle-check"></i></div>
                        <div v-else-if="c.state==2"><i class="el-icon-warning-outline" style="color:red"></i></div>
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
            srcollBarHeight : 0,
            showSideScroll : 'none',
            initImgData : par.imgData,
            initFileData : par.uploadFileArr
        }
    },
    methods : {
        closeInitProgress(){
            this.$emit('closeinitprogress');
        }
    }
}

</script>
<style lang="less">
*{
    margin: 0;
    padding: 0;
}

.initStateBoxMain{
    width: 450px;
    height: auto;
    position: fixed;
    z-index: 999;
    bottom: 0;
    right: 0;
}

.initStateBarBox{
        width: 450px;
        height: 460px;
        position: absolute;
        overflow: hidden;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 99;
        background: #f4f4f4;
        border-radius: 5px;
        box-shadow: 0px 4px 8px #ccc;
    .initStateBarTitle{
        height: 35px;
        display: flex;
        font-size: 12pt;
        cursor: pointer;
        padding: 5px 25px;
        background:white;
        position: relative;
        width: 100%;
        justify-content: space-between;
        border-bottom: 1px solid #eaeaea;
    }
    .initStateBoxContent{
        width: 100%;
        height: 100%;
        padding: 5px 10px;
        overflow-y: auto;

        .initImgUl,.initFileUl{
            width: 100%;
            height: auto;
            background: white;
            margin-bottom: 40px;
            box-shadow: 0px 2px 4px#c4c4c4;
        }

        .initContentLIHead{
            list-style: none;
            background:#ffffff;
            box-sizing: border-box;
            padding: 0px 5px;
            font-size: 10pt;
            box-shadow: 0px 3px 5px #d9d9d9;
        }

        .initContentLI{
            list-style: none;
            display: flex;
            text-align: center;
            > div{
                flex: 1;
                height: 30px;
                text-align: center;
                padding: 2px;
                line-height: 30px;
                font-size: 10pt;
                overflow: hidden;
                box-sizing: border-box;
                border-bottom: 1px solid rgb(238, 238, 238);
                > img{
                    width: 28px;
                    float: left;
                }
            }
        }

    }

}

.fileContentBox:hover > .fileListName{
    transition: all .4s linear;
    transform: translateY(-93px);
}

.initContentLI > div:nth-child(1){
    flex: 2 !important;
}

</style>
