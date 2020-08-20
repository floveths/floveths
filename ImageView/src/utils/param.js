let par = {

    /*[{imgData 数据格式
        'id' : '100',
        'name' : '',
        'typeNum' : 0,
        'typeName' : '',
        'children' : [
            {
                'id' : '',
                'name' : '',
                'imgTip' : '',图片水印
                'cutImgCls' : '',图片切割水印
                'imageSrc': '',图片url base64
                'fielId': '',图片id
                'imgName': '',图片名
                'show' : false,是否显示
                'fileSize' : 0,文件大小
                'curImgIndex' : 0,//当前图片
                'isUpload' : false是否上传
            }
        ]
    }]*/

    baseUrl : 'http://47.92.211.214:8080',//'192.168.0.40:8080',
    imgData : [],//单扫多扫都存放在这
    batchId : [],//批次号单扫批扫都存放
    imgScale : 1,//默认值
	scaleBig : 1,//放大
	scaleSmall : 1,//缩小
    curWidth : 0,//图片原始宽度 
    curHeight : 0,//图片原始高度
    rotatez : 0,//旋转
    nodeId : null,//树节点选择的业务类型 例如 飞机票
    nodeName : '其它',//默认为其它
    curImgIndex : 0,//每张图片下标
    imgViewArr : [],//存储所有图片数组 查看大图时使用
    postImgArr : [],//提交树
    serverIp : '47.92.211.214',
    serverPort : '8080',
    socketPort : '28388',
    ocrPort : '0',
    scanType : 2,//扫描类型 1单扫 2批扫
    pickImage : [],//选中图片
    uploadFileArr : [],//要上传的附件
    uploadImageArr : [],//要上传的影像
    fileListData : [],//附件
    ticketListData : [],//电子发票

    billNum : null,
    userNo : null,
    departnum : null,
    billtypename : null,
    systemcode : null,
    SaveType : null,
    userId : null,
    businessSerialNo : null,//流水号
    uploadFileIsComplite : false,
    deviceOptions : [],//扫描设备
    setting : {
        edit: {
            enable : false,
            showRenameBtn : false,
            showRemoveBtn : false,
            drag: {
                isMove: false,
                isCopy: false,
                prev: true,
                next: true,
                inner: true
            }
        },
        callback: {
        }
    },
    ticketNodes : [
        {
            name: "单据业务",
            open:true,
            children : []
        }
    ],
    fileNodes : [
        {
            name: "附件列表(Word,Excel,Zip)...",
            open:true,
            children : []
        }
    ],
    selectOptions : [
        { label:"01",value:"1月" },
        { label:"02",value:"2月" },
        { label:"03",value:"3月" },
        { label:"04",value:"4月" },
        { label:"05",value:"5月" },
        { label:"06",value:"6月" },
        { label:"07",value:"7月" },
        { label:"08",value:"8月" },
        { label:"09",value:"9月" },
        { label:"10",value:"10月"}, 
        { label:"11",value:"11月"}, 
        { label:"12",value:"12月"}
    ]

/* 
    flag : 0,//标识
    
    isValide : true,//验证
    
    billTypeName : null,//单据报销类型
    batchIdArr : [],//批扫时存放批次号
    
    codImgUrl : null,//单据二维码
    isShow : false,//是否显示大图
    isUpload : false,//是否上传
    isComplete : false,//是否上传完成
    isRotateImg : false,//是否矫正图片
    slideShow : 'block',
    curCount : 0,//当前条数
    //uploadCount : 0,//上传的条数
    id : 100,//批扫时定义的id
    progress : 10,//进度条
    fileList : [],//附件
    isUpFile : false,//是否上传附件
    codeImg : false,//是否显示单据号
    samllCode : false,//是否显示小程序码
    showWXList : false,//显示影像池
    wxImgList : {},//查询微信小程序的图片
    imgClass : '',
    numIndex : 0,//图片下标
    curIndex : 0,//当前显示大图的下标
    name : '',//图片名称
    //scanType : 1,//1单扫  2 批扫  默认0
    doubleType : 0,//0默认 1单面 2双面
    codeId : null,//批扫时影像首页id
    fileId : '',//图片id
    imgUrl : '',//图片url
    maxWidth : '',//显示大图时图片容器最大宽度
    isSave : 0,
    list : [],
    isEmpty : false,
    treeNode : ['其它'],//树节点下的票据分类
    ispicked : [],//是否勾选
    deviceName : '',//设备
    imgTip : '',//图片水印
    restyle : {},//图片显示样式
    ocrinfo : false,//显示ocr信息
    rotateImg : false,//是否矫正图片
    bussArr : [],//存放单据首页 以及首页下的票据
    tickArr : [],//存放票据
    treeArr : [],//树单据个数
    batchPostImg : [],//批扫存放图片
    fileIdArr : [],//存放图片fileID
    upText : '正在上传...',
    gressValue : '0%'//初始化默认值 */

}

export default par;