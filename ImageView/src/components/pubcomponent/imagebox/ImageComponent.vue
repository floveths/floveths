<template>
    <div>
        <div class="boxView">
			<div class="content">
				<div class="row">
					<div class="col-md-12">
						<div class="panel panel-default" v-for="(data,index) in data" style="margin-top: 20px;"  v-show="data.typeNum > 0"  v-bind:key="index">
							<div class="panel-heading text-center">
								<span>{{data.typeName}} 共 {{data.typeNum}} 张影像</span>
							</div>
							
							<div class="panel-body" :title="data.id">
								<vuedragable v-model="data.children" group="people" v-bind="dragOptions" @start="dragStart($event,index)" @end="dragEnd" class="row">
									<div class=" col-md-3 col-sm-3 col-xs-6 dragItem" 
										v-for="(data,s) in data.children"
										:data-fileid="data.fielId"
										:data-name="data.name"
										:data-id="data.id"
										:itemid="s+'`'+data.fielId"
										v-bind:key="s"
										v-show="data.show">
										
										<div class="img-thumbnails" @mouseover="showErrorInfo" @mouseout="unShowErrorInfo">
											<div class="imgTip1" v-show="data.imgTip!=''" :class="data.imgTip"></div>
											<img  class="img cutImg" :src="data.sliceTip"  />
											<img v-bind:src="data.imageSrc" @dblclick="showBigImg" @click="chooseThumbImg" v-bind:name="data.fielId" v-bind:id="data.curImgIndex"  class="img " >	
											<input type="checkbox" v-model="picked" :id="data.fielId" :value="data.fielId" class="checkdiv" @change="hasChecked"/>
											<label class="checkLabel" :for="data.fielId"></label>
											<input type="text" :value="data.imgName" class="reImgName" v-bind:name="data.fielId" v-on:blur="fileReName"/>
										</div>

									</div>
								</vuedragable>
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

		<!-- <transition name="up">
			<imagedialog :imgSrc="bigImgUrl" v-show="isShowBigImg" @closeModel="closeDialogModel" :showBar="true" :ticketId="fielId" :appPoolData="[]" ></imagedialog>
		</transition> -->
    </div>

</template>

<script>

import errorTip from './ErorrTip'
import vueDragAble from 'vuedraggable'
import util from '../../../utils/util.js'
import par from '../../../utils/param.js'
import Util from '../../../utils/util.js';

export default {
	props : ['data'],
	data : function() {
		return {
			'imgTip' : '',
			'tipX' : 0,
			'tipY' : 0,
			'dragDelete' : [],
			'isDrag': false,
			'showErrorTip' : false,
			'errorTipValue' : null,
			'picked' : par.pickImage,
			'isKeyControlDown' : false
		};
	},
	components : {
		'errortip' : errorTip,
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
				let arr = document.getElementsByClassName('img-thumbnails');
				for(let o=0;o<arr.length;o++){
					arr[o].style.border = '1px solid #ddd';
				}
			}
		});

	},
	methods : {
		showBigImg(e){
			
			let msg = {'url':e.target.src,'fileId':e.target.name};
			this.$store.commit('changeImgIndex',e.target.id);
			this.$emit('showBigImg',msg)
		},
		hasChecked(){
			par.pickImage = this.picked
		},
		fileReName(e){
			
			util.fileReName(e.target.name,e.target.value);
		},
		chooseThumbImg:function(e){

			if(e.ctrlKey){
				par.pickImage.push(e.target.name);
				e.target.parentElement.style.border = '3px solid #ffaf17';
			}
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
		dragToDelete(){

			if(this.dragDelete.length>0){
				var index = this.dragDelete[0].nodeIndex;
				var imgIdex = this.dragDelete[0].imgValue.split('`')[0];
				var imgFileId = this.dragDelete[0].imgValue.split('`')[1];

				par.imgData[index].typeNum -= 1; 
				var bool = par.imgData[index].children[imgIdex].isUpload;
				par.imgData[index].children.splice(imgIdex,1);
				
				this.dragDelete = [];//立即清空;
				if(!bool){
					
					let uploadArr = par.uploadImageArr.filter((i)=>{
						return i.fielId != imgFileId;
					});

					let viewArr = par.imgTotalArr.filter((e)=>{
						return e.imgFielId != imgFileId;
					});

					par.uploadImgCount-=1;
					par.imgTotalArr = viewArr;
					par.uploadImageArr = uploadArr;
					this.$store.commit('changeImgCount','-');

				}else{
					Util.postRequest();
				}
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
    box-shadow: 0px 0px 25px #bbb !important;
    background: white !important;
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

.reImgName{
	border: 0px;
	width: 100%;
	position: absolute;
	z-index: 10;
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
		width: 110px;
		height: 50px;
		background: rgb(84, 233, 79);
		z-index: 10;
		transform: skewY(-45deg);
		margin-left: -22px;
	}
.imgSucTip::before{
		content: '上传成功';
		margin-left: 20px;
		font-size: 10pt;
		margin-top: 11px;
		position: absolute;
		transform: skew(28deg);
	}

</style>
