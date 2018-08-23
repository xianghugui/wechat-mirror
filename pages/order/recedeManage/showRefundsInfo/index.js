// pages/order/recedeManage/showRefundsInfo/index.js
Page({
  //00:申请退货退款 1：同意退货 2：用户退货3:商家确认收货 4：平台退款，5：完成退款请求，6：退款请求关闭（用户操作）7：商家拒绝退款
  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    refundId: null,
    orderType: 0,
    disabled: false, // 确认收货按钮是否禁用
  },
  previewImage: function(e) {
    var data = this.data.info.imageSrc
    this.previewImageMethod(data)
  },
  previewAltImage: function(e) {
    var data = this.data.info.altImageSrc
    this.previewImageMethod(data)
  },
  //图片预览
  previewImageMethod: function(data) {
    if (data != null) {
      var url = []
      for (let i = 0; i < data.length; i++) {
        url.push(data[i].resourceUrl)
      }
      wx.previewImage({
        urls: url
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    that.setData({
      refundId: options.refundId,
      orderType: options.orderType
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.load(this.data.refundId, this.data.orderType, this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 同意点击事件
  agree: function() {
    const that = this;
    var data = {
      id: that.data.refundId
    }
    getApp().requestPost('api/refundexchange/agreeRefunds', data, {
        'content-type': 'application/x-www-form-urlencoded'
      },
      function(res) {
        wx.showToast({
          title: '同意退款'
        });
      })
  },
  // 确认收货
  confirm: function() {
    this.setData({ disabled: true })
    const that = this;
    getApp().requestPost('api/refundexchange/confirm', {
      id: that.data.refundId
    }, {
      'content-type': 'application/x-www-form-urlencoded'
    }, function(res) {
      that.load(that.data.refundId, that.data.orderType, that)
      wx.showToast({
        title: '已确认收货',
        icon: 'success',
        duration: 1000
      });
    })
  },
  // 不同意点击事件
  disagree: function() {
    const that = this.data;
    wx.navigateTo({
      url: '../disagreeRefundsInfo/index?refundId=' + that.refundId,
    })
  },

  load: function(refundId, orderType, that) {
    var header = getApp().globalData.header;
    getApp().requestGet('api/refundexchange/' + refundId + '/showRefundsInfo', {
        orderType: orderType
      }, header,
      function(res) {
        that.setData({
          info: res.data.data,
          refundId: res.data.data.refundId
        })
      })

  }

})