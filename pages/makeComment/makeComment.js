
var app = getApp()

Page({
  data: {
    goodsInfo: [],
    submitData: {
      order_id: '',
      goods: [],
      score: 5,
      logistics_score: 5
    }
  },
  onLoad: function(options){
    this.setData({
      'submitData.order_id': options.detail,
      'submitData.sub_shop_app_id': options.franchisee || ''
    })
    this.getOrderDetail();
  },
  getOrderDetail: function(){
    var that = this;
    app.getOrderDetail({
      data: {
        order_id: that.data.submitData.order_id,
        sub_shop_app_id: this.data.submitData.sub_shop_app_id
      },
      success: function(res){
        var goodsInfo = res.data[0].form_data.goods_info,
            goods = [];

        for (var i = 0, j = goodsInfo.length - 1; i <= j; i++) {
          goods.push({
            goods_id: goodsInfo[i].goods_id,
            info: {
              content: '',
              level: 1,
              img_arr: []
            }
          })
        }
        that.setData({
          goodsInfo: goodsInfo,
          'submitData.goods': goods
        })
      }
    })
  },
  setDescScore: function(e){
    var score = e.target.dataset.score;
    this.setData({
      'submitData.score': score
    })
  },
  setLogisticsScore: function(e){
    var score = e.target.dataset.score;
    this.setData({
      'submitData.logistics_score': score
    })
  },
  clickLevelSpan: function(e){
    var goodsIndex = e.currentTarget.dataset.goodsIndex,
        level = e.currentTarget.dataset.level,
        data = {};

    data['submitData.goods['+goodsIndex+'].info.level'] = level;
    this.setData(data);
  },
  commentInput: function(e){
    var goodsIndex = e.target.dataset.goodsIndex,
        data = {};

    data['submitData.goods['+goodsIndex+'].info.content'] = e.detail.value;
    this.setData(data);
  },
  chooseImage: function(e){
    var that = this,
        goodsIndex = e.currentTarget.dataset.goodsIndex;

    app.chooseImage(function(images){
      var data = {};
      data['submitData.goods['+goodsIndex+'].info.img_arr'] = images;
      that.setData(data);
    }, 3);
  },
  removePic: function(e){
    var goodsIndex = e.currentTarget.dataset.goodsIndex,
        picIndex = e.currentTarget.dataset.picIndex,
        img_arr = this.data.submitData.goods[goodsIndex].img_arr,
        data = {};

    img_arr.splice(picIndex, 1);
    data['submitData.goods['+goodsIndex+'].info.img_arr'] = img_arr;
    this.setData(data);
  },
  makeComment: function(){
    var that = this,
        submitData = that.data.submitData,
        modalText = '';

    for (var i = submitData.goods.length - 1; i >= 0; i--) {
      var goods = submitData.goods[i];
      if(goods.info.content.length < 10){
        modalText = '评价内容少于10个字';
        break;
      }
      if(!goods.info.level) {
        modalText = '尚未给商品评分';
        break;
      }
      if(goods.info.img_arr.length > 3) {
        modalText = '每个商品最多上传3张图片';
        break;
      }
    }

    if(modalText){
      app.showModal({
        content: modalText
      })
      return;
    }
    app.sendRequest({
      url: '/index.php?r=AppShop/AddAssessList',
      method: 'post',
      data: submitData,
      success: function(res){
        app.turnBack();
        console.log(res.data);
      }
    })
  }
})
