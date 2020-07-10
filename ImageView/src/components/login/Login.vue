<template>
    <div class="loginBack">

        <div class="contentLeft">

            <div class="loginForm">
                <div class="logoBox">
                    <img src="../../assets/img/imgLogo.png" >
                </div>
                <div class="inputBox">
                    <div class="inputForm">
                        <div class="inputGroup">
                            <input type="text" name="userName" v-on:blur="valideInput" v-model="userName" placeholder="用户名/user name">
                        </div>
                        <div class="inputGroup">
                            <input type="password" autocomplete="false" v-on:blur="valideInput" name="passWord" v-model="passWord" placeholder="密码/passwrod">
                        </div>

                        <button class="subLogin" v-on:click="subLogin">登录</button>
                    </div>
                </div>

            </div>

        </div>
        <div class="contentRight">
           <img src="../../assets/img/backlogo.png" >
        </div>

    </div>

</template>

<script>
import util from '../../utils/util'
//import {MessageBox} from 'element-ui'

export default {
    props : [],
    data : function(){
        return {
            userName : null,
            passWord : null,
            validCode : null,
            randomCode : null
        };
    },
    mounted : function(){

    },
    methods : {
        valideInput : function(){
           
            util.valideInput(this.userName,'用户名');
            util.valideInput(this.passWord,'密码');

        },
        subLogin : function(){

           this.valideInput();
            var param = {'username':this.userName,'password':this.passWord};
            util.postRequest('http://192.168.0.40:8080/sys/login',param,(res)=>{

               if(res.body.flag==false){
                   util.showModelTip('warning',res.body.msg);
                   return false;
               }else{
                    
                    this.$router.push('/index')
                    this.$store.commit('setCookie',param);
               }

            });

        }
    }
}
</script>

<style lang="less" >

*{
    margin: 0px;
    padding: 0px;
}

.loginBack{
    display: flex;
    position: fixed;
}

.contentLeft{
    width: 400px;
    height: 100vh;
    padding: 60px 20px;
    position: relative;
}

.loginForm{
    top: 50%;
    left: 50%;
    width: 80%;
    height: 300px;
    border-radius: 5px;
    position: relative;
    border: 1px solid #ecebeb;
    transform: translate(-50%,-65%);
    box-shadow: 0px 5px 48px #ccc;
}

.logoBox {
    width: 100px;
    height: 100px;
    position: absolute;
    border-radius: 50%;
    top: -20%;
    left:50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:  -50px;
    background : white;
    box-shadow: 0px 5px 5px #e6e2e2;
}

.logoBox img{
    width: 100%;
}

.contentRight{
    width: calc(100vw - 400px);
}

.contentRight img{
    width: 100%;
    transition: all 3s linear infinite;
    animation: slideImg 15s linear .3s infinite alternate;
}

@keyframes slideImg{
    0%{
        transform: translateY(-0%);
    }
    100%{
        transform: translateY(-40%);
    }
}

.inputBox{
    margin-top: 55px;
    padding: 0px 25px;
    position: relative;
}

.inputGroup input{
    margin: 20px 0px;
    height: 25px;
    width: 100%;
    border: none;
    font-size: 14px;
    padding-left: 5px;
    box-sizing: border-box;
    border-bottom: 1px solid #ece8e8;
}

.inputGroup input:focus{
    transition: all .8s linear;
    border-bottom: 1px solid #4cb0f9;
}

.subLogin{
    width: 160px;
    height: 35px;
    margin: 35px auto;
    display: block;
    position: relative;
    border: 0px ;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    background: #4cb0f9;
    animation: breath 2s infinite;
}

@keyframes breath{
    0% {
        -webkit-box-shadow: 0 0 0 
    rgba(27, 154, 247, 0.3);
    box-shadow: 0 0 0
        rgba(27, 154, 247, 0.3);
    }
    50% {
        -webkit-box-shadow: 0 0 20px 
    rgba(27, 154, 247, 0.8);
    box-shadow: 0 0 20px
        rgba(27, 154, 247, 0.8);
    }
    100% {
        -webkit-box-shadow: 0 0 0 
    rgba(27, 154, 247, 0.3);
    box-shadow: 0 0 0
        rgba(27, 154, 247, 0.3);
    }

}


</style>
