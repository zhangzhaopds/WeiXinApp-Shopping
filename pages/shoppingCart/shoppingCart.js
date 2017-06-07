
var app = getApp()

Page({
  data: {
    editing: false,
    goodsCount: 0,
    goodsCountToPay: 0,
    priceToPay: 0.00,
    goodsList: [],
    selectAll: false,
    editSelectAll: false,
    modalConfig: {
      hidden: true,
      text: ''
    },
    timeout: null,
    isFromBack: false
  },
  franchiseeId: '',
  isFromUserCenterEle: '',
  onLoad: function(options){
    this.franchiseeId = options.franchisee || '';
    this.isFromUserCenterEle = options.from || '';
    this.getShoppingCartData();
  },
  onShow: function(){
    if(this.data.isFromBack){
      this.getShoppingCartData();
      this.setData({
        selectAll: false
      });
    } else {
      this.setData({
        isFromBack: true
      });
    }
    // app.checkIfBindPhone();
  },
  getShoppingCartData: function(){
    var that = this,
        franchiseeId = this.franchiseeId,
        fromUserCenterEle = this.data.isFromUserCenterEle;

    // 获取购物车列表时 传sub_shop_app_id获取
    app.sendRequest({
      url: '/index.php?r=AppShop/cartList',
      data: {
        page: 1,
        page_size: 1000,
        sub_shop_app_id: fromUserCenterEle ? '' : franchiseeId,
        parent_shop_app_id: franchiseeId ? app.getAppId() : ''
      },
      success: function(res){
        for (var i = res.data.length - 1; i >= 0; i--) {
          var modelArr = res.data[i].model_value;

          if(modelArr && modelArr.join){
            res.data[i].model_value_str = '('+modelArr.join('|')+')';
          }
        }
        that.setData({
          goodsCount: res.data.length,
          goodsList: res.data
        });
        that.recalculateCountPrice();
      }
    })
  },
  switchToEdit: function(){
    this.setData({
      editing: true
    })
  },
  editComplete: function(){
    var list = this.data.goodsList;

    for (var i = list.length - 1; i >= 0; i--) {
      list[i].editSelected = false;
    }

    this.setData({
      editing: false,
      goodsList: list
    })
    this.recalculateCountPrice();
  },
  clickSelectAll: function(){
    var alreadySelect = this.data.selectAll,
        list = this.data.goodsList;

    if(alreadySelect){
      for (var i = list.length - 1; i >= 0; i--) {
        list[i].selected = false;
      }
    } else {
      for (var i = list.length - 1; i >= 0; i--) {
        list[i].selected = true;
      }
    }
    this.setData({
      selectAll: !alreadySelect,
      goodsList: list
    })
    this.recalculateCountPrice();
  },
  clickEditSelectAll: function(){
    var alreadySelect = this.data.editSelectAll,
        list = this.data.goodsList;

    if(alreadySelect){
      for (var i = list.length - 1; i >= 0; i--) {
        list[i].editSelected = false;
      };
    } else {
      for (var i = list.length - 1; i >= 0; i--) {
        list[i].editSelected = true;
      };
    }

    this.setData({
      editSelectAll: !alreadySelect,
      goodsList: list
    })
  },
  clickSelectGoods: function(e){
    var index = e.currentTarget.dataset.index,
        list = this.data.goodsList,
        selectAll = true;

    list[index].selected = !list[index].selected;
    for (var i = list.length - 1; i >= 0; i--) {
      if(!list[i].selected){
        selectAll = false;
        break;
      }
    }
    this.setData({
      goodsList: list,
      selectAll: selectAll
    })
    this.recalculateCountPrice();
  },
  clickEditSelectGoods: function(e){
    var index = e.currentTarget.dataset.index,
        list = this.data.goodsList,
        editSelectAll = true;

    list[index].editSelected = !list[index].editSelected;
    for (var i = list.length - 1; i >= 0; i--) {
      if(!list[i].editSelected){
        editSelectAll = false;
        break;
      }
    }
    this.setData({
      goodsList: list,
      editSelectAll: editSelectAll
    })
  },
  recalculateCountPrice: function(){
    var list = this.data.goodsList,
        totalCount = 0,
        price = 0;

    for (var i = list.length - 1; i >= 0; i--) {
      var goods = list[i];
      if(goods.selected){
        totalCount += +goods.num;
        price += +goods.price * +goods.num;
      }
    }

    this.setData({
      goodsCountToPay: totalCount,
      priceToPay: price.toFixed(2)
    })
  },
  deleteGoods: function(){
    var deleteIdArr = [],
        list = this.data.goodsList,
        listExcludeDelete = [],
        franchiseeId = this.franchiseeId,
        fromUserCenterEle = this.data.isFromUserCenterEle,
        that = this;

    for (var i = list.length - 1; i >= 0; i--) {
      if(list[i].editSelected){
        deleteIdArr.push(+list[i].id);
      } else {
        listExcludeDelete.push(list[i]);
      }
    }
    if(!deleteIdArr.length) { return; }

    app.sendRequest({
      url : '/index.php?r=AppShop/deleteCart',
      method: 'post',
      data: {
        cart_id_arr: deleteIdArr,
        sub_shop_app_id: fromUserCenterEle ? '' : franchiseeId
      },
      success: function(res){
        that.setData({
          goodsList: listExcludeDelete,
          goodsCount: listExcludeDelete.length
        })
      }
    });
  },
  goToPay: function(e){
    var payIdArr = [],
        list = this.data.goodsList,
        franchiseeId = this.franchiseeId,
        fromUserCenterEle = this.data.isFromUserCenterEle,
        selectGoodsType = '',
        cartIdArray = [],
        sameGoodsType = true,
        that = this;

    for (var i = list.length - 1; i >= 0; i--) {
      var li = list[i];
      if(li.selected){
        selectGoodsType = selectGoodsType == '' ? li.goods_type : selectGoodsType;
        if(sameGoodsType && selectGoodsType != li.goods_type){
          sameGoodsType = false;
        }
        cartIdArray.push(li.id);
        payIdArr.push({
          cart_id: li.id,
          goods_id: li.goods_id,
          model_id: li.model_id,
          num: li.num
        });
      }
    }
    if(!payIdArr.length) {
      app.showModal({
        content: '请选择结算的商品'
      })
      return;
    }
    if(sameGoodsType && selectGoodsType == 3){
    // 当购物车勾选商品全部为到店时 不生成订单而是跳转到预览订单页面
      var pagePath = '/pages/previewOrderDetail/previewOrderDetail'+(franchiseeId ? '?franchisee='+franchiseeId : '');

      pagePath += (franchiseeId ? '&' : '?') + 'cart_arr=' + encodeURIComponent(cartIdArray);
      app.turnToPage(pagePath);
      return;
    }

    app.sendRequest({
      url : '/index.php?r=AppShop/addCartOrder',
      method: 'post',
      data: {
        cart_arr: payIdArr,
        formId: e.detail.formId,
        sub_shop_app_id: fromUserCenterEle ? '' : franchiseeId
      },
      success: function(res){
        var pagePath = '/pages/orderDetail/orderDetail?detail='+res.data+(franchiseeId ? '&franchisee='+franchiseeId : '');
        app.turnToPage(pagePath);
      }
    });
  },
  clickMinusButton: function(e){
    var index = e.currentTarget.dataset.index,
        num = this.data.goodsList[index].num;

    if(num-1 < 1) return;
    this.changeGoodsNum(index, 'minus');
  },
  clickPlusButton: function(e){
    var index = e.currentTarget.dataset.index;
    this.changeGoodsNum(index, 'plus');
  },
  changeGoodsNum: function(index, type){
    var goods = this.data.goodsList[index],
        currentNum = +goods.num,
        targetNum = type == 'plus' ? currentNum + 1 : currentNum - 1,
        that = this,
        data = {},
        param;

    data['goodsList['+index+'].num'] = targetNum;
    this.setData(data);
    this.recalculateCountPrice();

    param = {
      goods_id: goods.goods_id,
      model_id: goods.model_id || '',
      num: targetNum,
      sub_shop_app_id: this.franchiseeId
    };
    app.sendRequest({
      url: '/index.php?r=AppShop/addCart',
      data: param,
      success: function(res){
        data = {};
        data['goodsList['+index+'].cart_id'] = res.data;
        that.setData(data);
      },
      fail: function(res){
        data = {};
        data['goodsList['+index+'].num'] = currentNum;
        that.setData(data);
      }
    })
  },
  modalConfirm: function(){
    this.setData({
      'modalConfig.hidden': true
    })
    this.afterModalConfirm && this.afterModalConfirm();
    this.afterModalConfirm = null;
  },
  modalCancel: function(){
    this.setData({
      'modalConfig.hidden': true
    })
  },
  inputGoodsCount: function(e){
    var index = e.target.dataset.index,
        count = e.detail.value,
        data = {};

    data['goodsList['+index+'].num'] = +count;
    this.setData(data);
  }
})
