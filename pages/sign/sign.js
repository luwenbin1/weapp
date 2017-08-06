// pages/sign/sign.js
// 引入配置
var config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    index: 10,
    isload: true,
    list: []
  },
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: config.service.resign,
      data: {
        page: _this.data.page,
        index: _this.data.index
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          var data_list = res.data;
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
    if (this.data.isload) {
      wx.showToast({
        title: "正在加载",
        icon: 'loading',
        duration: 10000
      });
      var _this = this;
      var page = _this.data.page;
      var index = _this.data.index;
      var new_page = (parseInt(page) + 1) * 10;
      console.log(new_page);
      wx.request({
        url: config.service.resign,
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
            if (data_list.length === 0) {
              wx.showToast({
                title: "到底啦！",
                icon: 'success'
              });
              _this.data.isload = false;
            }
            var data_list_old = _this.data.list;
            for (var i = 0; i < data_list.length; i++) {
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  see: function (event){
    var latitude = event.currentTarget.dataset.latitude;
    var longitude = event.currentTarget.dataset.longitude;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28
    })
  }
})