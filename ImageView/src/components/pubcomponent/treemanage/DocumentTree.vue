<template>
    <div>
        <el-tree :data="treeData" @node-click="getCurrentNode" default-expand-all node-key="id"
        ref="tree" highlight-current show-checkbox :expand-on-click-node="false" ></el-tree>
    </div>
</template>
<script>
export default {
    props : ['treeData','show-checkbox'],
    beforeMount (){
        this.revertJson(this.treeData);
    },
    methods :{
        revertJson(arr){
    
            if(arr.length>0){
                for(let i=0;i<arr.length;i++){
                    arr[i].label = arr[i].departName;
                    if(arr[i].children!=undefined&&arr[i].children.length>0){
                        this.revertJson(arr[i].children);
                    }
                }
            }
    
        },
        getCurrentNode : function(data){
          
            this.$emit('getNodeInfo',{orgCode:data.code,orgName:data.departName})
        }
    }
};
</script>
<style lang="less" scoped>
</style>
