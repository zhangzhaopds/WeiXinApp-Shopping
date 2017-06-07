
var app = getApp()
var util = require('../../utils/util.js')

Page({
  data: {
    goodsId: '',
    commnetType: 0,
    comments: [],
    commentNums: [],
    loadPage: 1
  },
  onLoad: function(options){
    var goodsId = options.detail,
        franchiseeId = options.franchisee || '';

    this.setData({
      goodsId: goodsId,
      franchiseeId: franchiseeId
    })
    this.getAssessList(0, 1);
  },
  getAssessList: function(commnetType, page, append){
    var that = this;
    app.getAssessList({
      method: 'post',
      data: {
        goods_id: that.data.goodsId,
        idx_arr: {
          idx: 'level',
          idx_value: commnetType
        },
        page: page,
        page_size: 20,
        sub_shop_app_id: this.data.franchiseeId
      },
      success: function(res){
        var commentArr = res.data;
        for (var i = commentArr.length - 1; i >= 0; i--) {
          commentArr[i].add_time = util.formatTime(new Date(commentArr[i].add_time*1000));
        }
        if(append){
          commentArr = that.data.comments.concat(commentArr);
        }
        that.setData({
          comments: commentArr,
          commentNums: res.num,
          loadPage: that.data.loadPage + 1
        })
      }

    });
  },
  clickCommentLabel: function(e){
    var commentType = e.target.dataset.type,
        data = {};

    data.loadPage = 1;
    data.commnetType = commentType;

    this.setData(data);
    this.getAssessList(commentType, 1);
  },
  scrollLoadComment: function(){
    this.getAssessList(this.data.commentType, this.data.loadPage, 1);
  }
})
