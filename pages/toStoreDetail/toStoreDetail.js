
var app = getApp()
var util = require('../../utils/util.js')
var WxParse = require('../../components/wxParse/wxParse.js');

Page({
  data: {
    goodsInfo: {},
    addToShoppingCartCount: 0,
    selectModelInfo: {
      models: [],
      // stock: '',
      price: '',
      buyCount: 1
    },
    defaultPhoto: '',
    addToShoppingCartHidden: true,
    ifAddToShoppingCart: true,
    priceDiscountStr: '',
    cartGoodsNum: 0,
    cartGoodsTotalPrice: 0,
    pageNavigating: false
  },
  numChangeTimeout: '',
  goodsId: '',
  cart_id: '',
  fromBack: false,
  franchiseeId: '',
  touchStartPos: {},
  onLoad: function(options){
    var contact = options.contact,
        defaultPhoto = app.getDefaultPhoto();

    this.setData({
      contact: contact,
      defaultPhoto: defaultPhoto,
    })
    this.goodsId = options.detail || '';
    this.franchiseeId = options.franchisee || '';
    app.checkLogin();
  },
  dataInitial: function() {
    this.getGoodsDetail();
  },
  getGoodsDetail: function(){
    var that = this;
    app.sendRequest({
      url: '/index.php?r=AppShop/getGoods',
      data: {
        data_id: this.goodsId,
        sub_shop_app_id: this.franchiseeId
      },
      success: function(res){
        that.modifyGoodsDetail(res);
        that.getCartList();
      }
    })
  },
  getCartList: function(){
    var that = this;
    app.sendRequest({
      url: '/index.php?r=AppShop/cartList',
      data: {
        page: 1,
        page_size: 100,
        sub_shop_app_id: this.franchiseeId
      },
      success: function(res){
        var price = 0,
            num = 0,
            addToShoppingCartCount = 0;

        for (var i = res.data.length - 1; i >= 0; i--) {
          var data = res.data[i];
          price += +data.num * +data.price;
          num   += +data.num;
          if(that.goodsId == data.goods_id){
            addToShoppingCartCount = data.num;
            that.cart_id = data.id;
          }
        }
        that.setData({
          cartGoodsNum: num,
          cartGoodsTotalPrice: price.toFixed(2),
          addToShoppingCartCount: addToShoppingCartCount
        });
      }
    })
  },
  onShow: function(){
    if(this.fromBack){
      this.getCartList();
    }
    else
      this.fromBack = true;
  },
  onShareAppMessage: function(){
    var goodsId = this.goodsId,
        contact = this.data.contact,
        franchiseeId = this.franchiseeId,
        url = '/pages/goodsDetail/goodsDetail?detail='+ goodsId + (franchiseeId ? '&franchisee='+franchiseeId : '');

    return {
      title: app.getAppTitle() || '即速应用',
      desc: app.getAppDescription() || '即速应用，拖拽生成app，无需编辑代码，一键打包微信小程序',
      path: url
    }
  },
  goToShoppingCart: function(){
    var franchiseeId = this.franchiseeId,
        pagePath = '/pages/shoppingCart/shoppingCart'+(franchiseeId ? '?franchisee='+franchiseeId : '');
    app.turnToPage(pagePath);
  },
  modifyGoodsDetail: function(res){
    var pages = getCurrentPages(),
        _this = pages[pages.length - 1],
        goods = res.data[0].form_data,
        description = goods.description,
        goodsModel = [],
        selectModels = [],
        price = 0,
        discountStr = '',
        data = {},
        selectStock, selectPrice, selectModelId, matchResult,
        i, j;

    WxParse.wxParse('wxParseDescription', 'html', description, _this, 10);

    if(goods.model_items.length){
      var items = goods.model_items;
      selectPrice = items[0].price;
      // selectStock = items[0].stock;
      selectModelId = items[0].id;
    } else {
      selectPrice = goods.price;
      // selectStock = goods.stock;
    }
    for(var key in goods.model){
      if(key){
        var model = goods.model[key];
        goodsModel.push(model);
        selectModels.push(model.subModelId[0]);
      }
    }
    goods.model = goodsModel;
    if (Number(goods.max_can_use_integral) != 0 ) {
        discountStr = '（积分可抵扣' + (Number(goods.max_can_use_integral) / 100) + '元）';
    }
    data = {
      goodsInfo: goods,
      'selectModelInfo.models': selectModels,
      // 'selectModelInfo.stock': selectStock,
      'selectModelInfo.price': selectPrice,
      'selectModelInfo.modelId': selectModelId,
      priceDiscountStr: discountStr,
    };
    goods.model.length ? (data.showSelectModel = true) : (data.showChangeCount = true);
    _this.setData(data);
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
        // data['selectModelInfo.stock'] = modelItems[i].stock;
        data['selectModelInfo.price'] = modelItems[i].price;
        data['selectModelInfo.modelId'] = modelItems[i].id;
        break;
      }
    }
    this.setData(data);
  },
  clickMinusButton: function(e){
    if(+this.data.addToShoppingCartCount <= 0) return;
    this.changeCartGoodsNum('minus');
  },
  clickPlusButton: function(e){
    this.changeCartGoodsNum('plus');
  },
  changeCartGoodsNum: function(type){
    clearTimeout(this.numChangeTimeout);

    var goods = this.data.goodsInfo,
        currentGoodsNum = +this.data.addToShoppingCartCount,
        targetGoodsNum = type == 'plus' ? currentGoodsNum + 1 : currentGoodsNum - 1,
        currentCartNum = +this.data.cartGoodsNum,
        targetCartNum = type == 'plus' ? currentCartNum + 1 : currentCartNum - 1,
        currentTotalPrice = +this.data.cartGoodsTotalPrice,
        targetTotalPrice = type == 'plus' ? currentTotalPrice + +goods.price : currentTotalPrice - +goods.price,
        that = this,
        param;

    this.setData({
      addToShoppingCartCount: targetGoodsNum,
      cartGoodsNum: targetCartNum,
      cartGoodsTotalPrice: targetTotalPrice.toFixed(2)
    });

    this.numChangeTimeout = setTimeout(function(){
      if(targetGoodsNum == 0 && type == 'minus'){
        app.sendRequest({
          hideLoading: true,
          url : '/index.php?r=AppShop/deleteCart',
          method: 'post',
          data: {
            cart_id_arr: [that.cart_id],
            sub_shop_app_id: that.franchiseeId
          },
          fail: function(res){
            that.setData({
              addToShoppingCartCount: currentGoodsNum,
              cartGoodsNum: currentCartNum,
              cartGoodsTotalPrice: currentTotalPrice
            });
          }
        });
        return;
      }
      param = {
        goods_id: goods.id,
        model_id: goods.modelId || '',
        num: targetGoodsNum,
        sub_shop_app_id: that.franchiseeId
      };
      app.sendRequest({
        hideLoading: true,
        url: '/index.php?r=AppShop/addCart',
        data: param,
        success: function(res){
          that.cart_id = res.data;
        },
        fail: function(res){
          that.setData({
            addToShoppingCartCount: currentGoodsNum,
            cartGoodsNum: currentCartNum,
            cartGoodsTotalPrice: currentTotalPrice
          });
        }
      })
    }, 500);
  },
  clickModelMinusButton: function(){
    var count = this.data.selectModelInfo.buyCount;

    if(count <= 1){
      return;
    }
    this.setData({
      'selectModelInfo.buyCount': count - 1
    });
  },
  clickModelPlusButton: function(){
    var selectModelInfo = this.data.selectModelInfo,
        count = selectModelInfo.buyCount;

    this.setData({
      'selectModelInfo.buyCount': count + 1
    });
  },
  sureAddToShoppingCart: function(){
    var that = this,
        addcount = this.data.selectModelInfo.buyCount,
        param = {
          goods_id: this.goodsId,
          model_id: this.data.selectModelInfo.modelId || '',
          num: addcount,
          sub_shop_app_id: this.franchiseeId || ''
        };

    app.sendRequest({
      url: '/index.php?r=AppShop/addCart',
      data: param,
      success: function(res){
        app.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1500,
          success: function(){
            that.setData({
              addToShoppingCartHidden: true
            })
            that.getCartList();
          }
        });
      }
    })
  },
  readyToPay: function(){
    if(this.data.cartGoodsNum <= 0) return;
    var franchiseeId = this.franchiseeId,
        pagePath = '/pages/previewOrderDetail/previewOrderDetail'+(franchiseeId ? '?franchisee='+franchiseeId : '');
    app.turnToPage(pagePath);
  },
  pageTouchStart: function(e){
    var touches = e.touches;
    if(touches.length > 1)
      return;

    this.touchStartPos = {
      clientX: touches[0].clientX,
      clientY: touches[0].clientY
    };
  },
  pageTouchMove: function(e){
    var touches = e.touches;
    if(touches.length > 1)
      return;

    if(touches[0].clientX - this.touchStartPos.clientX > 30){
      if(this.pageNavigating)
        return;
      this.pageNavigating = true;
      wx.navigateBack();
    }
  },
  stopPropagation: function(){}
})
