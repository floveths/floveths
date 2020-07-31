<template>

    <div class="mainBox">
        <el-container > 
            <el-header style="height:50px;">
                <div class="applogo">
                    <ul>
                        <li>
                            <img src="../../../public/static/logo.png">
                        </li>
                        <li>
                            <i  class="iconfont" @click="collapseSide">&#xe613;</i>
                        </li>
                    </ul>
                </div>
                <div class="appuser">
                    <el-dropdown>
                        <img class="userlogo" src="../../../public/static/userlogo.png">
                        <span>UserName</span>
                        <i class="el-icon-arrow-down arrowdown"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><i class="fa fa-user-o" aria-hidden="true"></i>  个人信息</el-dropdown-item>
                            <el-dropdown-item><i class="fa fa-paper-plane-o" aria-hidden="true"></i> 退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>

        </el-container>

        <div class="mainContentContainer">
            <div class="mainContentLeft" v-bind:style="contentLeftStyle">
                <div class="contentLeftBar">
                    <el-aside style="background-color: rgb(238, 241, 246);overflow:hidden;width:auto;">
                        <el-menu :collapse="isCollapse" :collapse-transition="false">

                        <el-submenu index="1">
                            <template slot="title">
                                <font-awesome-icon icon="image" />
                                <span class="elSubSpan">影像管理</span></template>
                            <el-menu-item-group>
                                <router-link :to="{name:'imglist'}" ><el-menu-item index="1-1"><span>影像列表</span></el-menu-item></router-link>
                                <router-link :to="{name:'scanimage'}" ><el-menu-item index="1-2">选项2</el-menu-item></router-link>
                                <router-link :to="{name:'queryimage'}" ><el-menu-item index="1-3">影像查询</el-menu-item></router-link>
                                <router-link :to="{name:'queryticket'}"><el-menu-item index="1-4">发票查询</el-menu-item></router-link>
                                <router-link :to="{name:'viewimage'}"><el-menu-item index="1-5">发票查看</el-menu-item></router-link>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="2">
                            <template slot="title">
                                <font-awesome-icon icon="file-archive" />
                                <span class="elSubSpan">档案归档</span>
                            </template>
                            <el-menu-item-group>
                                <router-link :to="{name:'advancedquery'}" ><el-menu-item index="2-1">高级查询</el-menu-item></router-link>
                                <router-link :to="{name:'electroncinvoice'}"><el-menu-item index="2-2">电子发票</el-menu-item></router-link>
                                <router-link :to="{name:'displayboard'}"><el-menu-item index="2-3">统计展板</el-menu-item></router-link>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="3">
                            <template slot="title">
                                <font-awesome-icon icon="file-invoice" />
                                <span class="elSubSpan">档案查询</span>
                            </template>
                            <el-menu-item-group>
                                <router-link :to="{name:'documentread'}" ><el-menu-item index="3-1">档案调阅</el-menu-item></router-link>
                                <router-link :to="{name:'documentborrow'}" ><el-menu-item index="3-2">档案借阅</el-menu-item></router-link>
                                <router-link :to="{name:'borrowingapproval'}"><el-menu-item index="3-3">借阅审批</el-menu-item></router-link>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="4">
                            <template slot="title">
                                <font-awesome-icon icon="file" />
                                <span class="elSubSpan">纸质档案</span>
                            </template>
                            <el-menu-item-group>
                                <router-link :to="{name:'fileontheshelf'}" ><el-menu-item index="4-1">档案上架</el-menu-item></router-link>
                                <router-link :to="{name:'documentborrow'}" ><el-menu-item index="4-2">档案外借</el-menu-item></router-link>
                                <router-link :to="{name:'paperapproval'}" ><el-menu-item index="4-3">借阅审批</el-menu-item></router-link>
                                <router-link :to="{name:'documentsend'}"><el-menu-item index="4-4">档案归还</el-menu-item></router-link>
                                <router-link :to="{name:'documentroom'}"><el-menu-item index="4-5">档案室管理</el-menu-item></router-link>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="5">
                            <template slot="title">
                                <font-awesome-icon icon="tasks" />
                                <span class="elSubSpan">系统管理</span>
                            </template>
                            <el-menu-item-group>
                                <router-link :to="{name:'usermanage'}"><el-menu-item index="5-1">用户管理</el-menu-item></router-link>
                                <router-link :to="{name:'userrole'}"><el-menu-item index="5-2">角色管理</el-menu-item></router-link>
                                <router-link :to="{name:'menumanage'}"><el-menu-item index="5-3">系统菜单</el-menu-item></router-link>
                                <router-link :to="{name:'sensewords'}"><el-menu-item index="5-4">敏感词管理</el-menu-item></router-link> 
                                <router-link :to="{name:'datecheck'}"><el-menu-item index="5-5">节假日管理</el-menu-item></router-link>
                                <router-link :to="{name:'buyermanage'}"><el-menu-item index="5-6">购方管理</el-menu-item></router-link>
                                <router-link :to="{name:'specialcommodity'}"><el-menu-item index="5-7">特殊商品管理</el-menu-item></router-link>
                                <router-link :to="{name:'ticketsecretarycount'}"><el-menu-item index="5-8">票小蜜识别统计</el-menu-item></router-link>
                                <router-link :to="{name:'hangxingcount'}"><el-menu-item index="5-9">航信验真识别统计</el-menu-item></router-link>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="6">
                            <template slot="title">
                                <font-awesome-icon icon="microchip" />
                                <span class="elSubSpan">系统监控</span>
                            </template>
                            <el-submenu index="6-1">
                                <template slot="title">
                                    <font-awesome-icon icon="video" />
                                    <span class="elSubSpan">性能监控</span>
                                </template>
                                <el-menu-item-group>
                                    <router-link :to="{name:'tomcatmonitor'}"><el-menu-item index="6-1-1">Tomcat信息</el-menu-item></router-link>
                                    <router-link :to="{name:'serverinformation'}"><el-menu-item index="6-1-2">服务器信息</el-menu-item></router-link>
                                    <router-link :to="{name:'jvminformation'}"><el-menu-item index="6-1-3">JVM信息</el-menu-item></router-link>
                                </el-menu-item-group>
                            </el-submenu>

                        </el-submenu>

                        </el-menu>
                    </el-aside>
                </div>
            </div>

             <div class="mainContentRight">

               <router-view></router-view>

            </div>
        </div>
    </div>

</template>

<script>

export default {
    name : 'Main',
    data : function(){
        return {
            isCollapse : false,
            contentLeftStyle : {'width':'200px'}
        }
    },
    watch : {
        isCollapse : function(){
            this.isCollapse==true?this.contentLeftStyle={'width':'65px'}:this.contentLeftStyle={'width':'200px'}
        }
    },
    methods : {
        collapseSide (){
            this.isCollapse = !this.isCollapse;
        }
    }
}
</script>

<style lang="less" >

*{
    margin: 0px;
    padding: 0px;
    outline: none;
    text-decoration: none;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

.mainBox{
    overflow: hidden;
}

@font-face {
  font-family: 'iconfont';
  src: url('../../assets/fonts/iconfont.eot');
  src: url('../../assets/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
      url('../../assets/fonts/iconfont.woff2') format('woff2'),
      url('../../assets/fonts/iconfont.woff') format('woff'),
      url('../../assets/fonts/iconfont.ttf') format('truetype'),
      url('../../assets/fonts/iconfont.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


.el-header {
    background-color: rgb(255, 255, 255);
    color: #333;
    position: fixed;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px 4px 0 rgba(0,21,41,.08);
}

.elSubSpan{
    margin-left: 5px;
}

.applogo ul{
    list-style: none;
    display: flex;
    align-items: center;
    margin: 5px 0px ;
}

.applogo ul li{
    width: 125px;
    float: left;
    line-height: 40px;
}

.applogo ul li img{
    width: 100%;
}

.applogo ul li i{
    text-align: left;
    margin-left: 15px;
    font-size: 16pt;
    display: block;
    cursor: pointer;
    color: #696f77;
}

.applogo li i:hover{
    color: #7eb2f4;
}

.appuser{
    width : auto;
    height : auto;
    cursor: pointer;
    padding: 0 10px;
}

.appuser:hover{
    background: #f0f0f0;
}

.appuser:hover .arrowdown{
    transition: all .3s linear;
    transform: rotate(180deg);
}

.appuser .userlogo{
    width: 40px;
    height: 40px;
    float: left;
    border-radius: 50%;
    margin: 5px auto;
}

.appuser span{
    margin : 15px;
    line-height: 50px;
}

.el-aside {
    color: #333;
}

.el-menu{
    border-right: none;
}

a{
    text-decoration: none !important;
}

.el-submenu .el-menu-item{
    width: 162px !important;
    min-width: 160px !important;
}

.el-menu-item:focus, .el-menu-item:hover { 
    border-right: 6px solid #449cc7;
    
}

.el-submenu__title svg{
    width: 30px;
    font-size: 14pt;
    color:#9aa3ac;
}

.mainContentContainer{
    margin-top: 50px;
    display: flex;
    height:calc(100vh - 50px);
    background: #f3f6f8;
}

.mainContentLeft{
    overflow: hidden;
    background: white;
    border-right: solid 1px rgb(235, 235, 235);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    .contentLeftBar{
        height: 100%;
        width: 185px;
        overflow-y: scroll;
    }
}

.mainContentRight{
    overflow-y: scroll;
    width: 110%;
    padding: 15px;
    margin-right: -15px;
}

</style>


