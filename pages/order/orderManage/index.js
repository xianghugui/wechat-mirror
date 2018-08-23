// pages/order/orderManage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '待发货', '待收货', '已完成'],
    currentTab: 0,
    pageSize: 6,
    total: 0,
    orderList: [],
    status: ['待付款', '待派单', '待发货', '待收货', '待评价', '已评价', '退回']
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
    this.setData({
      orderList: []
    })
    this.getMusicInfo();
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
  upper: function () {
    this.getMusicInfo();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  lower: function () {
    if (this.data.orderList.length < this.data.total) {
      this.getMusicInfo()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  getMusicInfo: function () {
    var header = getApp().globalData.header;
    var that = this
    var param = {
      pageIndex: that.data.orderList.length,
      pageSize: that.data.pageSize
    }

    var currentTab = that.data.currentTab;
    var url = '';
    if (currentTab == 0) {
      url = 'api/order/showOrders';
    }
    if (currentTab == 1) {
      url = 'api/order/showDeliveryOrders';
    }
    if (currentTab == 2) {
      url = 'api/order/showTakeOrders';
    }
    if (currentTab == 3) {
      url = 'api/order/showCompleteOrders';
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
  }

})