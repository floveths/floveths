<template>

    <div class="folderBox">

        <div class="folderMainBox">
            <div class="folderTitle">
                <span>影像池文件夹...</span>
                <span  @click="$store.commit('showAppFolder')"><i class="el-icon-close"></i> </span>
            </div>
            <div class="folderContent">
                <div class="fcontent">
                    <ul class="folderUl">
                        <li @click="showAppPool">
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                        <li>
                            <img class="folderImg" src="../../../assets/img/folder.png">
                            <span class="folderName">sdgdg</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>

</template>
<script>
export default {
    methods : {
        showAppPool(){
            this.$emit('showAppPoolView');
        }
    }
}
</script>
<style lang="less">

*{
    margin: 0px;
    padding: 0px;
}

.folderBox{
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

.folderMainBox{
    width: 1100px;
    height: 560px;
    display: block;
    position: relative;
    margin: auto;
    background: white;
    overflow: hidden;
    border-radius: 5px; 
    box-shadow: 0px 5px 18px rgb(185, 183, 183);

    .folderTitle{
        display: flex;
        height: 35px;
        text-align: left;
        line-height: 35px;
        width: 100%;
        background: white;
        padding:0px 15px;
        justify-content: space-between;
        box-shadow: 0px 5px 6px rgb(240, 240, 240);
    }

    .folderContent{
        height: 92%;
        width: 1120px;
        overflow-y: auto;
    }

    .fcontent{
        height: auto;
        width: 1100px;
    }

    .folderUl{
        list-style: none;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        > li{
            width: 162px;
            height: 162px;
            margin: 10px;
            padding: 15px;
            cursor: pointer;
            position: relative;
            box-sizing: border-box;
            border-radius: 5px;
            box-shadow: 0px 5px 18px rgb(211, 206, 206);
        }

        .folderImg{
            width: 100%;
        }
        .folderName{
            width: 100%;
            height: auto;
            bottom: 0;
            word-wrap: break-word;
            word-break: break-all;
            display: block;
            position: absolute;
        }
    }
}

.folderBox .el-icon-plus{
    cursor: pointer;
    font-size: 18pt !important;
}

</style>
