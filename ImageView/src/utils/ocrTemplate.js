var ocrTemp1 =`
    <ul v-if="item.type==100" v-for="item in items" >
           
            <li class="input-group ocrinfo">
            
                <input type="hidden" v-model="fileId" />

            <li class="input-group ocrinfo"><div class="input-group-addon" >验真状态:</div>
                <input type="text" readonly="readonly" class="form-control" v-if="item.checkInvoice==1" value="已查验"/>
                <input type="text" readonly="readonly" class="form-control" v-else value="未查验"/></li>

            <li class="input-group ocrinfo"><div class="input-group-addon" >验真结果:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.checkReason"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >税前金额:</div>  <input type="text" class="form-control five-el" v-model="sumAmount" /></li>
                <ul v-if="item.type==100||item.type==101||item.type==102" v-for="details in item.details">
                    <li class="input-group ocrinfo"><div class="input-group-addon" >税额:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.tax"/></li>
                    <li class="input-group ocrinfo"><div class="input-group-addon" >税率:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.rate"/></li>
                    <li class="input-group ocrinfo" ><div class="input-group-addon" >服务名称:</div> <input type="text" readonly="readonly" class="form-control" v-model="details.name"/></li>
                </ul>
            <li class="input-group ocrinfo" ><div class="input-group-addon" > 消费类型:</div><input type="text" readonly="readonly" class="form-control" v-model="item.kind"/></li> 
            <li class="input-group ocrinfo"><div class="input-group-addon" >合计金额:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.lowercase" /></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >大写金额:</div> <input type="text" readonly="readonly" class="form-control" v-model="item.uppercase" /></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票代码:</div>  <input type="text" class="form-control five-el" v-model="invoiceCode"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票编号:</div>  <input type="text" class="form-control five-el" v-model="invoiceNumber"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >开票日期:</div>  <input type="text" id="billDate" class="form-control five-el" v-model="invoiceDate"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >校验码:</div>  <input type="text" readonly="readonly" class="form-control five-el" v-model="jym" readonly="readonly" /></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >购方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerName"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >购方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerNo"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >销方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerNo"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >销方单位:</div>  <input type="text" readonly="readonly" style="background-color:red" class="form-control" v-model="item.sellerName"/></li>
        </ul>

        <ul v-if="item.type==101" v-for="item in items" >
            <input type="hidden" v-model="fileId" />
            <li class="input-group ocrinfo"><div class="input-group-addon" >验真状态:</div>
                <input type="text" readonly="readonly" class="form-control" v-if="item.checkInvoice==1" value="已查验"/>
                <input type="text" readonly="readonly" class="form-control" v-else value="未查验"/></li>
                
            <li class="input-group ocrinfo"><div class="input-group-addon" >验真结果:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.checkReason"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >税前金额:</div>  <input type="text" class="form-control five-el" v-model="sumAmount" /></li>
                <ul v-if="item.type==100||item.type==101||item.type==102" v-for="details in item.details">
                    <li class="input-group ocrinfo"><div class="input-group-addon" >税额:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.tax"/></li>
                    <li class="input-group ocrinfo"><div class="input-group-addon" >税率:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.rate"/></li>
                    <li class="input-group ocrinfo" ><div class="input-group-addon" >服务名称:</div><input type="text" readonly="readonly" class="form-control" v-model="details.name"/></li>
                </ul>
                <li class="input-group ocrinfo" ><div class="input-group-addon" > 消费类型:</div><input type="text" readonly="readonly" class="form-control" v-model="item.kind"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >合计金额:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.lowercase" /></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >大写金额:</div> <input type="text" readonly="readonly" class="form-control" v-model="item.uppercase" /></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票代码:</div>  <input type="text" class="form-control five-el" v-model="invoiceCode"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票编号:</div>  <input type="text" class="form-control five-el" v-model="invoiceNumber"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >开票日期:</div>  <input type="text" id="billDate" class="form-control five-el" v-model="invoiceDate"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >校验码:</div>  <input type="text" class="form-control five-el" v-model="jym " /></li>

            <li class="input-group ocrinfo"><div class="input-group-addon" >购方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerName"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >购方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerNo"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >销方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerNo"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >销方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerName"/></li>
        </ul>

        <ul v-if="item.type==102" v-for="item in items" >
            <input type="hidden" v-model="fileId" />
             
            <li class="input-group ocrinfo"><div class="input-group-addon" >验真状态:</div>
                <input type="text" readonly="readonly" class="form-control" v-if="item.checkInvoice==1" value="已查验"/>
                <input type="text" readonly="readonly" class="form-control" v-else value="未查验"/></li>
                
            <li class="input-group ocrinfo"><div class="input-group-addon" >验真结果:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.checkReason"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >税前金额:</div>  <input type="text"  class="form-control five-el" v-model="sumAmount" /></li>
                <ul v-if="item.type==100||item.type==101||item.type==102" v-for="details in item.details">
                    <li class="input-group ocrinfo"><div class="input-group-addon" >税额:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.tax"/></li>
                    <li class="input-group ocrinfo"><div class="input-group-addon" >税率:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.rate"/></li>
                    <li class="input-group ocrinfo" ><div class="input-group-addon" >服务名称:</div><input type="text" readonly="readonly" class="form-control" v-model="details.name"/></li>
                </ul>
            <li class="input-group ocrinfo" ><div class="input-group-addon" > 消费类型:</div><input type="text" readonly="readonly" class="form-control" v-model="item.kind"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >合计金额:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.lowercase" /></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >大写金额:</div> <input type="text" readonly="readonly" class="form-control" v-model="item.uppercase" /></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票代码:</div>  <input type="text" class="form-control five-el" v-model="invoiceCode"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票编号:</div>  <input type="text" class="form-control five-el" v-model="invoiceNumber"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >开票日期:</div>  <input type="text" id="billDate" class="form-control five-el" v-model="invoiceDate"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >校验码:</div>  <input type="text" class="form-control five-el" v-model="jym" /></li>

            <li class="input-group ocrinfo"><div class="input-group-addon" >购方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerName"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >购方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerNo"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >销方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerNo"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >销方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerName"/></li>
        </ul>
`;

var ocrTemp2 =`
    <ul v-if="item.type==100||item.type==101||item.type==102" v-for="item in items" >

        <li class="input-group ocrinfo"><div class="input-group-addon" >验真状态:</div>
            <input type="text" readonly="readonly" class="form-control" v-if="item.checkInvoice==1" value="已查验"/>
            <input type="text" readonly="readonly"  class="form-control" v-else value="未查验"/></li>
        <li class="input-group ocrinfo"><div class="input-group-addon" >税前金额:</div>  <input type="text" class="form-control" v-model="item.sumAmount" /></li>
            <ul v-if="item.type==100||item.type==101||item.type==102" v-for="details in item.details">
                <li class="input-group ocrinfo"><div class="input-group-addon" >税额:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.tax"/></li>
                <li class="input-group ocrinfo"><div class="input-group-addon" >税率:  </div> <input type="text" readonly="readonly" class="form-control" v-model="details.rate"/></li>
            </ul>
        <li class="input-group ocrinfo"><div class="input-group-addon" >合计金额:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.lowercase" /></li>
        <li class="input-group ocrinfo"><div class="input-group-addon" >大写金额:</div> <input type="text" readonly="readonly" class="form-control" v-model="item.uppercase" /></li>
        <li class="input-group ocrinfo"><div class="input-group-addon" >发票代码:</div>  <input type="text" class="form-control" v-model="item.invoiceCode"/></li>
        <li class="input-group ocrinfo"><div class="input-group-addon" >发票编号:</div>  <input type="text" class="form-control" v-model="item.invoiceNumber"/></li>
        <li class="input-group ocrinfo"><div class="input-group-addon" >开票日期:</div>  <input type="text" id="billDate" class="form-control" v-model="item.invoiceDate"/></li>
        <li class="input-group ocrinfo"><div class="input-group-addon" >校验码:</div>  <input type="text" class="form-control" v-model="item.jym" /></li>

        <li class="input-group ocrinfo"><div class="input-group-addon" >购方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerName"/></li>
        <li class="input-group ocrinfo"><div class="input-group-addon" >购方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.buyerNo"/></li>
        <li class="input-group ocrinfo"><div class="input-group-addon" >销方税号:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerNo"/></li>
        <li class="input-group ocrinfo"><div class="input-group-addon" >销方单位:</div>  <input type="text" readonly="readonly" class="form-control" v-model="item.sellerName"/></li>
    </ul>

`;

var ocrTemp = `

	<!--增值税普通发票、增值税专用发票、增值税电子普通发票-->


        <!--增值税卷式发票-->
        <ul v-if="item.type==103" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:</div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <ul v-if="item.type==103" v-for="details in item.details">
                <li class="input-group ocrinfo"><div class="input-group-addon" >税额:  </div> <input type="text" class="form-control"   v-model="details.tax"/></li>
                <li class="input-group ocrinfo"><div class="input-group-addon" >税率:  </div> <input type="text" class="form-control"   v-model="details.rate"/></li>
            </ul>
            <li class="input-group ocrinfo"><div class="input-group-addon" >验真状态:</div>  
                <input type="text" class="form-control" v-if="item.checkInvoice==1" value="已查验"/>
                <input type="text" class="form-control" v-else value="未查验"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >购方单位:</div> <input type="text" class="form-control"   v-model="item.buyer"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >购方税号:</div> <input type="text" class="form-control"   v-model="item.buyer"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >开票日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >机打号码:  </div> <input type="text" class="form-control"   v-model="item.machineNumber"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >销方单位:  </div> <input type="text" class="form-control"   v-model="item.seller"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >销方税号:  </div> <input type="text" class="form-control"   v-model="item.sellerTaxId"/></li>
            
        </ul>
        
        <ul v-if="item.type==104" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >买方单位/个人:  </div> <input type="text" class="form-control"   v-model="item.buyer"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >买方单位代码/个人身份证号:  </div> <input type="text" class="form-control"   v-model="item.buyerId"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >车架号/车辆识别代码:  </div> <input type="text" class="form-control"   v-model="item.carCode"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发动机号码:  </div> <input type="text" class="form-control"   v-model="item.carEngineCode"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >厂牌型号:  </div> <input type="text" class="form-control"   v-model="item.carModel"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >合格证号:  </div> <input type="text" class="form-control"   v-model="item.certificateNumber"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >省:  </div> <input type="text" class="form-control"   v-model="item.province"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >市:  </div> <input type="text" class="form-control"   v-model="item.city"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >开票日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >机打代码:  </div> <input type="text" class="form-control"   v-model="item.machineCode"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >机打号码:  </div> <input type="text" class="form-control"   v-model="item.machineNumber"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >税前金额:  </div> <input type="text" class="form-control"   v-model="item.pretaxAmount}} </li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >销方单位:  </div> <input type="text" class="form-control"   v-model="item.seller"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >销方电话:  </div> <input type="text" class="form-control"   v-model="item.sellerPhone"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >销方税号:  </div> <input type="text" class="form-control"   v-model="item.sellerTaxId"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >税额:  </div> <input type="text" class="form-control"   v-model="item.tax"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >主管税务机关:  </div> <input type="text" class="form-control"   v-model="item.taxAuthorities"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >主管税务机关代码:  </div> <input type="text" class="form-control"   v-model="item.taxAuthoritiesCode"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >税率:  </div> <input type="text" class="form-control"   v-model="item.taxRate"/></li>
        </ul>
        
        <ul v-if="item.type==105" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >买方单位/个人:  </div> <input type="text" class="form-control"   v-model="item.buyer"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >买方单位代码/个人身份证号:  </div> <input type="text" class="form-control"   v-model="item.buyerId"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >车架号/车辆识别代码:  </div> <input type="text" class="form-control"   v-model="item.carCode"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发动机号码:  </div> <input type="text" class="form-control"   v-model="item.carEngineCode"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >厂牌型号:  </div> <input type="text" class="form-control"   v-model="item.carModel"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >省:  </div> <input type="text" class="form-control"   v-model="item.province"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >市:  </div> <input type="text" class="form-control"   v-model="item.city"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >二手车市场:  </div> <input type="text" class="form-control"   v-model="item.companyName"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >二手车市场纳税人识别号:  </div> <input type="text" class="form-control"   v-model="item.companyTaxId"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >开票日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >车牌号:  </div> <input type="text" class="form-control"   v-model="item.licensePlate"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >登记证号:  </div> <input type="text" class="form-control"   v-model="item.registrationNumber"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >卖方单位/个人:  </div> <input type="text" class="form-control"   v-model="item.seller"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >卖方单位代码/个人身份证号:  </div> <input type="text" class="form-control"   v-model="item.sellerId"/></li>
        </ul>
        
        <ul v-if="item.type==106" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >票号:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >省:  </div> <input type="text" class="form-control"   v-model="item.province"/></li>
            <!--<li class="input-group ocrinfo"><div class="input-group-addon" >发票类型:  </div> <input type="text" class="form-control"   v-model="item.type"/></li>-->
        </ul>
        
        <ul v-if="item.type==107" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >购方名称:  </div> <input type="text" class="form-control"   v-model="item.buyer"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >购方税号:  </div> <input type="text" class="form-control"   v-model="item.buyerTaxId"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >校验码:  </div> <input type="text" class="form-control"   v-model="item.checkCode"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >省:  </div> <input type="text" class="form-control"   v-model="item.province"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >市:  </div> <input type="text" class="form-control"   v-model="item.city"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >开票日期:  </div> <input type="text" class="form-control"   v-model="item.date"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.number"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >销方名称:  </div> <input type="text" class="form-control"   v-model="item.seller"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >销方税号:  </div> <input type="text" class="form-control"   v-model="item.sellerTaxId"/></li>
        </ul>
        
        <ul v-if="item.type==108" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >地址:  </div> <input type="text" class="form-control"   v-model="item.place"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >省会:  </div> <input type="text" class="form-control"   v-model="item.province"/></li>
            <!--<li class="input-group ocrinfo"><div class="input-group-addon" >城市:  </div> <input type="text" class="form-control"   v-model="item.city"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >票价:  </div> <input type="text" class="form-control"   v-model="item.fare"/></li>-->
            <li class="input-group ocrinfo"><div class="input-group-addon" >票号:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >里程:  </div> <input type="text" class="form-control"   v-model="item.mileage"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >校验码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >开票日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >开始时间:  </div> <input type="text" class="form-control"   v-model="item.timeGetOn"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >结束时间:  </div> <input type="text" class="form-control"   v-model="item.timeGetOff"/></li>
        </ul>
        
        <!--火车票-->
        <ul v-if="item.type==109" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >姓名:  </div> <input type="text" class="form-control"   v-model="item.name"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >车次:  </div> <input type="text" class="form-control"   v-model="item.trainNumber"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >座位类型:  </div> <input type="text" class="form-control"   v-model="item.seat"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >序列号:  </div> <input type="text" class="form-control"   v-model="item.serialNumber"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >时间:  </div> <input type="text" class="form-control"   v-model="item.time"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >达到车站:  </div> <input type="text" class="form-control"   v-model="item.stationGetOff"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >出发车站:  </div> <input type="text" class="form-control"   v-model="item.stationGetOn"/></li>
        </ul>
        
        <ul v-if="item.type==110" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >姓名:  </div> <input type="text" class="form-control"   v-model="item.name"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >时间:  </div> <input type="text" class="form-control"   v-model="item.time"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >达到车站:  </div> <input type="text" class="form-control"   v-model="item.stationGetOff"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >出发车站:  </div> <input type="text" class="form-control"   v-model="item.stationGetOn"/></li>
        </ul>
        
        <ul v-if="item.type==111" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >票价:  </div> <input type="text" class="form-control"   v-model="item.fare"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >航班名称:  </div> <input type="text" class="form-control"   v-model="item.userName"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >票号:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >校验码:  </div> <input type="text" class="form-control"   v-model="item.checkCode"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >机场建设费:  </div> <input type="text" class="form-control"   v-model="item.caacDevelopmentFund"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发行公司:  </div> <input type="text" class="form-control"   v-model="item.issueBy"/></li>
        </ul>
        
        <ul v-if="item.type==112" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >姓名:  </div> <input type="text" class="form-control"   v-model="item.name"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >省:  </div> <input type="text" class="form-control"   v-model="item.province"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >市:  </div> <input type="text" class="form-control"   v-model="item.city"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >币种:  </div> <input type="text" class="form-control"   v-model="item.currencyCode"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >时间:  </div> <input type="text"  class="form-control"   v-model="item.time"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >达到车站:  </div> <input type="text" class="form-control"   v-model="item.stationGetOff"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >出发车站:  </div> <input type="text" class="form-control"   v-model="item.stationGetOn"/></li>
        </ul>
        
        <ul v-if="item.type==113" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票代码:  </div> <input type="text" class="form-control"   v-model="item.code"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >入口:  </div> <input type="text" class="form-control"   v-model="item.entrance"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >出口:  </div> <input type="text" class="form-control"   v-model="item.exit"/></li>
        </ul>
        
        <ul v-if="item.type==115" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >币种:  </div> <input type="text" class="form-control"   v-model="item.currencyCode"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >折扣:  </div> <input type="text" class="form-control"   v-model="item.discount"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >店名:  </div> <input type="text" class="form-control"   v-model="item.storeName"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >小计:  </div> <input type="text" class="form-control"   v-model="item.subtotal"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >税费:  </div> <input type="text" class="form-control"   v-model="item.tax"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >小费:  </div> <input type="text" class="form-control"   v-model="item.tips"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >时间:  </div> <input type="text" class="form-control"   v-model="item.time"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >日期:  </div> <input type="text" id="billDate" class="form-control"   v-model="item.date"/></li>
        </ul>
        
        <ul v-if="item.type==116" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票类型:  </div> <input type="text" class="form-control"   v-model="item.type"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >行程人手机号:  </div> <input type="text" class="form-control"   v-model="item.phone"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >行程开始时间:  </div> <input type="text" class="form-control"   v-model="item.dateStart"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >行程结束时间:  </div> <input type="text" class="form-control"   v-model="item.dateEnd"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >日期:  </div> <input type="text" class="form-control"   v-model="item.date"/></li>
        </ul>
        
        <ul v-if="item.type==117" v-for="item in items">
            <li class="input-group ocrinfo"><div class="input-group-addon" >总价:  </div> <input type="text" class="form-control"   v-model="item.total"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票类型:  </div> <input type="text" class="form-control"   v-model="item.type"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >发票号码:  </div> <input type="text" class="form-control"   v-model="item.number"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >购方名称:  </div> <input type="text" class="form-control"   v-model="item.buyer"/></li>
            <li class="input-group ocrinfo"><div class="input-group-addon" >购方税号:  </div> <input type="text" class="form-control"   v-model="item.buyerTaxId"/></li>
        </ul>
        
        <ul v-if="item.type==000" v-for="item in items">
            <li class="title">其他</li>
            <li class="bullet-item">其他</li>
        </ul>

`;

module.exports = {ocrTemp,ocrTemp1,ocrTemp2}