import Vue from 'vue'
import Vuex from 'vuex'
import par from '../utils/param'

Vue.use(Vuex)
const store = new Vuex.Store({
    state : {
        'langOptions' : [{
            value : 'zh',
            label : 'Simplified chinese'
        },{
            value : 'en',
            label : 'English'
        }],
        'fileListData' : [],
        'defaultLang' : 'zh',
        'imgTotalCount' : 0,//图片总数量
        'curImgIndex' : 0,//查看图片时索引
        'initCount' : 0,//导入图片得索引
        'initFileId' : '',//导入图片得id
        'initImportCount' : 0,//每次导入的图片数量,
        'initImportComplete' : false,//导入完成
        'showAppFolder' : true,
        'appFolderId' : null,
        'showImageUpload' : false,
        'showFileUpload' : false,
        'showFileProgressBar' : false,
        'uploadImgCount' : 0,//上传数量
        'uploadProgress' : 0,//上传进度
        'curUploadCount' : 1,//当前上传第几张
    },
    mutations : {
        
        setCookie (state,val){
            window.sessionStorage.setItem("image-loginToken",val);
        },
        changeLanguage : function(state,lang){
            state.defaultLang = lang;
        },
        changeImgCount : function(state,s,count){
            switch(s){
                case '+':
                    state.imgTotalCount++;
                break;
                case '-':
                    state.imgTotalCount--;
                break;
                case '++':
                    state.imgTotalCount+= count;
                break;
                case '--':
                    state.imgTotalCount-= count;
                break;    
            }
        },
        changeImgIndex : function(state,id){
            state.curImgIndex = parseInt(id);
        },
        showImageUpload : function(state){
            state.showImageUpload == true? state.showImageUpload = false:state.showImageUpload = true;
            if(state.showImageUpload==false){
                state.curUploadCount = 1;
                state.uploadImgCount = state.uploadProgress = 0;
            }
        },
        showImgByFileId : function(state,id){
            
            par.imgData.find((i)=>{
                
                i.children.find((s)=>{
                    if(s.fielId == id){
                        return s.show = true;
                    }
                });
            });
            state.initCount++;
            par.ticketNodes[0].children = par.imgData;
            if(state.initImportCount == state.initCount){
                state.initImportComplete = true;
            }
        },
        showFileUpload : function(state){
            state.showFileUpload == true? state.showFileUpload = false:state.showFileUpload = true;
        },
        updateFileListData(state,arr){
            for(let o=0;o<state.fileListData.length;o++){
                for(let k=0;k<arr.length;k++){
                    if(state.fileListData[o].fileId == arr[k]){
                        state.fileListData.splice(o,1);
                    }
                }
            }
        },
        changeUploadImgCount:function(state,s,count){

            switch(s){
                case '+':
                    state.uploadImgCount++;
                break;
                case '-':
                    state.uploadImgCount--;
                break;
                case '++':
                    state.uploadImgCount+= count;
                break;
                case '--':
                    state.uploadImgCount-= count;
                break;
            }
            
        },
        changeUploadProgress (state,gress){
            state.uploadProgress = gress;
        },
        changeCurUploadCount(state){
            state.curUploadCount++; 
        }

    }
    
})

export default store;