
var app = getApp()
var util = require('../../utils/util.js')

Page({
    data: {
        couponId: '',
        couponDetail: {
            logoUrl: '',
            appName: '',
            title: '',
            subTitle: '',
            useCondition: '',
            useData: '',
            useTime: '',
            excludeHoliday: '',
            excludeWeekend: '', 
            address: '',
            phone: '',
            background: ''
        },
        hasReceive: false
    },
    onLoad: function (options) {
        let that = this;
        let couponId = options.detail;
        that.setData({
            'couponId': couponId
        });
        app.sendRequest({
            url: '/index.php?r=AppShop/GetCouponInfo',
            data: {
                'app_id': app.globalData.appId,
                'coupon_id': couponId
            },
            success: that.setCouponData
        });

    },
    setCouponData: function (res) {
        let that = this;
        let useCondition = '';
        if (res.data.type == 0) {
            useCondition = '消费满' + res.data.condition + '减' + res.data.value + '元';
        } else if (res.data.type == 1) {
            useCondition = '打' + res.data.value + '折';
        }
        that.setData({
            'couponDetail.logoUrl': res.data.logo,
            'couponDetail.appName': res.data.app_name,
            'couponDetail.title': res.data.title,
            'couponDetail.subTitle': res.data.sub_title,
            'couponDetail.useCondition': useCondition,
            'couponDetail.useData': res.data.start_use_date + '至' + res.data.end_use_date,
            'couponDetail.useTime': res.data.start_use_time + '-' + res.data.end_use_time,
            'couponDetail.excludeHoliday': res.data.exclude_holiday == 1 ? '除法定节假日' : '',
            'couponDetail.excludeWeekend': res.data.exclude_weekend == 1 ? '周一至周五' : '', 
            'couponDetail.address': res.data.address,
            'couponDetail.phone': res.data.phone,
            'couponDetail.background': res.data.background
        });
    },
    receiveCoupon: function() {
        let that = this;
        if (that.data.hasReceive == false) {
            app.sendRequest({
                url: '/index.php?r=AppShop/RecvCoupon',
                data: {
                    'app_id': app.globalData.appId,
                    'coupon_id': that.data.couponId
                },
                success: function(res) {
                    that.setData({
                        'hasReceive': true
                    });
                }
            });
        }
    }
})
