<template>
    <div class="scanTreeBox">

        <addtreenodebox v-show="showModelTree" v-on:closemodel="addTreeNode" v-on:cancelmodel="addTreeNode"></addtreenodebox>

        <div class="scanTreeBoxContentTitle">
            <span><el-tag size="small">差率费报销单</el-tag> </span>
            <button type="button " class="addTreeNodeBtn" @click="addTreeNode"><i class="el-icon-plus"></i></button>
        </div>
        <div class="contentHead">
            <div class="headBox">
                <div class="treeList" @click="sliceBox('tree')">
                    <p>单据列表</p>
                </div>
                <span>|</span>
                <div class="fileList" v-show="showfilelistBar" @click="sliceBox('file')">
                    <p>附件列表</p>
                </div>
            </div>
            <i class="slideBar" v-show="showfilelistBar" v-bind:style="slideBox"></i>
        </div>
        <div class="contentBox" v-bind:style="slideContentBox">
            <div class="treeUlBox">
                <ul class="ztree" id="treeDemo" style="margin:15px"></ul>
            </div>
            <div class="fileUlBox">
                <ul class="ztree" id="fileDemo" style="margin:15px"></ul>
            </div>
        </div>

    </div>
</template>
<script>
import $ from 'jquery'
import par from '../../../utils/param.js'
import treenodebox from '../../pubcomponent/addtreenode/TreeNode'

export default {
    props : ['showfilelistBar'],
    data : function(){
        return {
            'slideBox' : {},
            'slideContentBox' : {},
            'showModelTree' : false
        }
    },
    components : {
        'addtreenodebox' : treenodebox
    },
    methods : {
        addTreeNode (){
            
            this.showModelTree != true?this.showModelTree = true:this.showModelTree = false;
            $.fn.zTree.init($("#treeDemo"), par.setting, par.ticketNodes);
        },
        sliceBox:function(par){
            if(par=='tree'){
                this.slideBox = {"transition":"all .3s linear","transform":"translate(0%,-3px)"};
                this.slideContentBox = {"transition":"all .3s linear","transform":"translate(0%,0%)"};
            }else if(par=='file'){
                this.slideBox = {"transition":"all .3s linear","transform":"translate(100%,-3px)"};
                this.slideContentBox = {"transition":"all .3s linear","transform":"translate(-50%,0%)"};
            }
        }
    }
}
</script>
<style lang="less">
.asideLeftContent .content{
    overflow: hidden;
    color : #555552;
    .scanTreeBoxContentTitle{
        display: flex;
        padding: 5px 20px;
        font-size: 16px;
        justify-content: space-between;
        border-bottom: 1px solid #f9f9f9;
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
    .contentBox{
        height: calc(100vh - 118px);
        width: 600px;
        display: inline-flex;
        overflow: auto;
        .treeUlBox{
            flex: 1;
            overflow-y: auto;
        }
        .fileUlBox{
            flex: 1;
            overflow-y: auto;
        }
    }
  }

.addTreeNodeBtn{
    background:#67c23a;
    width: 25px;
    height: 25px;
    color:white;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    box-shadow: 0px 2px 8px #91ff5a;
}

</style>
