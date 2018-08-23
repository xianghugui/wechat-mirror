// pages/order/orderInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    processData: [{
      name: '提交订单',
      color: '#afafaf'
    },
    {
      name: '买家付款',
      color: '#afafaf'
    },
    {
      name: '平台派单',
      color: '#afafaf'
    },
    {
      name: '商家发货',
      color: '#afafaf'
    },
    {
      name: '已完成',
      color: '#afafaf'
    }],
    orderDeatil: {},
    orderId: null,
    comment: null,
    showComment: false, //是否显示评论
  },

  /**
   * 隐藏评论
   */
  closeComment: function(e){
    this.setData({
      showComment: false
    })
  },

  /**
   * 显示评论
   */
  comment: function(){
    var that = this
    if (that.data.comment === null){
      getApp().requestGet('api/order/' + that.data.orderId + '/showComment', {}, {},
        function (res) {
          that.setData({
            comment: res.data.data,
            showComment: true
          })
        }
      )
    }else{
      that.setData({
        showComment: true
      })
    }
    
  },

  /**
   * 预览评论图片
   */
  previewImage: function(e){
    var urls = [];
    for(let i = 0, data = this.data.comment.imageSrc; i < data.length; i++){
      urls.push(data[i].resourceUrl);
    }
    wx.previewImage({
      current: e.currentTarget.dataset.current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId
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
    this.setPeocessIcon('/api/order/' + this.data.orderId + '/showOrderInfo');
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


  //进度条的状态
  setPeocessIcon: function (url) {
    var header = getApp().globalData.header;
    var that = this;
    wx.request({
      url: getApp().BASE_URL + url,
      header: header,
      method: 'GET',
      success: function (res) {
        var processArr = that.data.processData
        for (var i = 0; i < processArr.length; i++) {
          if (i <= res.data.data.status) {
            processArr[i].color = '#49c4cb';
          }
        }

        that.setData({
          processData: processArr,
          orderDeatil: res.data.data
        })
      },
      fail: function (res) {
        wx.showToast({
          icon: 'none',
          title: '加载数据失败'
        })
      },
      complete: function (res) { },
    })
  }


})