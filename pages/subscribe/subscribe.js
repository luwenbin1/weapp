// pages/subscribe/subscribe.js
// 引入配置
var config = require('../../config');
// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 1000
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "access_token":"",
    "openid":"",
    "date": new Date().toLocaleDateString(),
    "time": '12:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: config.service.addtoken,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.setData({
          "access_token": res.data.access_token
        });
      }
    });
    wx.login({
      success: function (res) {
        wx.request({
          url: config.service.addopenid,
          data: {
            code: res.code
          },
          success: function (res) {
            console.log(res.data.openid)
            _this.setData({
              "openid": res.data.openid
            });
          }
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  orderSign: function (e) {
    var _this = this;
    var fId = e.detail.formId;
    var fObj = e.detail.value;
    if (!e.detail.value.mingcheng) {
      showBusy('项目名称不能为空');
      return false;
    };
    if (!e.detail.value.didian) {
      showBusy('地址不能为空');
      return false;
    };
    if (!e.detail.value.xingming) {
      showBusy('称呼不能为空');
      return false;
    };
    if (!e.detail.value.lianxi) {
      showBusy('联系方式不能为空');
      return false;
    };
    var d = {
      touser: _this.data.openid,
      template_id: 'ZYzE4JsPXEDjcCv2VaQikJW891CyUFSQL-TOxvZpJBY',
      form_id: fId,
      access_token: _this.data.access_token,
      data: {
        "keyword1": {
          "value": fObj.xingming,
          "color": "#4a4a4a"
        },
        "keyword2": {
          "value": fObj.didian,
          "color": "#9b9b9b"
        },
        "keyword3": {
          "value": new Date().toLocaleString(),
          "color": "#9b9b9b"
        },
        "keyword4": {
          "value": _this.data.date +' '+ _this.data.time,
          "color": "#9b9b9b"
        },
        "keyword5": {
          "value": fObj.lianxi,
          "color": "#9b9b9b"
        },
        "keyword6": {
          "value": fObj.mingcheng,
          "color": "red"
        }
      },
      color: '#ccc',
      emphasis_keyword: 'keyword6.DATA'
    }
    
    wx.request({
      url: config.service.bespoke,
      data: {
        data:d
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
      }
    });
    
    wx.request({
      url: config.service.order,
      data: {
        data: d
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data === 200){
          showBusy('预约成功，请勿重复提交');
          setTimeout(function () { wx.redirectTo({ url: '../user/user' }) }, 1000)
        }else{
          showBusy('网络错误');
        };
      }
    });
    d.touser = "oVWL70CCpYOftA4xxZCOMFkr8lJY";//管理员
    wx.request({
      url: config.service.bespoke,
      data: {
        data: d
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
      }
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
})