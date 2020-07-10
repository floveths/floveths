<template>

    <div class="treeNodeBox">
        <div class="addTreeBox">				
            <form class="form-inline" style="margin:25px 0px">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon" >节点名称:</div>
                        <input type="text"  v-model="nodedoc" id="nodeName" placeholder="请输入节点名称...">
                    </div>
                </div>
            </form>
            <div class="treeBoxButton" >
                <button type="button" v-on:click="cancelBtn"  class=" btn btn-sm btn-close" >
                <i class="glyphicon glyphicon-remove" ></i> 关闭</button>
                
                <button type="button" v-on:click="sureBtn" class=" btn btn-sm btn-sure" >
                <i class="glyphicon glyphicon-ok-circle" ></i> 确定</button>
            </div>
        </div>
    </div>

</template>
<script>
import util from '../../../utils/util.js'
import par from '../../../utils/param.js'

export default {
    data (){
        return {
            'nodedoc' : ''
        }
    },
    methods : {
        cancelBtn : function(){
            this.$emit('cancelmodel')
        },
        sureBtn : function(){

            if(this.nodedoc==''||this.nodedoc==null){
                util.showModelTip('warning','节点名称不能为空!');
                return false;
            }

            var id = '10'+par.ticketNodes[0].children.length;
            var name = this.nodedoc;
            util.addTreeNode(id,name);
            this.$emit('closemodel');
        }
    }
}
</script>
<style lang="less">

*{
    margin: 0px;
    padding: 0px;
}

.treeNodeBox{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background : #dfdfdf56;
}

.addTreeBox{
	width: auto;
	height: 180px;
	border-radius: 8px;
	margin: 160px 10px;
	padding: 40px 15px;
	border: 1px solid #f0f0f0;
	box-shadow: 5px 5px 15px #c6c6c6;
    background: linear-gradient(112deg,#fff7f3,#effaff);
    position: absolute;
    z-index: 10;
}

.treeBoxButton{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.input-group > .input-group-addon{
    font-size: 12pt;
    color:#515050;
    margin: 0px 5px;
}

.input-group > input{
    width: 130px;
    border: none;
    background: transparent;
    border-bottom: 1px solid #ccc;
}

.btn-close,.btn-sure{
    outline: none;
    width: 100px;    
    border: none;
    color:white;
}

.btn-close{
    box-shadow: 0px 4px 8px #ffb083;
    background: linear-gradient(120deg, #ffc9b4, #ff8447);
}

.btn-sure{
    box-shadow: 0px 4px 8px #9acdfd;
    background: linear-gradient(120deg, #9ae2f9, #73bdff);
}

</style>
