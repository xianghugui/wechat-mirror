// pages/me/myWallet/trading/index.js
Page({

  /**
   * 页面的初始数据
   */

  //视频订单 status：状态 待报价.1待付款，2待发货，3待收货，4退货，5订单完成，6用户取消，7缺货
  //购买订单 status：状态，待付款， 1 待派单，2：待发货，3：待收货，4：待评价，5：已评价，6：退货，7：订单关闭
  data: {
    navbar: ['购买订单', '视频订单'],
    status: [
      ['待报价', '待付款', '待发货', '待收货', '退货', '订单完成', '用户取消', '缺货'],
      ['待付款', '待派单', '待发货', '待收货', '待评价', '已评价', '退货', '订单关闭']
    ],
    currentTab: 0,
    queryList:[],
    pageSize: 10,
    total: 0,
  },

  // 导航切换监听
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      queryList:[]
    });
    var that = this;
    that.getMusicInfo();
  },

  // 分页加载数据
  getMusicInfo: function () {
    var header = getApp().globalData.header;
    var that = this
    var param = {
      pageIndex: that.data.queryList.length,
      pageSize: that.data.pageSize
    }

    var currentTab = that.data.currentTab;
    var url = '';
    if (currentTab == 0) {
      url = 'api/order/';
    }else {
      url = 'api/videoOrder/';
    }
    getApp().requestGet(url + 'showTrading', param, header,
      function (res) {
        var data = res.data.data
        var queryList = that.data.queryList
        that.setData({
          queryList: queryList.concat(data.data),
          total: data.total
        })
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMusicInfo();
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
    if (this.data.queryList.length == this.data.total) {
      wx.showToast({
        title: '暂无更多数据',
        icon: 'none',
        duration: 1000
      })
      return
    }
    this.getMusicInfo()
  }
})