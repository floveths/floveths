<template>
    <div>
        <ul class="ticketListUl">
            <li v-for="(item,i) in ticketListData" :key="i">
                <img :src="item.fileSrc" v-on:dblclick="viewPdfDoc" :value="item.fileId" >
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
        }
    }
}
</script>