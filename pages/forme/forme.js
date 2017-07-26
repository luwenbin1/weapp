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

wx.request({
  url: config.service.formeUrl,
  data: {
    page: 0,
    index: 2
  },
  header: {
    'content-type': 'application/json'
  },
  success: function (res) {
    if (res.statusCode == 200) {
      data_list = res.data;
      Page({
        data: {
          list: data_list
        }
      })
    } else {
      showModel('网络出错', '请联系管理员');
    }
  },
  error: function () {
    showModel('网络出错', '请联系管理员');
  }
});
