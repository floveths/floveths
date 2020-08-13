<template>
    
    <div class="PdfBox">
        
        <div class="pdfContentBox" :class="contentBoxStyle">
            <div class="pdfContentBar">
                <span class="pdfTitle">文件预览...</span>
                <div class="pdfBtn">
                    <el-button-group>
                        <font-awesome-icon icon="expand" @click="resizeModel"/>
                        <i class="el-icon-close" style="font-size: 14pt;font-weight: bold;" @click="closePdfBox"></i>
                    </el-button-group>
                </div>
            </div>
            <div class="pdfContent">
                <iframe :src="pdfurl" style="width: 100%;height: 100%;border: 0px;" class="pdfIframe"></iframe>
            </div>
            
        </div>

    </div>

</template>

<script>
export default {
    props : ['pdfurl'],
    data : function(){
        return {
            contentBoxStyle : 'contentBoxMin'
        }
    },
    methods:{
        resizeModel(){
            this.contentBoxStyle =='contentBoxMin'?this.contentBoxStyle ="contentBoxMax":this.contentBoxStyle="contentBoxMin";
        },
        closePdfBox(){
            this.$emit('closepdfbox');
        }
    }
}
</script>
<style lang="less">

.PdfBox{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(209, 209, 209, 0.342);
    top:0;
    left: 0;
    z-index: 9999;
}

.pdfContentBar{
    height: 35px;
    width: 100%;
    background: white;
    padding: 5px 10px;
    .pdfTitle{
        float: left;
    }
    .pdfBtn{
        float: right;
    }
}

.pdfContentBox{
    display: block;
    background: rgb(255, 255, 255);
    box-shadow: 0px 5px 25px rgb(145, 143, 143);
}

.contentBoxMin{
    width: 75%;
    height: 85%;
    margin: 5% auto;
}

.contentBoxMax{
    width: 100%;
    height: 100%;
}

.pdfContent{
    width: 100%;
    height: 95%;
    display: block;
    box-sizing: border-box;
}

.el-button-group > *{
    margin: 0px 5px;
    cursor: pointer;
}

</style>
