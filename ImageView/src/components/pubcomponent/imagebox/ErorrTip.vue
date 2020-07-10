<template>
    <div class="TipBox">

        <div class="errorTip" v-show="isshow" v-bind:style="tipStyle">
            <p></p>
        </div>

    </div>
</template>

<script>
export default {
    props : ['isshow','x','y'],
    data : function(){
        return {
            tipStyle : {}
        }
    },
    watch : {
        isshow : function(){
            if(this.isshow){
                
                this.tipStyle = { 'margin-top' : this.y+'px','margin-left' : this.x+'px' };
            }
        }
    }
    
}
</script>
<style lang="less">

.errorTip{
    width: 175px;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    margin: auto;
    z-index: 99999;
    background: rgb(255, 255, 255);
    padding: 5px;
    word-break: break-all;
    word-wrap: break-word;
    border-radius: 5px;
    box-shadow: 0px 2px 15px #d3d3d3;
}

</style>

