<template>

    <div class="appViewBoxMain">

        <div class="appBox" >
            <div class="appBoxTop">
                <div class="appBoxTile">
                    <span style="margin:5px 15px;display:block;font-size:13pt;" >影像池筛选</span>
                </div>
                <div class="appBoxTile">
                    <span style="margin:5px 15px;line-height:2;font-size:13pt;">只查询:</span>
                    <template>
                        <el-select v-model="qselect" @change="getType" placeholder="全部" size="mini">
                            <el-option v-for="item in typeOptions"
                            :key="item.fileType" :label="item.statuName"
                            :value="item.fileType"> </el-option>
                        </el-select>
                    </template>
                </div>
                <div class="appBoxCloseBar" >
                    <i class="el-icon-close" @click="closeAppPool"></i>
                </div>
            </div>
            <div class="appBoxCenter">
                <div class="row">
                    <div class="col-md-2 col-sm-2 col-xs-2" v-for="(item,i) in appListData" :key="i">
                        <div class="thumbnail appThumbnail" >
                            <input type="checkbox" v-bind:id="item.fileId" v-model="pickImg"  :value="item.fileId" class="imgListCheck" />
                            <label v-bind:for="item.fileId" class="imgListLabel"></label>
                            <img v-bind:src="item.surl" v-on:dblclick="showAppBigImg" :data-index="i" :value="item.fileId" v-on:mouseenter="getWxImgOcrInfo" @mouseout="showOcrList=false"/>
                            <div class="caption">
                                <input type="text" v-bind:value="item.fileName" style="width:100%;border:0px">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="appBoxBottom">
                <div class="appBoxPageList">
                    <ul class="paginationUl" >
                        <li><a href="#" v-on:click="getFirstOrEndImg(0)">首页</a></li>
                        <li><a href="#" >&laquo;</a></li>
                        <li v-for="(i,index) in totalPages" :key="index"><a href="#" v-on:click="getImg(index)">{{index+1}}</a></li>
                        <li><a href="#" >&raquo;</a></li>
                        <li><a href="#" v-on:click="getFirstOrEndImg((totalPages-1))">尾页</a></li>
                    </ul>
                </div>
                <div class="appBoxButton" >
                    
                    <button type="button"  class=" btn btn-delete ">
                    <i class="el-icon-delete" ></i> 删除</button>
                    
                    <button type="button" @click="btnSure" class=" btn btn-upload ">
                    <i class="el-icon-circle-check" ></i> 确定</button>
                
                    <button type="button" @click="closeAppPool" class=" btn btn-cancel ">
                    <i class="el-icon-circle-close" ></i> 关闭</button>
                    
                </div>
            </div>
            
        </div>

        <div :style="offSetStyle" class="appOcrBox">
            <ocrtemplate v-show="showOcrList" v-bind:items="ocrListData"></ocrtemplate>
        </div>

    </div>

</template>
<script>
import util from '../../../../utils/util.js'
import par from '../../../../utils/param.js'
import ocrTemplate from '../../ocrtemp/OcrListTemplate'
export default {
    props : ['user'],
    data(){
        return {
            'appId' : '',
            'qselect' : '',
            'pickImg' : [],
            'appImgUrl' : '',
            'offSetStyle' : '',
            'ocrListData' : '',
            'appListData' : [],
            'totalPages' : 0,
            'curPage' : 1,
            'showAppImg' : false,
            'showOcrList' : false,
            'typeOptions' : [{ statuName: "全部", fileType: "null" }]
        }
    },
    components : {
        'ocrtemplate' : ocrTemplate
    },
    beforeMount (){
        util.getRequest(`/appApi/getImageTypes/${this.user}`,(res)=>{
            this.typeOptions = this.typeOptions.concat(res.body.data);
        });

        this.getData('null');
    },
    methods : {
        getWxImgOcrInfo (e){
            
            let id = e.target.attributes.value.value.toString();
            util.getRequest(`/webShowImage/invoiceInfo/${id}`,(res)=>{

                if(res.body.status == "200"||res.body.status == 200){
                    if(res.body.data.length>0){
                        this.showOcrList = true;
                        this.ocrListData = res.body.data;
                    }
                }

            })
            this.offSetStyle = {'margin-left':e.clientX+'px','margin-top': e.clientY+'px'};
        },
        showAppBigImg(e){
            
            let msg = {'url':e.target.src,'appPoolData':this.appListData};
            this.$store.commit('changeImgIndex',e.target.attributes['data-index'].value)
            this.$emit('showAppBigImg',msg)
        },
        getType(type){
            this.getData(type);
            this.qselect = type;
        },
        getData(type){
            util.getRequest(`/appApi/getImageList/${this.user}/${type}/${this.curPage}/18?t=674`,(res)=>{
                
                this.curPage = res.body.data.number;
                this.appListData = res.body.data.files;
                this.totalPages = res.body.data.totalPages;
            });
        },
        btnSure(){
            if(this.pickImg.length < 0){
                util.showModelTip('请先选择影像','warning');
                return false;
            }
            window.console.log(this.pickImg);
            
            for(let p=0;p<this.appListData.length;p++){
                for(let s=0;s<this.pickImg.length;s++){
                    if(this.pickImg[s] == this.appListData[p].fileId){
                        
                        par.curImgIndex++;
                        let index = util.addTypeNum(par.nodeId);
                        let fileName = this.appListData[p].fileName;
                        let imgId = par.nodeId+''+par.imgData[index].typeNum;
                        let child = {'id': imgId,'name':fileName,'imageSrc':this.appListData[p].url,'fielId':this.pickImg[s],'imgName':fileName,'isUpload':false,'curImgIndex':par.curImgIndex,'imgTip':'','sliceTip':'','show':true,'fileSize':'0'};
                        
                        par.uploadImageArr.push(child);//存放要上传的图片 上传使用
                        par.imgData[index].children.push(child); //树
                        par.imgTotalArr.push({'imageSrc':this.appListData[p].url,'imgFielId':this.pickImg[s],'isUpload':false});//存储图片 查看大图时使用
                        this.$store.commit('changeImgCount','+');
                        par.ticketNodes[0].children[index] = par.imgData[index];
                    }
                }
            }
            util.reloadTree();
            par.uploadImgCount+= this.pickImg.length;
        },
        closeAppPool(){
            this.$emit('closeAppPool');
        },
        pageLeft : function(){
			
			if(this.curPage<=1){
                util.showModelTip("已经是第一页了!",'warning');
				return false;
			}
			/*获取微信小程序图片*/
			this.curPage--;
            this.getData(this.qselect);
		},
		getFirstOrEndImg : function(index){
			index+=1;
            /*获取微信小程序图片*/
            this.curPage = index;
            this.getData(this.qselect);
		},
		pageRight : function(){
			
			if(this.curPage>=this.totalPage){
                util.showModelTip("已经是最后一页了!",'warning');
				return false;
			}
			/*获取微信小程序图片*/
			this.curPage++;
            this.getData(this.qselect);
		}
    }
}
</script>
<style lang="less">

*{
    margin: 0px;
    padding: 0px;
}

.appViewBoxMain{
    width: 100%;
    height: 100%;
    display: flex;
    top: 0;
    z-index: 999;
    justify-content: center;
    align-content: center;
    position: absolute;
    background: rgba(221, 221, 221, 0.603);
}

.appViewBox{
	width: 100%;
	height: 100%;
	top: 0;
	z-index: 99999;
	position: fixed;
	background: #fff0;
}

.appBox{
	width: 85%;
	height: calc(100vh - 120px);
	margin: 20px auto 0px;
	border-radius: 5px;
	box-shadow: 0px 10px 45px #f2f2f2;
	background: #fbfbfb;
}

.appBoxTop{
	display: flex;
	color:#5b5a57;
    border-bottom: 1px dashed#89b7ff;
}

.appBoxTile{
	flex: 1;
	height: 45px;
}

.appBoxCloseBar{
    height: 38px;
    cursor: pointer;
    font-size: 18pt;
    margin: 5px 15px 0px;
}

.appBoxCloseBar img{
    width: 20px;
	margin: 10px;
	cursor: pointer;
	float: right;
}

.appThumbnail{
	overflow: hidden !important;
	height: 140px !important;
	border: 1px solid #f9f9f9 !important;
	box-shadow: 0px 5px 15px #c8c8c8;
    background: white;
    padding: 5px;
    margin: 10px auto;
    position: relative;
}

.appThumbnail img{
    width: auto;
    display: block;
    margin: auto;
}

.appThumbnail .caption{
    padding: 2px !important;
    bottom: 0;
    position: absolute;
}

.appThumbnail .caption input{
    border: 0px;
    background: white;
}

.thumbImg{
    height: 85%;
}

.thumbImg img{
    display: block;
    margin: auto;
}

.appBoxCenter{
	width: 100%;
	height: 80%;
	padding: 10px;
	cursor: pointer;
	overflow-x: hidden;
}

.appBoxBottom{
    display: flex;
	height: 50px;
    padding: 2px 0px;
	border-top: 1px solid #f0f0f0;
}

.appBoxPageList{
    flex: 2;
    padding: 0px 10px;
}

.paginationUl{
    font-size: 10pt !important;
    margin: 8px 0px 0px 0px !important;
    li{
        
        display: inline;
        a{
            position: relative;
            float: left;
            padding: 6px 12px;
            margin-left: -1px;
            line-height: 1.42857143;
            color: #337ab7;
            text-decoration: none;
            background-color: #fff;
            border: 1px solid #ddd;
        }
    }
}

.appBoxButton{
    flex: 1;
    padding: 8px 0;
    display: inline-flex;
}

.appBoxButton button{
    width: 100px;
}

.imgListCheck+.imgListLabel {
    top: 0;
    right: 0;
    z-index: 9999;
    height: 20px;
    padding: 0px 10px;
    border-radius: 5px;
    display: inline-block;
    position: absolute;
    cursor: pointer;
    margin: 20px 25px !important;
    border: 1px solid #c6c6c6;
}

.imgListCheck{
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: none;
    position: absolute;
}

.imgListCheck:checked+.imgListLabel::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    background-size: contain;
    background-image: url("../../../../assets/img/box-y.png");
    background-repeat: no-repeat;

}

.appOcrBox{
    top: 0;
    left: 0;
    position: absolute;
    z-index: 9999;
    width: auto;
    height: auto;
}

.btn{
    color: white;
    border: 0px;
    margin: 0px 10px;
    line-height: 20px;
    outline: none;
}

.btn:active{
    outline: none;
}

.btn-delete{
	box-shadow: 2px 3px 7px #ffc55e;
    background: linear-gradient(120deg,#ffdb45,#ff7730);
}
.btn-upload{
	box-shadow: 2px 3px 7px #80e0ec;
	background: linear-gradient(120deg,#8cebff,#2ab4ff);
}

.btn-cancel{
	box-shadow: 2px 3px 7px #83e889;
    background: linear-gradient(120deg, #6fffc2, #68df46);
}

</style>
