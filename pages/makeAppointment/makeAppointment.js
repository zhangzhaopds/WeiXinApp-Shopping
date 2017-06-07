
var app = getApp()

Page({
  data: {
    appointmentInfo: {},
    servicePrice: '',
    goodsId: '',
    longRangeIndex: 0,
    periodRangeIndex: 0,
    selectedDate: '',
    selectedDateIfBusiness: 0,
    selectedPeriod: '',
    serviceTimeUnit: ''
  },
  onLoad: function(options){
    var goodsId = options.detail,
        franchiseeId = options.franchisee || '';
    this.setData({
      goodsId: goodsId,
      franchiseeId: franchiseeId
    });
    this.getAppointmentList({
      app_id: app.getAppId(),
      goods_id: goodsId,
      sub_shop_app_id: franchiseeId
    }, true);
  },
  getAppointmentList: function(param, initial){
    var that = this;

    app.sendRequest({
      url: '/index.php?r=AppShop/getAppointmentList',
      data: param,
      success: function(res){
        var data = {},
            day7from_now;

        if(initial){
          day7from_now = res.day7from_now;
          for (var i = 0; i < day7from_now.length; i++) {
            var date = day7from_now[i].date+'';

            day7from_now[i].modifiedDate = date.substring(4, 6)+'月'+date.substring(6)+'日';
          }
          data['appointmentInfo.serviceDateList'] = day7from_now;
          data['appointmentInfo.serviceLongRange'] = res.can_select_long;
          data['appointmentInfo.servicePeriodRange'] = res.can_select_interval;
          data['selectedDate'] = day7from_now[0].date;
          data['selectedDateIfBusiness'] = day7from_now[0].ifBusiness;
          data['serviceTimeUnit'] = res.unit;
        }

        data['appointmentInfo.servicePeriodList'] = res.appointment_info;
        data['servicePrice'] = res.price;
        that.setData(data);
      }
    })
  },
  serviceLongChange: function(e){
    var value = e.detail.value;
    this.setData({
      longRangeIndex: value
    });
    this.serviceConditionChange();
  },
  servicePeriodSelectChange: function(e){
    var value = e.detail.value;
    this.setData({
      periodRangeIndex: value
    });
    this.serviceConditionChange();
  },
  serviceDateChange: function(e){
    var dataset = e.currentTarget.dataset,
        ifBusinessDay = dataset.ifbusinessday,
        date = dataset.date,
        data = {};

    data['selectedDate'] = date;
    if(!ifBusinessDay){
      data['appointmentInfo.servicePeriodList'] = '';
    }
    this.setData(data);

    if(ifBusinessDay){
      this.serviceConditionChange();
    }
  },
  servicePeriodListChange: function(e){
    var dataset = e.currentTarget.dataset,
        canBuy = dataset.canBuy,
        expired = dataset.expired;

    if(expired == 1 || canBuy == 0){
      return;
    }

    this.setData({
      selectedPeriod: e.currentTarget.dataset.interval
    });
  },
  serviceConditionChange: function(){
    var param = this.getParam();

    this.getAppointmentList(param, false);
    this.setData({
      selectedPeriod: ''
    });
  },
  getParam: function(){
    var appointmentInfo = this.data.appointmentInfo;
    var param = {
            timelong: appointmentInfo.serviceLongRange[this.data.longRangeIndex],
            day: this.data.selectedDate,
            app_id: app.getAppId(),
            goods_id: this.data.goodsId,
            sub_shop_app_id: this.data.franchiseeId
          };
    if(this.data.serviceTimeUnit == '小时'){
      param.interval = appointmentInfo.servicePeriodRange[this.data.periodRangeIndex];
    }
    return param;
  },
  sureMakeAppointment: function(e){
    var selectPeriod = this.data.selectedPeriod,
        param;

    if(!selectPeriod){
      app.showModal({
        content: '请选择具体时间'
      });
      return;
    }

    param = this.getParam();
    param.interval = selectPeriod;
    param.model_id = 0;
    param.num = 1;
    param.formId = e.detail.formId;

    app.sendRequest({
      url: '/index.php?r=AppShop/addOrder',
      data: param,
      success: function(res){
        app.turnToPage('/pages/orderDetail/orderDetail?detail='+res.data, true);
      }
    })
  }
})
