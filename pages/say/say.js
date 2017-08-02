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
// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});
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
    //console.log('form发生了submit事件，携带数据为：', e.detail.value);
    if (!e.detail.value.textarea){
      showBusy('不能为空');
      return false;
    };
    
    const requestTask = wx.request({
      url: config.service.sayUrl,
      data: {
        value: e.detail.value.textarea,
        user: nickName,
        url: avatarUrl
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data == 200){
          showModel('发送成功', '非常感谢!您对我说' + e.detail.value.textarea);
          setTimeout(function () { wx.redirectTo({ url: '../forme/forme' })},1000)
        }else{
          showModel('网络出错', '请联系管理员');
        }
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
});
 
function doLogin() {
  showBusy('正在登录');
  qcloud.login({
    success(result) {
      showSuccess('登录成功');
      console.log('登录成功', result);
      wx.setStorage({
        key: "user",
        data: result.nickName
      })
    },

    fail(error) {
      showModel('登录失败', error);
      console.log('登录失败', error);
    }
  });
}
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