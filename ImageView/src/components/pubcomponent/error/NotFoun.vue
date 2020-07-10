<template>
    <div>

        <div class="notFoundBox">
            <div class="notFounImg">
                <img src="../../../assets/img/500.png" >
            </div>
            <div class="notFoundContent">
                <h2>404</h2>
                <h5>Not Found</h5>
                <h5>页面失踪了...</h5>
            </div>
        </div>

    </div>    
</template>
<script>
export default {
    
}
</script>
<style lang="less">

*{
    margin: 0px;
    padding: 0px;
}

.notFoundBox{
    width: 700px;
    height: auto;
    display: flex;
    margin: 100px auto;
    border-radius: 8px;
    box-shadow: 0px 8px 15px#dddcdc;
    overflow: hidden;

    .notFounImg > img{
        width: 390px;
    }

    .notFoundContent{
        padding-top: 100px;
        text-align: center;
        width: 100%;
        > h2,h5{
            line-height: 50px;
        }
    } 
}

</style>
