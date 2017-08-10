// pages/uzai/uzai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: '',
    on_class: [1, 0, 0, 0]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    list('5CE3521C-6531-492E-AE71-E240E25DF6E9', this);
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
  tapName: function (e) {
    list(e.target.dataset.positionid, this);
    var index = e.target.dataset.index;
    var arr = [0, 0, 0, 0];
    arr[index] = 1;
    console.log(arr)
    this.setData({
      "on_class": arr
    });
    console.log()
  }
})
function list(v, _this) {
  wx.showToast({
    title: '正在加载！',
    icon: 'loading',
    duration: 10000
  });
  wx.request({
    url: 'https://m.uzai.com/Index/Product?PositionId=' + v + '&Cityid=1', //仅为示例，并非真实的接口地址
    data: {},
    header: {
      'content-type': 'text/html'
    },
    success: function (res) {
      wx.hideToast();
      console.log(res);
      var data = res.data;
      data = data.replace(/data-src/g, "src")
      data = data.replace(/\<无/g, "No")
      data = data.replace(/\<二/g, "2")
      _this.setData({
        "message": data
      });
    }
  })
}