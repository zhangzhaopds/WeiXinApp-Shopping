
var app = getApp()
var util = require('../../utils/util.js')
var WxParse = require('../../components/wxParse/wxParse.js');

Page({
  data: {
    goodsId: '',
    goodsInfo: {},
    modelStrs: {},
    selectModelInfo: {
      models: [],
      stock: '',
      price: '',
      buyCount: 1
    },
    commentNums: [],
    commentExample: '',
    defaultPhoto: '',
    allStock: '',
    addToShoppingCartHidden: true,
    ifAddToShoppingCart: true,
    priceDiscountStr: '',
  },
  onLoad: function(options){
    var goodsId = options.detail,
        contact = options.contact,
        franchiseeId = options.franchisee || '',
        cartGoodsNum = options.cart_num,
        defaultPhoto = app.getDefaultPhoto();

    this.setData({
      goodsId: goodsId,
      contact: contact,
      defaultPhoto: defaultPhoto,
      franchiseeId: franchiseeId,
      cartGoodsNum: cartGoodsNum
    })
    app.checkLogin();
  },
  dataInitial: function () {
    var that = this;
    app.sendRequest({
      url: '/index.php?r=AppShop/getGoods',
      data: {
        data_id: this.data.goodsId,
        sub_shop_app_id: this.data.franchiseeId
      },
      success: that.modifyGoodsDetail
    })
  },
  onShareAppMessage: function(){
    var goodsId = this.data.goodsId,
        contact = this.data.contact,
        franchiseeId = this.data.franchiseeId,
        cartGoodsNum = this.data.cart_num,
        url = '/pages/goodsDetail/goodsDetail?detail='+ goodsId +'&contact='+ contact + (franchiseeId ? '&franchisee='+franchiseeId+'&cart_num='+cart_num : '');

    // 统计用户分享
    app.countUserShareApp();

    return {
      title: app.getAppTitle() || '即速应用',
      desc: app.getAppDescription() || '即速应用，拖拽生成app，无需编辑代码，一键打包微信小程序',
      path: url
    }
  },
  goToMyOrder: function(){
    var franchiseeId = this.data.franchiseeId,
        pagePath = '/pages/myOrder/myOrder'+(franchiseeId ? '?franchisee='+franchiseeId : '');
    app.turnToPage(pagePath, true);
  },
  goToShoppingCart: function(){
    var franchiseeId = this.data.franchiseeId,
        pagePath = '/pages/shoppingCart/shoppingCart'+(franchiseeId ? '?franchisee='+franchiseeId : '');
    app.turnToPage(pagePath);
  },
  goToHomepage: function(){
    var router = app.getHomepageRouter();
    app.turnToPage('/pages/'+router+'/'+router, true);
  },
  goToCommentPage: function(){
    var franchiseeId = this.data.franchiseeId,
        pagePath = '/pages/goodsComment/goodsComment?detail='+this.data.goodsId+(franchiseeId ? '&franchisee='+franchiseeId : '');
    app.turnToPage(pagePath);
  },
  goodsCoverOnload: function(e){
    var _this = this,
        originalWidth = e.detail.width,
        originalHeight = e.detail.height;

    //获取图片的原始长宽
    var windowWidth = 0;
    var imageWidth = 0, imageHeight = 0;

    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
        imageWidth = windowWidth;
        imageHeight = imageWidth * originalHeight / originalWidth;
        _this.setData({
          goodsCoverWidth: imageWidth,
          goodsCoverHeight: imageHeight
        })
      }
    })
  },
  modifyGoodsDetail: function(res){
    var pages = getCurrentPages(),
        _this = pages[pages.length - 1],
        goods = res.data[0].form_data,
        description = goods.description,
        goodsModel = [],
        selectModels = [],
        modelStrs = {},
        price = 0,
        discountStr = '',
        allStock = 0,
        selectStock, selectPrice, selectModelId, matchResult,
        i, j;

    WxParse.wxParse('wxParseDescription', 'html', description, _this, 10);

    if(goods.model_items.length){
      var items = goods.model_items;
      for (i = 0, j = items.length; i < j; i++) {
        price = Number(items[i].price);
        goods.highPrice = goods.highPrice > price ? goods.highPrice : price;
        goods.lowPrice = goods.lowPrice < price ? goods.lowPrice : price;
        allStock += Number(items[i].stock);
        if(i == 0){
          selectPrice = price;
          selectStock = items[0].stock;
          selectModelId = items[0].id;
        }
      }
    } else {
      selectPrice = goods.price;
      selectStock = goods.stock;
    }
    for(var key in goods.model){
      if(key){
        var model = goods.model[key];
        goodsModel.push(model);
        modelStrs[key] = model.subModelName.join('、');
        selectModels.push(model.subModelId[0]);
      }
    }
    goods.model = goodsModel;
    if (Number(goods.max_can_use_integral) != 0 ) {
        discountStr = '（积分可抵扣' + (Number(goods.max_can_use_integral) / 100) + '元）';
    }
    _this.setData({
      goodsInfo: goods,
      modelStrs: modelStrs,
      'selectModelInfo.models': selectModels,
      'selectModelInfo.stock': selectStock,
      'selectModelInfo.price': selectPrice,
      'selectModelInfo.modelId': selectModelId,
      allStock: allStock,
      priceDiscountStr: discountStr,
    })
    _this.getAssessList();
  },
  getAssessList: function(){
    var that = this;
    app.getAssessList({
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded;'
      },
      data: {
        goods_id: that.data.goodsId,
        idx_arr: {
          idx: 'level',
          idx_value: 0
        },
        page: 1,
        page_size: 20,
        sub_shop_app_id: this.data.franchiseeId
      },
      success: function(res){
        var commentExample = res.data[0];
        if(commentExample){
          commentExample.add_time = util.formatTime(new Date(commentExample.add_time * 1000));
        }
        that.setData({
          commentNums: res.num,
          commentExample: commentExample
        })
      }
    });
  },
  showBuyDirectly: function(){
    this.setData({
      addToShoppingCartHidden: false,
      ifAddToShoppingCart: false
    })
  },
  showAddToShoppingCart: function(){
    this.setData({
      addToShoppingCartHidden: false,
      ifAddToShoppingCart: true
    })
  },
  hiddeAddToShoppingCart: function(){
    this.setData({
      addToShoppingCartHidden: true
    })
  },
  selectSubModel: function(e){
    var dataset = e.target.dataset,
        modelIndex = dataset.modelIndex,
        submodelIndex = dataset.submodelIndex,
        data = {};

    data['selectModelInfo.models['+modelIndex+']'] = this.data.goodsInfo.model[modelIndex].subModelId[submodelIndex];
    this.setData(data);
    this.resetSelectCountPrice();
  },
  resetSelectCountPrice: function(){
    var selectModelIds = this.data.selectModelInfo.models.join(','),
        modelItems = this.data.goodsInfo.model_items,
        data = {};

    for (var i = modelItems.length - 1; i >= 0; i--) {
      if(modelItems[i].model == selectModelIds){
        data['selectModelInfo.stock'] = modelItems[i].stock;
        data['selectModelInfo.price'] = modelItems[i].price;
        data['selectModelInfo.modelId'] = modelItems[i].id;
        break;
      }
    }
    this.setData(data);
  },
  clickMinusButton: function(e){
    var count = this.data.selectModelInfo.buyCount;

    if(count <= 1){
      return;
    }
    this.setData({
      'selectModelInfo.buyCount': count - 1
    });
  },
  clickPlusButton: function(e){
    var selectModelInfo = this.data.selectModelInfo,
        count = selectModelInfo.buyCount,
        stock = selectModelInfo.stock;

    if(count >= stock) {
      return;
    }
    this.setData({
      'selectModelInfo.buyCount': count + 1
    });
  },
  sureAddToShoppingCart: function(){
    var that = this,
        param = {
                  goods_id: this.data.goodsId,
                  model_id: this.data.selectModelInfo.modelId || '',
                  num: this.data.selectModelInfo.buyCount,
                  sub_shop_app_id: this.data.franchiseeId || ''
                };

    app.sendRequest({
      url: '/index.php?r=AppShop/addCart',
      data: param,
      success: function(res){
        app.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1500
        });

        setTimeout(function(){
          app.hideToast();
          setTimeout(function(){
            that.hiddeAddToShoppingCart();
          }, 500);
        }, 1500);
      }
    })
  },
  buyDirectlyNextStep: function(e){
    var that = this,
        param = {
                  goods_id: this.data.goodsId,
                  model_id: this.data.selectModelInfo.modelId,
                  num: this.data.selectModelInfo.buyCount,
                  formId: e.detail.formId,
                  sub_shop_app_id: this.data.franchiseeId
                };

    app.sendRequest({
      url: '/index.php?r=AppShop/addOrder',
      data: param,
      success: function(res){
        var franchiseeId = that.data.franchiseeId,
            pagePath = '/pages/orderDetail/orderDetail?detail='+res.data+(franchiseeId ? '&franchisee='+franchiseeId : '');

        that.hiddeAddToShoppingCart();
        app.turnToPage(pagePath);
      }
    })
  },
  makeAppointment: function(){
    var franchiseeId = this.data.franchiseeId,
        pagePath = '/pages/makeAppointment/makeAppointment?detail='+this.data.goodsId+(franchiseeId ? '&franchisee='+franchiseeId : '');
    app.turnToPage(pagePath);
  },
  inputBuyCount: function(e){
    var count = e.detail.value;
    this.setData({
      'selectModelInfo.buyCount': +count
    });
  }
})
