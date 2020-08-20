<template>
    
    <div id="scan">

        <el-container>
            <el-header class="scanHead">
                <div class="headLeft">
                    <ul>
                        <li><img src="../../../public/static/logo.png" ></li>
                        <li>
                            <el-select v-model="deviceValue" size="mini" placeholder="请选择">
                                <el-option v-for="item in deviceOptions" :key="item.value" 
                                :label="item.label" :value="item.value"> </el-option>
                            </el-select> 
                        </li>
                        <li>
                            <el-select v-model="pageOp" size="mini" placeholder="请选择">
                                <el-option v-for="item in pageOptions" :key="item.value"
                                :label="item.label" :value="item.value"> </el-option>
                            </el-select> 
                        </li>
                        <li>
                            <el-tag style="height:26px;line-height: 26px;" effect="dark" type="success" >共 &nbsp;{{$store.state.imgTotalCount}} &nbsp; 张影像</el-tag>
                        </li>
                        <li>
                            <el-button type="primary" @click="scanBtn" size="mini"><i class="el-icon-printer"></i> {{$t('l.scan')}}</el-button>
                        </li>
                    </ul>
                </div>
                <div class="headRight">
                    
                    <ul>
                        <li>
                            <input type="file" id="importFile" multiple="multiple" ref="inputFile" @change="reSizePic" style="display: none;" />
                            <el-button type="primary" @click="importBtn" size="mini" v-if="scanType==1" ><i class="el-icon-download"></i>&nbsp;本地导入</el-button>
                        </li>
                        <li>
                            <div class="smallcode" v-show="showSmallCode" ><img src="../../../public/static/logo.png" /></div>
                            <el-button type="primary" v-if="scanType==1" @mouseenter.native="showSmallCode=true" @click="viewAppFolderOrPool" @mouseleave.native="showSmallCode=false" size="mini">
                               <i class="el-icon-picture"></i> 我的影像</el-button>
                        </li>
                        
                        <li>
                            <el-button type="danger" @click="deleteImage" size="mini"><i class="el-icon-delete"></i>&nbsp;删除</el-button>
						</li>
                        <li>
                            <el-button type="success" @click="saveImage" size="mini"><i class="el-icon-receiving"></i>&nbsp;保存</el-button>
                        </li>
                        <li>
                            <el-dropdown  >
                                <el-button type="primary" size="mini">
                                    <i class="el-icon-setting"></i>
                                    设置<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <div class="dropItem">显示附件上传  <el-switch v-model="showFileUpBar" size="mini" active-color="rgb(64, 158, 255)" inactive-color="#ff4949"> </el-switch></div>
                                    <div class="dropItem">显示附件列表  <el-switch v-model="showFileListBar" active-color="rgb(64, 158, 255)" inactive-color="#ff4949"> </el-switch></div>
                                    <div class="dropItem">显示影像矫正  <el-switch v-model="showCorrectImg" active-color="rgb(64, 158, 255)" inactive-color="#ff4949"> </el-switch></div>
                                    <div class="dropItem">显示附件一栏  <el-switch v-model="showAttachBox" active-color="rgb(64, 158, 255)" inactive-color="#ff4949"> </el-switch></div>
                                </el-dropdown-menu>
                            </el-dropdown>

                            <!-- <el-button type="primary" @click="commitImg" size="mini"><i class="el-icon-receiving"></i>&nbsp;提交</el-button> -->
                        </li>
                        <li  v-bind:id="moveBar" >
                            <div class="menuBar" @click="showMenuBar"></div>
                            <div class="ullist" v-show="showBar">
                                <ul >
                                    <li class="barLi" v-if="showCorrectImg">
                                        <el-button type="info" @click="revertImage" size="mini"><i class="el-icon-refresh"></i>&nbsp;影像矫正</el-button>
                                    </li>
                                    <li class="barLi" v-if="showFileUpBar || scanType==1">
                                        <el-button type="success" @click="$store.commit('showFileUpload')" size="mini"><i class="el-icon-message"></i>&nbsp;附件上传</el-button>
                                    </li>
                                    <li class="barLi">
                                        <el-select v-model="lang" size="mini" @change="changeLang" placeholder="请选择">
                                            <el-option v-for="item in langOptions" :key="item.value"
                                                :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>

                </div>

            </el-header>
            <el-container>
                <el-aside v-bind:style="leftAsideWidth"  class="scanAside"> 
                    
                    <div class="asideLeftContent">
                        <div class="content">
                            <scantree :showfilelistBar="showFileListBar"></scantree>
                        </div>
                        <div class="contentBar" @click="showAside('left')">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </el-aside>

                <!--画图区域-->
                <el-main class="scanMain">
                    <imgtempcomponent :data='imgData' :attachBox="showAttachBox" @showBigImg="showBigImage"></imgtempcomponent>

                    <scrollbar :bar="'bar'" :sideScroll="showSideScroll" :height="srcollBarHeight" ></scrollbar>
                </el-main>

                <el-aside v-bind:style="rightAsideWidth" v-if="scanType==1" class="scanAside">
                    <div class="asideRightContent">
                        <div class="contentBar" @click="showAside('right')">
                            <i class="el-icon-arrow-left"></i>
                        </div>
                        <div class="content">

                            <fileviewbox ></fileviewbox>

                        </div>
                    </div>
                </el-aside>

            </el-container>
        </el-container>

        <transition name="up">
            <smallappfolder v-if="showAppFolder" @showApplicationFolder="showAppFolder=false" @showAppPoolView="showAppPool=true"></smallappfolder>
        </transition>
        
        <transition name="up">    
            <smallapppool v-if="showAppPool" @closeAppPool="showAppPool = false" @showAppBigImg="showAppPoolImage"></smallapppool>
        </transition>
        
        <transition name="up">    
            <fileupload v-show="$store.state.showFileUpload" @uploadfile="showInitImgProgress=true"></fileupload>
        </transition>

        <transition name="up">
            <initstateprogress v-show="showInitImgProgress" @closeinitprogress="showInitImgProgress=false"></initstateprogress>
        </transition>
       
        <transition name="up">
            <correctimagebar v-show="showCorrectProgressBar" @closemodel="showCorrectProgressBar = false" :isfull="isFullCorrect" :rotatevalue="rotateValue"></correctimagebar>
        </transition>
        
        <transition name="up">        
            <uploadprogressbar v-show="$store.state.showImageUpload" ></uploadprogressbar>
        </transition>
        
        <transition name="up">
            <imagedialog :imgSrc="bigImgUrl" v-show="isShowBigImg" @closeModel="isShowBigImg = false" :appPoolData="appListData" :barType="dialogBarType" :ticketId="ticketId" ></imagedialog>
        </transition>

        <transition name="up">
            <correctimagedialog :imgSrc="bigImgUrl" v-show="showCorrectDialog" @closeModel="correctImageModel"></correctimagedialog>
        </transition>

    </div>

</template>

<script>

import par from '../../utils/param'
import util from '../../utils/util'
import '../../assets/css/ztree.css'
import scanTree from '../pubcomponent/treemanage/ScanTree'
import scrollBar from '../pubcomponent/scrollbarcomp/ScrollBarTemp'
import correctImageBar from '../pubcomponent/imagebox/CorrectImageBar'
import imageDialog from '../pubcomponent/imagedialog/ImageModelDialog'
import initStateProgress from '../pubcomponent/imagebox/InitStateProgress'
import fileViewBox from '../../components/pubcomponent/filemanage/FileViewBox'
import fileUpload from '../../components/pubcomponent/fileupload/FileUploadTemp'
import imageComponent from '../../components/pubcomponent/imagebox/ImageComponent'
import smallAppFolder from '../../components/pubcomponent/smallappfolder/AppFolder'
import smallApppool from '../../components/pubcomponent/smallappfolder/smallapppool/AppPool'
import correctImageDialog from '../../components/pubcomponent/imagedialog/CorrectImageDialog'
import uploadProgressBar from '../../components/pubcomponent/imageuploadbar/UploadProgressBar'

export default {
    data(){
        return {
            'langOptions' : '',
            'showFileUpBar' : true,
            'showCorrectImg' : true,
            'showFileListBar' : true,
            'showAttachBox' : true,
            'showAppPool' : false,
            'showAppFolder' : false,

            'lang' : '',
            'showBar' : false,
            'moveBar' : '',
            'ticketId' : '',
            'isSave' : 0,//初始化未上传
            'pageOp' : '',
            'srcollBarHeight' : 0,
            'showSideScroll' : 'none',
            'appListData' : [],
            'isFullCorrect' : false,
            'rotateValue' : 1,
            'isUpload' : false,
            'bigImgUrl' : null,
            'deviceValue' : '',
            'dialogBarType' : 0,
            'showPdfBox' : false,
            'isShowBigImg' : false,
            'imgData' : par.imgData,
            'scanType': par.scanType,
            'showCorrectDialog' : false,
            'showInitImgProgress' : false,
            'deviceOptions' : par.deviceOptions,
            'pageOptions' : [{'label':'单面','value':'1'},{'label':'双面','value':'2'}],
            'showSmallCode' : false,
            'leftAsideWidth' : {"width":'30px'},
            'rightAsideWidth' : {"width":'30px'},
            'showLeftContent' : false,
            'showRightContent' : false,
            'showCorrectProgressBar' : false
        }
    },
    components : {
        'scantree' : scanTree,
        'scrollbar' : scrollBar,
        'fileupload' : fileUpload,
        'imagedialog' : imageDialog,
        'fileviewbox' : fileViewBox,
        'smallapppool' : smallApppool,
        'smallappfolder' : smallAppFolder,
        'correctimagebar' : correctImageBar,
        'imgtempcomponent' : imageComponent,
        'initstateprogress' : initStateProgress,
        'uploadprogressbar' : uploadProgressBar,
        'correctimagedialog' : correctImageDialog
    },
    beforeMount : function(){

        par.userNo = 'admin';
        
        this.lang = this.$store.state.defaultLang;
        this.langOptions = this.$store.state.langOptions;

    },
    mounted(){
        /* util.getRequest('/imageUploadServices/0001A91000000000YINI',(res)=>{
            
            if(res.body.status=="200"||res.body.status==200){
                par.batchId.push(res.body.data.batchId);
                par.businessSerialNo = res.body.data.businessSerialNo;
                util.uploadDataFromServer(res.body.data.tree,res.body.data.files);
                
                window.setTimeout(()=>{
                    this.computeScrollBar();
                    util.scrollView(document.getElementsByClassName('scanMain')[0],document.getElementById('boxView'),'bar');
                },1500);
            }else{
                util.getRequest('/imageUploadServices/batchId',(res)=>{
                    if(res.body.status==200){
                        par.batchId.push(res.body.data.batchId);
                    }else{
                        util.showModelTip("warning","获取批次号失败!");
                        return false;
                    }
                })
            }
            
        }); */

        util.initWS();
        util.vue = this;
        util.initTreeNode();
        window.setTimeout(()=>{

            this.computeScrollBar();
            util.scrollView(document.getElementsByClassName('scanMain')[0],document.getElementById('boxView'),'bar');
        },2000);
    },
    methods:{
        changeLang (lang){
            this.$i18n.locale = lang;
            this.$store.commit('changeLanguage',lang);
        },
        showMenuBar : function(){
            this.showBar = !this.showBar;
            if(this.showBar==true){
                this.moveBar = 'outBar';
                
                window.setTimeout(()=>{
                    var barLi = document.getElementsByClassName('barLi').length;
                    var outBar = document.getElementById(this.moveBar);
                    outBar.style.transition ='all 0.4s linear';
                    outBar.style.transform ='translateX(-'+(barLi*135)+'px)';
                },50);
            }else{
                this.moveBar = 'inBar';
                window.setTimeout(()=>{
                    var inBar = document.getElementById(this.moveBar);
                    inBar.style.transition ='all 0.4s linear';
                    inBar.style.transform ='translateX(0px)';
                },50);
            }
        },
        scanBtn(){

            if(this.deviceValue==""||this.deviceValue==null){
                util.showModelTip('warning','请先选择扫描仪!');
				return false;
            }
            
			var obj = {"InterFace": "Scan","DeviceName": this.deviceValue,'ControlEncryption' : 0,'DoubleSide': parseInt(this.pageOp),'DPI': 300,'ShowUI': 0,'ShowProcess': 0,'Rote': 360,'Color': 3,'Ocr': parseInt(par.ocrPort),'Ip': par.serverIp.toString(),'Port': parseInt(par.serverPort),'SocketPort': parseInt(par.socketPort),'Type': parseInt(1)};
            this.isSave = 0;//重新初始化未保存
            window.console.log(this);
            util.sendInfo(JSON.stringify(obj),this.computeScrollBar());
        },
        importBtn(){
            document.getElementById('importFile').click();
        },
        reSizePic (){
            var inputFile = this.$refs.inputFile;
            let len = inputFile.files.length;

            this.showInitImgProgress = true;
            let _this = this;
            for(let i=0;i<len;i++){
                let f = inputFile.files[i];

                let fileSize = util.getFileSize(f.size);
                let name = f.name;
                name = name.substring(name.lastIndexOf('.'),name.length);
                if(name!='.jpg'&&name!='.png'&&name!='bmp'&&name!='tif'&&name!='gif'&&name!='pcx'&&name!='tga'&&name!='exif'&&name!='fpx'&&name!='webp'){
                    par.uploadFileArr.push({'fileObj':f,'fileName':f.name,'fileSize':fileSize,'state':0});
                }else{
                    util.drawPicture(_this,f,fileSize);
                }
            }
            
            util.uploadFiles(par.uploadFileArr);
        },
        deleteImage(){

            let delArr = par.pickImage;
            if(delArr.length<=0){
                util.showModelTip('warning','请先选择要删除的影像!');
                return false;
            }

            let parm = {"businessSerialNo": par.businessSerialNo,"fileId":delArr};
            util.deleteRequest("/imageUploadServices",{body:parm},(res)=>{

                if(res.body.status == "200"||res.body.status == 200){
                    par.pickImage = [];//清空数组
                    util.reloadDataByDelete(delArr,'I');
                    util.showModelTip('success','删除成功!');
                }else{
                    util.showModelTip('success','删除失败!');
                    return false;
                }

            });  
            let arr = document.getElementsByClassName('img-thumbnails');
            for(let o=0;o<arr.length;o++){
                arr[o].style.border = '1px solid #ececec';
            }
        },
        revertImage(){

            let delArr = par.pickImage;
            if(delArr.length<=0){
                util.showModelTip('warning','请先选择要矫正的影像!');
                return false;
            }else if(delArr.length > 1){
                util.showModelTip('warning','请选择一张要矫正的影像!');
                return false;
            }

            for(let k = 0;k < par.imgData.length;k++){
                for(let s = 0;s < par.imgData[k].children;s++){
                    if(par.imgData[k].children[s].fielId == delArr[0]){
                        this.isUpload = s.isUpload;
                        if(this.isUpload){
                            this.bigImgUrl = s.imageSrc;
                        }else{
                            
                            window.setTimeout(() => {
                                util.showBigImgFromActive(null,(res)=>{
                                    this.bigImgUrl = res;
                                });
                            }, 1500);
                        }
                        break;
                    }
                }
            }

            this.ticketId = delArr[0];
            this.showCorrectDialog = true;
        },
        showBigImage(msg){
            this.appListData = [];
            this.bigImgUrl = msg.url;
            this.ticketId = msg.fileId;
            this.dialogBarType = msg.barType;
			this.isShowBigImg = true;
        },
        viewAppFolderOrPool(){
            let bool = this.$store.state.showAppFolder;
            if(bool){
                this.showAppFolder = true;
            }else{
                this.showAppPool = true;
            }
        },
        showAppPoolImage(msg){
            this.bigImgUrl = msg.url;
            this.appListData = msg.appPoolData;
            this.showOprationBar = true;
			this.isShowBigImg = true;
        },
        correctImageModel(){
            
            par.pickImage = [];
            let fileId = this.ticketId;

            let count = 10;
            let isUpload = this.isUpload;
            let interVal = null;

            this.showCorrectDialog = false;
            this.showCorrectProgressBar = true;
            
            interVal = window.setInterval(()=>{

                let m = Math.random().toFixed(0,2)
                count+=(count*(m*2));
                if(parseInt(count) >= 45){
                    window.clearInterval(interVal);
                }else if(parseInt(count) >= 100){
                    window.clearInterval(interVal);
                }
                this.rotateValue = count;
            
            },800);

            if(isUpload!=true){

                util.correctBase64Img(this.bigImgUrl,par.rotatez,(res)=>{
                    window.console.log(res);
                });
                
            }else{
                util.postRequest(`/imageServices/updateDegree/${fileId}/${par.rotatez}`,{},(res)=>{
                    window.console.log(res);
                })
            }
            //this.showRotateModel();
        },
        saveImage(){

            var count = this.$store.state.uploadImgCount;
            if(count <= 0){
				util.showModelTip('warning','暂无可上传影像!');
				return false;
            }
            
            let uploadImages= [];
            let tickArr = par.uploadImageArr;
            
            for(let o=0;o<tickArr.length;o++){
                var str ={"BatchId":par.batchId[0],"FileId":tickArr[o].fielId,"BusinessSerialNo":par.businessSerialNo,"FileName":tickArr[o].imgName,"Base64":''};
                uploadImages.push(str);
            }
            
            var objmsg = {InterFace: "Upload",Ip: par.serverIp.toString(),Port: parseInt(par.serverPort),SocketPort: parseInt(par.socketPort),Type: parseInt(1),files: uploadImages}
            util.sendInfo(JSON.stringify(objmsg));
            this.$store.commit('showImageUpload');
            
        },
        showAside(par){
            if(par=='left'){
                this.showLeftContent =! this.showLeftContent; 
                if(this.showLeftContent){
                    this.leftAsideWidth = {"transition":"all 0.8s ease 0s","width":"300px"};
                }else{
                    this.leftAsideWidth = {"transition":"all 0.8s ease 0s","width":"30px"};
                }
                
            }else if(par=='right'){
                this.showRightContent =! this.showRightContent; 
                if(this.showRightContent){
                    this.rightAsideWidth = {"transition":"all 0.8s ease 0s","width":"300px"};
                }else{
                    this.rightAsideWidth = {"transition":"all 0.8s ease 0s","width":"30px"};
                }
                
            }
        },
        computeScrollBar(){
            var main = document.getElementsByClassName('scanMain');
            var box = document.getElementsByClassName('boxView');

            var mainHeight = parseInt(main[0].clientHeight);
            var boxHeight = parseInt(box[0].scrollHeight);
            var height =  (mainHeight/boxHeight)*mainHeight; 

            if(height < mainHeight){
                this.showSideScroll = 'block';
                this.srcollBarHeight = height;
            }else{
                this.showSideScroll = 'none';
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

.up-enter,.up-leave-to{
	opacity: 0;
	transition: all 0.2s linear;
}

.up-enter-active,.up-leave-active{
	transition: opacity 0.5s linear;
}

.dropItem{
    color: #333;
    margin: 5px !important;
    font-size: 8pt !important;
}

.scanHead {
    color: #333;
    position: fixed;
    z-index: 1;
    width: 100%;
    display: flex;
    padding: 0px 65px;
    background: #485159;
    height: 40px !important;
    justify-content: space-between;
    box-shadow: 0 1px 4px 0 rgba(0,21,41,.08);

    .headLeft,.headRight{
        margin: 2px 0px;
        box-sizing: border-box;
        ul{
            list-style: none;
            display: inline-flex;
            li{
                margin:  5px;
            }
            li img{
                width: 135px;
            }
        }
        
    }
    .headRight > li:nth-last-child(1){
        display: flex;
        position: relative;
        justify-content: center;
        align-content: center;
        align-items: center;
    }
    .smallcode{
        padding: 10px;
        position: absolute;
        top: 55px;
        width: 145px;
        z-index: 999;
        box-sizing: border-box;
        height: 145px;
        border-radius: 4px;
        background: white;
        box-shadow: 2px 5px 8px #eaeaea;
        img{
            width: 100% !important;
        }
    }
    .smallcode::after{
        content: '';
        border: 1px solid ;
        position: absolute;
        top: -18px;
        left: 15%;
        position: absolute;
        border-top: 10px solid #f000;
        border-bottom: 10px solid #eaeaea;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
    }
    .headRight .menuBar{
        width: 25px;
        height: 25px;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        background: white;
        box-shadow: 0px 2px 8px #162633;
    }
    .menuBar::after{
        content: '';
        margin-top: 2px;
        margin-left: -3px;
        border-radius: 2px;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid #409eff;
        position: absolute;
    }

    .outBar{
        position: relative;
        transition: all .4s linear;
    }

    .inBar{
        position: relative;
        transition: all .4s linear;
        transform: translateX(0px);
    }

    .ullist{
        list-style: none;
        width: auto;
        height: 28px;
        top: 0;
        position: absolute;
        margin-left: 16px;
        z-index: -2;
        display: flex;
        overflow: hidden;
        background: #485159;
        justify-content: center;
        box-shadow: 0px 3px 5px #2a3e51;

        > ul li{
            list-style: none;
            margin: auto 15px;
            height: 100%;
            display: block;
            min-width: 115px;
        }
    }

}

.el-input--mini{
    height: 26px !important;
    line-height: 26px !important;
}

.el-button--mini{
    padding: 5px 15px;
}
/* .scanAside{
    box-shadow: 0px 5px 8px #ccc;
} */

.scanAside,.scanMain {
    overflow: hidden;
    margin-top: 40px;
    height: calc(100vh - 40px);
}

.scanMain {
    //overflow-y: auto;
    position: relative;
    padding: 5px !important;
}

.asideLeftContent,.asideRightContent{
    position: relative;
    display: flex;
    justify-content: space-between;

    .content{
        height: calc(100vh - 40px);
        width: 330px;   
        background: rgb(255, 255, 255);
        position: relative;
        box-shadow: 0px 5px 10px #ddd6d6;
    }

    .contentBar{
        width: 30px;
        font-size: 24pt;
        cursor: pointer;
        /* border: 1px solid #f7f7f7; */
        line-height: calc(100vh - 60px);
    }

}

</style>