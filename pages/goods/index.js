// pages/goods/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    pageSize: 10,
    goodsList: []
  },

  nextpage:function(e){
    if(this.data.goodsList.length < this.data.total){
      this.getMusicInfo()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      goodsList: []
    });
    that.getMusicInfo();
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
    const that = this;

    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function() {
      // complete
      that.setData({
        goodsList: []
      });
      that.getMusicInfo();
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);

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

  //跳转添加商品点击事件
  addGoodsClick: function() {
    var that = this
    wx.navigateTo({
      url: 'editGoods/index',
      success: function(res) {
        // that.getMusicInfo('添加成功')
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //上架
  shelfClick: function(e) {
    var that = this;
    wx.request({
      url: getApp().BASE_URL + 'api/shopAddGoods/' + e.currentTarget.dataset.id + '/shelf',
      method: 'POST',
      success: function(res) {
        var goodsList = "goodsList[" + e.currentTarget.dataset.index + "].status";
        that.setData({
          [goodsList]: 0
        });
      }
    })
  },
  //下架
  dropOffClick: function(e) {
    var that = this;
    wx.request({
      url: getApp().BASE_URL + 'api/shopAddGoods/' + e.currentTarget.dataset.id + '/dropOff',
      method: 'POST',
      success: function(res) {
        var goodsList = "goodsList[" + e.currentTarget.dataset.index + "].status";
        that.setData({
          [goodsList]: 1
        });
      }
    })
  },
  //删除
  deleteClick: function(e) {
    var that = this;
    wx.showModal({
      title: '删除',
      content: '是否删除该商品',
      success: function(res) {
        if (res.confirm) {
          getApp().requestPost('api/shopAddGoods/' + e.currentTarget.dataset.id + '/delete', {}, {}, function(res) {
            var goodsList = that.data.goodsList;
            goodsList.splice(e.currentTarget.dataset.index, 1);
            that.setData({
              goodsList: goodsList
            })
          });
        }
      }
    });
  },

  // 分页加载数据
  getMusicInfo: function(message) {

    var header = getApp().globalData.header;
    var that = this
    var param = {
      pageIndex: that.data.goodsList.length,
      pageSize: that.data.pageSize
    }

    getApp().requestGet('api/shopAddGoods/queryPagerShop', param, getApp().globalData.header,
      function(res) {
        var data = res.data.data
        var goodsList = that.data.goodsList
        that.setData({
          goodsList: goodsList.concat(data.data),
          total: data.total
        })
      });
  }

})