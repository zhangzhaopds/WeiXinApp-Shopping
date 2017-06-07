
var app = getApp()

Page({
  data: {
    wayOfDine: 0, // 1:点餐, 2:预约
    queueNum: 0,
    durationTime: 0,
    appointmentTime: 0
  },
  orderId: '',
  onLoad: function (options) {
    this.franchiseeId = options.franchisee || '';
    this.orderId = options.detail || '';

    this.getOrderDetail();
  },
  getOrderDetail: function(){
    var that = this;
    app.getOrderDetail({
      data: {
        order_id: this.orderId,
        sub_shop_app_id: this.franchiseeId
      },
      success: function (res) {
        var tostore_data = res.data[0].form_data.tostore_data;

        that.setData({
          wayOfDine: tostore_data.tostore_order_type,
          queueNum: tostore_data.formatted_queue_num,
          appointmentTime: tostore_data.appointed_time.substr(11,5),
          durationTime: tostore_data.duration_time
        })
      }
    })
  },
  goToHomepage: function(){
    var homepageRouter = app.getHomepageRouter();
    app.turnToPage('/pages/'+homepageRouter+'/'+homepageRouter, 1);
  },
  goToOrderDetail: function(){
    app.turnToPage('/pages/orderDetail/orderDetail?detail='+this.orderId, 1);
  }
})
