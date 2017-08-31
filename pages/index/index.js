// pages/massage/massage.js
Page({
  data: {
    imgUrls: [
      'http://img.weiye.me/zcimgdir/album/file_5948dbdd781cf.png',
      'http://img.weiye.me/zcimgdir/album/file_5948dbe1b3500.png'
    ]
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})