// pages/order/recedeManage/index.js
Page({

  /**
   * 页面的初始数据
   */
  //退款单状态，0:申请退货退款 1：退货中 2：商家确认收货  3:完成退款请求 4：退款请求关闭（用户操作)
  data: {
    navbar: ['购物单', '询价单'],
    currentTab: 0,
    total: 0,
    pageSize: 10,
    orderList: [],
    status: ['待用户退货', '待收货', '平台退款中', '完成退款', '关闭订单']
  },

  // 导航切换监听
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      orderList: []
    });
    var that = this;
    that.getMusicInfo();
  },

  // 分页加载数据
  getMusicInfo: function (message) {
    var that = this;
    var header = getApp().globalData.header;
    var param = {
      pageIndex: that.data.orderList.length,
      pageSize: that.data.pageSize
    }

    var currentTab = that.data.currentTab;
    var url = '';
    if (currentTab == 0) {
      url = 'api/refundexchange/showOrderRefunds';
    }
    if (currentTab == 1) {
      url = 'api/refundexchange/showVideoOrderRefunds';
    }
    getApp().requestGet(url, param, getApp().globalData.header,
      function (res) {
        var data = res.data.data
        var orderList = that.data.orderList
        that.setData({
          orderList: orderList.concat(data.data),
          total: data.total
        })
      });
  },

  jumpToShowRefundInfo: function (e) {
    var refundId = e.currentTarget.dataset.refundid;
      if(refundId != null){
        wx.navigateTo({
          url: './showRefundsInfo/index?refundId=' + refundId + '&orderType=' + this.data.currentTab
        })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.getMusicInfo();
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
  upper: function() {
    this.getMusicInfo();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  lower: function() {
    if (this.data.orderList.length < this.data.total) {
      this.getMusicInfo()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})