<template>
    
    <div class="BigImageList">
        <ul class="imgview-bigimg" :style="{'width':ulWidth+'px','transition':'all 0.45s linear','transform':'translateX(-'+ulOffset+'px)'}">
            <li v-for="(item,i) in bigImageList" :key="i" :style="{'width':width+'px'}" ><img :src="'http://47.92.211.214:8080'+item.url" :id="'liImg'+i" @dblclick="viewBigImage"  @:mouseenter="scaleImg" /> </li>
        </ul>
    </div>

</template>
<script>
import util from '../../../utils/util.js'

export default {
    props : ['bigImageList','width','count','ulOffset'],
    data : function(){
        return {
            ulWidth : 0
        }
    },
    watch : {
        count : function(){
            
            this.ulWidth = this.width * this.count;
        }
    },
    methods : {
        scaleImg(e){
            let id = e.target.id;
            util.scrollImage(id);
        },
        viewBigImage(){
            this.$emit('viewBigImage');
        }
    }
    
}
</script>

<style lang="less">

.imgview-bigimg{
	height: 100%;
    list-style: none;
    padding: 0px;
	display: inline-block;
	position: absolute;
}

.imgview-bigimg li{
    float: left;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.imgview-bigimg li img{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: block;
    max-width: 100%;
    max-height: 100%;
    position: absolute;
}

</style>
