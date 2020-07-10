import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const MyRouter = new Router({

    routes: [
        {
            path: '/',
            redirect : '/login'
        },
        {
          path: '/login',
          name: 'login',
          component: ()=>import('../components/login/Login.vue')
        },
        {
          path: '/index',
          name: 'index',
          component: ()=>import('../components/pubcomponent/Main.vue'),
          children : [
            {
              path : '/',
              name : '',
              component : ()=> import('../components/pubcomponent/weather/index.vue')
            },
            {
              path : '/imglist',
              name : 'imglist',
              component : ()=> import('../components/imagemanage/ImageList.vue')
            },
            {
              path : '/queryimage',
              name : 'queryimage',
              component: ()=> import('../components/imagemanage/ImageQuery.vue')
            },
            {
              path : '/usermanage',
              name : 'usermanage',
              component : ()=> import('../components/imagemanage/UserManage.vue')
            },
            {
              path : '/userrole',
              name : 'userrole',
              component: ()=> import('../components/imagemanage/UserRole.vue')
            },
            {
              path : '/menumanage',
              name : 'menumanage',
              component : ()=>import ('../components/imagemanage/MenuManage.vue')
            },
            {
              name : 'queryticket',
              path : '/queryticket',
              component : ()=> import('../components/imagemanage/QueryTicket.vue')
            },
            {
              path : '/documentfiling',
              name : 'documentfiling',
              component : ()=> import('../components/imagemanage/DocumentFiling.vue')
            },
            {
              path : '/documentread',
              name : 'documentread',
              component : ()=> import('../components/imagemanage/DocumentRead.vue')
            },
            {
              path : '/documentborrow',
              name : 'documentborrow',
              component : ()=> import('../components/imagemanage/DocumentBorrow.vue')
            },
            {
              name : 'paperapproval',
              path : '/paperapproval',
              component : ()=> import('../components/imagemanage/PaperApproval.vue')
            },
            {
              path : '/borrowingapproval',
              name : 'borrowingapproval',
              component : ()=> import('../components/imagemanage/BorrowingApproval.vue')
            },
            {
              path : '/fileontheshelf',
              name : 'fileontheshelf',
              component : ()=> import('../components/imagemanage/FileOnTheShelf.vue')
            },
            {
              path : '/documentsend',
              name : 'documentsend',
              component : ()=> import('../components/imagemanage/DocumentSend.vue')
            },
            {
              path : '/documentroom',
              name : 'documentroom',
              component : ()=> import('../components/imagemanage/DocumentRoom.vue')
            },
            {
              path : '/sensewords',
              name : 'sensewords',
              component : ()=> import('../components/imagemanage/SenseWords.vue')
            },
            {
              path : '/datecheck',
              name : 'datecheck',
              component : ()=> import('../components/imagemanage/DateCheck.vue')
            },
            {
              path : '/buyermanage',
              name : 'buyermanage',
              component : ()=> import('../components/imagemanage/BuyerManage.vue')
            },
            {
              path : '/specialcommodity',
              name : 'specialcommodity',
              component: ()=> import('../components/imagemanage/SpecialCommodity.vue')
            },
            {
              path : '/ticketsecretarycount',
              name : 'ticketsecretarycount',
              component : ()=> import('../components/imagemanage/TicketSecretaryCount.vue')
            },
            {
              path : '/hangxingcount',
              name : 'hangxingcount',
              component : ()=> import('../components/imagemanage/HangXingCount.vue')
            },
            {
              path : '/tomcatmonitor',
              name : 'tomcatmonitor',
              component : ()=> import('../components/systemwatch/performancemonitoring/TomCatMonitor.vue')
            },
            {
              path : '/serverinformation',
              name : 'serverinformation',
              component : ()=> import('../components/systemwatch/performancemonitoring/ServerInformation.vue')
            },
            {
              path : '/jvminformation',
              name : 'jvminformation',
              component : ()=> import('../components/systemwatch/performancemonitoring/JvmInformation.vue')
            }
          ]
        },
        {
          path : '/scanimage',
          name : 'scanimage',
          component : ()=>import('../components/imagemanage/ScanImage.vue')
        },
        {
          name : 'notfound',
          path : '/notfound',
          component : ()=> import('../components/pubcomponent/error/NotFoun.vue')
        },
        {
          name : 'exception',
          path : '/exception',
          component : ()=> import('../components/pubcomponent/error/Exception.vue')
        }
      ]

});


/* MyRouter.beforeEach((to,from,next)=>{

  let str = window.sessionStorage.getItem('image-loginToken');
  
  if(!str){  
    if(to.path==="/login"){
      return next();
    }else{
      return next({path:"/login"});
    }
  }else{

    if(to.path==='/login'){
        
      return next();
    }else{
        
      return next();
    }
  }

});  */

export default MyRouter;