<template>
    <div>
        <ul class="ticketListUl">
            <li v-for="(item,i) in ticketListData" :key="i">
                <input type="checkbox" :value="item.fileId" @change="pickTicket" :id="item.fileId+i" class="imgListTicketCheck" >
                <label :for="item.fileId+i" class="imgListTicketLabel" ></label>
                <img :src="item.fileSrc" @dblclick="viewPdfDoc" :value="item.fileId" >
                <p>{{item.fileName}}</p>
                
            </li>
        </ul>
    </div>
</template>
<script>
import par from '../../../utils/param.js'

export default {
    data : function(){
        return {
            'ticketListData' : par.ticketListData
        }
    },
    methods : {
        viewPdfDoc(e){
            let id = e.target.attributes.value.value;
            this.$emit('viewPdfDoc',id);
        },
        pickTicket(e){
            let id = e.target.value;
            this.$emit('pickTicket',id);
        }
    }
}
</script>
<style lang="less">
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
        position: relative;
        background: rgb(255, 255, 255);
        border-bottom: 1px solid rgb(228, 228, 228);
        > * {
            float: left;
        }
        img{
            width: auto;
            height: 40px;
            margin-left: 25px;
        }
        p{
            margin: 10px 5px 5px;
            display: block;
            width: 185px;
        }
    }
    
}

.imgListTicketCheck + .imgListTicketLabel {
    left: 0;
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

.imgListTicketCheck{
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: none;
    position: absolute;
}

.imgListTicketCheck:checked + .imgListTicketLabel::after {
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
</style>
