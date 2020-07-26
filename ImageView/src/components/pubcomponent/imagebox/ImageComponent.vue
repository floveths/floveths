<template>
    <div>
        <div class="boxView">
			<div class="content">
				<div class="row">
					<div class="col-md-12">
						<div class="panel panel-default" v-for="(pdata,index) in data" style="margin-top: 20px;"  v-show="pdata.typeNum > 0"  v-bind:key="index">
							<div class="panel-heading text-center">
								<span>{{pdata.typeName}} 共 {{pdata.typeNum}} 张影像</span>
							</div>
							
							<div class="panel-body" :title="pdata.id">
								<vuedragable v-model="pdata.children" group="people" v-bind="dragOptions" @start="dragStart($event,index)" @end="dragEnd" class="row">
									<div class=" col-md-3 col-sm-3 col-xs-6 dragItem" 
										v-for="(data,s) in pdata.children"
										:data-fileid="data.fielId"
										:data-name="data.name"
										:data-id="data.id"
										:itemid="s+'`'+data.fielId"
										v-bind:key="s"
										v-show="data.show">
										
										<div class="img-thumbnails" @mouseover="showErrorInfo" @mouseout="unShowErrorInfo">
											<div v-show="data.imgTip!=''" :class="data.imgTip"></div>
											<div class="img " :class="data.cutImgCls" @click="showCutImg"></div>
											<img v-bind:src="data.imageSrc" @dblclick="showBigImg" @click="chooseThumbImg" v-bind:name="data.fielId" :data-id="'p-'+index" v-bind:id="'c-'+s"  class="img " >	
											<input type="checkbox" v-model="picked" :id="data.fielId" :value="data.fielId" class="checkdiv" @change="hasChecked"/>
											<label class="checkLabel" :for="data.fielId"></label>
											<input type="text" :value="data.imgName" class="reImgName" v-bind:name="data.fielId" v-on:blur="fileReName"/>
										</div>

									</div>
								</vuedragable>
							</div>
						</div>

						<div class="panel panel-default"  style="margin-top: 20px;"  v-show="attchListData.length > 0 && attachBox"  >
							<div class="panel-heading text-center">
								<span> 共 {{attchListData.length}} 个附件</span>
							</div>
							<div class="row">
								<div class=" col-md-3 col-sm-3 col-xs-6 " v-for="(data,index) in attchListData" v-bind:key="index">
									<div class="img-thumbnails" >
										<img v-bind:src="data.fileIcon" @dblclick="viewPdfDoc" v-bind:name="data.fileId"  >	
										<input type="text" :value="data.fileName" class="reImgName" readonly="readonly" v-bind:name="data.fielId" v-on:blur="fileReName"/>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
            </div>

			<div class="trashBox" @drop="dragToDelete" @dragover.prevent>
				<p class="trashIcon"><i class="el-icon-delete"></i></p>
			</div>

        </div>

		<transition name="up">
			<errortip :isshow='showErrorTip' :tipvalue="errorTipValue" :x='tipX' :y='tipY' ></errortip>
		</transition>

		<transition name="up">
            <pdfdocview v-show="showPdfBox" :pdfurl="pdfUrl" @closepdfbox='showPdfBox=false'></pdfdocview>
        </transition>

    </div>

</template>

<script>

import errorTip from './ErorrTip'
import vueDragAble from 'vuedraggable'
import util from '../../../utils/util.js'
import par from '../../../utils/param.js'
import Util from '../../../utils/util.js';
import pdfDocView from '../pdfdocdialog/PdfDocBox'

export default {
	props : ['data','attachBox'],
	data : function() {
		return {
			'imgTip' : '',
			'tipX' : 0,
			'tipY' : 0,
			'picked' : [],
			'dragDelete' : [],
			'isDrag': false,
			'pdfUrl' : null,
			'showErrorTip' : false,
			'errorTipValue' : null,
			'showPdfBox' : false,
			'isKeyControlDown' : false,
			'attchListData' : par.fileListData
		};
	},
	components : {
		'errortip' : errorTip,
		'pdfdocview' : pdfDocView,
		'vuedragable' : vueDragAble
	},
	computed: {
		dragOptions() {
			return {
				animation: 0,
				group: "description",
				disabled: false,
				ghostClass: "ghost"
			};
		}
	},
	mounted (){
		window.addEventListener('keydown',(e)=>{
			
			if(e.ctrlKey&&e.keyCode==17){
                return this.isKeyControlDown = true;
            }else if(e.keyCode == 46){

				let parm = {"businessSerialNo": par.businessSerialNo,"fileId":par.pickImage};
				util.deleteRequest("/imageUploadServices",{body:parm});  
			}
        });

        window.addEventListener('keyup',(e)=>{
            if(!e.ctrlKey&&e.keyCode==17){
                return this.isKeyControlDown = false;
            }
		});
		
		document.addEventListener('click',(e)=>{
			if(e.altKey){
				this.picked = [];
				par.pickImage = [];
				let arr = document.getElementsByClassName('img-thumbnails');
				for(let o=0;o<arr.length;o++){
					arr[o].style.border = '1px solid #ddd';
				}
			}
		});

	},
	methods : {
		showBigImg(e){

			let index = 0;
			let cId = e.target.id;
			let pId = e.target.dataset.id;
			
			par.imgViewArr.find((i,k)=>{
                if(i.pId == pId&&i.cId == cId){
                    return index = k;
                }
            });

			
			let url = '';
			pId = par.imgViewArr[index].pId;
			cId = par.imgViewArr[index].cId;
			
			pId = pId.split('-');
			cId = cId.split('-');
			let type = par.imgViewArr[index].type;
			if(type == 'i'){
				url = par.imgData[pId[1]].children[cId[1]].imageSrc;
				let msg = {'url':url,'fileId':e.target.name,'barType':1};
				this.$emit('showBigImg',msg)
			}else if(type == 's'){
				let fileId = par.imgData[pId[1]].children[cId[1]].fielId;
				var msg = {
					"InterFace" : "GetFullImage",
					"FileId" : fileId 
				};
				util.sendInfo(JSON.stringify(msg));
				window.setTimeout(() => {
					util.showBigImgFromActive(null,(res)=>{
						let msg = {'url':res,'fileId':e.target.name,'barType':1};
						this.$emit('showBigImg',msg)
					});
				}, 1500);
			}
			
			this.$store.commit('changeImgIndex',index);
			
		},
		showCutImg(e){
			
			let msg = {'url':e.target.nextSibling.src,'fileId':e.target.nextSibling.name,'barType':3};
			this.$emit('showBigImg',msg);
		},
		hasChecked(){
			par.pickImage = this.picked
		},
		fileReName(e){
			
			util.fileReName(e.target.name,e.target.value);
		},
		chooseThumbImg:function(e){

			if(e.ctrlKey){
				this.picked.push(e.target.name);
				e.target.parentElement.style.border = '3px solid #ffaf17';
			}
			par.pickImage = this.picked;
		},
		dragStart(e,index) {
			this.isDrag = true;
			var value = e.originalEvent.target.attributes.itemid.value
			this.dragDelete.push({'nodeIndex':index,'imgValue':value});

		},
		dragEnd(e) {

			let index = e.newIndex;
			let iId = e.item.dataset.id;
			let pId = e.to.parentNode.title;
			let fileId = e.item.dataset.fileid;

			iId = iId.substring(0,iId.length-1);
			if(iId==pId){

				Util.sortTreeAndImg(pId,fileId,index,true);
			}else if(iId!=pId){
				
				let arr = par.imgData;
				for(let o=0;o<arr.length;o++){
					if(arr[o].id == iId){
						par.imgData[o].typeNum-=1;
						break;
					}
				}
				Util.sortTreeAndImg(pId,fileId,index,false);
			}
			Util.reloadTree();
		},
		viewPdfDoc(e){
			let id = e.target.name;
            let val = 'http://'+par.baseUrl+'/webShowImage/getDocument/'.concat(id);
            this.pdfUrl = val;
            this.showPdfBox = true;
		},
		dragToDelete(){

			if(this.dragDelete.length>0){
				var index = this.dragDelete[0].nodeIndex;
				var imgIdex = this.dragDelete[0].imgValue.split('`')[0];
				var imgFileId = this.dragDelete[0].imgValue.split('`')[1];

				par.imgData[index].typeNum -= 1; 
				var bool = par.imgData[index].children[imgIdex].isUpload;
				par.imgData[index].children.splice(imgIdex,1);
				let pId = index, cId = imgIdex;
				
				let parm = {"businessSerialNo": par.businessSerialNo,"fileId":this.dragDelete};
				util.deleteRequest("/imageUploadServices",{body:parm},(res)=>{
					if(res.body.status == 200){
						let uploadArr = par.uploadImageArr.filter((i)=>{
							return i.fielId != imgFileId ;
						});

						let viewArr = par.imgViewArr.filter((e)=>{
							return e.pId != pId && e.cId != cId;
						});
						
						par.imgViewArr = viewArr;
						par.uploadImageArr = uploadArr;
						this.$store.commit('changeImgCount','-');
					}else{
						util.showModelTip('warning','删除失败!');
						return false;
					}
				})
				if(bool==false){
					this.$store.commit('changeUploadImgCount','-');
				}
				this.dragDelete = [];//立即清空;
			}
			Util.reloadTree();
		},
		showErrorInfo(e){
			
			this.tipX = e.clientX;
			this.tipY = e.clientY;

			let value = e.target.name;
			if(window.sessionStorage.getItem('fileId-'+value)!=null&&window.sessionStorage.getItem('fileId-'+value)==value&&this.errorTipValue==null&&e.ctrlKey!=true){
				this.errorTipValue = window.sessionStorage.getItem('failInfo-'+value);
				this.showErrorTip = true;
            }
			
		},
		unShowErrorInfo(){
			this.errorTipValue = null;
			this.showErrorTip = false;
		}
	}
    
}

</script>

<style lang="less">

.up-enter,.up-leave-to{
	opacity: 0;
	transition: all 0.2s linear;
}

.up-enter-active,.up-leave-active{
	transition: opacity 0.5s linear;
}

.boxView{
	width: 100%;
	height: 100%;
	position: relative;

	.trashBox{
		width: 60px;
		height: 60px;
		border: 1px solid rgb(241, 241, 241);
		position: fixed;
		bottom: 0;right: 0;
		margin: 15px 35px;
		border-radius: 50%;
		text-align: center;
		background: white;
		box-shadow: 0px 4px 8px #ccc;
	}
	.trashIcon{
		color: #ffaf17;
		font-size: 30pt;
	}
}


.panel{
	background: white !important;
	box-shadow: 0px 5px 20px #a8a8a8 !important;
}

.panel-default{
    padding: 5px 10px;
	border-color : #f9f9f9 !important;
}

.panel-heading{
    height: 35px;
	border: 0px !important;
	background: transparent !important;
}

.panel-footer{
	padding: 10px 5px;
	display: flex;
	background-color: transparent !important;
	border-top: 1px solid #eaeaea !important;
}

.panel-footer button{
	flex: 1;
	margin: 0px 5px;
}

.checkdiv {
	display: none;
}

.checkdiv+.checkLabel {
	border: 1px solid #dfdfdf;
	padding: 10px;
	border-radius: 8px;
	display: inline-block;
	position: absolute;
	top: 0 ;
	right: 0;
	box-shadow: 2px 2px 10px #e3e3e3 inset;
	margin: 10px;
	cursor: pointer;
}

.checkdiv:checked+.checkLabel::after {
	content: "";
	display: block;
	position: absolute;
	right: 0;
	bottom: 0;
	width: 20px;
	height: 20px;
	background-image: url(../../../assets/img/box-y.png);
}

.img-thumbnails {
	position: relative;
	max-width: 100%;
	padding: 4px;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 4px;
	cursor: pointer;
	overflow: hidden;
	margin-bottom: 8px;
	height: 165px !important;
	width: 100% !important;
	> img{
		max-width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		padding: 8px;
	}
	.cutImg{
		width: 25px;
		height: 70px;
		position: absolute;
		bottom: 0;
		left: 0;
		background:rgb(47, 255, 141);
		z-index: 10;
		display: block;
		margin-left: 0px;
		margin-bottom: 20px;
	}
	/* .imgTip{
		width: 85px;
		height: 85px;
		display: block;
		z-index: 170;
		margin-left: 0%;
		margin-top: 0%;
	} */
}

.img-responsive{
	display: block;
	height: 135px !important;
	margin: -22px auto 0px !important;
}

.img-small{
	height: 130px;
	margin: 0px auto;
}

.caption {
	white-space: pre-wrap;
	word-wrap: break-word;
	word-break: break-word;
}

.cutImg::after{
	font-size: 8pt;
	content: '点击显示切图';
}

.reImgName{
	border: 0px;
	width: 100%;
	position: absolute;
	font-size: 10pt;
	bottom: 0;
	margin-left: -4px;
	background: white;
}

.imgErrorTip{
	width: 110px;
	height: 50px;
	background: red;
	z-index: 10;
	transform: skewY(-45deg);
	margin-left: -22px;
}

.imgErrorTip::before{
	content: '上传失败';
	margin-left: 20px;
	font-size: 10pt;
	margin-top: 11px;
	position: absolute;
	transform: skew(28deg);
}

.imgSucTip{
	width: 80px;
	height: 35px;
	background: rgb(84, 233, 79);
	z-index: 10;
	transform: skewY(-45deg);
	margin-left: -5px;
}

.imgSucTip::before{
	content: '上传成功';
	margin-left: 5px;
	font-size: 9pt;
	margin-top: 11px;
	position: absolute;
	transform: skew(30deg);
}

.imgFpczTip{
	width: 80px;
	height: 35px;
	background: rgb(255, 139, 45);
	z-index: 10;
	transform: skewY(-45deg);
	margin-left: -5px;
}

.imgFpczTip::before{
	content: '发票信息存在';
	margin-left: 5px;
	font-size: 9pt;
	margin-top: 11px;
	position: absolute;
	transform: skew(30deg);
}

.imgFailInfoTip{
	width: 80px;
	height: 35px;
	background: rgb(251, 255, 33);
	z-index: 10;
	transform: skewY(-45deg);
	margin-left: -5px;
}

.imgFailInfoTip::before{
	content: '发票信息保存失败';
	margin-left: 5px;
	font-size: 9pt;
	margin-top: 11px;
	position: absolute;
	transform: skew(30deg);
}

.imgCheckTip{
	width: 80px;
	height: 35px;
	background: rgb(63, 140, 255);
	z-index: 10;
	transform: skewY(-45deg);
	margin-left: -5px;
}

.imgCheckTip::before{
	content: '校验失败';
	margin-left: 5px;
	font-size: 10pt;
	margin-top: 11px;
	position: absolute;
	transform: skew(30deg);
}

.imgFplxTip{
	width: 80px;
	height: 35px;
	background: rgb(190, 78, 255);
	z-index: 10;
	transform: skewY(-45deg);
	margin-left: -5px;
}

.imgFplxTip::before{
	content: '发票连续';
	margin-left: 5px;
	font-size: 9pt;
	margin-top: 11px;
	position: absolute;
	transform: skew(30deg);
}

.imgCheckFailTip{
	width: 80px;
	height: 35px;
	background: rgb(255, 72, 163);
	z-index: 10;
	transform: skewY(-45deg);
	margin-left: -5px;
}

.imgCheckFailTip::before{
	content: '查验失败';
	margin-left: 5px;
	font-size: 9pt;
	margin-top: 11px;
	position: absolute;
	transform: skew(30deg);
}


</style>
