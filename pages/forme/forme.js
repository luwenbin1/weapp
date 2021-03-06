// pages/forme/forme.js
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
// 引入配置
var config = require('../../config');
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};
var data_list='';

Page({
  data: {
    page:0,
    index:10,
    isload: true,
    list: []
  },
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: config.service.formeUrl,
      data: {
        page: _this.data.page,
        index: _this.data.index
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          data_list = res.data;
          _this.setData({
            "list": data_list
          });
        } else {
          showModel('网络出错', '请联系管理员');
        }
      },
      error: function () {
        showModel('网络出错', '请联系管理员');
      }
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReady: function () {
    var userInfo = '';
    var _this = this;
    wx.getUserInfo({
      success: function (res) {
        userInfo = res.userInfo;
        _this.setData({
          "user": userInfo.nickName
        });
      }
    });
  },
  del(event) {
    var _this = this;
    var id = event.currentTarget.dataset.id;
    var list = this.data.list;
    wx.showToast({
      title: "删除中",
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: config.service.forme_delUrl,
      data: {
        id: id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideToast();
        if (res.statusCode == "200") {
          wx.showToast({
            title: "删除成功",
            icon: 'success'
          });
          for (var i = 0; i < list.length; i++) {
            if (list[i].id === id) {
              list.splice(i, 1);
            }
          }
          _this.setData({
            "list": list
          });
        } else {
          showModel('网络出错', '请联系管理员');
        }
      },
      error: function () {
        showModel('网络出错', '请联系管理员');
      }
    })
  },

  onReachBottom: function () {
    if(this.data.isload){
      wx.showToast({
        title: "正在加载",
        icon: 'loading',
        duration: 10000
      });
      var _this = this;
      var page = _this.data.page;
      var index = _this.data.index;
      var new_page = (parseInt(page)+1)*10;
      console.log(new_page);
      wx.request({
        url: config.service.formeUrl,
        data: {
          page: new_page,
          index: index
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.hideToast();
          _this.setData({
            "page": parseInt(page) + 1
          });
          if (res.statusCode == 200) {
            var data_list = res.data;
            if (data_list.length === 0){
              wx.showToast({
                title: "到底啦！",
                icon: 'success'
              });
              _this.data.isload = false;
            }
            var data_list_old = _this.data.list;
            for (var i = 0; i < data_list.length;i++){
              data_list_old.push(data_list[i]);
            }
            _this.setData({
              "list": data_list_old
            });
          } else {
            showModel('网络出错', '请联系管理员');
          }
        },
        error: function () {
          showModel('网络出错', '请联系管理员');
        }
      });
    }
  }
})

