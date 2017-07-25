// pages/say/say.js
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
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    const requestTask = wx.request({
      url: config.service.sayUrl, //仅为示例，并非真实的接口地址
      data: e.detail,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        showModel('发送成功', '非常感谢!您对我说' + e.detail.value.textarea);
      },
      error:function(){
        showModel('网络出错', '请联系管理员');
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})