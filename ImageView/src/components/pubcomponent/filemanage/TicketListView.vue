<template>
    <div>
        <ul class="ticketListUl">
            <li v-for="(item,i) in ticketListData" v-on:dblclick="viewPdfDoc" :value="item.fileId" :key="i">
                <img :src="item.fileSrc" >
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
            let id = e.target.parentElement.attributes.value.value;
            this.$emit('viewPdfDoc',id);
        }
    }
}
</script>