<template>
    <div class="rotateImg">
		<div class="rotateImgBack">
			<div class="progress yellow">
				<h3 class="progress-title">正在矫正</h3>
				<div class="progress-bar" v-bind:style="{width:rotatevalue+'%'}">
				<div class="progress-value">{{rotatevalue}}%</div>
			</div>
			</div>
			<div class="btn btn-block closeBlock" @click="closeRotate" v-show="isfull">
				<input type="button" class="closeBtn"  value="关闭" >
			</div>
		</div>
	</div>
</template>

<script>
export default {

    props : ['rotatevalue','isfull'],
    data : function(){
        return {}
	},
	methods : {
		closeRotate (){
			this.$emit('closemodel')
		}
	}
    
}
</script>
<style lang="less">
.rotateImg{
	width: 100%;
	height: 100%;
	background: #ededed1c;
	z-index: 9999;
	position: absolute;
	top: 0;
	left: 0;
	padding: 110px 100px;
}

.rotateImgBack{
	width: 65%;
	z-index: 9999;
	position: relative;
	padding: 65px 100px 65px 210px;
	margin: 50px auto;
	border-radius: 15px;
    box-shadow: 5px 5px 15px #d4d4d4;
    background: linear-gradient(146deg, #bff56ce6, #81eab0e6);
}

.rotateImg .progress{
	height: 10px !important;
	background: #e3e3e3;
	border-radius: 5px;
	box-shadow: none;
	margin: 40px 0 80px;
	overflow: visible;
	position: relative;
}

.progress .progress-title{
	padding: 7px 5px;
	margin: 0;
	background: #393a3d;
	border-radius: 5px 0 0 5px;
	box-shadow: 0 7px 7px rgba(0,0,0,0.4);
	font-size: 18px;
	font-weight: 700;
	color: #fff;
	text-transform: uppercase;
	position: absolute;
	top: -13px;
	left: 0;
    z-index: 1;
    margin-left: -120px;
}

.progress .progress-title:after{
	content: "";
	border-left: 17px solid #393a3d;
	border-top: 18px solid transparent;
	border-bottom: 18px solid transparent;
	position: absolute;
	top: 0;
	right: -17px;
}

.rotateImg .rotateImgBack .progress .progress-bar{
	height: 10px !important;
	box-shadow: none;
	border-radius: 0;
	position: relative;
	background: linear-gradient(150deg,#f3ff33,#39dcff);
	-webkit-animation: animate-positive 2s;
	animation: animate-positive 2s;
}

.progress .progress-bar:after{
	content: "";
	width: 18px;
	height: 18px;
	border-radius: 50%;
	box-shadow: 0 4px 4px rgba(90, 87, 87, 0.6);
	background: #fff;
	position: absolute;
	right: -5px;
	top: -6px;
}

.progress .progress-value{
	width: 45px;
	height: 30px;
	line-height: 30px;
	border-radius: 3px;
	background: #393a3d;
	box-shadow: 0 5px 5px rgba(0,0,0,0.4);
	font-size: 15px;
	font-weight: 700;
	color: #fff;
	text-align: center;
	position: absolute;
	bottom: 30px;
	right: -17px;

}

.progress .progress-value:after{
	content: "";
	border-top: 7px solid #393a3d;
	border-left: 7px solid transparent;
	border-right: 7px solid transparent;
	position: absolute;
	bottom: -7px;
	left: 35%;
}


.progress.yellow .progress-bar:after{
	border: 5px solid #ffa900;
}

.closeBlock{
	width: 320px !important;
	border-radius: 5px;
	box-shadow: 2px 2px 10px #aff27e;
	background: linear-gradient(125deg,#93edb2,#baf487);
	.closeBtn{
		color: white;
		border: 0px;
		background: transparent;
	}
}

</style>

