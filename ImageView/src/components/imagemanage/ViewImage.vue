<template>
    
    <div class="ViewImageContent">

        <div class="navbar-top navbar navbar-fixed-top">
            <div class="viewContainer">
                <div class="row">
                    <div class="col-md-4 col-sm-4 ">
                        <div class="form-group label label-sm " style="font-size: 13pt;">
                            <div class="logo"><img src="../../../public/static/logo.png" ></div>
                            <span class="text text-center" style="margin-left:10px">影像主键:264X201812310054</span>
                        </div>
                    </div>
                    
                    <div class="col-md-4 col-sm-4 ">
                        <form class="form-inline">
                            <div class="form-group label label-sm ">
                                <span>共 {{curImgIndex+1}}/{{totalCount}}  张影像</span>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <div class="form-group label label-sm " >
                                <span>跳转至</span> <input class="form-control totalCount" v-model="jumpTo" @blur="jumpToImg"  type="text" ><span>张影像</span>
                            </div>
                        </form>
                    </div>
                    
                    <div class="col-md-4 col-sm-4 ">
                        <form id="fileForm" class="form-inline" enctype="multipart/form-data" >
                            <el-button type="primary" size="mini" icon="el-icon-document" @click="showFileBox = true">附件查看({{documentList.length}})</el-button>
                            <el-button type="primary" size="mini" icon="el-icon-printer" @click="printImg">影像打印</el-button>
                            <el-button type="success" size="mini" icon="el-icon-download" @click="downLoadImg">打包下载</el-button>
                        </form>
                    </div>
                </div>
            </div>	
            
        </div>

        <div style="padding:0px 10px;">
            <div class="viewContent">

                <div class="viewContentLeft" >
                    <div class="contentLeftTree" :style="{'width':treeWidth+'px'}">
                        <div style="width:240px;overflow: auto;">
                            <ul class="ztree" id="treeDemo" style="margin:15px"></ul>
                        </div>
                        <treescrollbar :bar="'bar0'" :sideScroll="showTreeScroll" :height="treeBarHeight"></treescrollbar>
                    </div>
                    <!-- <div class="contentLeftBar">
                        <div class="contentBarBox"><i class="el-icon-arrow-right" :class="treeClz" @click="slideTreeLeft"></i></div>
                    </div> -->
                </div>

                <div class="viewContentCenter" :style="{'width':centerBox+'px'}"> 
                    <div class="imgview-slidebar-left">
                        <i class="el-icon-arrow-left" @click="slideImgLeft"></i>
                    </div>

                    <bigimagelist :bigImageList="imageViewList" :width="centerBox" :index="offsetIndex" :ulOffset="bigUlOffset" @viewBigImage="viewBigImage" :count="totalCount"></bigimagelist>

                    <div class="imgview-slidebar-right">
                        <i class="el-icon-arrow-right" @click="slideImgRight"></i>
                    </div>
                </div>

                <div class="viewContentRight" >
                    <!-- <div class="contentRightBar" >
                        <div class="contentBarBox"><i class="el-icon-arrow-left" :class="ocrClz" @click="slideOcrRight"></i></div>
                    </div> -->
                    <div class="contentRightOcr" :style="{'width':ocrTWidth+'px'}">
                        <div style="width:100%;overflow: hidden;">
                            <ocrtemplate :type="1" :items="ocrInfoList"></ocrtemplate>
                        </div>
                        <ocrscrollbar :bar="'bar1'" :sideScroll="showOcrScroll" :height="ocrBarHeight"></ocrscrollbar>
                    </div>
                    
                </div>

            </div>
        </div>

        <div class="slideViewBar">
            <div class="row">
                <div class="col-md-2 col-sm-2"><i class="el-icon-refresh-left " @click="oprationImage(3)"><p>左旋转</p></i></div>
                <div class="col-md-2 col-sm-2"><i class="el-icon-circle-plus-outline " @click="oprationImage(1)"><p>放大</p></i></div>
                <div class="col-md-1 col-sm-1"><i class="el-icon-refresh" @click="revertImage()" ><p>矫正影像</p></i></div>
                <div class="col-md-2 col-sm-2"><i class="el-icon-video-pause " @click="oprationImage(0)"><p>原始大小</p></i></div>
                <div class="col-md-1 col-sm-1"><i class="el-icon-document-checked" @click="checkImg" ><p>审核影像</p></i></div>
                <div class="col-md-2 col-sm-2"><i class="el-icon-remove-outline " @click="oprationImage(2)"><p>缩小</p></i></div>
                <div class="col-md-2 col-sm-2"><i class="el-icon-refresh-right " @click="oprationImage(4)"><p>右旋转</p></i></div>
            </div>
        </div>

        <div class="viewFiles" v-show="showFileBox">
            <div style="width:100%;height:35px;padding:5px 20px;background:white;border-bottom:1px solid red;border-bottom: 1px solid #e5e5e5;box-shadow: 0px 5px 8px #d9d9d9;">
                <span>附件下载...</span> <i class="downFile el-icon-download" @click="downFile" ></i>
                <span style="float:right;cursor: pointer;" @click="showFileBox=false"><i class="el-icon-close"></i></span>
            </div>
            <div style="margin-top:5px;height:calc(100vh - 140px);padding:0px 25px;">
                <filelistview :fileList="documentList" @pickFile="downFile" @viewPdfDoc="viewPdfDoc" ></filelistview>
            </div>
        </div>

        <transition name="up">
            <pdfdocview v-show="showPdfBox" :pdfurl="pdfUrl"  @closepdfbox='showPdfBox=false'></pdfdocview>
        </transition>

        <smallimagelist :viewList="imageViewList" :viewCount="totalCount" @slideImgLeft="slideImgLeft" @slideImgRight="slideImgRight" :imgOffset="imgSlideOffset" :boxOffset="slideBoxOffset" @pickImg="pickImg" @viewByIndex="viewByIndex"></smallimagelist>

        <transition name="up">
            <correctimagebar v-show="showRotateProgressBar" @closemodel="showRotateProgressBar=false" :isfull="isFullCorrect" :rotatevalue="rotateValue"></correctimagebar>
        </transition>

        <transition name="up">
            <correctimagedialog :imgSrc="bigImgUrl" v-show="showCorrectDialog" @closeModel="correctImageModel"></correctimagedialog>
        </transition>

        <transition name="up">
            <checkoutimage @closecheckimg="checkoutimage=false" v-show="checkoutimage"></checkoutimage>
        </transition>

        <viewbigimagedialog v-show="viewDialog" @slideImgLeft="slideImgLeft" :ocrInfoList="ocrInfoList" @slideImgRight="slideImgRight" :imgUrl="bigImgUrl" @closeModel="viewDialog=false"></viewbigimagedialog>

    </div>
</template>
<script>
import $ from 'jquery'
import util from '../../utils/util.js'
import par from '../../utils/param.js'
import '../../assets/css/ztree.css'
import pdfDocView from '../pubcomponent/pdfdocdialog/PdfDocBox'
import ocrTemplate from '../pubcomponent/ocrtemp/OcrListTemplate'
import bigImageList from '../pubcomponent/imagebox/BigImageList'
import fileListView from '../pubcomponent/filemanage/FileListView'
import orcScrollBar from '../pubcomponent/scrollbarcomp/ScrollBarTemp'
import treeScrollBar from '../pubcomponent/scrollbarcomp/ScrollBarTemp'
import correctImageBar from '../pubcomponent/imagebox/CorrectImageBar'
import smallImageList from '../pubcomponent/imagebox/SmallImageList'
import checkOutImage from '../pubcomponent/checkimage/ChckeOutImage'
import viewBigImageDialog from '../pubcomponent/imagedialog/ViewImageDialog'
import correctImageDialog from '../pubcomponent/imagedialog/CorrectImageDialog'

export default {
    data : function(){
        return {
            jumpTo : '',
            ocrClz : '',
            treeClz : '',
            
            centerBox : 0,
            totalCount : 0,
            curImgIndex : 0,
            
            curPages : 1,
            totalPages : 0,
            bigImgUrl : '',
            treeWidth : 280,
            ocrTWidth : 280,
            offsetIndex : 0,
            bigUlOffset : 0,
            
            pdfUrl : '',
            pickImgArr : [],
            pickFileArr : [],
            ocrInfoList : [],
            imageViewList : [],
            documentList : [],
            
            showPdfBox : false,
            viewDialog : false,
            slideBoxOffset : 0,
            imgSlideOffset : 0,
            rotateValue : 0,
            
            showFileBox : false,
            checkoutimage : false,
            isFullCorrect : false,
            showCorrectDialog : false,
            showRotateProgressBar : false,
            'ocrBarHeight' : 0,
            'showOcrScroll' : 'none',
            'treeBarHeight' : 0,
            'showTreeScroll' : 'none'
        }
    },
    components : {
       'pdfdocview' : pdfDocView,
       'ocrtemplate': ocrTemplate,
       'ocrscrollbar' : orcScrollBar,
       'filelistview' : fileListView,
       'bigimagelist' : bigImageList,
       'checkoutimage' : checkOutImage,
       'treescrollbar' : treeScrollBar,
       'smallimagelist' : smallImageList,
       'correctimagebar' : correctImageBar,
       'viewbigimagedialog' : viewBigImageDialog,
       'correctimagedialog' : correctImageDialog
    },
    watch : {
        /* treeWidth  (){
           this.computeBox();
        },
        ocrTWidth (){
            this.computeBox();    
        } */
    },
    mounted(){

        window.onresize = function(){
            this.centerBox = (window.screen.width - 600);
        }

        //this.computeBox();
        this.centerBox = (window.screen.width - 600);
        util.getRequest(`/webShowImage/0001A91000000000Z34K/${this.curPages}/15?t=953`,(res)=>{
            
            if(res.body.status==200||res.body.status=='200'){
                
                this.curPages = res.body.data.number;
                this.imageViewList = this.imageViewList.concat(res.body.data.files) ;
                this.totalPages = res.body.data.totalPages;
                this.totalCount = res.body.data.totalElements;
                
                this.getTicketOcr();
                window.setTimeout(()=>{
                    this.addTreeClass(0,null);
                    this.computeTreeScrollBar();
                    util.scrollView(document.getElementsByClassName('contentLeftTree')[0],document.getElementsByClassName('ztree')[0],'bar0');
                },1500);
                par.ticketNodes[0].children = res.body.data.tree;
                par.businessSerialNo = res.body.data.businessSerialNo;
                $.fn.zTree.init($("#treeDemo"), par.setting, par.ticketNodes);
            }
        })

        util.getRequest('/webShowImage/getDocumentList/0001A91000000000YINI',(res)=>{
            if(res.body.status=='200'||res.body.status==200){
                this.documentList = res.body.data.files;
            }
        });

        let _this = this;
        par.setting.callback.onClick = function(event, treeid, treenode){

            let index = treenode.tId.substring(treenode.tId.lastIndexOf('_')+1,treenode.tId.length);
            index = parseInt(index - 2);

            if(index > (_this.curPages * 12)){
                _this.curPages = Math.floor(_this.totalCount/index)+1;
                _this.loadData();
                _this.viewByIndex((index-1));

                window.setTimeout(()=>{
                    _this.bigImgUrl = _this.imageViewList[(index-1)].url;
                },1500)
            }else{
                _this.bigImgUrl = _this.imageViewList[(index-1)].url;
            }
            
            _this.viewDialog = true;
        }
        
    },
    methods : {
        checkImg(){
            this.checkoutimage = true;
        },
        oprationImage(id){
            
            let style = util.oprateBigImage(id);
            let liImg = document.getElementById('liImg'+this.curImgIndex);
            liImg.style.transition = style.transition;
            liImg.style.transform = style.transform;
        },
        downLoadImg(){
            let url = `${par.baseUrl}/webShowImage/downloadImages/${par.businessSerialNo}`;
            window.location.href = url;
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

            this.getTicketOcr();
            this.offsetIndex = this.curImgIndex;
            this.bigUlOffset = this.offsetIndex * this.centerBox;

            this.bigImgUrl = this.imageViewList[this.curImgIndex].url;
            this.addTreeClass((this.curImgIndex + 1),this.curImgIndex);
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

            if((this.curImgIndex+1) == (this.curPages * 12)){
                this.curPages+=1;
                
                if(this.curPages <= this.totalPages){
                    this.loadData();
                }
            }
            
            this.getTicketOcr();
            this.offsetIndex = this.curImgIndex;
            this.bigUlOffset = this.offsetIndex * this.centerBox;

            this.bigImgUrl = this.imageViewList[this.curImgIndex].url;
            this.addTreeClass((this.curImgIndex - 1),this.curImgIndex);

        },
        pickImg(id){
            if(this.pickImgArr.length <= 0){
                this.pickImgArr.push(id);
            }else{
                let arr = this.pickImgArr;
                arr.find((i,k)=>{
                    if(i==id){
                        this.pickImgArr.splice(k,1);
                    }else{
                        this.pickImgArr.push(id);
                    }
                });
            }
        },
        downFile(val){
            
            if(typeof val != 'string'&&this.pickFileArr.length <= 0){
                util.showModelTip('warning','请先勾选要下载的附件!');
                return false;
            }
            if(this.pickFileArr.length<=0){
                this.pickFileArr.push(val);
            }else{
                let arr = this.pickFileArr;
                arr.find((i,k)=>{
                    if(i==val){
                        this.pickFileArr.splice(k,1);
                    }
                })
            }
            //批量下载代码
        },
        printImg(){
            if(this.pickImgArr.length <= 0){
                util.showModelTip('warning','请先勾选要打印的影像!');
                return false;
            }

            window.localStorage.setItem("img-fileId", this.pickImgArr);
            window.open(par.baseUrl + "/images/printImage.html");

        },
        viewByIndex(index){
			
			this.curImgIndex = index;
            this.slideBoxOffset = 0;
            this.getTicketOcr();
            this.imgSlideOffset = (150 * index);
            this.bigUlOffset = index * this.centerBox;
            this.addTreeClass(null,index);
            this.addTreeClass(index,null);
        },
        viewBigImage(){

            this.bigImgUrl = this.imageViewList[this.curImgIndex].url;
            this.viewDialog = true;
        },
        slideTreeLeft(){
            //this.treeWidth==300?20:300; 三目运算无法使用?????
            if(this.treeWidth==280){
                this.treeWidth = 0;
                this.treeClz = 'openT';
            }else{
                this.treeWidth = 280;
                this.treeClz = 'closeT';
            }
        },
        slideOcrRight(){
            if(this.ocrTWidth == 280 ){
                this.ocrTWidth = 0;
                this.ocrClz = 'closeT';
            }else{
                this.ocrTWidth = 280;
                this.ocrClz = 'openT';
            }
        },
        computeBox(){
            if(this.treeWidth == 280 && this.ocrTWidth == 280){
                this.centerBox = (window.screen.width - 620);
            } else if(this.treeWidth == 0 && this.ocrTWidth == 0){
                this.centerBox = (window.screen.width - 60);
            }else{
                this.centerBox = (window.screen.width - 340);
            } 
            //window.console.log(this.centerBox);
            this.bigUlOffset = this.offsetIndex * this.centerBox;
        },
        jumpToImg(){

            var t = /^[\d]*$/;
			if(!t.test(this.jumpTo.toString())){
				
                util.showModelTip('warning','只能输入正整数!');
				return false;
			}else if(this.jumpTo>this.totalCount){
                util.showModelTip('warning','超过总图片数了!');
				return false;
			}else if(this.jumpTo<=0){
                util.showModelTip('warning','输入的值不能小于等于0!');
				return false;
            }
            
            this.viewByIndex(parseInt(this.jumpTo-1));
            this.addTreeClass((this.curImgIndex-2),(this.jumpTo-1));

        },
        getTicketOcr(){
            let id = this.imageViewList[this.curImgIndex].fileId;
            util.getRequest(`/webShowImage/invoiceInfo/${id}`,(res)=>{

                if(res.body.status == "200"||res.body.status == 200){
                    if(res.body.data.length>0 &&res.body.data!=null){
                       // this.showOcrList = true;
                        this.ocrInfoList = res.body.data;
                    }else{
                        this.ocrInfoList = [];
                    }
                    
                }
                window.setTimeout(()=>{
                    this.computeOcrScrollBar();
                    util.scrollView(document.getElementsByClassName('contentRightOcr')[0],document.getElementsByClassName('imageOcrInfoBox')[0],'bar1');
                },1500)
            });
        },
        viewPdfDoc(id){

            this.pdfUrl = par.baseUrl+'/webShowImage/getDocument/'.concat(id);
            this.showPdfBox = true;
        },
        loadData(){
            util.getRequest(`/webShowImage/0001A91000000000Z34K/${this.curPages}/15?t=953`,(res)=>{
            
                if(res.body.status==200||res.body.status=='200'){
                    
                    this.curPages = res.body.data.number;
                    this.totalPages = res.body.data.totalPages;
                    this.totalCount = res.body.data.totalElements;
                    this.imageViewList = this.imageViewList.concat(res.body.data.files);
                }
            })
        },
        addTreeClass(oldIndex,newIndex){
            if(oldIndex!=null){
                
                $(".level2 .node_name").eq(newIndex).parent().parent().addClass("treeColor");
            }
            if(newIndex!=null){
                $(".level2 .node_name").eq(oldIndex).parent().parent().removeClass("treeColor");
            }
        },
        revertImage(){

            this.bigImgUrl = this.imageViewList[this.curImgIndex].url;
            this.showCorrectDialog = true;
        },
        correctImageModel(){
            
            let interVal = null;
            this.showCorrectDialog = false;
            this.showRotateProgressBar = true;

            let count = 10;
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

            let fileId = this.imageViewList[this.curImgIndex].fileId;
            util.postRequest(`/imageServices/updateDegree/${fileId}/${par.rotatez}`,{},(res)=>{
                window.console.log(res);
            });

        },
        computeOcrScrollBar(){
            var main = document.getElementsByClassName('contentRightOcr');
            var box = document.getElementsByClassName('imageOcrInfoBox');

            var mainHeight = parseInt(main[0].clientHeight);
            var boxHeight = parseInt(box[0].scrollHeight);
            var height =  (mainHeight/boxHeight)*mainHeight;
            
            if(height < mainHeight){
                this.showOcrScroll = 'block';
                this.ocrBarHeight = height;
            }else{
                this.showOcrScroll = 'none';
            } 
        },
        computeTreeScrollBar(){
            var main = document.getElementsByClassName('contentLeftTree');
            var box = document.getElementsByClassName('ztree');

            var mainHeight = parseInt(main[0].clientHeight);
            var boxHeight = parseInt(box[0].scrollHeight);
            var height =  (mainHeight/boxHeight)*mainHeight;
            
            if(height < mainHeight){
                this.showTreeScroll = 'block';
                this.treeBarHeight = height;
            }else{
                this.showTreeScroll = 'none';
            } 
        }
    }
}
</script>
<style lang="less">
*:active{
    outline: none;
}

body{
    background: #f0f0f0;
}

.downFile{
    width: 25px;
    height: 25px;
    color: white;
    cursor: pointer;
    text-align: center;
    line-height: 25px;
    border-radius: 50%;
    display: inline-block;
    margin: 2px 10px -5px;
    background:#76b7fb;
    box-shadow: 0px 2px 4px #6accf2;
}

.navbar-top{
    color: white;
    height: 40px;
    min-height: 40px !important;
	box-shadow: 0px 2px 12px #f4efff;
    background: #485159;
}

.logo {
    width: 135px;
    display: block;
    float: left;
    > img{
        width:135px;
    }
} 

.viewContainer{
	width: 1280px;
	margin: 0px auto;
}

.label{
	height: 34px;
	display: block;
	line-height: 30px;
	padding: 0.05em .6em .3em !important;
}

.form-group{
    margin-bottom: 0px !important;
}

.label-sm{
	height: 30px;
    font-size: 10pt;
    padding-top: 0px !important;
}

.form-inline .totalCount{
	border: 0px;
    outline: none;
    color: white;
    font-size: 10pt;
    height: 20px !important;
	width: 55px !important;
    padding: 0px 5px !important;
    background: #5e6a74 !important;
}

.el-button--mini{
    padding: 5px 15px;
}

.viewContent{
    width: 100%;
    height: calc(100vh - 245px);
    position: relative;
    margin: 10px auto;
    display: block;
    border-radius: 2px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 5px 25px#515151;

    .viewContentCenter{
        height: 98%;
        overflow: hidden;
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        background: white;
        box-shadow: 0px 5px 16px#999494;

    }

    .viewContentLeft,.contentLeftTree{
        float: left;
    }

    .viewContentRight,.contentRightOcr{
        float: right;    
    }

    .viewContentLeft,.viewContentRight{
        width: auto;
        height: 100%;
        background: #f0f0f0;
    }

    .contentLeftTree,.contentRightOcr{
        width: 280px;
        height: 100%;
        position: relative;
        //overflow-y: auto;
    }

    .contentLeftBar,.contentRightBar{
        width: 20px;
        height: 100%;
        float: left;
        cursor: pointer;
        line-height: 50%;
        position: relative;
    }

    .contentBarBox{
        width: 20px;
        height: 60px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto; 
        font-size: 16pt;
        line-height: 60px;
        background: rgba(235, 235, 235, 0.6);
    }
}

.slideViewBar{
	width: 85%;
    height: 40px;
    color: #484848;
    font-size: 16pt;
    margin: 10px auto;
    position: relative;
    cursor: pointer;
    text-align: center;
    padding: 2px 0px;
    background: white;
    border-radius: 20px;
    background: #f0f0f0;
    box-shadow: 0px 3px 6px #c9c9c9;
    
    p{
        margin: 2px 0px;
        font-size: 8pt;
    }
}

.imgview-slidebar-left,.imgview-slidebar-right{
    width: 35px;
    height: 35px;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 99;
    border-radius: 50%;
    margin: auto;
    font-size: 20pt;
    color:#3980f0;
    text-align: center;
    line-height: 40px;
    background:#e1e1e191;
    cursor: pointer;
    font-weight: bolder;
    box-shadow: 0px 2px 6px#d9d9d9;
}

.viewFiles{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 280px;
    position: absolute;
    z-index: 999;
    height: 320px;
    background: #f9f9f9;
    border : 1px solid rgb(206, 206, 206);
    box-shadow: 0px 10px 25px  #ccc;
    margin-right: 260px;
    margin-top: 50px;
}

.viewFiles::before{
    content: "";
    top: -22px;
    left: 0;
    right: 0;
    width: 20px;
    margin: auto;
    position: absolute;
    border-bottom: 12px solid rgb(218, 218, 218);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid transparent;

}

.imgview-slidebar-left{
    left: 0;
    margin-left: 5px;
}

.imgview-slidebar-right{
    right: 0;
    margin-right: 5px;
}

.openT{
    transition: all .3s;
    transform: rotateZ(0deg);
}

.closeT{
    transition: all .3s;
    transform: rotateZ(180deg);
}

.treeColor{
	border-radius: 5px;
	background: linear-gradient(120deg,#b2f2c0,#aaeaff);
}

</style>
