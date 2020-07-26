<template>
    <div>
        <div class="row">
            <div class="col-lg-2 col-md-6 col-xs-6" v-for="(item,i) in fileListData" :key="i">
                <div class="fileContentBox" v-on:dblclick="viewPdfDoc" :value="item.fileId" >
                    <img :src="item.fileIcon" class="fileImg">
                    <input type="checkbox" :value="item.fileId" :id='item.fileId' @click="pickFile"  class="imgListFileCheck" />
                    <label class="imgListFileLabel"  :for="item.fileId"></label>
                    <span class="fileListName" v-on:dblclick="viewPdfDoc" >{{item.fileName}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import par from '../../../utils/param.js'

export default {
    data : function(){
        return {
            'fileListData' : par.fileListData,
        }
    },
    methods : {
        viewPdfDoc(e){
            let id = e.target.parentElement.attributes.value.value;
            this.$emit('viewPdfDoc',id);
        },
        pickFile(e){
            this.$emit('pickFile',e.target.id);
        }
    }
}
</script>