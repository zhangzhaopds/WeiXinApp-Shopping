var appInstance = getApp();
var WxParse     = require('../../components/wxParse/wxParse.js');
var util        = require('../../utils/util.js');

var pageData    = {
  data: {"user_center1":{"type":"user-center","style":"opacity:1;color:rgb(255, 255, 255);margin-top:0;font-size:37.5rpx;height:auto;margin-left:auto;","content":"","customFeature":{"mode":1,"with-horizontal":true,"topSectionStyle":{"background-color":"","background-image":"url(https:\/\/1251027630.cdn.myqcloud.com\/1251027630\/zhichi_frontend\/static\/webapp\/images\/top_bg.jpg)"},"appendComponentAttr":{"myAddress":{"margin-top":"-1px","openVerifyPhone":false},"myOrder":{"margin-top":"-1px","openVerifyPhone":false},"shoppingCart":{"margin-top":"-1px","openVerifyPhone":false},"myMessage":{"margin-top":"-1px","openVerifyPhone":false},"vipCard":{"margin-top":"-1px","openVerifyPhone":false},"coupon":{"margin-top":"-1px","openVerifyPhone":false},"myIntegral":{"margin-top":"-1px","openVerifyPhone":false}},"appendComponent":["myAddress","myOrder","shoppingCart","myMessage","vipCard","coupon","myIntegral"]},"animations":[],"page_form":"","compId":"user_center1","parentCompid":"user_center1"},"has_tabbar":1},
  page_router: 'page10002',
    page_form: 'none',
      list_compids_params: [],
      goods_compids_params: [],
  prevPage:0,
      relobj_auto: [],
      bbsCompIds: [],
      dynamicVesselComps: [],
      communityComps: [],
      franchiseeComps: [],
      cityLocationComps: [],
      onLoad: function (e) {
    this.setData({
      addShoppingCartShow: false
    });
    appInstance.setPageUserInfo();
    if(e.detail){
      this.dataId = e.detail;
    }
    appInstance.checkLogin();

    this.suspensionBottom();
    appInstance.globalData.urlLocationId = e.location_id;

  },
  dataInitial: function(){
    appInstance.dataInitial();
  },
  onShareAppMessage: function(){
    var pageRouter = this.page_router,
        pagePath = '/pages/'+pageRouter+'/'+pageRouter;

    // 统计用户分享APP
    appInstance.countUserShareApp();

    pagePath += this.dataId ? '?detail='+this.dataId : '';
    return {
      title: appInstance.getAppTitle() || '即速应用',
      desc: appInstance.getAppDescription() || '即速应用，拖拽生成app，无需编辑代码，一键打包微信小程序',
      path: pagePath
    }
  },
  onShow: function(){
    var that = this;
    setTimeout(function(){
      appInstance.setPageUserInfo();
    });
  },

  suspensionBottom: function(){
    for (let i in this.data) {
      if(/suspension/.test(i)){
        let suspension = this.data[i],
            newdata = {};

        if(this.data.has_tabbar == 1){
          newdata[i + '.suspension_bottom'] = (+suspension.suspension_bottom - 56)*2.34;
        }else{
          newdata[i + '.suspension_bottom'] = (+suspension.suspension_bottom)*2.34;
        }
        this.setData(newdata);
      }
    }
  },
  pageScrollFunc: function (e) {
    let compid  = e.target.dataset.compid;
    let curpage = parseInt(e.target.dataset.curpage) + 1;
      if (this.prevPage !== curpage) {
          this.prevPage = curpage;
          appInstance.pageScrollFunc(compid, curpage);
      }
  },
  goodsScrollFunc: function (e) {
    let compid  = e.target.dataset.compid;
    let curpage = parseInt(e.target.dataset.curpage) + 1;
    if (this.prevPage !== curpage) {
        this.prevPage = curpage;
        appInstance.goodsScrollFunc(compid, curpage);
    }
  },
  franchiseeScrollFunc: function (e) {
    let compid  = e.target.dataset.compid;
    let curpage = parseInt(e.target.dataset.curpage) + 1;
    appInstance.franchiseeScrollFunc(compid, curpage);
  },
  changeCount: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.changeCount(dataset);
  },
  inputChange: function (e) {
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    appInstance.inputChange(dataset, value);
  },
  bindDateChange: function(e) {
    let dataset = e.currentTarget.dataset;
    let value   = e.detail.value;
    appInstance.bindDateChange(dataset, value);
  },
  bindTimeChange: function(e) {
    let dataset = e.currentTarget.dataset;
    let value   = e.detail.value;
    appInstance.bindTimeChange(dataset, value);
  },
  bindSelectChange: function(e) {
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    appInstance.bindSelectChange(dataset, value);
  },
  bindScoreChange: function(e){
    let dataset = e.currentTarget.dataset;
    appInstance.bindScoreChange(dataset);
  },
  submitForm: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.submitForm(dataset);
  },
  udpateVideoSrc: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.udpateVideoSrc(dataset);
  },
  tapMapDetail: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.tapMapDetail(dataset);
  },
  uploadFormImg: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.uploadFormImg(dataset);
  },
  listVesselTurnToPage: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.listVesselTurnToPage(dataset);
  },
  UserCenterTurnToPage: function (e) {
    let router = e.currentTarget.dataset.router;
    let openVerifyPhone = e.currentTarget.dataset.openVerifyPhone; // 是否开启短信验证
    if(openVerifyPhone){
      if(!appInstance.getUserInfo().phone) {
        appInstance.turnToPage('/pages/bindCellphone/bindCellphone', true);
      } else {
        appInstance.turnToPage('/pages/' + router + '/' + router +'?from=userCenterEle');
      }
    } else {
      appInstance.turnToPage('/pages/' + router + '/' + router +'?from=userCenterEle');
    }
  },
  turnToGoodsDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    let contact = e.currentTarget.dataset.contact;
    let goodsType = e.currentTarget.dataset.goodsType;
    switch(+goodsType){
      case 0:
      case 1: appInstance.turnToPage('/pages/goodsDetail/goodsDetail?detail=' + id +'&contact=' + contact);
        break;
      case 3: appInstance.turnToPage('/pages/toStoreDetail/toStoreDetail?detail=' + id);
        break;
    }
  },
  turnToFranchiseeDetail: function(e){
    let dataset = e.currentTarget.dataset,
        id = dataset.id;
    appInstance.turnToPage('/pages/franchiseeDetail/franchiseeDetail?detail=' + id);
  },
  sortListFunc: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.sortListFunc(dataset);
  },
  bbsInputComment: function(e){
    var dataset = e.target.dataset,
        comment = e.detail.value;
    appInstance.bbsInputComment(dataset, comment);
  },
  bbsInputReply: function(e){
    var dataset = e.target.dataset,
        comment = e.detail.value;
    appInstance.bbsInputReply(dataset, comment);
  },
  uploadBbsCommentImage: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.uploadBbsCommentImage(dataset);
  },
  uploadBbsReplyImage: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.uploadBbsReplyImage(dataset);
  },
  deleteCommentImage: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.deleteCommentImage(dataset);
  },
  deleteReplyImage: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.deleteReplyImage(dataset);
  },
  bbsPublishComment: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.bbsPublishComment(dataset);
  },
  clickBbsReplyBtn: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.clickBbsReplyBtn(dataset);
  },
  bbsPublishReply: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.bbsPublishReply(dataset);
  },
  keywordList:{},
  bindSearchTextChange : function(e){
    this.keywordList[e.currentTarget.dataset.compid] = e.detail.value;
  },
  searchList:function(e){
    let dataset = e.currentTarget.dataset;
    appInstance.searchList(dataset);
  },
  selectLocal:function(e){
    var that = this;
    let id = e.currentTarget.dataset.id,
        newdata = this.data;
    newdata[id].hidden = typeof(this.data[id].hidden) == undefined ? false : !this.data[id].hidden;
    newdata[id].provinces = ['请选择'];  newdata[id].citys =['请选择']; newdata[id].districts = ['请选择']
    newdata[id].provinces_ids =[null]; newdata[id].city_ids =[null]; newdata[id].district_ids = [null];
    for(var i in newdata[id].areaList){
      newdata[id].provinces.push(newdata[id].areaList[i].name);
      newdata[id].provinces_ids.push(newdata[id].areaList[i].region_id);
    }
    newdata[id].newlocal = '';
    this.setData(newdata);
  },
  cancelCity:function(e){
    var that = this;
    let id = e.currentTarget.dataset.id,
        newdata = this.data;
    newdata[id].hidden = !this.data[id].hidden;
    newdata[id].province = '';
    newdata[id].city = '';
    newdata[id].district = '';
    this.setData(newdata);
  },
  bindCityChange:function(e){
    const val = e.detail.value;
    let id = e.currentTarget.dataset.id,
        newdata = this.data,
        cityList = newdata[id].areaList;
        if(!newdata[id].newlocal){
    newdata[id].province = this.data[id].province[val[0]] == '请选择' ? ''  : this.data[id].provinces[val[0]];
    newdata[id].citys = newdata[id].province == '请选择' ? ['请选择'] :  this.getCityList(cityList[val[0]].cities);
    newdata[id].city_ids = newdata[id].province == '请选择' ? [null] : this.getCityList(cityList[val[0]].cities,1);
    newdata[id].city = newdata[id].citys[val[1]];
    newdata[id].districts = newdata[id].city == '请选择' ? ['请选择'] :  this.getCityList(cityList[val[0]].cities[val[1]].towns);
    newdata[id].district_ids = newdata[id].city == '请选择' ? [null] : this.getCityList(cityList[val[0]].cities[val[1]].towns, 1);
    newdata[id].region_id = newdata[id].district_ids[val[2]];
    newdata[id].district = newdata[id].districts[val[2]];
    newdata[id].value = val;
    newdata[id].district = newdata[id].district == '请选择'? '' :newdata[id].district
    this.setData(newdata)
    }
  },
  submitCity:function(e){
    let id = e.currentTarget.dataset.id,
        newdata = this.data;
    if(!newdata[id].districts){
      appInstance.showModal({content: '您未选择城市!'});
      newdata[id].province = '';
      newdata[id].city = '';
      newdata[id].district = '';
    }else{
      newdata[id].hidden = !this.data[id].hidden;
      newdata[id].newlocal = newdata[id].province + ' ' + newdata[id].city + ' ' +      newdata[id].district;
      newdata[id].value = [0,0,0];
      appInstance.citylocationList(e.currentTarget.dataset, newdata[id].region_id);
    }
    this.setData(newdata);
  },
  getCityList:function (province, id){
    let cityList = [], cityList_id = [];
    for(let i in province){
      if(typeof(province[i]) == 'object'){
        cityList.push(province[i].name)
        cityList_id.push(province[i].region_id);
      }else{
        cityList[1] = province.name;
        cityList_id[1]=province.region_id;
      }
    }
    if(id){
      return cityList_id;
    }else{
      return cityList;
    }

  },
  

  
  
  tapGoodsTradeHandler: function(event) {
    appInstance.tapGoodsTradeHandler(event);
  },
  tapInnerLinkHandler: function(event) {
    appInstance.tapInnerLinkHandler(event);
  },
  tapPhoneCallHandler: function(event) {
    appInstance.tapPhoneCallHandler(event);
  },
  tapRefreshListHandler: function(event) {
    var _this = this;
    appInstance.tapRefreshListHandler(event, _this);
  },
  tapGetCouponHandler: function(event) {
    appInstance.tapGetCouponHandler(event);
  },
  tapCommunityHandler: function(event) {
    appInstance.tapCommunityHandler(event);
  },
  turnToCommunityPage: function(event){
    let id = event.currentTarget.dataset.id;
    appInstance.turnToPage('/pages/communityPage/communityPage?detail=' + id);
  },
  tapToFranchiseeHandler: function(event){
    appInstance.tapToFranchiseeHandler(event);
  },
  tapFranchiseeLocation: function(event){
    appInstance.tapFranchiseeLocation(event);
  },
  showAddShoppingcart: function(event) {
    var that = this,
        goods_id = event.currentTarget.dataset.id;
    appInstance.sendRequest({
      url: '/index.php?r=AppShop/getGoods',
      data: {
        data_id: goods_id
      },
      method: 'post',
      success: function (res) {
        if (res.status == 0) {
          var goods = res.data[0].form_data,
              defaultSelect = goods.model_items[0],
              goodsModel = [],
              selectModels = [],
              goodprice = 0,
              goodstock = 0,
              goodid ;
          if(goods.model_items.length){
            goodprice = defaultSelect.price;
            goodstock = defaultSelect.stock;
            goodid = defaultSelect.id;
          }else{
            goodprice = goods.price;
            goodstock = goods.stock;
          }
          for(let key in goods.model){
            if(key){
              let model = goods.model[key];
              goodsModel.push(model);
              selectModels.push(model.subModelId[0]);
            }
          }
          goods.model = goodsModel;
          that.setData({
            goodsInfo: goods ,
            addShoppingCartShow: true,
            'selectGoodsModelInfo.price': goodprice,
            'selectGoodsModelInfo.stock': goodstock,
            'selectGoodsModelInfo.buyCount': 1,
            'selectGoodsModelInfo.models': selectModels,
            'selectGoodsModelInfo.modelId': goodid
          });
        }
      }
    });
  },
  hiddeAddShoppingcart: function(){
    this.setData({
      addShoppingCartShow: false
    });
  },
  selectGoodsSubModel: function(e){
    let dataset = e.target.dataset,
        modelIndex = dataset.modelIndex,
        submodelIndex = dataset.submodelIndex,
        data = {};

    data['selectGoodsModelInfo.models['+modelIndex+']'] = this.data.goodsInfo.model[modelIndex].subModelId[submodelIndex];
    this.setData(data);
    this.resetSelectCountPrice();
  },
  resetSelectCountPrice: function(){
    let selectModelIds = this.data.selectGoodsModelInfo.models.join(','),
        modelItems = this.data.goodsInfo.model_items,
        data = {};

    for (let i = modelItems.length - 1; i >= 0; i--) {
      if(modelItems[i].model == selectModelIds){
        data['selectGoodsModelInfo.stock'] = modelItems[i].stock;
        data['selectGoodsModelInfo.price'] = modelItems[i].price;
        data['selectGoodsModelInfo.modelId'] = modelItems[i].id;
        break;
      }
    }
    this.setData(data);
  },
  clickGoodsMinusButton: function(e){
    let count = this.data.selectGoodsModelInfo.buyCount;

    if(count <= 1){
      return;
    }
    this.setData({
      'selectGoodsModelInfo.buyCount': count - 1
    });
  },
  clickGoodsPlusButton: function(e){
    let selectGoodsModelInfo = this.data.selectGoodsModelInfo,
        count = selectGoodsModelInfo.buyCount,
        stock = selectGoodsModelInfo.stock;

    if(count >= stock) {
      return;
    }
    this.setData({
      'selectGoodsModelInfo.buyCount': count + 1
    });
  },
  sureAddToShoppingCart: function(){
    var that = this,
        param = {
          goods_id: this.data.goodsInfo.id,
          model_id: this.data.selectGoodsModelInfo.modelId || '',
          num: this.data.selectGoodsModelInfo.buyCount,
          sub_shop_app_id : ''
        };

    appInstance.sendRequest({
      url: '/index.php?r=AppShop/addCart',
      data: param,
      success: function(res){
        appInstance.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1500
        });

        setTimeout(function(){
          appInstance.hideToast();
          setTimeout(function(){
            that.hiddeAddShoppingcart();
          }, 500);
        }, 1500);
      }
    })
  }
};
Page(pageData);
