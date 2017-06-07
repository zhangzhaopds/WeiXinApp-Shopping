
var app = getApp()

Page({
  data: {
    messageType: 5, // 5:默认展示系统消息列表
    systemBranch: {
      data: [],
      isMore: 0,
      currentPage: 1,
      onload: false,
      unreadCount: 0
    },
    interactBranch: {
      data: [],
      isMore: 0,
      currentPage: 1,
      onload: false,
      unreadCount: 0
    },
    /*
      xxxBranch 对象
      data: 对应分支的数据
      isMore: 是否拥有更多的新的数据
      currentPage: 当前已经加载到页数
      onload: 是否处在数据加载中， true加载中，false加载完毕
    */
    messageDetail: 0, // 控制是否展开 0:不展示消息详情页 3:展示表单详情页
    messageDetailFormData: [] //消息详情页：表单数据
  },
  onLoad: function(){
    this.getMessageData();
  },
  // 获取数据
  getMessageData: function(type, page){
    let that = this;
    app.sendRequest({
      url: '/index.php?r=AppNotify/GetUserAppNotifyMsg',
      data: {
        'app_id': app.globalData.appId,
        'types': type || '',
        'page': page || ''
      },
      success: function(res){
        for(var key in res.data){
          switch(parseInt(key)){
            // 系统消息分支：站内消息、支付消息、表单消息
            case 5:
              that.setData({
                'systemBranch.data': that.data.systemBranch.data ? that.data.systemBranch.data.concat(that.parseMessageData(res.data[key].data)) : that.parseMessageData(res.data[key].data) ,
                'systemBranch.isMore': res.data[key].is_more,
                'systemBranch.currentPage': res.data[key].current_page,
                'systemBranch.onload': false,
                'systemBranch.unreadCount': res.data[key].unread_count
              });
              break;
            // 互动消息分支：评论消息
            case 6:
              that.setData({
                'interactBranch.data': that.data.interactBranch.data ? that.data.interactBranch.data.concat(that.parseMessageData(res.data[key].data)) : that.parseMessageData(res.data[key].data) ,
                'interactBranch.isMore': res.data[key].is_more,
                'interactBranch.currentPage': res.data[key].current_page,
                'interactBranch.onload': false,
                'interactBranch.unreadCount': res.data[key].unread_count
              })
              break;
          }
        }
      }
    });
  },
  // 解析数据
  parseMessageData: function(data){
    let array = [];
    let contentJson;
    let item;
    for (var i = 0; i < data.length; i++) {
      switch(parseInt(data[i].type)){
        // 站内消息
        case 1:
          contentJson = data[i].content && JSON.parse(data[i].content);
          item = {};
          item.messageType = parseInt(data[i].type);
          item.className = 'type-system';
          item.messageTitle = contentJson.title;
          item.messageTime = data[i].add_time;
          item.messageImg = contentJson.pic;
          item.messageContent = contentJson.description;
          item.messagePageUrl = data[i].page_url;
          array.push(item);
          break;
        // 支付消息
        case 2:
          contentJson = data[i].content && JSON.parse(data[i].content);
          item = {};
          item.messageType = parseInt(data[i].type);
          item.className = 'type-pay';
          item.messageTitle = '支付成功';
          item.messageTime = data[i].add_time;
          item.messageImg = 'icon-message-pay';
          item.messagePrice = contentJson.total_price;
          item.messageOrderId = contentJson.order_id;
          array.push(item);
          break;
        // 表单消息
        case 3:
          contentJson = data[i].content && JSON.parse(data[i].content);
          item = {};
          item.messageType = parseInt(data[i].type);
          item.className = 'type-form';
          item.messageTitle = '表单提交成功';
          item.messageTime = data[i].add_time;
          item.messageImg = 'icon-message-form';
          item.messageContent = contentJson.form_name;
          item.messageForm = contentJson.form;
          item.messageFormId = contentJson.form_id;
          item.messageFormDataId = data[i].sub_id;
          array.push(item);
          break;
        // 评论消息
        case 4:
          item = {};
          item.messageType = parseInt(data[i].type);
          item.className = 'type-comment';
          item.messageTitle = '评论消息';
          item.messageTime = data[i].add_time;
          item.messageImg = 'icon-message-comment';
          item.messageContent = data[i].content + ' 回复了你的话题';
          array.push(item);
          break;
        case 8:
          item = {};
          item.messageType = parseInt(data[i].type);
          item.className = 'type-Administrators';
          item.messageTitle = '管理员通知';
          item.messageTime = data[i].add_time;
          item.messageImg = 'icon-notify';
          item.messageContent = data[i].content;
          array.push(item);
      }
    }
    return array;
  },
  // 底部触发是否获取数据
  checkMoreMessageData: function(event){
    let that = this;
    let targetId = event.target.id;
    switch(targetId) {
      case 'myMessage-system-message':
        // 有更多数据 并且 不在加载中时 执行
        if ((that.data.systemBranch.isMore != 0 ) && ( !that.data.systemBranch.onload)) {
          that.getMessageData(5, (that.data.systemBranch.currentPage + 1));
          that.setData({
            'systemBranch.onload': true
          });
        }
        break;
      case 'myMessage-interact-message':
        // 有更多数据 并且 不在加载中时 执行
        if ((that.data.interactBranch.isMore != 0 ) && ( !that.data.interactBranch.onload)) {
          that.getMessageData(6, (that.data.interactBranch.currentPage + 1));
          that.setData({
            'interactBranch.onload': true
          });
        }
        break;
    }
  },
  // 切换显示的消息类型
  changeMessageType: function(event){
    if(event.target.dataset.messageType == 6) {
      this.setData({
        'interactBranch.unreadCount': 0
      });
    }
    this.setData({
      messageType: event.target.dataset.messageType
    });
  },
  // 站内消息：跳转页面
  jumpToPage: function(event){
    let router = event.target.dataset.pageUrl;
    let url = '/pages/' + router + '/' + router;

    app.turnToPage(url, true);
  },
  // 表单消息：查看表单详情
  showMessageDetailForm: function(event){
    let that = this;
    let _form = event.currentTarget.dataset.form;
    let _formId = event.currentTarget.dataset.formId;
    let _formDataId = event.currentTarget.dataset.formDataId;
    let _formData_list = []; // 该表单对应的字段详情数组
    // 设置页面标题
    app.setPageTitle('表单消息');
    // 请求数据
    app.sendRequest({
      url: '/index.php?r=pc/WebAppMgr/getForm',
      data: {
        'app_id': app.globalData.appId,
        'form_id': _formId,
      },
      success: function(res){
        _formData_list = res.data.field_arr;
        _formData_list.shift(); // 默认去除第一个（非用户创建）
        // 获取该表单的本次提交数据
        app.sendRequest({
          url: '/index.php?r=AppData/getFormData',
          data: {
            'app_id': app.globalData.appId,
            'form': _form,
            'data_id': _formDataId,
          },
          success: function(res){
            let _array = []; // 临时存放表单提交详情的显示数据
            let _form_data = res.data["0"].form_data;
            for(var key in _form_data) {
              // 匹配对应的字段数据对象
              let _index = -1; // 判断改表单提交详情对应在字段详情数组的位置
              for (var i = 0; i < _formData_list.length; i++) {
                if (_formData_list[i]['field'] == key) {
                  _index = i;
                }
              }
              if(_index == -1) continue;

              // 匹配对应类型，并将对应数据_item放入_array
              let _item = {}; // 临时存放
              switch(parseInt(_formData_list[_index]['type'])) {
                // 文本
                case 1:
                  _item = {};
                  _item.dataType = 1;
                  _item.dataName = _formData_list[_index]['name'];
                  _item.dataContent = _form_data[key];
                  _array.push(_item);
                  break;
                // 图片
                case 2:
                  _item = {};
                  _item.dataType = 2;
                  _item.dataName = _formData_list[_index]['name'];
                  _item.dataContent = _form_data[key];
                  _array.push(_item);
                  break;
                // 富文本
                case 3:
                  _item = {};
                  _item.dataType = 3;
                  _item.dataName = _formData_list[_index]['name'];
                  _item.dataContent = '富文本类型';
                  _array.push(_item);
                  break;
              }
              _index++;
            }
            that.setData({
              'messageDetail': 3,
              'messageDetailFormData': _array
            });
          }
        });
      }
    });
  },
  // 表单消息：确定按钮(返回:系统通知)
  confirmMessageDetailForm: function(){
    // 设置页面标题
    app.setPageTitle('系统通知');
    // 回到系统通知页面,清空表单数据
    this.setData({
      'messageDetail': 0,
      'messageDetailFormData': []
    });
  }
})
