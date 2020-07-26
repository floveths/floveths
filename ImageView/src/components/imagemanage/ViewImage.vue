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
                            <el-button type="primary" size="mini" icon="el-icon-document" @click="viewAttach">附件查看</el-button>
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
                        <div style="width:100%;overflow: auto;">
                            <ocrtemplate :type="1" :items="ocrInfoList"></ocrtemplate>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>

        <div class="slideViewBar">
            <div class="row">
                <div class="col-md-2 col-sm-2"><i class="el-icon-refresh-left " @click="oprationImage(3)"></i></div>
                <div class="col-md-2 col-sm-2"><i class="el-icon-circle-plus-outline " @click="oprationImage(1)"></i></div>
                <div class="col-md-2 col-sm-2"><i class="el-icon-video-pause " @click="oprationImage(0)"></i></div>
                <div class="col-md-2 col-sm-2"><i class="el-icon-document-checked" @click="checkImg" ></i></div>
                <div class="col-md-2 col-sm-2"><i class="el-icon-remove-outline " @click="oprationImage(2)"></i></div>
                <div class="col-md-2 col-sm-2"><i class="el-icon-refresh-right " @click="oprationImage(4)"> </i></div>
            </div>
        </div>

        <div class="viewFiles" v-show="showFileBox">
            <div style="width:100%;height:35px;padding:5px 20px;background:white;border-bottom:1px solid red;border-bottom: 1px solid #e5e5e5;box-shadow: 0px 5px 8px #d9d9d9;">
                <span>附件一览</span>
                <span style="float:right;cursor: pointer;" @click="showFileBox=false"><i class="el-icon-close"></i></span>
            </div>
            <div style="margin-top:5px;height:calc(100vh - 140px);border:1px solid red;">
                <filelistview></filelistview>
            </div>
        </div>

        <smallimagelist :viewList="imageViewList" :viewCount="totalCount" @slideImgLeft="slideImgLeft" @slideImgRight="slideImgRight" :imgOffset="imgSlideOffset" :boxOffset="slideBoxOffset" @pickImg="pickImg" @viewByIndex="viewByIndex"></smallimagelist>

        <viewbigimagedialog v-show="viewDialog" @slideImgLeft="slideImgLeft" @slideImgRight="slideImgRight" :imgUrl="bigImgUrl" @closeModel="viewDialog=false"></viewbigimagedialog>

    </div>
</template>
<script>
import $ from 'jquery'
import util from '../../utils/util.js'
import par from '../../utils/param.js'
import '../../assets/css/ztree.css'
import ocrTemplate from '../pubcomponent/ocrtemp/OcrListTemplate'
import BigImageList from '../pubcomponent/imagebox/BigImageList'
import FileListView from '../pubcomponent/filemanage/FileListView'
import SmallImageList from '../pubcomponent/imagebox/SmallImageList'
import ViewBigImageDialog from '../pubcomponent/imagedialog/ViewImageDialog'

export default {
    data : function(){
        return {
            jumpTo : '',
            ocrClz : '',
            treeClz : '',
            
            centerBox : 0,
            totalCount : 0,
            curImgIndex : 0,
            
            bigImgUrl : '',
            treeWidth : 280,
            ocrTWidth : 280,
            offsetIndex : 0,
            bigUlOffset : 0,
            pickImgArr : [],
            ocrInfoList : [],
            imageViewList : [],
            viewDialog : false,
            slideBoxOffset : 0,
            imgSlideOffset : 0,
            showFileBox : false,
        }
    },
    components : {
       'ocrtemplate': ocrTemplate,
       'filelistview' : FileListView,
       'bigimagelist' : BigImageList,
       'smallimagelist' : SmallImageList,
       'viewbigimagedialog' : ViewBigImageDialog
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
        util.getRequest('/webShowImage/0001A91000000000Z34K/1/50?t=953',(res)=>{
            
            if(res.body.status==200||res.body.status=='200'){
                
                this.imageViewList = res.body.data.files;
                this.totalCount = res.body.data.totalElements;
                this.getTicketOcr();
                par.ticketNodes[0].children = res.body.data.tree;
                par.businessSerialNo = res.body.data.businessSerialNo;
                $.fn.zTree.init($("#treeDemo"), par.setting, par.ticketNodes);        
            }
        })
    },
    methods : {
        checkImg(){

        },
        oprationImage(id){
            
            let style = util.bigImage(id);
            let liImg = document.getElementById('liImg'+this.curImgIndex);
            liImg.style.transition = style.transition;
            liImg.style.transform = style.transform;
        },
        downLoadImg(){
            let url = `http://${par.baseUrl}/webShowImage/downloadImages/${par.businessSerialNo}`;

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
            
        },
        slideImgRight(){
            this.curImgIndex++;
			if(this.curImgIndex >= this.totalCount){
                util.showModelTip('warning','已经是最后一张了!');
				this.curImgIndex = (this.totalCount-1);
				return false;
            }

            if(this.slideBoxOffset < 1050){
				this.slideBoxOffset += 150;
			}else{
				this.imgSlideOffset += 150;
			}
            
            this.getTicketOcr();
            this.offsetIndex = this.curImgIndex;
            this.bigUlOffset = this.offsetIndex * this.centerBox;
            this.bigImgUrl = this.imageViewList[this.curImgIndex].url;

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
        printImg(){
            if(this.pickImgArr.length <= 0){
                util.showModelTip('warning','请先勾选要打印的影像!');
                return false;
            }

            window.localStorage.setItem("img-fileId", this.pickImgArr);
            window.open('http://'+par.baseUrl + "/images/printImage.html");

        },
        viewByIndex(index){
			
			this.curImgIndex = index;
            this.slideBoxOffset = 0;
            this.getTicketOcr();
            this.imgSlideOffset = (150 * index);
            this.bigUlOffset = index * this.centerBox;
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
            window.console.log(this.centerBox);
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
            });
        },
        viewAttach(){
            this.showFileBox = true;
        }
    }
}
</script>
<style lang="less">
*:active{
    outline: none;
}

body{
    background: #fafafa;
}

.navbar-top{
	color: white;
    min-height: 45px !important;
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
    height: 25px !important;
	width: 55px !important;
    padding: 5px 2px !important;
    background: #5e6a74 !important;
}

.viewContent{
    width: 100%;
    height: calc(100vh - 255px);
    position: relative;
    margin: 10px auto;
    display: block;
    border-radius: 2px;
    background: transparent;
    box-shadow: 0px 5px 25px rgb(158, 158, 158);

    .viewContentCenter{
        height: 98%;
        float: left;
        overflow: hidden;
        position: relative;
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
    }

    .contentLeftTree,.contentRightOcr{
        width: 280px;
        height: 100%;
        overflow-y: auto;
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
	height: 35px;
    font-size: 16pt;
    margin: 10px auto;
    position: relative;
    cursor: pointer;
    text-align: center;
	box-shadow: 0px 3px 6px #c9c9c9;
	border-bottom: 1px solid #e9e9e9;
    background: white;
    border-radius: 15px;
    
}

.imgview-slidebar-left,.imgview-slidebar-right{
    width: 35px;
    height: 35px;
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 50%;
    margin: auto;
    z-index: 9999;
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
    width: 75%;
    position: absolute;
    z-index: 9999999;
    height: calc(100vh - 100px);
    background: #f9f9f9;
    border : 1px solid rgb(206, 206, 206);
    box-shadow: 0px 10px 25px  #ccc;
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
</style>
