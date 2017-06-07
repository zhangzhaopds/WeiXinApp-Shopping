
var app = getApp()

Page({
  data: {
    // 是否领取会员卡
    receiveCard: -1, // 默认不知道是否有领取
    // 卡片信息
    cardDetail: {
      appName: '即速应用',
      logoUrl: 'http://1251027630.cdn.myqcloud.com/1251027630/zhichi_frontend/static/invitation/images/logo.png',
      duration: '无限期',
      level: '普通用户'
    },
    // 会员权益
    vipRights: {
      freePostage: 0,
      discount: 0,
      giveCouponStr: '',
      integral: 0
    },
    vipNotice: {
      description: ''
    },
    // 个人积分
    vipPoints: {
      canUseIntegral: 0,
      totalIntegral: 0,
      consumeNum: 0,
    },
    // 联系我们
    vipContact: {
      appName: '即速应用',
      phone: '无'
    },
    // 活动打开的详情
    activeItem: ''
  },
  onLoad: function(){
    this.getVipInfo();
  },
  // onShow: function(){
  //   app.checkIfBindPhone();
  // },
  // 获取会员卡信息
  getVipInfo: function(){
    let that = this;
    app.sendRequest({
      url: '/index.php?r=AppShop/GetVIPInfo',
      data: {
        'app_id': app.globalData.appId,
        'is_all': 1
      },
      success: function(res){
        let cardBackground  = ''
        if (parseInt(res.data.background_type) == 0) {
          cardBackground = 'url(' + res.data.background + ') 0% 0% / 100% 100%';
        } else {
          cardBackground = res.data.background;
        }
        let giveCouponStr = '';
        if (res.data.is_vip != 0) {
          for (let i = 0; i < res.data.coupon_list.length; i++) {
            giveCouponStr = giveCouponStr + '免费赠送' + res.data.coupon_list[i].num + '张' + res.data.coupon_list[i].name + '的优惠券,';
          }
        }
        that.setData({
          'receiveCard': res.data.is_vip || 0,
          'cardDetail.appName': res.data.app_name,
          'cardDetail.logoUrl': res.data.logo,
          'cardDetail.duration': res.data.expire,
          'cardDetail.level': res.data.title,
          'cardDetail.cardBackground': cardBackground,
          'vipRights.discount': res.data.discount,
          'vipRights.giveCouponStr': giveCouponStr,
          'vipRights.integral': res.data.integral,
          'vipRights.freePostage': res.data.is_free_postage,
          'vipNotice.description': res.data.description,
          'vipPoints.canUseIntegral': res.data.can_use_integral,
          'vipPoints.totalIntegral': res.data.total_integral,
          'vipPoints.consumeNum': res.data.consume_num,
          'vipContact.appName': res.data.app_name,
          'vipContact.phone': res.data.phone
        });
      }
    });
  },
  // 展示对应内容
  showItemContent: function(event){
    let that = this;
    let _item = event.currentTarget.dataset.item;
    if (that.data.activeItem == _item) {
      _item = '';
    }
    that.setData({
      'activeItem': _item
    });
  }
})
