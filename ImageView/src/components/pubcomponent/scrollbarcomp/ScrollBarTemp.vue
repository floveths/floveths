<template>
    <div class="scroollBar" :style="{'display':sideScroll}">
        <div :class="bar" id="bBarSide" :style="{height:height+'px'}"></div>
    </div>
</template>
<script >
export default{
props : ['sideScroll','height','bar']

}
</script>
<style lang="less">
.scroollBar{
    width: 6px;
    height: 100%;
    right: 0px;
    top: 0;
    padding: 2px 1px;
    border-radius: 2px;
    position: absolute;
    background: rgb(219, 219, 219);
    box-shadow: 0px 2px 5px rgb(117, 117, 117) inset;

    #bBarSide{
        width: 4px;
        display: block;
        min-height: 45px;
        position: relative;
        border-radius: 5px;
        background: #d0d0d0;
        box-shadow: 0px 2px 5px inset #5b5b5b;
    }
}
</style>
