<template>
    <div>

        <div class="imageOcrInfoBox" >

            <div class="image-info panel panel-info">
                <div class="panel-heading">
                    <p>发票信息</p>
                </div>
                <div class="panel-body">

                    <div class="temp1" v-if="type==1">

                        <div v-for="(item,i) in items" :key="i">
                            <ul v-if="item.type=='100'"  >
            
                                <li class="input-group ocrInfo">
                                
                                    <!-- <input type="hidden" v-model="fileId" /> -->

                                <li class="input-group ocrInfo"><div class="input-group-addon" >验真状态:</div>
                                    <input type="text" readonly="readonly" class="form-control" v-if="item.checkInvoice==1" value="已查验"/>
                                    <input type="text" readonly="readonly" class="form-control" v-else value="未查验"/></li>

                                <li class="input-group ocrInfo"><div class="input-group-addon" >验真结果:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.checkReason"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >税前金额:</div>  <input type="text" class="form-control five-el" v-model="item.sumAmount" /></li>
                                    <div v-for="(details,i) in item.details" :key="i">
                                        <ul v-if="item.type=='100'||item.type=='101'||item.type=='102'" >
                                            <li class="input-group ocrInfo"><div class="input-group-addon" >税额:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.tax"/></li>
                                            <li class="input-group ocrInfo"><div class="input-group-addon" >税率:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.rate"/></li>
                                            <li class="input-group ocrInfo" ><div class="input-group-addon" >服务名称:</div> <input type="text" readonly="readonly" class="form-control" v-model="details.name"/></li>
                                        </ul>
                                    </div>
                                <li class="input-group ocrInfo" ><div class="input-group-addon" > 消费类型:</div><input type="text" readonly="readonly" class="form-control" v-model="item.kind"/></li> 
                                <li class="input-group ocrInfo"><div class="input-group-addon" >合计金额:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.lowercase" /></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >大写金额:</div> <input type="text" readonly="readonly" class="form-control" v-model="item.uppercase" /></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票代码:</div>  <input type="text" class="form-control five-el" v-model="item.invoiceCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票编号:</div>  <input type="text" class="form-control five-el" v-model="item.invoiceNumber"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >开票日期:</div>  <input type="text" id="billDate" class="form-control five-el" v-model="item.invoiceDate"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >校验码:</div>  <input type="text" readonly="readonly" class="form-control five-el" v-model="item.jym" /></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerName"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerNo"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerNo"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方单位:</div>  <input type="text" readonly="readonly" style="background-color:red" class="form-control" v-model="item.sellerName"/></li>
                            </ul>

                            <ul v-else-if="item.type=='101'" >
                                <li class="input-group ocrInfo"><div class="input-group-addon" >验真状态:</div>
                                    <input type="text" readonly="readonly" class="form-control" v-if="item.checkInvoice==1" value="已查验"/>
                                    <input type="text" readonly="readonly" class="form-control" v-else value="未查验"/></li>
                                    
                                <li class="input-group ocrInfo"><div class="input-group-addon" >验真结果:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.checkReason"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >税前金额:</div>  <input type="text" class="form-control five-el" v-model="item.sumAmount" /></li>
                                    <div v-for="(details,i) in item.details" :key="i">
                                        <ul v-if="item.type=='100'||item.type=='101'||item.type=='102'" >
                                            <li class="input-group ocrInfo"><div class="input-group-addon" >税额:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.tax"/></li>
                                            <li class="input-group ocrInfo"><div class="input-group-addon" >税率:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.rate"/></li>
                                            <li class="input-group ocrInfo" ><div class="input-group-addon" >服务名称:</div><input type="text" readonly="readonly" class="form-control" v-model="details.name"/></li>
                                        </ul>
                                    </div>
                                <li class="input-group ocrInfo" ><div class="input-group-addon" > 消费类型:</div><input type="text" readonly="readonly" class="form-control" v-model="item.kind"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >合计金额:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.lowercase" /></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >大写金额:</div> <input type="text" readonly="readonly" class="form-control" v-model="item.uppercase" /></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票代码:</div>  <input type="text" class="form-control five-el" v-model="item.invoiceCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票编号:</div>  <input type="text" class="form-control five-el" v-model="item.invoiceNumber"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >开票日期:</div>  <input type="text" id="billDate" class="form-control five-el" v-model="item.invoiceDate"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >校验码:</div>  <input type="text" class="form-control five-el" v-model="item.jym " /></li>

                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerName"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerNo"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerNo"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerName"/></li>
                            </ul>

                            <ul v-else-if="item.type=='102'"  >
                                <!-- <input type="hidden" v-model="fileId" /> -->
                                
                                <li class="input-group ocrInfo"><div class="input-group-addon" >验真状态:</div>
                                    <input type="text" readonly="readonly" class="form-control" v-if="item.checkInvoice==1" value="已查验"/>
                                    <input type="text" readonly="readonly" class="form-control" v-else value="未查验"/></li>
                                    
                                <li class="input-group ocrInfo"><div class="input-group-addon" >验真结果:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.checkReason"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >税前金额:</div>  <input type="text"  class="form-control five-el" v-model="item.sumAmount" /></li>
                                    <div v-for="(details,i) in item.details" :key="i">
                                        <ul v-if="item.type=='100'||item.type=='101'||item.type=='102'" >
                                            <li class="input-group ocrInfo"><div class="input-group-addon" >税额:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.tax"/></li>
                                            <li class="input-group ocrInfo"><div class="input-group-addon" >税率:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.rate"/></li>
                                            <li class="input-group ocrInfo" ><div class="input-group-addon" >服务名称:</div><input type="text" readonly="readonly" class="form-control" v-model="details.name"/></li>
                                        </ul>
                                    </div>
                                <li class="input-group ocrInfo" ><div class="input-group-addon" > 消费类型:</div><input type="text" readonly="readonly" class="form-control" v-model="item.kind"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >合计金额:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.lowercase" /></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >大写金额:</div> <input type="text" readonly="readonly" class="form-control" v-model="item.uppercase" /></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票代码:</div>  <input type="text" class="form-control five-el" v-model="item.invoiceCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票编号:</div>  <input type="text" class="form-control five-el" v-model="item.invoiceNumber"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >开票日期:</div>  <input type="text" id="billDate" class="form-control five-el" v-model="item.invoiceDate"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >校验码:</div>  <input type="text" class="form-control five-el" v-model="item.jym" /></li>

                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerName"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerNo"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerNo"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerName"/></li>
                            </ul>
                        </div>

                    </div>

                    <div class="temp2" v-if="type==2">

                        <div v-for="(item,i) in items" :key="i" >
                            <ul v-if="item.type=='100'||item.type=='101'||item.type=='102'" >

                                <li class="input-group ocrInfo"><div class="input-group-addon" >验真状态:</div>
                                    <input type="text" readonly="readonly" class="form-control" v-if="item.checkInvoice==1" value="已查验"/>
                                    <input type="text" readonly="readonly"  class="form-control" v-else value="未查验"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >税前金额:</div>  <input type="text" class="form-control" v-model="item.sumAmount" /></li>
                                    <div v-for="(details,i) in item.details" :key="i">
                                        <ul v-if="item.type=='100'||item.type=='101'||item.type=='102'" >
                                            <li class="input-group ocrInfo"><div class="input-group-addon" >税额:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.tax"/></li>
                                            <li class="input-group ocrInfo"><div class="input-group-addon" >税率:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.rate"/></li>
                                        </ul>
                                    </div>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >合计金额:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.lowercase" /></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >大写金额:</div> <input type="text" readonly="readonly" class="form-control" v-model="item.uppercase" /></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票代码:</div>  <input type="text" class="form-control" v-model="item.invoiceCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票编号:</div>  <input type="text" class="form-control" v-model="item.invoiceNumber"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >开票日期:</div>  <input type="text" id="billDate" class="form-control" v-model="item.invoiceDate"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >校验码:</div>  <input type="text" class="form-control" v-model="item.jym" /></li>

                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerName"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerNo"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerNo"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerName"/></li>
                            </ul>
                        </div>

                    </div>

                    <div class="temp3">

                        <div v-for="(item,i) in items" :key="i">
                            <ul v-if="item.type=='103'" >
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:</div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <div v-for="(details,i) in item.details" :key="i">
                                    <ul v-if="item.type=='103'" >
                                        <li class="input-group ocrInfo"><div class="input-group-addon" >税额:  </div> <input type="text" class="form-control"   v-model="details.tax"/></li>
                                        <li class="input-group ocrInfo"><div class="input-group-addon" >税率:  </div> <input type="text" class="form-control"   v-model="details.rate"/></li>
                                    </ul>
                                </div>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >验真状态:</div>  
                                    <input type="text" class="form-control" v-if="item.checkInvoice==1" value="已查验"/>
                                    <input type="text" class="form-control" v-else value="未查验"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方单位:</div> <input type="text" class="form-control"   v-model="item.buyer"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方税号:</div> <input type="text" class="form-control"   v-model="item.buyer"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >开票日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >机打号码:  </div> <input type="text" class="form-control"   v-model="item.machineNumber"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方单位:  </div> <input type="text" class="form-control"   v-model="item.seller"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方税号:  </div> <input type="text" class="form-control"   v-model="item.sellerTaxId"/></li>
                            </ul>

                            <ul v-else-if="item.type=='104'" >
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >买方单位/个人:  </div> <input type="text" class="form-control"   v-model="item.buyer"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >买方单位代码/个人身份证号:  </div> <input type="text" class="form-control"   v-model="item.buyerId"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >车架号/车辆识别代码:  </div> <input type="text" class="form-control"   v-model="item.carCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发动机号码:  </div> <input type="text" class="form-control"   v-model="item.carEngineCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >厂牌型号:  </div> <input type="text" class="form-control"   v-model="item.carModel"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >合格证号:  </div> <input type="text" class="form-control"   v-model="item.certificateNumber"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >省:  </div> <input type="text" class="form-control"   v-model="item.province"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >市:  </div> <input type="text" class="form-control"   v-model="item.city"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >开票日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >机打代码:  </div> <input type="text" class="form-control"   v-model="item.machineCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >机打号码:  </div> <input type="text" class="form-control"   v-model="item.machineNumber"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >税前金额:  </div> <input type="text" class="form-control"   v-model="item.pretaxAmount" /> </li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方单位:  </div> <input type="text" class="form-control"   v-model="item.seller"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方电话:  </div> <input type="text" class="form-control"   v-model="item.sellerPhone"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方税号:  </div> <input type="text" class="form-control"   v-model="item.sellerTaxId"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >税额:  </div> <input type="text" class="form-control"   v-model="item.tax"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >主管税务机关:  </div> <input type="text" class="form-control"   v-model="item.taxAuthorities"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >主管税务机关代码:  </div> <input type="text" class="form-control"   v-model="item.taxAuthoritiesCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >税率:  </div> <input type="text" class="form-control"   v-model="item.taxRate"/></li>
                            </ul>

                            <ul v-else-if="item.type=='105'">
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >买方单位/个人:  </div> <input type="text" class="form-control"   v-model="item.buyer"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >买方单位代码/个人身份证号:  </div> <input type="text" class="form-control"   v-model="item.buyerId"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >车架号/车辆识别代码:  </div> <input type="text" class="form-control"   v-model="item.carCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发动机号码:  </div> <input type="text" class="form-control"   v-model="item.carEngineCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >厂牌型号:  </div> <input type="text" class="form-control"   v-model="item.carModel"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >省:  </div> <input type="text" class="form-control"   v-model="item.province"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >市:  </div> <input type="text" class="form-control"   v-model="item.city"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >二手车市场:  </div> <input type="text" class="form-control"   v-model="item.companyName"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >二手车市场纳税人识别号:  </div> <input type="text" class="form-control"   v-model="item.companyTaxId"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >开票日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >车牌号:  </div> <input type="text" class="form-control"   v-model="item.licensePlate"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >登记证号:  </div> <input type="text" class="form-control"   v-model="item.registrationNumber"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >卖方单位/个人:  </div> <input type="text" class="form-control"   v-model="item.seller"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >卖方单位代码/个人身份证号:  </div> <input type="text" class="form-control"   v-model="item.sellerId"/></li>
                            </ul>
                            
                            <ul v-else-if="item.type=='106'">
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >票号:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >省:  </div> <input type="text" class="form-control"   v-model="item.province"/></li>
                                <!--<li class="input-group ocrInfo"><div class="input-group-addon" >发票类型:  </div> <input type="text" class="form-control"   v-model="item.type"/></li>-->
                            </ul>
                            
                            <ul v-else-if="item.type=='107'">
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方名称:  </div> <input type="text" class="form-control"   v-model="item.buyer"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方税号:  </div> <input type="text" class="form-control"   v-model="item.buyerTaxId"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >校验码:  </div> <input type="text" class="form-control"   v-model="item.checkCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >省:  </div> <input type="text" class="form-control"   v-model="item.province"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >市:  </div> <input type="text" class="form-control"   v-model="item.city"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >开票日期:  </div> <input type="text" class="form-control"   v-model="item.date"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.number"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方名称:  </div> <input type="text" class="form-control"   v-model="item.seller"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >销方税号:  </div> <input type="text" class="form-control"   v-model="item.sellerTaxId"/></li>
                            </ul>
                            
                            <ul v-else-if="item.type=='108'" >
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >地址:  </div> <input type="text" class="form-control"   v-model="item.place"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >省会:  </div> <input type="text" class="form-control"   v-model="item.province"/></li>
                                <!--<li class="input-group ocrInfo"><div class="input-group-addon" >城市:  </div> <input type="text" class="form-control"   v-model="item.city"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >票价:  </div> <input type="text" class="form-control"   v-model="item.fare"/></li>-->
                                <li class="input-group ocrInfo"><div class="input-group-addon" >票号:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >里程:  </div> <input type="text" class="form-control"   v-model="item.mileage"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >校验码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >开票日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >开始时间:  </div> <input type="text" class="form-control"   v-model="item.timeGetOn"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >结束时间:  </div> <input type="text" class="form-control"   v-model="item.timeGetOff"/></li>
                            </ul>
                            
                            <!--火车票-->
                            <ul v-else-if="item.type=='109'">
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >姓名:  </div> <input type="text" class="form-control"   v-model="item.name"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >车次:  </div> <input type="text" class="form-control"   v-model="item.trainNumber"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >座位类型:  </div> <input type="text" class="form-control"   v-model="item.seat"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >序列号:  </div> <input type="text" class="form-control"   v-model="item.serialNumber"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >时间:  </div> <input type="text" class="form-control"   v-model="item.time"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >达到车站:  </div> <input type="text" class="form-control"   v-model="item.stationGetOff"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >出发车站:  </div> <input type="text" class="form-control"   v-model="item.stationGetOn"/></li>
                            </ul>
                            
                            <ul v-else-if="item.type=='110'" >
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >姓名:  </div> <input type="text" class="form-control"   v-model="item.name"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >时间:  </div> <input type="text" class="form-control"   v-model="item.time"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >达到车站:  </div> <input type="text" class="form-control"   v-model="item.stationGetOff"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >出发车站:  </div> <input type="text" class="form-control"   v-model="item.stationGetOn"/></li>
                            </ul>
                            
                            <ul v-else-if="item.type=='111'" >
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >票价:  </div> <input type="text" class="form-control"   v-model="item.fare"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >航班名称:  </div> <input type="text" class="form-control"   v-model="item.userName"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >票号:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >校验码:  </div> <input type="text" class="form-control"   v-model="item.checkCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >机场建设费:  </div> <input type="text" class="form-control"   v-model="item.caacDevelopmentFund"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发行公司:  </div> <input type="text" class="form-control"   v-model="item.issueBy"/></li>
                            </ul>
                            
                            <ul v-else-if="item.type=='112'" >
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >姓名:  </div> <input type="text" class="form-control"   v-model="item.name"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >省:  </div> <input type="text" class="form-control"   v-model="item.province"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >市:  </div> <input type="text" class="form-control"   v-model="item.city"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >币种:  </div> <input type="text" class="form-control"   v-model="item.currencyCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >时间:  </div> <input type="text"  class="form-control"   v-model="item.time"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >达到车站:  </div> <input type="text" class="form-control"   v-model="item.stationGetOff"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >出发车站:  </div> <input type="text" class="form-control"   v-model="item.stationGetOn"/></li>
                            </ul>
                            
                            <ul v-else-if="item.type=='113'" >
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >入口:  </div> <input type="text" class="form-control"   v-model="item.entrance"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >出口:  </div> <input type="text" class="form-control"   v-model="item.exit"/></li>
                            </ul>
                            
                            <ul v-else-if="item.type=='115'" >
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >币种:  </div> <input type="text" class="form-control"   v-model="item.currencyCode"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >折扣:  </div> <input type="text" class="form-control"   v-model="item.discount"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >店名:  </div> <input type="text" class="form-control"   v-model="item.storeName"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >小计:  </div> <input type="text" class="form-control"   v-model="item.subtotal"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >税费:  </div> <input type="text" class="form-control"   v-model="item.tax"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >小费:  </div> <input type="text" class="form-control"   v-model="item.tips"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >时间:  </div> <input type="text" class="form-control"   v-model="item.time"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
                            </ul>
                            
                            <ul v-else-if="item.type=='116'" >
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票类型:  </div> <input type="text" class="form-control"   v-model="item.type"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >行程人手机号:  </div> <input type="text" class="form-control"   v-model="item.phone"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >行程开始时间:  </div> <input type="text" class="form-control"   v-model="item.dateStart"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >行程结束时间:  </div> <input type="text" class="form-control"   v-model="item.dateEnd"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >日期:  </div> <input type="text" class="form-control"   v-model="item.date"/></li>
                            </ul>
                            
                            <ul v-else-if="item.type=='117'" >
                                <li class="input-group ocrInfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票类型:  </div> <input type="text" class="form-control"   v-model="item.type"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方名称:  </div> <input type="text" class="form-control"   v-model="item.buyer"/></li>
                                <li class="input-group ocrInfo"><div class="input-group-addon" >购方税号:  </div> <input type="text" class="form-control"   v-model="item.buyerTaxId"/></li>
                            </ul>
                            
                            <ul v-else-if="item.type=='000'||item.type=='444'" >
                                <li class="title">其它</li>
                            </ul> 

                        </div>
                    </div>

                </div>

                <div class="panel-footer" v-if="type==1">
                    <ul style="width:100%">
                        <div v-for="(item,i) in items" :key="i">
                            <li v-if="item.type==100||item.type==101||item.type==102">
                                <div v-if="item.checkInvoice!=1" class="row">
                                    <div class="col-md-6">
                                        <button type="button" v-on:click="checkOcr" class="btn btn-check btn-sm btn-block">验 真</button>
                                    </div>
                                    <div class="col-md-6">
                                        <button type="button" v-on:click="saveOcr" class="btn btn-sure btn-sm btn-block">保 存</button>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
            
        </div>

    </div>
</template>
<script>
import util from '../../../utils/util.js'

export default {
    props : ['items','type'],
    methods : {
        checkOcr(){

        },
        saveOcr(){
            let data = null;
            var type = this.items[0].type;

            if (type == 100 || type == 101 || type == 102) {
                data = {
                    "fileId": this.items[0].fileId,
                    "sumAmount": this.items[0].sumAmount,
                    "invoiceCode": this.items[0].invoiceCode,
                    "invoiceNumber": this.items[0].invoiceNumber,
                    "invoiceDate": this.items[0].invoiceDate,
                    "jym": this.items[0].jym
                };
                util.postRequest('/invoice/updateOcrInfoInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!');
                    } 
                });
            } else if (type == 109) {
                data = {
                    "fileId": this.items[0].fileId,
                    "number": this.items[0].number,
                    "date": this.items[0].date,
                    "time": this.items[0].time,
                    "stationGetOn": this.items[0].stationGetOn,
                    "stationGetOff": this.items[0].stationGetOff,
                    "trainNumber": this.items[0].trainNumber,
                    "seat": this.items[0].seat,
                    "total": this.items[0].total,
                    "name": this.items[0].name,
                    "kind": this.items[0].kind,
                    "serialNumber": this.items[0].serialNumber,
                    "userId": this.items[0].userId,
                    "type": this.items[0].type,
                    "invoiceDatas": this.items[0].invoiceDatas
                };
                util.postRequest('/invoice/updateRailwayTicketInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!')
                    } 
                });
            } else if (type == 116) {
                data = {
                    "fileId": this.items[0].fileId,
                    "total": this.items[0].total,
                    "type": this.items[0].type,
                    'dateStart': this.items[0].dateStart,
                    'dateEnd': this.items[0].dateEnd,
                    'phone': this.items[0].phone
                };
                util.postRequest('/invoice/updateDidiItineraryInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!');
                    }
                });
            } else if (type == 108) {
                data = {
                    "fileId": this.items[0].fileId,
                    "total": this.items[0].total,
                    "place": this.items[0].place,
                    "province": this.items[0].province,
                    "invoiceDate": this.items[0].invoiceDate,
                    "number": this.items[0].number,
                    "mileage": this.items[0].mileage,
                    "code": this.items[0].code,
                    "date": this.items[0].date,
                    "timeGetOn": this.items[0].timeGetOn,
                    "timeGetOff": this.items[0].timeGetOff
                };
                util.postRequest('/invoice/updateTaxiTicketsInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!');
                    } 
                });
            } else if (type == 106) {
                data = {
                    "fileId": this.items[0].fileId,
                    "total": this.items[0].total,
                    "number": this.items[0].number,
                    "code":this.items[0].code
                };
                util.postRequest('/invoice/updateQuotaInvoiceInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!');
                    } 
                });
            } else if (type == 111) {
                data = {
                    "fileId": this.items[0].fileId,
                    "total": this.items[0].total,
                    "fare": this.items[0].fare,
                    "userName": this.items[0].userName,
                    "number": this.items[0].number,
                    "date": this.items[0].date,
                    "checkCode": this.items[0].checkCode,
                    "caacDevelopmentFund": this.items[0].caacDevelopmentFund,
                    "issueBy": this.items[0].issueBy
                };
                util.postRequest('/invoice/updateFlightItineraryInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!');
                    } 
                });
            } else if (type == 110) {
                data = {
                    "fileId": this.items[0].fileId,
                    "name": this.items[0].name,
                    "code": this.items[0].code,
                    "time": this.items[0].time,
                    "number": this.items[0].number,
                    "date": this.items[0].date,
                    "stationGetOff": this.items[0].stationGetOff,
                    "stationGetOn": this.items[0].stationGetOn
                };
                util.postRequest('/invoice/updatePassengerTicketInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!');
                    } 
                });
            } else if (type == 104) {
                data = {
                    "fileId": this.items[0].fileId,
                    "total": this.items[0].total,
                    "buyer": this.items[0].buyer,
                    "buyerId": this.items[0].buyerId,
                    "carCode": this.items[0].carCode,
                    "carEngineCode": this.items[0].carEngineCode,
                    "carModel": this.items[0].carModel,
                    "certificateNumber": this.items[0].certificateNumber,
                    "province": this.items[0].province,
                    "city": this.items[0].city,
                    "code": this.items[0].code,
                    "date": this.items[0].date,
                    "machineCode": this.items[0].machineCode,
                    "machineNumber": this.items[0].machineNumber,
                    "number": this.items[0].number,
                    "pretaxAmount": this.items[0].pretaxAmount,
                    "seller": this.items[0].seller,
                    "sellerPhone": this.items[0].sellerPhone,
                    "sellerTaxId": this.items[0].sellerTaxId,
                    "tax": this.items[0].tax,
                    "taxAuthorities": this.items[0].taxAuthorities,
                    "taxAuthoritiesCode": this.items[0].taxAuthoritiesCode,
                    "taxRate": this.items[0].taxRate
                };
                util.postRequest('/invoice/updateMotorVehicleSaleInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!');
                    } 
                });
            } else if (type == 115) {
                data = {
                    "fileId": this.items[0].fileId,
                    "total": this.items[0].total,
                    "currencyCode": this.items[0].currencyCode,
                    "discount": this.items[0].discount,
                    "storeName": this.items[0].storeName,
                    "subtotal": this.items[0].subtotal,
                    "tax": this.items[0].tax,
                    "tips": this.items[0].tips,
                    "time": this.items[0].time,
                    "date": this.items[0].date
                };
                util.postRequest('/invoice/updateReceiptInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!');
                    } 
                });
            } else if (type == 113) {
                data = {
                    "fileId": this.items[0].fileId,
                    "total": this.items[0].total,
                    "code": this.items[0].code,
                    "exit": this.items[0].exit,
                    "number": this.items[0].number,
                    "entrance": this.items[0].entrance
                };
                util.postRequest('/invoice/updateTollRoadsInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!');
                    } 
                });
            } else if (type == 112) {
                data = {
                    "fileId": this.items[0].fileId,
                    "total": this.items[0].total,
                    "code": this.items[0].code,
                    "name": this.items[0].name,
                    "city": this.items[0].city,
                    "currencyCode": this.items[0].currencyCode,
                    "time": this.items[0].time,
                    "date": this.items[0].date,
                    "stationGetOn": this.items[0].stationGetOn,
                    "stationGetOff": this.items[0].stationGetOff
                };
                util.postRequest('/invoice/updateSteamerTicketInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!');
                    } 
                });
            } else if (type == 105) {
                data = {
                    "fileId": this.items[0].fileId,
                    "total": this.items[0].total,
                    "buyer": this.items[0].buyer,
                    "buyerId": this.items[0].buyerId,
                    "carCode": this.items[0].carCode,
                    "carEngineCode": this.items[0].carEngineCode,
                    "carModel": this.items[0].carModel,
                    "province": this.items[0].province,
                    "city": this.items[0].city,
                    "code": this.items[0].code,
                    "companyName": this.items[0].companyName,
                    "companyTaxId": this.items[0].companyTaxId,
                    "date": this.items[0].date,
                    "licensePlate": this.items[0].licensePlate,
                    "number": this.items[0].number,
                    "registrationNumber": this.items[0].registrationNumber,
                    "seller": this.items[0].seller,
                    "sellerId": this.items[0].sellerId
                };
                util.postRequest('/invoice/updateUsedCarSalesInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!');
                    } 
                });
            } else if (type == 103) {
                data = {
                    "fileId": this.items[0].fileId,
                    "buyer": this.items[0].buyer,
                    "buyerTaxId": this.items[0].buyerTaxId,
                    "date": this.items[0].date,
                    "code": this.items[0].code,
                    "machineNumber": this.items[0].machineNumber,
                    "number": this.items[0].number,
                    "seller": this.items[0].seller,
                    "sellerTaxId": this.items[0].sellerTaxId
                };
                util.postRequest('/invoice/updateMotorVehicleSaleInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!');
                    } 
                });
            } else if (type == 107) {
                data = {
                    "fileId": this.items[0].fileId,
                    'total': this.items[0].total,
                    "buyer": this.items[0].buyer,
                    "buyerTaxId": this.items[0].buyerTaxId,
                    "date": this.items[0].date,
                    "code": this.items[0].code,
                    "checkCode": this.items[0].checkCode,
                    "province": this.items[0].province,
                    "seller": this.items[0].seller,
                    "billDate": this.items[0].billDate,
                    "sellerTaxId": this.items[0].sellerTaxId
                };
                util.postRequest('/invoice/updateMotorVehicleSaleInvoce', data, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == '2') {
                        util.showModelTip('success','修改成功!');
                    }
                });
            }

        }
    }
}
</script>
<style lang="less">

*{
    margin: 0px;
    padding: 0px;
}

.imageOcrInfoBox{
    width: auto;
    height: auto;
    font-size: 10pt;
    border-radius: 5px;
    position: relative;
    background: linear-gradient(120deg, #7df395, #7dbafa);

     .image-info{
        color: white;
        font-size: 12pt !important;
        text-align: center !important;
        line-height: 35px !important;
        border-bottom: 1px solid #eaeaea !important;
        
        ul{
            list-style: none;
        }
    }

    .ocrInfo{
        margin: 0px;
        width: 270px !important;
        
        div{
            color: white;
            margin: 0px 5px;
            font-size: 11pt;
        }
        input{
            color: white;
            width: 150px;
            height: 25px;
            border: none;
            font-size: 11pt;
            background: transparent !important;
            border-bottom: 1px solid #eaffdf !important;
        }
    }

    .image-info{
        width: auto;
        height: 90%;
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        border: 0px !important;
        background: transparent !important;
    }

    .btn-check{
        color: white;
        background: #ff863e;
        box-shadow: 0px 2px 4px #fd8657;
    }
    .btn-sure{
        color: white;
        background: #67a0f9;
        box-shadow: 0px 2px 4px #7fc2fd;
    }

}

</style>
