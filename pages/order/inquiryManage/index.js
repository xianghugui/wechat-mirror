// pages/order/inquiryManage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '待报价', '待购买', '待发货', '待收货'],
    currentTab: 0,
    pageSize: 6,
    total: 0,
    orderList: [],
    status: ['待报价', '待付款', '待发货', '待收货', '退回', '订单完成', '取消订单','7缺货'],
  },

  playVideo:function(e){
    wx.navigateTo({
      url: 'video/index?videoSrc=' + encodeURIComponent(e.currentTarget.dataset.videosrc)
    })
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
      orderList:[]
    });
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
  onPullDownRefresh: function () {
    this.getMusicInfo();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  lower: function () {
    if (this.data.orderList.length<this.data.total) {
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
      orderList:[],
    });
    var that = this;
    that.getMusicInfo();
  },

  // 分页加载数据
  getMusicInfo: function (message) {
    var header = getApp().globalData.header;
    var that = this
    var param = {
      pageIndex: that.data.orderList.length,
      pageSize: that.data.pageSize
    }

    var currentTab = that.data.currentTab;
    var url = '';
    if (currentTab == 0) {
      url = 'api/videoOrder/showOrders';
    }
    if (currentTab == 1) {
      url = 'api/videoOrder/showOfferOrders';
    }
    if (currentTab == 2) {
      url = 'api/videoOrder/showbuyOrders';
    }
    if (currentTab == 3) {
      url = 'api/videoOrder/showDeliveryOrders';
    }
    if (currentTab == 4) {
      url = 'api/videoOrder/showTakeOrders';
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