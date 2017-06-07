
var app = getApp()
var util = require('../../utils/util.js')

Page({
  data: {
    hideVerifyPhone: true,
    hideBindNewPhone: true,
    oldCode: '',
    oldCodeBtnDisabled: false,
    oldCodeStatus: '获取验证码',
    nextStepDisabled: false,
    newPhone: '',
    newCode: '',
    newCodeBtnDisabled: false,
    newCodeStatus: '获取验证码',
    bindNewPhoneBtnDisabled: false,
    codeInterval: 60
  },
  onLoad: function(){
    var userInfo = app.getUserInfo();

    if(userInfo.phone){
      this.setData({
        hideVerifyPhone: false
      })
    } else {
      this.setData({
        hideBindNewPhone: false
      })
    }
  },
  sendCodeToOldPhone: function(){
    var that = this;
    if(this.data.oldCodeBtnDisabled){
      return;
    }

    this.setData({
      oldCodeStatus: '正在发送...',
      oldCodeBtnDisabled: true
    })
    app.sendRequest({
      url: '/index.php?r=AppData/PhoneCode',
      success: function(){
        var second = that.data.codeInterval,
            interval;

        app.showToast({
          title: '已发送',
          icon: 'success'
        })
        interval = setInterval(function(){
          if(second < 0) {
            clearInterval(interval);
            that.setData({
              oldCodeStatus: '获取验证码',
              oldCodeBtnDisabled: false
            })
          } else {
            that.setData({
              oldCodeStatus: second+'s',
            })
            second--;
          }
        }, 1000);
      },
      complete: function(){
        that.setData({
          oldCodeStatus: '获取验证码',
          oldCodeBtnDisabled: false
        })
      }
    })

  },
  inputOldCode: function(e){
    this.setData({
      oldCode: e.detail.value
    })
  },
  nextStep: function(){
    var that = this;
    if(!this.data.oldCode){
      app.showModal({
        content: '请输入验证码'
      })
      return;
    }
    if(this.data.nextStepDisabled){
      return;
    }

    this.setData({
      nextStepDisabled: true
    })
    app.sendRequest({
      url: '/index.php?r=AppData/VerifyPhone',
      method: 'post',
      data: {
        code: this.data.oldCode
      },
      success: function(){
        that.setData({
          hideVerifyPhone: true,
          hideBindNewPhone: false
        })
      },
      complete: function(){
        that.setData({
          nextStepDisabled: false
        })
      }
    })
  },
  inputPhone: function(e){
    this.setData({
      newPhone: e.detail.value
    })
  },
  inputNewCode: function(e){
    this.setData({
      newCode: e.detail.value
    })
  },
  sendCodeToNewPhone: function(){
    var that = this,
        newPhone = this.data.newPhone;

    if(!util.isPhoneNumber(newPhone)){
      app.showModal({
        content: '请输入正确的手机号码'
      })
      return;
    }
    if(this.data.newCodeBtnDisabled){
      return;
    }

    this.setData({
      newCodeStatus: '正在发送...',
      newCodeBtnDisabled: true
    })
    app.sendRequest({
      url: '/index.php?r=AppData/NewPhoneCode',
      method: 'post',
      data: {
        phone: newPhone
      },
      success: function(res){
        var second = that.data.codeInterval,
            interval;

        app.showToast({
          title: '已发送',
          icon: 'success'
        })
        interval = setInterval(function(){
          if(second < 0) {
            clearInterval(interval);
            that.setData({
              newCodeStatus: '获取验证码',
              newCodeBtnDisabled: false
            })
          } else {
            that.setData({
              newCodeStatus: second+'s',
            })
            second--;
          }
        }, 1000);
      },
      complete: function(){
        that.setData({
          newCodeStatus: '获取验证码',
          newCodeBtnDisabled: false
        })
      }
    })
  },
  bindNewPhone: function(){
    var that = this,
        newPhone = this.data.newPhone,
        newCode = this.data.newCode;

    if(!newPhone || !newCode){
      return;
    }
    if(!util.isPhoneNumber(newPhone)){
      app.showModal({
        content: '请输入正确的手机号码'
      })
      return;
    }

    if(this.data.bindNewPhoneBtnDisabled){
      return;
    }
    this.setData({
      bindNewPhoneBtnDisabled: true
    })

    app.sendRequest({
      url: '/index.php?r=AppData/XcxVerifyNewPhone',
      mehtod: 'post',
      data: {
        phone: newPhone,
        code: newCode
      },
      success: function(res){
        app.setUserInfoStorage({
          phone: newPhone
        });
        app.showToast({
          title: '绑定成功',
          icon: 'success',
          success: function(){
            app.turnBack();
          }
        })
      },
      fail: function(res){
        app.showModal({
          content: '绑定失败'+ res.data
        })
      },
      complete: function(){
        that.setData({
          bindNewPhoneBtnDisabled: false
        })
      }
    })
  }

})
