// pages/me/myWallet/financeDetail/incomeDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['购买订单', '视频订单'],
    currentTab: 0,
    queryList:[],
    pageSize:10,
    total:0,
  },
  // 导航切换监听
  navbarTap: function (e) {
    var that = this;
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      queryList: []
    },function(){
      that.getMusicInfo();
    });
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
      url = 'api/order/showCompleteOrders';
    } else {
      url = 'api/videoOrder/showCompleteOrders';
    }
    getApp().requestGet(url, param, header,
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