import vueObj from 'vue'
import $ from 'jquery'
import Resouce from 'vue-resource'
import { Message } from 'element-ui';
import {MessageBox} from 'element-ui'
import {Notification} from 'element-ui'

import par from '../utils/param' 
import store from '../stores/store'

vueObj.use(Resouce);

const Util = {

    initWS : function(){
        
        let ws = par.ws;
        ws.onopen = function(){
            ws.send("发送数据");
        }
        ws.onmessage = function (e) 
        { 
            var obj = JSON.parse(e.data);
            window.console.log(obj);
            if (obj.InterFace == "GetDevice") {
                Util.buildDeviceDDL(obj);
            } else if (obj.InterFace == "GetFullImage") {
                Util.showBigImgFromActive(obj,null,null);
            } else if (obj.InterFace == "Upload") {
                Util.uploadComplete(obj);
            } else if (obj.InterFace == "GetNICVersion"){
                
                /*Vue.http.post('/ControlUpload/authorizationValidation',{"NICVersion":obj.version},{emulateJSON: true}).then((res)=>{
                    if(res.body.status==200||res.body.status=="200"){
                        if(res.body.message=="false"||res.body.message==false){
                            that.isValide = false;
                            swal("提示!","当前设备已超过授权数!",'warning');
                            return false;
                        }
                    }
                });*/
                Util.postRequest('/ControlUpload/authorizationValidation',{"NICVersion":obj.version},(res)=>{
                    if(res.body.message=="false"||res.body.message==false){
                        
                        Util.showModelTip('warning','当前设备超过授权数!');
                        return false;
                    }
                })
            }else if (obj.InterFace == "Scan") {
                switch (obj.RstReturn.toString()) {
                    case "1":
                        Util.showModelTip('warning',"启动扫描失败");
                        break;
                    case "2":
                        Util.showModelTip('warning',"扫描仪被占用或未启动");
                        break;
                    case "3":
                        Util.showModelTip('warning',"无效的设备名称");
                        break;
                    case "4":
                        Util.showModelTip('warning',"扫描仪正在运行中");
                        break;
                    case "5":
                        Util.showModelTip('warning',"批扫获取BatchID失败");
                        break;
                    case "6":
                        Util.showModelTip('warning',"取消扫描");
                        break;
                    case "7":
                        Util.showModelTip('warning',"扫描卡纸");
                        break;
                    case "8":
                        Util.showModelTip('warning',"重张扫描");
                        break;
                    case "9":
                        Util.showModelTip('warning',"未知错误");
                        break;
                    case "10":
                        break;
                }

            } else if (obj.InterFace == "Transmission_LocalToWeb") {
                
                Util.buildGrid(obj);
            } else if (obj.InterFace == "Transmission_WebToLocal") {
                /* if (obj.RstCode == "0000") {
                    if(vue.isRotateImg){
                        vue.progress = 100;
                        vue.gressValue = '100%';
                        obj = null;
                    }
                } */
                store.commit('showImgByFileId',obj.FileId);
            } 
        };
        
        ws.onclose = function()
        { 
            let func = function(){
                window.location.href = '';
            }
            MessageBox.confirm('检测到系统未打开控件，是否下载?','提示',{
                confirmButtonText : '确定',
                cancelButtonText : '取消',
                type :'warning'
            }).then(()=>{
                func();
            });
        };

    },
    buildDeviceDDL : function(obj) {
        if (obj.DeviceNames == undefined) {
            Util.showModelTip('warning',"未找到任何设备!");
        } else {
            for (var i = 0; i < obj.DeviceNames.length; i++) {
                par.deviceOptions.push({'label':obj.DeviceNames[i],'value':obj.DeviceNames[i]});
            }
        }
    },
    /*扫描仪画图 */
    buildGrid : function(obj){
        window.console.log(obj)

        var fileName = '';
        if(par.scanType==2){
            /* par.nodeId = obj.BusinessSerialNo;
            par.nodeName = par.nodeId+"_"+(vue.numIndex+1)+".jpg"; */
            /* fileName = par.nodeId+"_"+(vue.numIndex+1)+".jpg"; */
        }else{
            //par.nodeName = obj.FileName;	
            fileName = obj.fileName;
        }
        
        par.curImgIndex++;
        par.uploadCount++;
        let index = Util.addTypeNum(par.nodeId);
        let imgId = par.nodeId+''+par.imgData[index].typeNum;
        let fielId = obj.FileId;
        let imgUrl = "data:image/jpeg;base64," + obj.Base64;
        let child = {'id': imgId,'name':fileName,'imageSrc':imgUrl,'fielId':fielId,'imgName':fileName,'isUplaod':false,'curImgIndex':par.curImgIndex};
        
        par.uploadImageArr.push(child);//存放要上传的图片
        par.imgData[index].children.push(child);

        par.imgTotalArr.push({'imageSrc':imgUrl,'imgFielId':fielId});//存储图片
        par.nodes[0].children[index] = par.imgData[index];
        $.fn.zTree.init($("#treeDemo"), par.setting, par.ticketNodes);
        vueObj.$store.commit('changeImgCount');

    },
    /*上传完成*/
    uploadComplete : function(obj){
        
        if(obj.FileId!=undefined&&obj.FileId!="undefined"){

            switch (obj.Status){
                case 13:
                    Util.setInfo(obj.FileId,'imgErrorTip');
                    break;
                case 14:
                    Util.setInfo(obj.FileId,"imgSucTip");
                    break;
                case 15:
                    Util.setInfo(obj.FileId,"imgFpczTip");
                    break;
                case 16:
                    Util.setInfo(obj.FileId,"imgFailInfoTip");
                    break;
                case 17:
                    Util.setInfo(obj.FileId,"imgCheckTip");
                    break;
                case 19:
                    Util.setInfo(obj.FileId,"imgFplxTip");
                    break;
                case 20:
                    Util.setInfo(obj.FileId,"imgCheckFailTip");
                    break;
                case 50:

                    par.imgData[0].children.find((i)=>{
                        i.children.find((k)=>{
                            if(k.fielId == obj.FileId){
                                k.cutImgCls = 'cutImg'
                            }
                        })
                    })

                    Util.setInfo(obj.FileId,"imgSucTip");
                break;
            }
            
            var num = Math.ceil(100/store.state.uploadImgCount);
            if(par.uploadImgCount == store.state.curUploadCount){
                //par.uploadImgCount = 0;
                store.commit('changeUploadProgress',100);
            }else{
                var gress = (num * store.state.curUploadCount);
                store.commit('changeCurUploadCount');
                store.commit('changeUploadProgress',gress);
            }
            
        }
    },
    setInfo : function(fileId,flag){
        
        if(par.scanType==1){

            let bool = false;
            for(let s=0;s<par.imgData.length;s++){
                for(let w=0;w<par.imgData[s].children.length;w++){
                    
                    if(par.imgData[s].children[w].fielId == fileId){
                        par.imgData[s].children[w].imgTip = flag;
                        bool = true;
                        break;
                    }
                }
                if(bool == true){
                    break;
                }
            }

            /* par.tickArr.find(function(item,index){
                if(fileId==item.fileId){
                     par.tickArr[index].isUpload = flag;
                     vue.tickArr[index].imgTip = type;
                     if(code==14){
                         var str = {"fileId":vue.tickArr[index].fileId,"fileName":vue.tickArr[index].name,"parentNodeId":vue.tickArr[index].nodeId,"nodeId":vue.tickArr[index].id,"sort":vue.tickArr[index].index,"docName":vue.tickArr[index].docName};
                         par.postImgArr.push(str);	
                     }
                 }
            });	 */
        }/* else if(vue.scanType==2){
            /* var bussArr = vue.bussArr;
            for(let s=0;s<bussArr.length;s++){
                var bussArrChild = bussArr[s].children
                for(let k=0;k<bussArrChild.length;k++){
                    if(bussArrChild[k].fileId==fileId){
                        bussArrChild[k].isUpload = flag;
                        bussArrChild[k].imgTip = type;
                    }
                }
            } 
        } */
        
        
    },
    getFielId : function() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (
            S4() +S4() +"-" +S4() +
            "-" +S4() + "-" + S4() +
            "-" + S4() + S4() + S4()
        );
    },
    getCode : function(){
        var code = "";
        var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); 

        for (var i = 0; i < 6; i++)
        {
            //获取随机验证码下标
            var charNum = Math.floor(Math.random() * 62);
            //组合成指定字符验证码
            code += codeChars[charNum];
        }
        return code;
    },
    valideInput : function(str,title){
        if(str == null){
            Util.showTips('warning',title+'不能为空!','top-left');
            return false;
        }else if('string' == typeof str){
            if(str.trim()==null||str.trim()==''){
                Util.showTips('warning',title+'不能为空!','top-left');
            }
            return false; 
        }else if('object' == typeof str){
            if(str instanceof Array){
                if(str.length<=0){
                    Util.showTips('warning',title+'不能为空!','top-left');
                }
            }
            
            return false;
        }
    },
    showTips : function(type,content,pos){
        Notification({
            title: '提示!',
            message: content,
            position: pos,
            type : type
          });
    },
    showModelTip : function(type,msg){
        Message({
            showClose: true,
            message: msg,
            type: type
        })
    },
    showConfirm : function(obj,content,title,func){
        obj.$confirm(content,title,{
            confirmButtonText : '确定',
            cancelButtonText : '取消',
            type :'warning'
        }).then(()=>{
            func();
        }).catch(()=>{

        })
    },
    getRequestByAjax(url,parm,type,callBack){
        $.ajax({
            url : url,
            data : parm,
            dataType : type,
            type : 'get',
            success : function(res){
                callBack(res);
            },
            error : function(res){
                callBack(res);
            }
        })
    },
    getWeatherInfo(url ,callBack){
        vueObj.http.get(url).then((res)=>{
            callBack(res);
        })
    },
    getRequest : function(url,callBack)
    {
        vueObj.http.get(`http://${par.baseUrl}${url}`).then((res)=>{
            callBack(res);
        },(res)=>{
            callBack(res);
        });

    },
    postRequest : function(url,parm,callBack){
        vueObj.http.post(`http://${par.baseUrl}${url}`,parm,{emulateJSON: true}).then((res)=>{
            callBack(res);
        },(res)=>{
            callBack(res);
        });

    },
    deleteRequest : function(url,parm,callBack){
        vueObj.http.delete(`http://${par.baseUrl}${url}`,parm).then((res)=>{
            callBack(res);
        },(res)=>{
            callBack(res);
        });

    },
    isNullStr(str){
        return str==null||str=='null'?'':str;
    },
    drawPicture(vueO,obj,fileSize){
        par.uploadImgCount++;
        let src = window.URL.createObjectURL(obj);
        let dataURL = null;
        let img = new Image();
        img.src = src;

        img.onload = function(){
            let canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0, img.width, img.height);
            dataURL = canvas.toDataURL("image/jpeg",0.5);

            let fielId = Util.getFielId();
            let fileName = Util.getFileName();

            let index = Util.addTypeNum(par.nodeId);
            var base64 = dataURL.replace("data:image/jpeg;base64,", "");
            var objmsg = {
                InterFace: "Transmission_WebToLocal",
                FileId: fielId,
                FileName: fileName,
                Base64: base64
            };
            par.ws.send(JSON.stringify(objmsg));

            par.curImgIndex++;
            let imgId = par.nodeId+''+par.imgData[index].typeNum;
            let child = {'id': imgId,'name':fileName,'imageSrc':dataURL,'fielId':fielId,'imgName':fileName,'isUpload':false,'curImgIndex':par.curImgIndex,'imgTip':'','cutImgCls':'','show':false,'fileSize':fileSize};
            
            par.uploadImageArr.push(child);//存放要上传的图片 上传使用
            par.imgData[index].children.push(child); //树

            par.imgViewArr.push({'pId':'p-'+index,"cId":'c-'+(par.imgData[index].children.length-1)});
            //par.imgViewArr.push({'imageSrc':dataURL,'imgFielId':fielId,'isUpload':false});//存储图片 查看大图时使用
            par.ticketNodes[0].children[index] = par.imgData[index];
            vueO.$store.commit('changeImgCount','+');

            Util.reloadTree();
        }
        
    },
    /*更新树节点*/
    initTreeNode : function(){

        let bool = false;
        let arr = par.ticketNodes[0].children;
        /*禁止使用 find 函数 */
        for(let i=0;i<arr.length;i++){
            if(arr[i].name =='其它'){
                bool = true;
                break;
            }
        }
        if(!bool){
            var nodeId = 10+''+par.ticketNodes[0].children.length;
            par.nodeId = nodeId;
            par.nodeName = '其它';
            var obj = {id:nodeId,name:'其它','typeNum':0,'typeName':'其它',"open":true,children:[]};
            par.imgData.push(obj);
            par.ticketNodes[0].children.push(obj);
        }
        
        $.fn.zTree.init($("#fileDemo"), par.setting, par.fileNodes);
        $.fn.zTree.init($("#treeDemo"), par.setting, par.ticketNodes);
        
    },
    sortTreeAndImg: function(pId,fileId,index,flag){
       
        for(let i=0;i<par.imgData.length;i++){
            if(pId == par.imgData[i].id){
                let arr= par.imgData[i].children;
                if(flag){
                    for(let k=index;k<arr.length;k++){
                        par.imgData[i].children[k].id = pId+''+k;
                    }
                }else if(!flag){
                    let str = null;
                    let s = null;
                    window.console.log(122)
                    /*不要用par.imgData[i].children.find 这个函数 */
                    let childArr = par.imgData[i].children;
                    for(let w=0;w<childArr.length;w++){
                        if(childArr[w].fielId == fileId){
                            s = w;
                            str = childArr[w];
                            break;
                        }
                    }

                    if(s!=null){
                        par.imgData[i].children.splice(s,1);
                    }
                    if(str!=null){

                        str.id = pId+''+(index+1);
                        if(par.imgData[i].id == pId){
                            par.imgData[i].typeNum+=1;
                        }
                        window.console.log(133)
                        par.imgData[i].children.splice(index,0,str);
                        let newArr = par.imgData[i].children;
                        
                        index = (index+1);
                        window.console.log(155)
                        for(let f=index;f<newArr.length;f++){
                            par.imgData[i].children[f].id = pId+''+(index+1);
                        }
                    }
                    
                }
                
                break;
            }
        }

        /* /*刷新图片下标
        let count =0;
        for(let v=0;v<par.imgData.length;v++){
            count+= par.imgData[v].children.length;
        }
        window.console.log(count);
        let e = 1;
        for(let b=0;b<par.imgData.length;b++){
            for(let l=0;l<par.imgData[b].children.length;l++){
                par.imgData[b].children[l].curImgIndex = e;
                if(e < count){
                    e+=1;
                }
            }
        } */

        par.ticketNodes[0].children = par.imgData;
        $.fn.zTree.init($("#treeDemo"), par.setting, par.ticketNodes);

    },
    reloadTree : function(){
        $.fn.zTree.init($("#fileDemo"), par.setting, par.fileNodes);
        $.fn.zTree.init($("#treeDemo"), par.setting, par.ticketNodes);
    },
    /*添加树节点*/
    addTreeNode : function(id,name){
       
        var nodeArr = par.ticketNodes[0].children;
        nodeArr.find((i)=>{

            if(i.name == name){
                Util.showTips('warning','节点名已存在!','top-left');
                return false;
            }

        });

        var str = {id:id,name:name,'typeNum':0,'typeName':name,"open":true,children:[]};
        par.imgData.push(str);
        par.nodeId = id;
        par.nodeName = name;
        par.ticketNodes[0].children = par.imgData;
    },
    addTypeNum : function(id){
        let index = 0;
        par.imgData.find((i,r)=>{
            if(i.id == id){
                index = r;
                i.typeNum++;
                i.typeName = par.nodeName;
            }
        })
        return index;
    },
    uploadDataFromServer(arr,arr1){
        
        if(arr.length > 0 &&arr1.length > 0){
            for(let s=0;s<arr.length;s++){
                if(arr[s].name!='附件'){
                    if(arr[s].name=='其它'){
                        par.nodeId = arr[s].id;
                    }
                
                    let str = {'typeNum':arr[s].children.length,'typeName':arr[s].name,'children':[],'open':true,'id':arr[s].id,name:arr[s].name};
                    par.imgData.push(str);
                }
                
            }
            
            let imgData = par.imgData;
            for(let k=0;k<imgData.length;k++){
                for(let o=0;o<arr1.length;o++){
                    
                    if(imgData[k].id == arr1[o].parentNodeId){
                        
                        par.curImgIndex++;
                        store.commit('changeImgCount','+');
                        par.imgViewArr.push({'imageSrc':arr1[o].url,'imgFielId':arr1[o].fileId,'isUpload':true});//存储图片 查看大图时使用
                        par.imgData[k].children.push({'imageSrc':arr1[o].url,'fielId':arr1[o].fileId,'imgName':arr1[o].fileName,name:arr1[o].fileName,'show':'true','curImgIndex':par.curImgIndex,'isUpload':true,'imgTip':'imgSucTip'});
                    }
                }
            } 
            Util.filterData(arr1);
        }
        par.ticketNodes[0].children = par.imgData;
        Util.reloadTree(); 
    },
    filterData(arr){
        if(arr.length > 0){
            arr.find((k)=>{
                let fileIcon = Util.getFileTypeByName(k.fileName);
                if(k.type=='555'||k.type=='666'||k.type=='777'||k.type=='888'||k.type=='999'){
                    par.fileListData.push({'fileId':k.fileId,'fileName':k.fileName,'fileIcon':fileIcon,'id':k.fileId,'name':k.fileName});
                }else if(k.type=='102'){
                    par.ticketListData.push({'fileId':k.fileId,'fileName':k.fileName,'fileSrc':'http://47.92.211.214:8080'+k.surl});
                }
            });
            par.fileNodes[0].children = par.fileListData;
        }
    },
    fileReName : function(id,name){

        let bool = false;
        let nodeArr = par.imgData;
        for(let q=0;q<nodeArr.length;q++){
            for(let y=0;y<nodeArr[q].children.length;y++){
                if(nodeArr[q].children[y].fielId == id){
                    par.imgData[q].children[y].name = name;
                    par.imgData[q].children[y].imgName = name;
                    bool = true;
                    $.fn.zTree.init($("#treeDemo"), par.setting, par.ticketNodes);
                    break;
                }
            }
            if(bool == true){
                break;
            }
        }

    },
    /*移动大图 */
    moveImage : function(parent,target){

        let box = document.getElementById(parent)
        let img = document.getElementById(target);

        img.onmousedown=function(ev) {
            var oEvent = ev;
            
            oEvent.preventDefault();
            img.style.cursor = 'move';
            var disX = oEvent.clientX - img.offsetLeft;
            var disY = oEvent.clientY - img.offsetTop;
            box.onmousemove=function (ev) {
                oEvent = ev;
                oEvent.preventDefault();
                var x = oEvent.clientX -disX;
                var y = oEvent.clientY -disY;
                img.style.marginTop = y+'px';
                img.style.marginLeft = x+'px';
            }
            
            box.onmouseleave = function () {
                box.onmousemove=null;
                box.onmouseup=null;
                img.style.cursor = 'default';
            }
            
            box.onmouseup=function() {
                box.onmousemove=null;
                box.onmouseup=null;
                img.style.cursor = 'default';
            }
        }

    }, 
    /*操作大图 */
    bigImage (num){
        var rotatez = 0;
        var scale = 0;
        var style = null;
        switch (num){
            case 0:
                par.scaleBig = par.scaleSmall = 1;//默认值
                par.rotatez = 0;
                style = {"transition":"all 0s","transform":"rotateZ("+par.rotatez+"deg)  scale(1)"};
                break;
            case 1:
                if(par.scaleBig <= 1){
                    par.scaleBig = (par.scaleSmall + 0.2);
                }else{
                    par.scaleBig += 0.2;
                }
                par.imgScale = par.scaleBig;
                par.scaleSmall = par.scaleBig;
                rotatez = par.rotatez;
                style = {"transition":"all 0s","transform": "rotateZ("+rotatez+"deg) scale("+Math.abs(par.scaleBig)+")"};
                break;
            case 2:
                if(par.scaleSmall<=0.3){
                    return false;
                }
                if(par.scaleSmall >= 1){
                    par.scaleSmall = (par.scaleBig - 0.2);
                }else{
                    par.scaleSmall -= 0.2;	
                }
                par.imgScale = par.scaleSmall;
                par.scaleBig = par.scaleSmall;
                rotatez = par.rotatez;
                style = {"transition":"all 0s","transform": "rotateZ("+rotatez+"deg) scale("+Math.abs(par.scaleSmall)+")"};
                break;
            case 3:
                rotatez = par.rotatez -= 90;
                scale = par.imgScale;
                style = {"transition":"all 0s","transform":"rotateZ("+rotatez+"deg) scale("+Math.abs(scale)+")"};
                break;
            case 4:
                rotatez = par.rotatez += 90;
                scale = par.imgScale;
                style = {"transition":"all 0s","transform":"rotateZ("+rotatez+"deg) scale("+Math.abs(scale)+")"};
                break;
            case 'r':
                style = {"transition":"all .2s","transform":"rotateZ("+par.rotatez+"deg) scale("+Math.abs(par.imgScale)+")"};
                break;
        }
        return style;

    },
    scrollImage(target){
        var flag = false;
        var img = document.getElementById(target);
        img.onmouseenter = function(){
            flag = true;
            if(flag){
                window.onwheel = function(e){
                
                    var del = e.deltaY;
                    if(del > 0){
                        img.style.transform = Util.bigImage(1).transform;
                    }else{
                        img.style.transform = Util.bigImage(2).transform;
                    }
                }
            }
        }
        img.onmouseleave = function(){
            flag = false;
            window.onwheel = null;
        }
    },
    getFileName(){
        var d = new Date();
        let m = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'-'+m+'.png';
    },
    uploadFiles(obj){
        /* var len = obj.files.length;
        if(len > 3 ){
            Util.showModelTip('warning','一次性同时只能上传三张附件');
            return false;
        }
        
        let d = [];
        let fileArr = [];
        let fileCount = []
        for(let s=0;s<len;s++){
            window.console.log(obj.files[s])
            var name = obj.files[s].name;
            
            name = name.substring(name.lastIndexOf('.'),name.length);
            if(name!='.pdf'&&name!='.doc'&&name!='.docx'&&name!='.txt'&&name!='.xls'&&name!='.xlsx'&&name!='.ppt'&&name!='.pptx'){
                
                Util.showModelTip('warning','只支持 PDF WORD EXCEL PPT TXT 类型附件');
                break;
            }else{

                let fileName = obj.files[s].name;
                let fileSize = obj.files[s].size;

                fileSize = parseInt(Math.ceil(fileSize/1024)).toFixed(2);
                fileArr.push((fileSize/2));
                fileCount.push((fileSize/4));
                window.console.log(fileSize)
                if(fileSize > 1024){
                    fileSize = (fileSize /1024)+'MB';
                }else{
                    fileSize = (fileSize) + 'KB';
                }
                var fileIcon = '';
                if(name=='.pdf'){
                    fileIcon = '/static/pdfs.png';
                }else if(name == '.doc'||name=='.docx'){
                    fileIcon = '/static/words.png';
                }else if(name == '.xls'||name=='.xlsx'){
                    fileIcon = '/static/xlss.png';
                }else if(name == '.ppt'||name=='.pptx'){
                    fileIcon = '/static/pptxs.png';
                }else if(name == '.txt'){
                    fileIcon = '/static/txts.png';
                }
                var str = {'id':s,'name':fileName,'sFileIcon':fileIcon,'bFileIcon':'','fileName':fileName,'fileSize':fileSize,'progressBar':'0','fileState':'','fileUrl':''};
                par.fileData.push(str);

                /*var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
                var filesId = Util.getFielId();
                formData.append("fileByte",obj.files[i]);
                formData.append("batchId",par.batchId[0]);
                formData.append("fileId",filesId);
                formData.append("businessSerialNo",par.businessSerialNo); 

                try{

                    Util.postRequest('/imageUploadServices/uploadDocument',formData,(res)=>{
                        window.console.log(res);
                    });

                }catch(e){
                    window.console.log(e);
                    par.uploadFileIsComplite = true;
                    Util.showModelTip('warning','上传失败!');
                }*/
                
                
                /* var imgSrc = "";
                var imgTip = "./img/suc.png";
                postData('/imageUploadServices/uploadDocument',formData,(res)=>{
                    
                    if(res.status==200||res.status=="200"){
                        var imgSrc = "";
                        var imgTip = "../../img/util/suc.png";
                        if(name=='.doc'||name=='.docx'){
                            imgSrc = '../../img/util/doc.jpg';
                        }else if(name=='.xlsx'||name=='.xls'){
                            imgSrc = '../../img/util/xls.jpg';
                        }else if(name=='.pptx'){
                            imgSrc = '../../img/util/ppt.jpg';
                        }else if(name=='.pdf'){
                            imgSrc = '../../img/util/pdf.jpg';
                        }
                        var str = {showImgTip:true,imgTip:imgTip,imgSrc:imgSrc,id:filesId,imgFileId:filesId,fileName:fileName};
                        vue.fileList.push(str);
                    }else{
                        swal("提示!",'附件上传失败!','warning');
                        return false;
                    }
                }); 
            }
        }

        for(let i=0;i<len;i++){
            
            window.console.log(i,fileCount[i]);   
            d[i] = window.setInterval(function(){
                
                fileCount[i]+=(fileCount[i]/2);
                window.console.log(i,fileCount[i]);   

                if(fileCount[i]>=1000){
                    fileCount[i] = Math.ceil(fileCount[i] / 100);
                }

                par.fileData[i].progressBar = Math.ceil(fileCount[i]).toFixed(0);
                if(parseInt(par.fileData[i].progressBar)>=100){
                    par.fileData[i].progressBar = 100;
                }
                if(fileCount[i] >= fileArr[i]){
                    window.clearInterval(d[i]);
                }

            },(1000*(i+1)));  

        }  

        for (let k=0;k<par.fileData.length;k++){

            var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
            var filesId = Util.getFielId();
            formData.append("fileByte",obj.files[k]);
            formData.append("batchId",par.batchId[0]);
            formData.append("fileId",filesId);
            formData.append("businessSerialNo",par.businessSerialNo); 

            try{

                Util.postRequest('http://47.92.211.214:8080/imageUploadServices/uploadDocument',formData,(res)=>{
                    
                    if(res.body.status==200){
                        var id= res.body.data.purl;
                        id = id.substring(id.lastIndexOf('/'),id.length);
                        par.fileData[k].id = id;
                        var icon = res.body.data.fileType;
                        icon = icon.substring(0,icon.lastIndexOf('.'));
                        window.console.log(icon);
                        if(icon=='pdf'){
                            icon = '/static/pdf.png';
                        }else if(icon == 'doc'||icon=='docx'){
                            icon = '/static/word.png';
                        }else if(icon == 'xls'||icon=='xlsx'){
                            icon = '/static/xls.png';
                        }else if(icon == 'ppt'||icon=='pptx'){
                            icon = '/static/pptx.png';
                        }else if(icon == 'txt'){
                            icon = '/static/txt.png';
                        }
                        
                        par.fileData[k].progressBar = 100;
                        par.fileData[k].bFileIcon = icon;
                        par.fileData[k].fileState = '成功';
                        par.fileData[k].fileUrl = res.body.data.purl;

                        if((k+1) == par.fileData.length){
                            par.uploadFileIsComplite = true;
                        }
                    }
                    
                    par.fileNodes[0].children = par.fileData;
                    $.fn.zTree.init($("#fileDemo"), par.setting, par.fileNodes);
                });

            }catch(e){
                window.console.log(e);
                par.fileData[k].fileState = '失败';
                par.uploadFileIsComplite = true;
                Util.showModelTip('warning','上传失败!');
                return false;
            }

        } */
        window.console.log(obj);        
        for (let k=0;k<obj.length;k++){

            var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
            var filesId = Util.getFielId();
            formData.append("fileByte",obj[k].fileObj);
            formData.append("batchId",par.batchId[0]);
            formData.append("fileId",filesId);
            formData.append("businessSerialNo",par.businessSerialNo); 

            try{

                Util.postRequest('/imageUploadServices/uploadDocument',formData,(res)=>{
                    window.console.log(res);
                    if(res.body.status==200||res.body.status==500){

                        var id= res.body.data.purl;
                        id = id.substring(id.lastIndexOf('/'),id.length);

                        par.uploadFileArr[k].state = 1;
                        let str = {'fileId':id,'fileName':obj[k].fileObj.fileName,'type':555,'id':id,'name':obj[k].fileObj.fileName};
                        par.fileListData.push(str);

                        par.fileNodes[0].children.push(str);
                        $.fn.zTree.init($("#fileDemo"), par.setting, par.fileNodes); 
                    }else{
                        par.uploadFileArr[k].state = 2;
                        Util.showModelTip('warning','上传失败!');
                    }
                });

            }catch(e){
                
                Util.showModelTip('warning','上传失败!');
                return false;
            }

        } 

    },
    correctBase64Img(src, edg,callback) {

        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
    
        var imgW;//图片宽度
        var imgH;//图片高度
        var size;//canvas初始大小
    
        var image = new Image();
        image.crossOrigin = "anonymous";
        image.src = src;
    
        image.onload = function () {
    
            imgW = image.width;
            imgH = image.height;
            size = imgW > imgH ? imgW : imgH;
    
            canvas.width = size*1.2;
            canvas.height = size*1.2;
    
            ctx.translate(size/1.5, size/1.5);
            ctx.rotate(edg * Math.PI / 360);
            ctx.drawImage(image, -(image.width/2), -(image.height/2),image.width,image.height);
    
            callback(canvas.toDataURL());
        };
    },
    getFileSize(size){
        size = parseInt(size);
        if(size>1024){
            size = (size/1024);
            return size>1024?((size/1024)/1024).toFixed(2)+'MB':size.toFixed(2)+'KB';
        }else{

            return (size/1024).toFixed(2)+'kB';
        }
    },
    getFileTypeByName(name){
        let icon = '';
        name = name.substring(name.toString().lastIndexOf('.'),name.length);
        switch(name){
            case '.doc':
                icon = '/static/word.png';
            break;
            case '.docx':
                icon = '/static/word.png';
            break;
            case '.xls':
                icon = '/static/xls.png';
            break;
            case '.xlsx':
                icon = '/static/xls.png';
            break;
            case '.ppt':
                icon = '/static/pptx.png';
            break;
            case '.pptx':
                icon = '/static/pptx.png';
            break;
            case '.pdf':
                icon = '/static/pdf.png';
            break;
        }
        return icon;
    }

}

export default Util;
