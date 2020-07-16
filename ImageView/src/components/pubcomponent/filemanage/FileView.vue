<template>
    <div>

        <div class="fileListBox">
            <div class="fileListBoxContentTitle" >
                <span ><el-tag type="danger" size="small">附件管理和电子发票...</el-tag></span>
                <button class="delFileBtn" type="button" v-on:click="delFile">
                    <i class="el-icon-delete"></i>
                </button>
            </div>
            
            <div class="contentHead">
                <div class="headBox">
                    <div class="fileList" @click="sliceBox('file')">
                        <p>附件内容</p>
                    </div>
                    <span>|</span>
                    <div class="ticketList" @click="sliceBox('ticket')">
                        <p>电子发票</p>
                    </div>
                </div>
                <i class="slideBar" v-bind:style="slideBox"></i>
            </div>
            <div class="fileTicketListContent" v-bind:style="slideContentBox">

				<div class="fileListContent">
                     <div class="row">
                         <div class="col-md-6 col-xs-6" v-for="(item,i) in fileListData" :key="i">
                            <div class="fileContentBox" v-on:dblclick="viewPdfDoc" :value="item.fileId" >
                                <img :src="item.fileIcon" class="fileImg">
                                <input type="checkbox" :value="item.fileId" v-model="filePicked" class="imgListCheck" />
                                <label class="imgListLabel"  :for="item.fileId"></label>
                                <span class="fileListName" v-on:dblclick="viewPdfDoc" >{{item.fileName}}</span>
                            </div>
                         </div>
                     </div>
                </div>

                <div class="ticketListBoxContent">
                    <ul class="ticketListUl">
                        <li v-for="(item,i) in ticketListData" v-on:dblclick="viewPdfDoc" :value="item.fileId" :key="i">
                            <img :src="item.fileSrc" >
                            <p>{{item.fileName}}</p>
                            <!-- <span>15.5KB</span> -->
                        </li>
                    </ul>
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
import PdfDocView from '../pdfdocdialog/PdfDocBox'

export default {
    data : function(){
        return {
            'type' : 'F',
            'slideBox' : {},
            'pdfUrl' : null,
            'showPdfBox' : false,
            'filePicked' : [],
            'slideContentBox' : {},
            'fileListData' : par.fileListData,
            'ticketListData' : par.ticketListData
        }
    },
    components : {
        'pdfdocview' : PdfDocView,
    },
    watch : {

        fileAndTicketListData : function(){
            this.loadData();
        }
    },
    methods : {
        delFile : function(){
            if(this.filePicked.length <= 0){
                util.showModelTip('warning','请先选择要删除的附件!');
                return false;
            }
            let parm = {"businessSerialNo": par.businessSerialNo,"fileId":this.filePicked};
            util.deleteRequest('/imageUploadServices',parm,(res)=>{
                window.console.log(res);
            })
        },
        viewPdfDoc : function(e){
            let id = e.target.parentElement.attributes.value.value;
            let val = 'http://'+par.baseUrl+'/webShowImage/getDocument/'.concat(id);
            this.pdfUrl = val;
            this.showPdfBox = true;
        },
        sliceBox:function(par){
            if(par=='file'){
                this.type = "F";
                this.slideBox = {"transition":"all .3s linear","transform":"translate(0%,-3px)"};
                this.slideContentBox = {"transition":"all .3s linear","transform":"translate(0%,0%)"};
            }else if(par=='ticket'){
                this.type = "T";
                this.slideBox = {"transition":"all .3s linear","transform":"translate(100%,-3px)"};
                this.slideContentBox = {"transition":"all .3s linear","transform":"translate(-50%,0%)"};
            }
        }

    }
}
</script>
<style lang="less">

*{
    margin: 0px;
    padding: 0px;
}

.fileListBox{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
}

.fileListBoxContentTitle{
    width: 100%;
    display: flex;
    padding: 5px 20px;
    overflow: hidden;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    border-bottom: 1px solid #f9f9f9;

    >button{
        color: white;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border : none;
        cursor: pointer;
        background: #ffaf17;
        box-shadow: 0px 2px 8px #ff8b36;
    }

}

.contentHead {
    .headBox{
        display: flex;
        justify-content: space-between;
        border-bottom: 3px solid #eceaea;
        div{
            flex: 1;
            height: 20px;
            font-size: 14px;
            margin: 4px 0px;
            text-align: center;
            cursor: pointer;
        }
        > span{
            color: #e3e3e3;
        }
    }
    .slideBar{
        height: 3px;
        background: #409eff;
        width: 50%;
        display: block;
        transform: translateY(-3px);
    }
    
}

.fileTicketListContent{

    height: calc(100vh - 120px);
    width: 600px;
    display: flex;

    > .fileListContent{
        flex: 1;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;

        .fileContentBox{
            box-sizing: border-box;
            position: relative;
            width: 90px;
            height: 90px;
            margin: 10px;
            cursor: pointer;
            overflow: hidden;
            border-radius: 4px;
            box-shadow: 0px 4px 10px#c8d2d7;

            .imgTip{
                top: -5px;
                left: -5px;
                position: absolute;
                background-size: cover;
                border-top-left-radius: 5px;
                height: 33px !important;
                width: 50px !important;
            }

            .fileImg{
                width: 60%;
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

            > .fileListName{
                width: 100%;
                height: 100px;
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

    >.ticketListBoxContent{
        flex : 1;
        width: 100%;
        height: 100%;
        .ticketListUl{
            width: 100%;
            height: 100%;
            overflow-y: auto;

            li{
                display: block;
                widows: 100%;
                height: 55px;
                padding: 5px 10px;
                cursor: pointer;
                overflow: auto;
                font-size: 9pt;
                border-bottom: 1px solid rgb(228, 228, 228);
                > * {
                    float: left;
                }
                img{
                    width: 40px;
                    height: 40px;
                }
                p{
                    margin: 10px 5px 5px;
                    display: block;
                    width: 185px;
                }
            }
            
        }
    }

}

.fileContentBox:hover > .fileListName{
    transition: all .4s linear;
    transform: translateY(-90px);
}

.ticketListUl li:last-child{
    border-bottom: 0px !important;   
}

.ticketListUl li:hover{
    box-shadow: 0px 2px 8px rgb(206, 202, 202);
}


.sucTip{
	width: 110px;
	height: 50px;
	background: rgb(59, 245, 75);
	z-index: 10;
	transform: skewY(-45deg);
}
.sucTip::after{
	content: '上传成功';
	margin-left: 20px;
	font-size: 10pt;
	margin-top: 11px;
	position: absolute;
	transform: skew(28deg);
}

</style>