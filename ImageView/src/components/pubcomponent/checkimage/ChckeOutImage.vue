<template>
    <div class="checkImgBox">
        <div class="modelbox">
            <div class="panel panel-warning">
                <div class="panel-header">
                    <h4 class="text text-center">审核影像</h4>
                </div>
                <div class="modal-body">
                    <div id="dvchecks">
                            <div>
                            <input class="chk" type="radio" v-model="checkbox" name="chok" value="1" />
                            <label>影像和实物一致</label>
                            </div>
                            <div>
                            <input class="chk"  type="radio" v-model="checkbox" name="chok" value="2" />
                            <label>影像不清晰</label>
                            </div>
                            <div>
                            <input  class="chk" type="radio" v-model="checkbox" name="chok" value="3" />
                            <label>影像与实物不一致</label>
                            </div>
                            <div>
                            <input  class="chk" type="radio" v-model="checkbox" name="chok" value="4" />
                            <label>其他</label>
                            </div>
                    </div>
                    <textarea class="txtReview" v-model="textview"></textarea>
                    <div class="row">
                        <div class="col-sm-4">
                            <input class="chk" name="cb" v-model="radio" type="radio" value="passed" /><label>审核通过</label>
                        </div>
                        <div class="col-sm-4">
                            <input class="chk" name="cb" v-model="radio" type="radio" value="addImage" /><label>驳回补扫</label>
                        </div>
                        <div class="col-sm-4">
                            <input class="chk" name="cb" v-model="radio" type="radio" value="scanAgain"/><label>驳回重扫</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="button" v-on:click="submitchekimg" class="btn btn-sm btn-submit" value="提交">
                    <input type="button" v-on:click="closecheckimg" class="btn btn-sm btn-close" value="关闭">
                </div>
            </div>
        </div>
	</div>
</template>
<script>

import util from '../../../utils/util.js'

export default {
    props : ['busno','userno'],
	data: function(){
		return  {
			textview : "",
			checkbox : [],
			radio : []
		}
    },
    methods : {
		closecheckimg : function(){
			this.$emit('closecheckimg');
		},
		submitchekimg : function(){
			
            let param = {
                "businessSerialNo": this.busno,
                "userNo": this.userno,
                "commentId": this.checkbox,
                "view": this.textview,
                "optionsRadios": this.radio
            } 
			
            let url ='/webShowImage/updateBillState';
            util.postRequest(url,param,(res)=>{
                if(res.body.data.status==200){
					util.showModelTip('success','提交审核成功!')
				}else if(res.body.data.status==500){
                    util.showModelTip('warning',res.body.data.message+'!');
					return false;
				}
            });
			
		}
	}
}
</script>
<style lang="less">
.checkImgBox{
	top: 0;
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 999999;
}

.checkImgBox .modelbox{
	width: 450px;
	display: block;
    margin: 100px auto;
    background: white;
    border-radius: 5px;
    padding-top: 35px;
	box-shadow: 0px 8px 30px #8e8e8e;
}

.checkImgBox .txtReview{
	height: 150px;
	margin: 10px 0px;
	max-width: 418px;
	min-width: 418px;
	border: 1px solid #ccc;
	border-radius: 5px;
}
.btn-close,.btn-submit{
    width: 120px;
    height: 30px;
    color: white;
}

.btn-close,.btn-submit{
    box-shadow: 0px 2px 5px #ff761b;
    background: linear-gradient(27deg, #ff8236, #ff8b0f);
}

.btn-submit{
    box-shadow: 0px 2px 5px #b0fd39;
    background: linear-gradient(107deg, #c1ff64, #85ff64);
}
</style>
