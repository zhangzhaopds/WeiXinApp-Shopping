
var app = getApp()

Page({
  data: {
    orderLists: [],
    pages: 1,
    types: [undefined, 0, 1, 2, 3],  
    noMore: false,
    currentTabIndex: 0,
    currentGoodsType: '',   
    goodsTypeList: [],
    isFromBack: false
  },
  onLoad: function(options){
    app.checkLogin();
  },
  onShow: function(){
    if (this.data.isFromBack) {
      this.setData({
        pages:1
      });
      this.getOrderList({tabIndex : 0});
    } else {
      this.setData({
        isFromBack: true
      })
    }
    // if (!app.getUserInfo().phone) {
    //   app.turnToPage('/pages/bindCellphone/bindCellphone', true);
    // }
  },
  // app.js里checkLogin后调用本页面dataInitial方法初始化
  dataInitial: function(){
    this.getOrderList({
      tabIndex : 0,
      firstLoad: true
    });
  },
  getOrderList: function(param){
    var that = this,
        data = {
          page: that.data.pages,
          page_size: 50
        },
        type;

    if( this.data.goodsTypeList.length <= 1 ){
      type = this.data.types[param.tabIndex];

      if(type != undefined){
        data.idx_arr = {
          idx: 'status',
          idx_value: type
        }
      }
    }
    this.data.currentGoodsType && (data.goods_type = this.data.currentGoodsType);

    data.parent_shop_app_id = app.getAppId(); // 获取订单列表时 传parent_shop_app_id获取本店以及所有子店的订单

    if(param.firstLoad){
    // 进入页面首次请求列表时 没有goodsType值 传入use_default_goods_type
      data.use_default_goods_type = 1;
    }
    app.sendRequest({
      url: '/index.php?r=AppShop/orderList',
      method: 'post',
      data: data,
      success: function(res){
        var data = {},
            orders = res.data;

        for (var i = orders.length - 1; i >= 0; i--) {
          var formData = orders[i].form_data;

          formData.totalPay = +formData.total_price;
          if(formData.tostore_data && formData.tostore_data.appointed_time){
            formData.tostore_data.appointed_time = formData.tostore_data.appointed_time.substr(11, 5);
          }
          orders[i] = formData;
        }

        if(param.scrollLoad){
          orders = that.data.orderLists.concat(orders);
        }
        data['orderLists'] = orders;
        data['pages'] = that.data.pages + 1;
        data['noMore'] = res.is_more == 0 ? true : false;
        data['goodsTypeList'] = res.goods_type_list;
        data['currentGoodsType'] = res.current_goods_type;
        that.setData(data);
      }
    })
  },
  clickOrderTab: function(e){
    var dataset = e.target.dataset,
        index = dataset.index,
        data = {};

    data.currentTabIndex = index;
    data['pages'] = 1;
    data['orderLists'] = [];
    data['noMore'] = false;
    if(dataset.goodsType){
      data.currentGoodsType = dataset.goodsType;
    }

    this.setData(data);
    this.getOrderList({tabIndex : index});
  },
  goToOrderDetail: function(e){
    var dataset = e.currentTarget.dataset,
        orderId = dataset.id,
        franchiseeId = dataset.franchisee,
        queryStr = franchiseeId === app.getAppId() ? '' : '&franchisee='+franchiseeId;

    app.turnToPage('/pages/orderDetail/orderDetail?detail='+orderId+queryStr);
  },
  cancelOrder: function(e){
    var orderId = e.target.dataset.id,
        franchisee = e.target.dataset.franchisee,
        subShopId = franchisee == app.getAppId() ? '' : franchisee,
        that = this;

    app.showModal({
      content: '确定要取消订单？',
      showCancel: true,
      cancelText: '否',
      confirmText: '确定',
      confirm: function(){
        app.sendRequest({
          url: '/index.php?r=AppShop/cancelOrder',
          data: {
            order_id: orderId,
            sub_shop_app_id: subShopId
          },
          success: function(res){
            var index = that.data.currentTabIndex,
                data = {};

            data['pages'] = 1;
            that.setData(data);
            that.getOrderList({tabIndex : index});
          }
        })
      }
    })
  },
  payOrder: function(e){
    var orderId = e.target.dataset.id,
        franchiseeId = e.target.dataset.franchisee,
        queryStr = franchiseeId === app.getAppId() ? '' : '&franchisee='+franchiseeId;
    app.turnToPage('/pages/orderDetail/orderDetail?detail='+orderId+queryStr);
  },
  applyDrawback: function(e){
    var orderId = e.target.dataset.id,
        franchisee = e.target.dataset.franchisee,
        subShopId = franchisee == app.getAppId() ? '' : franchisee,
        that = this;

    app.showModal({
      content: '确定要申请退款？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      confirm: function(){
        app.sendRequest({
          url: '/index.php?r=AppShop/applyRefund',
          data: {
            order_id: orderId,
            sub_shop_app_id: subShopId
          },
          success: function(res){
            var index = that.data.currentTabIndex,
                data = {};

            data['pages'] = 1;
            that.setData(data);
            that.getOrderList({tabIndex : index});
          }
        })
      }
    })
  },
  checkLogistics: function(e){
    var orderId = e.target.dataset.id;
    app.turnToPage('/pages/logisticsPage/logisticsPage?detail='+orderId);
  },
  sureReceipt: function(e){
    var orderId = e.target.dataset.id,
        franchisee = e.target.dataset.franchisee,
        subShopId = franchisee == app.getAppId() ? '' : franchisee,
        that = this;

    app.showModal({
      content: '确定已收到货物？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      confirm: function(){
        app.sendRequest({
          url: '/index.php?r=AppShop/comfirmOrder',
          data: {
            order_id: orderId,
            sub_shop_app_id: subShopId
          },
          success: function(res){
            var index = that.data.currentTabIndex,
                data = {};

            data['pages'] = 1;
            that.setData(data);
            that.getOrderList({tabIndex : index});
          }
        })
      }
    })
  },
  makeComment: function(e){
    var orderId = e.target.dataset.id,
        franchiseeId = e.target.dataset.franchisee,
        queryStr = franchiseeId === app.getAppId() ? '' : '&franchisee='+franchiseeId;
    app.turnToPage('/pages/makeComment/makeComment?detail='+orderId+queryStr);
  },
  verificationCode: function(e){
    var orderId = e.target.dataset.id;
    var franchiseeId = e.target.dataset.franchisee;
    app.turnToPage('/pages/verificationCodePage/verificationCodePage?detail=' + orderId + '&sub_shop_app_id=' + franchiseeId);
  },
  scrollToListBottom: function(){
    var currentTabIndex = this.data.currentTabIndex;
    if(this.data.noMore){
      return;
    }
    this.getOrderList({
      tabIndex: currentTabIndex,
      scrollLoad: true
    });
  }
})
