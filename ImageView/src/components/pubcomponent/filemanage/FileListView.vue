<template>
    <div class="fileListContent">
        <div class="row">
            <div class="col-md-6 col-xs-6" v-for="(item,i) in fileListData" :key="i">
                <div class="fileContentBox" >
                    <img :src="item.fileIcon" class="fileImg">
                    <input type="checkbox" :value="item.fileId" :id='item.fileId+i' @change="pickFile"  class="imgListFileCheck" />
                    <label class="imgListFileLabel"  :for="item.fileId+i"></label>
                    <span class="fileListName" v-on:dblclick="viewPdfDoc" :value="item.fileId">{{item.fileName}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import util from '../../../utils/util.js'
import par from '../../../utils/param.js'

export default {
    props : ['fileList'],
    data : function(){
        return {
            'fileListData' : par.fileListData
        }
    },
    watch : {
        fileList : function(){
            if(this.fileList!=null){
                
                let arr = this.fileList.filter((i)=>{
                    return i.fileIcon = util.getFileTypeByName(i.fileName);
                });
                window.console.log(11)
                this.fileListData = arr;
            }
        }
    },
    methods : {
        viewPdfDoc(e){
            let id = e.target.attributes.value.value;
            this.$emit('viewPdfDoc',id);
        },
        pickFile(e){
            
            this.$emit('pickFile',e.target.value);
        }
    }
}
</script>

<style lang="less">
.fileListContent{
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

.imgListFileCheck + .imgListFileLabel {
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

.imgListFileCheck{
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: none;
    position: absolute;
}

.imgListFileCheck:checked + .imgListFileLabel::after {
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
