// pages/upload_img/upload_img.js
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

// 引入配置
var config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      img:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.chooseImage({
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        _this.setData({
          "img": tempFilePaths,
          "tempFilePaths": tempFilePaths
        });
      }
    })
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
  up:function(){
    var tempFilePaths = this.data.tempFilePaths;
    wx.showToast({
      title: "上传中",
      icon: 'loading',
      duration: 10000
    });
    wx.uploadFile({
      url: config.service.up_img,
      filePath: tempFilePaths[0],
      name: 'file1',
      header: {
        'content-type': 'multipart/form-data'
      },
      //formData: {
        //'nickName': encodeURI(nickName),
        //'avatarUrl': encodeURI(avatarUrl)
      //},
      success: function (res) {
        wx.hideToast();
        var data = res.data
        console.log(data)
      },
      fail:function(o){
        wx.hideToast();
        console.log(o)
      }
    })
  }
})
var userInfo = '';
var nickName = '';
var avatarUrl = '';
var gender = '';
var province = '';
var city = '';
var country = '';
wx.getUserInfo({
  success: function (res) {
    userInfo = res.userInfo;
    nickName = userInfo.nickName;
    avatarUrl = userInfo.avatarUrl;
    gender = userInfo.gender; //性别 0：未知、1：男、2：女
    province = userInfo.province;
    city = userInfo.city;
    country = userInfo.country;
  }
});