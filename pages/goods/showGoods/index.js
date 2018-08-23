// pages/showGoods/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // banner
    imgUrls: [],
    indicatorDots: true, //是否显示面板指示点
    indicatorColor: '#A7A39F',
    indicatorActiveColor: '#3EC0C4',
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    name:'',
    price:0,
    shopName:'',
    goodsSpec:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var header = getApp().globalData.header;
    var goodsId = options.goodsId;
    var that = this;
    wx.request({
      url: getApp().BASE_URL+'api/shopAddGoods/queryShopGoodsDeatil/' + goodsId,
      header: header,
      success: function (res) {
        that.setData({
          imgUrls: res.data.data.imageUrl,
          name: res.data.data.name,
          price: res.data.data.price,
          shopName: res.data.data.shopName,
          goodsSpec: res.data.data.GoodsSpec
        })
      },
      fail: function () {
        wx.showToast({
          title: '加载数据失败'
        })
      },
      complete: function () {

      }
    })  
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
  
  }
})