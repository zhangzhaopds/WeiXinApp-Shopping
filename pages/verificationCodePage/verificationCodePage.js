var app = getApp();

Page({
    data: {
        codeImgUrl: '',
        codeNum: '',
        codeStatus: 0
    },
    onLoad: function(option){
        let that = this;
        let subShopAppId = option.sub_shop_app_id;
        let orderId = option.detail;
        app.sendRequest({
            url: '/index.php?r=AppShop/GetOrderVerifyCode',
            data: {
                'sub_shop_app_id': subShopAppId,
                'order_id': orderId
            },
            success: that.setVerificationCodeData
        })
    },
    setVerificationCodeData: function(res) {
        let that = this;
        that.setData({
            'codeImgUrl': res.data.qrcode_url,
            'codeNum': res.data.code,
            'codeStatus': res.data.status
        });
        that.connectSocket();
    },
    timeInterval: '',// 定时器,间断发送消息
    connectSocket: function(){
        var that = this;
        wx.connectSocket({
            url: 'wss://xcx.jisuapp.cn',
            header: {
                'content-type': 'application/json'
            },
            method: 'GET'
        });
        wx.onSocketOpen(function(res){
            let data = {
                    'action': 'mark_client',
                    'user_token': app.globalData.userInfo.user_token,
                    'scenario_name': 'app_order_verify',
                    'session_key': app.globalData.sessionKey
                };
            wx.sendSocketMessage({
                'data': data
            });
            that.timeInterval = setInterval(function(){
                let data = {
                        'action': 'heartbeat',
                        'user_token': app.globalData.userInfo.user_token,
                        'scenario_name': 'app_order_verify',
                        'session_key': app.globalData.sessionKey
                    };
                wx.sendSocketMessage({
                    data: data
                })
            }, 30000);
        });
        wx.onSocketMessage(function(res){
            let data = JSON.parse(res.data);
            if(data.action == 'push_to_client'){
                let msg = JSON.parse(data.msg);
                if((msg.type == 'app_order_verify') && (msg.status == 0)) {
                    that.setData({
                        'codeStatus': 1
                    });
                    clearInterval(that.timeInterval);
                    wx.closeSocket();
                }
            }
        });
    },
    onUnload: function(){
        var that = this;
        clearInterval(that.timeInterval);
        wx.closeSocket();
    }

})