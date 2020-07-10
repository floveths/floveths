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
                     <div class="fileContentBox" @click="viewPdfDoc">
                        <img src="../../../../public/static/suc.png" class="imgTip " >
                        <img src="../../../../public/static/pdf.png" class="fileImg">
                        <input type="checkbox"  class="imgListCheck" />
                        <label class="imgListLabel"  ></label>
                        <span class="fileListName" @click="viewPdfDoc"  ></span>
                    </div>
                    <div class="fileContentBox">
                        <img src="../../../../public/static/suc.png" class="imgTip " >
                        <img src="../../../../public/static/word.png" class="fileImg">
                        <input type="checkbox"  class="imgListCheck" />
                        <label class="imgListLabel" ></label>
                        <span class="fileListName" ></span>
                    </div>
                        
                    <!-- <div class="fileContentBox">
                        <img src="../../../../public/static/suc.png" class="imgTip " >
                        <img :src="data.bFileIcon" class="fileImg">
                        <input type="checkbox" :id="data.id" :value="data.id" v-model="filePicked" class="imgListCheck" />
                        <label class="imgListLabel" :for="data.id" ></label>
                        <span class="fileListName" @click="viewPdfDoc" v-bind:value="data.purl">{{data.fileName}}</span>
                    </div> -->

                </div>
                <div class="ticketListBoxContent">
                    <ul class="ticketListUl">
                        <li @click="viewPdfDoc">
                            <img src="../../../../public/static/xls.png" >
                            <p>Excle</p>
                            <span>15.5KB</span>
                        </li>
                        <li>
                            <img src="../../../../public/static/xls.png" >
                            <p>Excle</p>
                            <span>15.5KB</span>
                        </li>

                    </ul>
                </div>

            </div>

        </div>

    </div>
</template>
<script>
import util from '../../../utils/util.js'
import par from '../../../utils/param.js'

export default {
    data : function(){
        return {
            'type' : 'F',
            'slideBox' : {},
            'filePicked' : [],
            'slideContentBox' : {},
            'fileListData' : par.fileData
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
            let val = 'http://47.92.211.214:8080/webShowImage/getDocument/4d49775e-5720-fe1e-2580-071c71c90e32';
            window.console.log(e.target.value);
            this.$emit('fileview',val);

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
        display: grid;
        padding: 0px 10px;
        grid-template-columns: 1fr 1fr;

        .fileContentBox{
            box-sizing: border-box;
            position: relative;
            width: 90px;
            height: 90px;
            margin: 10px 8px;
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

            li{
                display: block;
                widows: 100%;
                height: 55px;
                padding: 5px 10px;
                cursor: pointer;
                border-bottom: 1px solid rgb(228, 228, 228);
                > * {
                    float: left;
                }
                img{
                    width: 40px;
                    height: 40px;
                }
                p,span{
                    margin: 10px 5px 5px;
                }
            }
            
        }
    }

}

.fileContentBox:hover > .fileListName{
    transition: all .4s linear;
    transform: translateY(-118px);
}

.ticketListUl li:last-child{
    border-bottom: 0px !important;   
}

.ticketListUl li:hover{
    box-shadow: 0px 2px 8px rgb(206, 202, 202);
}

</style>