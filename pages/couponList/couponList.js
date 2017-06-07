var app = getApp()
var util = require('../../utils/util.js')

Page({
  data: {
    couponList: [],
    type: 0
  },
  onLoad: function() {
    let _this = this;
    app.sendRequest({
      url: '/index.php?r=AppShop/GetMyCoupon',
      data: {
        app_id: app.getAppId(),
        type: 0
      },
      success: function(res) {
        _this.setData({
          couponList: res.data
        })
      }
    })
  },
  // onShow: function() {
  //   app.checkIfBindPhone();
  // },
  requestTabData: function(event) {
    let _this = this;
    let type = event.target.dataset.type;
    _this.setData({
        type: type
      }),
      app.sendRequest({
        url: '/index.php?r=AppShop/GetMyCoupon',
        data: {
          app_id: app.getAppId(),
          type: type
        },
        success: function(res) {
          _this.setData({
            couponList: res.data
          })
        }
      })
  }
})
