import vueObj from 'vue'
import $ from 'jquery'
import Resouce from 'vue-resource'
import { Message } from 'element-ui';
import {MessageBox} from 'element-ui'
import {Notification} from 'element-ui'

import Par from '../utils/param' 
import Store from '../stores/store'
import Router from '../router/router'

vueObj.use(Resouce);
let imgUrl = '';
let vue = null;
let ws = new WebSocket("ws://127.0.0.1:11345/Laputa");

const Util = {

    initWS : function(){
        
        ws.onopen = function() {
            var obj = {"InterFace": "GetDevice"};
            ws.send(JSON.stringify(obj));
            
        };

        ws.onmessage = function (e) 
        { 
            var obj = JSON.parse(e.data);
            window.console.log(obj);
            if (obj.InterFace == "GetDevice") {
                Util.buildDeviceDDL(obj);
            } else if (obj.InterFace == "GetFullImage") {
                Util.showBigImgFromActive(obj);
            } else if (obj.InterFace == "Upload") {
                Util.uploadComplete(obj);
            } else if (obj.InterFace == "GetNICVersion"){
                
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
                vue.computeScrollBar();
                Store.commit('showImgByFileId',obj.FileId);
            } 
        };
        
        ws.onclose = function()
        { 
            MessageBox.confirm('检测到系统未打开控件，是否下载?','提示',{
                confirmButtonText : '确定',
                cancelButtonText : '取消',
                type :'warning'
            }).then(()=>{
               Router.push('/downcontrol');
            });

            Util.initWS();
        };

    },
    sendInfo : function(obj){
        ws.send(obj);
    },
    buildDeviceDDL : function(obj) {
        if (obj.DeviceNames == undefined) {
            Util.showModelTip('warning',"未找到任何设备!");
        } else {
            
            for (var i = 0; i < obj.DeviceNames.length; i++) {
                Par.deviceOptions.push({'label':obj.DeviceNames[i],'value':obj.DeviceNames[i]});
            }
        }
    },
    /*扫描仪画图 */
    buildGrid : function(obj){

        var fileName = '';
        if(Par.scanType==2){
            /* Par.nodeId = obj.BusinessSerialNo;
            Par.nodeName = Par.nodeId+"_"+(vue.numIndex+1)+".jpg"; */
            /* fileName = Par.nodeId+"_"+(vue.numIndex+1)+".jpg"; */
        }else{
            //Par.nodeName = obj.FileName;	
            fileName = obj.FileName;
        }
        
        Par.curImgIndex++;
        Par.uploadCount++;
        let index = Util.addTypeNum(Par.nodeId);
        let imgId = Par.nodeId+''+Par.imgData[index].typeNum;
        let fielId = obj.FileId;
        let imgUrl = "data:image/jpeg;base64," + obj.Base64;
        let child = {'id': imgId,'name':fileName,'imageSrc':imgUrl,'fielId':fielId,'imgName':fileName,'isUplaod':false,'curImgIndex':Par.curImgIndex,'show':true};
        
        Par.uploadImageArr.push(child);//存放要上传的图片
        Par.imgData[index].children.push(child);

        Par.ticketNodes[0].children[index] = Par.imgData[index];
        $.fn.zTree.init($("#treeDemo"), Par.setting, Par.ticketNodes);
        Store.commit('changeImgCount','+');
        Store.commit('changeUploadImgCount','+');
        Par.imgViewArr.push({'pId':'p-'+index,"cId":'c-'+(Par.imgData[index].children.length-1),'type':'s'});

    },
    showBigImgFromActive(obj,v){
        
        if(obj!=null)
        {
            imgUrl = 'data:image/jpeg;base64,'+obj.Base64;
        }else{
             v(imgUrl);
        }
        
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

                    Par.imgData.find((i)=>{
                        i.children.find((k)=>{
                            if(k.fielId == obj.FileId){
                                k.cutImgCls = 'cutImg'
                            }
                        })
                    })

                    Util.setInfo(obj.FileId,"imgSucTip");
                break;
            }
            
            var num = Math.ceil(100/Store.state.uploadImgCount);
            if(Store.state.uploadImgCount == Store.state.curUploadCount){
                
                Store.commit('changeUploadProgress',100);
            }else{
                var gress = (num * Store.state.curUploadCount);
                Store.commit('changeCurUploadCount');
                Store.commit('changeUploadProgress',gress);
            }
            
        }
    },
    setInfo : function(fileId,flag){
        
        if(Par.scanType==1){

            let bool = false;
            for(let s=0;s<Par.imgData.length;s++){
                for(let w=0;w<Par.imgData[s].children.length;w++){
                    
                    if(Par.imgData[s].children[w].fielId == fileId){
                        Par.imgData[s].children[w].imgTip = flag;
                        bool = true;
                        break;
                    }
                }
                if(bool == true){
                    break;
                }
            }

            /* Par.tickArr.find(function(item,index){
                if(fileId==item.fileId){
                     Par.tickArr[index].isUpload = flag;
                     vue.tickArr[index].imgTip = type;
                     if(code==14){
                         var str = {"fileId":vue.tickArr[index].fileId,"fileName":vue.tickArr[index].name,"ParentNodeId":vue.tickArr[index].nodeId,"nodeId":vue.tickArr[index].id,"sort":vue.tickArr[index].index,"docName":vue.tickArr[index].docName};
                         Par.postImgArr.push(str);	
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
    getRequestByAjax(url,Parm,type,callBack){
        $.ajax({
            url : url,
            data : Parm,
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
        vueObj.http.get(`http://${Par.baseUrl}${url}`).then((res)=>{
            callBack(res);
        },(res)=>{
            callBack(res);
        });

    },
    postRequest : function(url,Parm,callBack){
        vueObj.http.post(`http://${Par.baseUrl}${url}`,Parm,{emulateJSON: true}).then((res)=>{
            callBack(res);
        },(res)=>{
            callBack(res);
        });

    },
    deleteRequest : function(url,Parm,callBack){
        vueObj.http.delete(`http://${Par.baseUrl}${url}`,Parm).then((res)=>{
            callBack(res);
        },(res)=>{
            callBack(res);
        });

    },
    isNullStr(str){
        return str==null||str=='null'?'':str;
    },
    drawPicture(vueO,obj,fileSize){
        vue = vueO;
        Par.uploadImgCount++;
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

            let index = Util.addTypeNum(Par.nodeId);
            var base64 = dataURL.replace("data:image/jpeg;base64,", "");
            var objmsg = {
                InterFace: "Transmission_WebToLocal",
                FileId: fielId,
                FileName: fileName,
                Base64: base64
            };

            Util.sendInfo(JSON.stringify(objmsg));
            Par.curImgIndex++;
            let imgId = Par.nodeId+''+Par.imgData[index].typeNum;
            let child = {'id': imgId,'name':fileName,'imageSrc':dataURL,'fielId':fielId,'imgName':fileName,'isUpload':false,'curImgIndex':Par.curImgIndex,'imgTip':'','cutImgCls':'','show':false,'fileSize':fileSize};
            
            Par.uploadImageArr.push(child);//存放要上传的图片 上传使用
            Par.imgData[index].children.push(child); //树

            Par.imgViewArr.push({'pId':'p-'+index,"cId":'c-'+(Par.imgData[index].children.length-1),'type':'i'});
            Par.ticketNodes[0].children[index] = Par.imgData[index];
            vueO.$store.commit('changeImgCount','+');
            vueO.$store.commit('changeUploadImgCount','+');
            vueO.$store.state.initImportCount = vueO.$store.state.uploadImgCount;

            Util.reloadTree();
        }
        
    },
    /*更新树节点*/
    initTreeNode : function(){

        let bool = false;
        let arr = Par.ticketNodes[0].children;
        /*禁止使用 find 函数 */
        for(let i=0;i<arr.length;i++){
            if(arr[i].name =='其它'){
                bool = true;
                break;
            }
        }
        if(!bool){
            var nodeId = 10+''+Par.ticketNodes[0].children.length;
            Par.nodeId = nodeId;
            Par.nodeName = '其它';
            var obj = {id:nodeId,name:'其它','typeNum':0,'typeName':'其它',"open":true,children:[]};
            Par.imgData.push(obj);
            Par.ticketNodes[0].children.push(obj);
        }
        
        $.fn.zTree.init($("#fileDemo"), Par.setting, Par.fileNodes);
        $.fn.zTree.init($("#treeDemo"), Par.setting, Par.ticketNodes);
        
    },
    /*排序*/
    sortTreeAndImg: function(pId,fileId,index,flag){
       
        for(let i=0;i<Par.imgData.length;i++){
            if(pId == Par.imgData[i].id){
                let arr= Par.imgData[i].children;
                if(flag){
                    for(let k=index;k<arr.length;k++){
                        Par.imgData[i].children[k].id = pId+''+k;
                    }
                }else if(!flag){
                    let str = null;
                    let s = null;
                    
                    /*不要用Par.imgData[i].children.find 这个函数 */
                    let childArr = Par.imgData[i].children;
                    for(let w=0;w<childArr.length;w++){
                        if(childArr[w].fielId == fileId){
                            s = w;
                            str = childArr[w];
                            break;
                        }
                    }

                    if(s!=null){
                        Par.imgData[i].children.splice(s,1);
                    }
                    if(str!=null){

                        str.id = pId+''+(index+1);
                        if(Par.imgData[i].id == pId){
                            Par.imgData[i].typeNum+=1;
                        }
                        
                        Par.imgData[i].children.splice(index,0,str);
                        let newArr = Par.imgData[i].children;
                        
                        index = (index+1);
                        for(let f=index;f<newArr.length;f++){
                            Par.imgData[i].children[f].id = pId+''+(index+1);
                        }
                    }
                    
                }
                
                break;
            }
        }

        //刷新图片下标
        let count = 0;
        for(let v=0;v<Par.imgData.length;v++){
            let carr = Par.imgData[v].children;
            for(let s=0;s<carr.length;s++){
                count++;
                Par.imgData[v].children[s].curImgIndex = count;
            }

        }

        Par.ticketNodes[0].children = Par.imgData;
        $.fn.zTree.init($("#treeDemo"), Par.setting, Par.ticketNodes);

    },
    reloadTree : function(){
        $.fn.zTree.init($("#fileDemo"), Par.setting, Par.fileNodes);
        $.fn.zTree.init($("#treeDemo"), Par.setting, Par.ticketNodes);
    },
    /*添加树节点*/
    addTreeNode : function(id,name){
       
        var nodeArr = Par.ticketNodes[0].children;
        nodeArr.find((i)=>{

            if(i.name == name){
                Util.showTips('warning','节点名已存在!','top-left');
                return false;
            }

        });

        var str = {id:id,name:name,'typeNum':0,'typeName':name,"open":true,children:[]};
        Par.imgData.push(str);
        Par.nodeId = id;
        Par.nodeName = name;
        Par.ticketNodes[0].children = Par.imgData;
    },
    reloadDataByDelete :function(arr,type){
        let a = arr;
        if(a.length > 0 && type== 'F'){
            let id = a[0];
            
            let data = Par.fileListData;
            for(let k=0;k<data.length;k++){
                if(data[k].fileId == id){
                    arr.splice(0,1);
                    Par.fileListData.splice(k,1);
                    Par.fileNodes[0].children.splice(k,1);
                    break;
                }
            }            

            Util.reloadDataByDelete(arr,"F");
        }

        if(arr.length > 0 && type=="I"){
            arr.find((k,i)=>{
                k.children.find((s,j)=>{
                    Par.pickImage.find((o)=>{
                        
                        if(s.fielId == o){
                            k.typeNum--;
                            if(k.isUpload == false){
                                this.$store.commit('changeUploadImgCount','-');
                            }
                            Par.imgData[i].children.splice(j,1);
                        }
                    })
                })
            })
        }
        Util.reloadTree();
    },
    addTypeNum : function(id){
        let index = 0;
        Par.imgData.find((i,r)=>{
            if(i.id == id){
                index = r;
                i.typeNum++;
                i.typeName = Par.nodeName;
            }
        })
        return index;
    },
    uploadDataFromServer(arr,arr1){
        
        if(arr.length > 0 &&arr1.length > 0){

            arr.find((i)=>{
                if(i.name!='附件'){
                    window.console.log(i.name)
                    if(i.name=='其它'){
                        Par.nodeId = i.id;
                    }
                    let str = {'typeNum':i.children.length,'typeName':i.name,'children':[],'open':true,'id':i.id,name:i.name};
                    Par.imgData.push(str);
                }

            })
            
            let imgData = Par.imgData;
            for(let k=0;k<imgData.length;k++){
                for(let o=0;o<arr1.length;o++){
                    
                    if(imgData[k].id == arr1[o].ParentNodeId){
                        
                        Par.curImgIndex++;
                        Store.commit('changeImgCount','+');
                        
                        Par.imgData[k].children.push({'imageSrc':arr1[o].url,'fielId':arr1[o].fileId,'imgName':arr1[o].fileName,name:arr1[o].fileName,'show':'true','curImgIndex':Par.curImgIndex,'isUpload':true,'imgTip':'imgSucTip'});
                        Par.imgViewArr.push({'pId':'p-'+k,"cId":'c-'+(Par.imgData[k].children.length-1),'type':'u'});//存储图片 查看大图时使用
                    }
                }
            } 
            Util.filterData(arr1);
        }
        Par.ticketNodes[0].children = Par.imgData;
        Util.reloadTree(); 
    },
    filterData(arr){
        if(arr.length > 0){
            arr.find((k)=>{
                let fileIcon = Util.getFileTypeByName(k.fileName);
                if(k.type=='555'||k.type=='666'||k.type=='777'||k.type=='888'||k.type=='999'){
                    Par.fileListData.push({'fileId':k.fileId,'fileName':k.fileName,'fileIcon':fileIcon,'id':k.fileId,'name':k.fileName});
                }else if(k.type=='102'){
                    Par.ticketListData.push({'fileId':k.fileId,'fileName':k.fileName,'fileSrc':'http://47.92.211.214:8080'+k.surl});
                }
            });
            Par.fileNodes[0].children = Par.fileListData;
        }
    },
    fileReName : function(id,name){

        let bool = false;
        let nodeArr = Par.imgData;
        for(let q=0;q<nodeArr.length;q++){
            for(let y=0;y<nodeArr[q].children.length;y++){
                if(nodeArr[q].children[y].fielId == id){
                    Par.imgData[q].children[y].name = name;
                    Par.imgData[q].children[y].imgName = name;
                    bool = true;
                    $.fn.zTree.init($("#treeDemo"), Par.setting, Par.ticketNodes);
                    break;
                }
            }
            if(bool == true){
                break;
            }
        }

    },
    /*移动大图 */
    moveImage : function(Parent,target){

        let box = document.getElementById(Parent)
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
                img.style.transition = 'all 0s';
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
    oprateBigImage (num){
        var rotatez = 0;
        var scale = 0;
        var style = null;
        switch (num){
            case 0:
                Par.scaleBig = Par.scaleSmall = 1;//默认值
                Par.rotatez = 0;
                style = {"transition":"all 0.2s","transform":"rotateZ("+Par.rotatez+"deg)  scale(1)"};
                break;
            case 1:
                if(Par.scaleBig <= 1){
                    Par.scaleBig = (Par.scaleSmall + 0.2);
                }else{
                    Par.scaleBig += 0.2;
                }
                Par.imgScale = Par.scaleBig;
                Par.scaleSmall = Par.scaleBig;
                rotatez = Par.rotatez;
                style = {"transition":"all 0.2s","transform": "rotateZ("+rotatez+"deg) scale("+Math.abs(Par.scaleBig)+")"};
                break;
            case 2:
                if(Par.scaleSmall<=0.3){
                    return false;
                }
                if(Par.scaleSmall >= 1){
                    Par.scaleSmall = (Par.scaleBig - 0.2);
                }else{
                    Par.scaleSmall -= 0.2;	
                }
                Par.imgScale = Par.scaleSmall;
                Par.scaleBig = Par.scaleSmall;
                rotatez = Par.rotatez;
                style = {"transition":"all 0.2s","transform": "rotateZ("+rotatez+"deg) scale("+Math.abs(Par.scaleSmall)+")"};
                break;
            case 3:
                rotatez = Par.rotatez -= 90;
                scale = Par.imgScale;
                style = {"transition":"all 0.2s","transform":"rotateZ("+rotatez+"deg) scale("+Math.abs(scale)+")"};
                break;
            case 4:
                rotatez = Par.rotatez += 90;
                scale = Par.imgScale;
                style = {"transition":"all 0.2s","transform":"rotateZ("+rotatez+"deg) scale("+Math.abs(scale)+")"};
                break;
            case 'r':
                style = {"transition":"all 0.2s","transform":"rotateZ("+Par.rotatez+"deg) scale("+Math.abs(Par.imgScale)+")"};
                break;
            case 's':
                Par.rotatez = 0, Par.imgScale = Par.scaleSmall = Par.scaleBig = 1;
                style = {"transition":"all 0s","transform":"rotateZ("+Par.rotatez+"deg) scale("+Math.abs(Par.imgScale)+")","margin-top":"auto","margin-left: ":"auto"};
                break;
        }
        return style;

    },
    /*滚动图片*/
    scrollImage(target){
        var flag = false;
        var img = document.getElementById(target);
        img.onmouseenter = function(){
            
            flag = true;
            if(flag){
                window.onwheel = function(e){
                
                    var del = e.deltaY;
                    if(del > 0){
                        img.style.transform = Util.oprateBigImage(1).transform;
                    }else{
                        img.style.transform = Util.oprateBigImage(2).transform;
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
        return d.getFullYear()+''+(d.getMonth()+1)+''+d.getDate()+''+m+'.png';
    },
    uploadFiles(obj){
          
        for (let k=0;k<obj.length;k++){

            let formData = new FormData();//这里需要实例化一个FormData来进行文件上传
            let filesId = Util.getFielId();
            formData.append("fileByte",obj[k].fileObj);
            formData.append("batchId",Par.batchId[0]);
            formData.append("fileId",filesId);
            formData.append("businessSerialNo",Par.businessSerialNo); 

            try{

                Util.postRequest('/imageUploadServices/uploadDocument',formData,(res)=>{
                    
                    if(res.body.status==200||res.body.status=='200'){

                        let id= res.body.data.purl;
                        id = id.substring(id.lastIndexOf('/'),id.length);

                        Par.uploadFileArr[k].state = 1;
                        let str = {'fileId':id,'fileName':obj[k].fileName,'type':555,'id':id,'name':obj[k].fileName};
                        Par.fileListData.push(str);
                        window.console.log(str);

                        Par.fileNodes[0].children.push(str);
                        $.fn.zTree.init($("#fileDemo"), Par.setting, Par.fileNodes); 
                    }else{
                        Par.uploadFileArr[k].state = 2;
                        Util.showModelTip('warning','上传失败!');
                    }
                });

            }catch(e){
                
                Util.showModelTip('warning','上传失败!');
                return false;
            }

            if(k == obj.length){
                Par.uploadFileArr = [];//清空
            }

        } 

    },
    /*矫正 */
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
    /*通过文件名获取类型 */
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
    },
    /*滚动条 */
    scrollView(obj,box,bar){
        
        obj.onmouseenter = function(){
            let move = 0;
            let barSide = document.getElementsByClassName(bar)[0];
            let top = barSide.offsetTop;
            let height = parseInt(barSide.style.height);
            
            if(top==null||top==''){
                top = 0;
            }else {
                top = parseInt(barSide.offsetTop);
            }
            
            if(barSide.parentNode.style.display=='block'){
          
                window.onwheel = function(e){
                  
                    if(e.deltaY > 0){
                        
                        if((top + height) < obj.clientHeight){
                            top+=20;
                        } else{
                            top = (obj.clientHeight - height);
                        }
                        
                    }else if(e.deltaY < 0){
                       
                        top-= 20;
                        if(top < 0){
                            top = 0;
                        }
                    }

                    move = barSide.offsetTop/(obj.clientHeight - height);
                    move = move * (box.scrollHeight - obj.clientHeight);
                    
                    box.style.marginTop = '-'+move+'px';
                    barSide.style.marginTop = top+'px';
                }
            }
        }

        obj.onmouseleave = function(){
            window.onwheel = null;
        }
    }
}

export default Util;
