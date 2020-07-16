<template>
    <div class="fileUpBox">

        <div class="fileBox">

            <div class="photoBox">
                <div class="row">
                    <div class="col-md-3 col-xs-3 col-sm-3" v-for="(data,i) in fileListData" :key="i">
                        <div class="fileContentBox" >
							<img src="../../../../public/static/suc.png" class="imgTip" >
							<img :src="data.fileIcon" class="fileImg">
							<input type="checkbox" :id="data.fileId+'-'+i" v-model="pickFile" :value="data.fileId" class="imgListCheck" />
							<label class="imgListLabel" :for="data.fileId+'-'+i"></label>
                            <span class="fileListName" v-on:dblclick="viewPdfDoc" >{{data.fileName}}</span>
						</div>
                    </div> 
                    
                    <div class="col-md-3 col-xs-3 col-sm-3">
                        <div class="addPic" style="box-shadow: 0px 0px;border: 1px dashed #7de9f6;">
                            <input type="file" accept="application/msexcel,application/msword,application/pdf" multiple="multiple" id="openFile" @change="getAllFile"  ref="getFile" class="openFile"/>
                            <span class="el-icon-plus addPicImg" v-on:click="openFile"></span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="buttonGroup">
                <div class="delBtnBox">
                    <button type="button" value="删除" v-on:click="delFile" class="delBtn btn btn-sm btn-delete btn-block">
                    <i class="el-icon-delete" ></i> 删除</button>
                </div>
                <div class="uploadBtnBox">
                    <button type="button" value="关闭" v-on:click="$store.commit('showFileUpload')" class="uploadBtn btn btn-sm btn-upload btn-block">
                    <i class="el-icon-close" ></i> 关闭</button>
                </div>
            </div>
        </div>

        <transition name="up">
            <pdfdocview v-show="showPdfBox" :pdfurl="pdfUrl" @closepdfbox='showPdfBox=false'></pdfdocview>
        </transition>

    </div>
</template>

<script>
import util from '../../../utils/util.js'
import par from '../../../utils/param.js'
import pdfDocView from '../pdfdocdialog/PdfDocBox'

export default {
    data : function(){
        return {
            'pdfUrl' : null,
            'pickFile' : [],
            'loadingImg' : false,
            'showPdfBox' : false,
            'fileListData' : par.fileListData
        }
    },
    components : {
        'pdfdocview' : pdfDocView
    },
    methods : {
        openFile : function(){
            document.getElementById('openFile').click();
        },
        delFile : function(){
            if(this.pickFile.length <= 0){
                util.showModelTip('warning','请先选择要删除的附件!');
                return false;
            }
            let parm = {"businessSerialNo": par.businessSerialNo,"fileId":this.pickFile};
            util.deleteRequest('/imageUploadServices',parm,(res)=>{
                window.console.log(res);
            })
        },
        getAllFile : function(){

            var obj = this.$refs.getFile;
            var len = obj.files.length;

            for(let s=0;s<len;s++){
                let fileSize = util.getFileSize(obj.files[s].size);
                par.uploadFileArr.push({'fileObj':obj.files[s],'fileName':obj.files[s].name,'fileSize':fileSize,'state':0});                
            }

            util.uploadFiles(par.uploadFileArr);
            this.$emit('uploadfile')
        },
        viewPdfDoc : function(e){
            
            let val = e.target.value;
            this.pdfUrl = 'http://'+par.baseUrl+val;
            this.showPdfBox = true;
        }
    }
    
}
</script>
<style lang="less">

*{
    margin: 0px;
    padding: 0px;
}

.fileUpBox{
    position: absolute;
    width: 100%;
    height: 100%;
    background:rgba(209, 209, 209, 0.342);
    top: 0;
    z-index: 999;

    > .loadingBox{
        position: absolute;
        z-index: 999;
        width: 100%;
        height: 100%;

        > img{
            width: 200px;
            position: absolute;
            right: 0;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto;

            border-radius: 5px;
            box-shadow: 0px 8px 20px#8e8e8e;
        }
    }
}

.fileBox{
	width: 480px;
	height: calc(100vh - 100px);
	margin: auto;
	top: 0;
	left: 0;
	right: 0;
    bottom: 0;
    overflow: hidden;
	margin-top: 20px;
    z-index: 99;
    padding: 10px 0px;
	position: absolute;
	border-radius: 5px;
    background: white;
    box-shadow: 0px 10px 40px #b9b6b6;
    
    .photoBox{
        width: 495px;
        height: calc(100vh - 155px);
        overflow-y: scroll;
    }

    .addPicImg{
        display: block;
        font-size: 68pt;
        color: rgb(60, 174, 250);
        font-weight: lighter;
        cursor: pointer;
    }

    .openFile{
        display: none !important;
    }

    .photoBox .row{
        margin-left: 0px;
        margin-right: 0px;
    }

    .addPic{
        height: 90px;
        margin: 0px 0px;
        border-radius: 5px;
        border: 1px solid #f9f9f9;
        box-shadow: 0px 3px 15px #e5e5e5;
    }
    .buttonGroup{
        position: relative;
        display: flex;
        width: 100%;
    }

    .delBtnBox,.uploadBtnBox{
        flex: 1;
        padding: 0px 10px;
        margin: 10px auto;
    }

    .delBtn,.uploadBtn{
        color: white;
        display: block;
        margin: 0px auto;
    }

    .btn-delete,.btn-delete:active{
        border: 0px;
        width: 180px;
        box-shadow: 2px 3px 7px #ffc55e;
        background: linear-gradient(120deg,#ffdb45,#ff7730);
    }
    
    .btn-upload,.btn-upload:active{
        border: 0px;
        width: 180px;
        box-shadow: 2px 3px 7px #80e0ec;
        background: linear-gradient(120deg,#8cebff,#2ab4ff);
    }

    .fileContentBox{
        box-sizing: border-box;
        position: relative;
        height: 90px;
        cursor: pointer;
        overflow: hidden;
        border-radius: 4px;
        box-shadow: 0px 4px 10px#c8d2d7;

        .imgTip{
            top: 0;
            left: 0;
            height: 65px !important;
            width: 65px !important;
            position: absolute;
            background-size: cover;
            border-top-left-radius: 5px;
        }

        .fileImg{
            width: 55%;
            margin: 22px auto;
            display: block;
            box-sizing: border-box;
        }

        .imgListCheck+.imgListLabel {
            top: 0;
            right: 0;
            z-index: 110;
            height: 20px;
            padding: 0px 10px;
            border-radius: 5px;
            display: inline-block;
            position: absolute;
            cursor: pointer;
            margin: 5px 5px !important;
            border: 1px solid #e3e3e3;
        }

        .imgListCheck{
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            display: none;
            position: absolute;
        }

        .imgListCheck:checked+.imgListLabel::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            width: 20px;
            height: 20px;
            border-radius: 5px;
            background-size: contain;
            background-image: url("../../../assets/img/box-y.png");
            background-repeat: no-repeat;

        }

        .fileListName{
            width: 100%;
            height: 90px;
            display: block;
            background: #eaeaeaa8;
            z-index: 105;
            padding: 2px;
            font-size: 10pt;
            text-align: center;
            word-break: break-all;
            word-wrap: break-word;
        }
    }

    
}

</style>
