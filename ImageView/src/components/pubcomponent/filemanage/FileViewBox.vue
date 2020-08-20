<template>
    <div>

        <div class="fileListBox">
            <div class="fileListBoxContentTitle" >
                <span ><el-tag type="danger" size="small">附件管理和电子发票...</el-tag></span>
                <button class="delFileBtn" type="button" v-on:click="delFileOrTicket">
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
                    <filelistview @viewPdfDoc="viewPdfDoc" @pickFile="pickFileOrTicket" ></filelistview>
                </div>

                <div class="ticketListBoxContent">
                    <ticketlistview @viewPdfDoc="viewPdfDoc" @pickTicket="pickFileOrTicket" ></ticketlistview>
                </div>

            </div>

        </div>

         <transition name="up">
            <pdfdocview v-show="showPdfBox" :pdfurl="pdfUrl"  @closepdfbox='showPdfBox=false'></pdfdocview>
        </transition>

    </div>
</template>
<script>
import util from '../../../utils/util.js'
import par from '../../../utils/param.js'
import fileListView from './FileListView'
import ticketListView from './TicketListView'
import pdfDocView from '../pdfdocdialog/PdfDocBox'

export default {
    data : function(){
        return {
            'type' : 'F',
            'slideBox' : {},
            'pdfUrl' : null,
            'showPdfBox' : false,
            'filePicked' : [],
            'slideContentBox' : {}
        }
    },
    components : {
        'pdfdocview' : pdfDocView,
        'filelistview' : fileListView,
        'ticketlistview' : ticketListView,
    },
    watch : {

        fileAndTicketListData : function(){
            this.loadData();
        }
    },
    methods : {
        delFileOrTicket : function(){
            if(this.filePicked.length <= 0){
                util.showModelTip('warning','请先选择要删除的文件!');
                return false;
            }
            if(this.type == 'F'){
                let parm = {"businessSerialNo": par.businessSerialNo,"fileId":this.filePicked};
                util.deleteRequest('/imageUploadServices',{body:parm},(res)=>{
                    
                    if(res.body.status == "200"){
                        util.showModelTip('success','删除成功!');
                        util.reloadDataByDelete(this.filePicked,'F');
                    }else{
                        util.showModelTip('success','删除失败!');
                        return false;
                    }
                })
            }else if(this.type == 'T'){
                /* let parm = {"businessSerialNo": par.businessSerialNo,"fileId":this.filePicked};
                util.deleteRequest('/imageUploadServices',{body:parm},(res)=>{
                    
                    if(res.body.status == "200"){
                        util.showModelTip('success','删除成功!');
                        util.reloadDataByDelete(this.filePicked,'F');
                    }else{
                        util.showModelTip('success','删除失败!');
                        return false;
                    }
                }) */
            }
        },
        pickFileOrTicket (id){
            if(this.filePicked.length <= 0){
                this.filePicked.push(id);
            }else{
                let arr = this.filePicked;
                arr.find((i,k)=>{
                    if(i==id){
                        this.filePicked.splice(k,1);
                    }else{
                        this.filePicked.push(id);
                    }
                });
            }
        },
        viewPdfDoc : function(id){
            
            this.pdfUrl = par.baseUrl+'/webShowImage/getDocument/'.concat(id);
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
    background: #f9f9f9;
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
            white-space: nowrap;
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
                height: auto;
                margin: 22px auto;
                display: block;
                box-sizing: border-box;
            }

            > .fileListName{
                width: 100%;
                height: 100px;
                display: block;
                z-index: 105;
                padding: 2px;
                font-size: 10pt;
                text-align: center;
                word-break: break-all;
                word-wrap: break-word;
                background: rgba(216, 216, 216, 0.8);
            }
        }
    }

    >.ticketListBoxContent{
        flex : 1;
        width: 100%;
        height: 100%;
        
    }

}


</style>