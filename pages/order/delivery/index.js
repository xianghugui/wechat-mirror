// pages/order/delivery/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAddress: {},
    logisticsList: [], //快递公司列表
    index: null,
    orderId: 0,
    orderType: null, //0:我的购物1:试衣订单2:询价订单
    url: ['api/order/', 'api/trygoods/', 'api/videoOrder/'],
    disabled: false, //按钮禁用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var header = getApp().globalData.header;
    var that = this;
    getApp().requestGet(that.data.url[options.orderType] + options.orderId + '/showAddress', {}, {}, function(res) {
      if (res != null) {
        that.setData({
          userAddress: res.data.data,
          orderId: options.orderId,
          orderType: options.orderType
        });
      }
    })
    getApp().requestGet('/api/videoOrder/queryLogistics', {}, {}, function(res) {
      if (res != null) {
        that.setData({
          logisticsList: res.data.data
        });
      }
    })
  },

  //快递公司picker监听事件
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
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

  // 提交表单
  formSubmit: function(e) {
    const that = this;
    var formData = e.detail.value;
    if (formData.expressName == null) {
      wx.showToast({
        title: '请选择快递公司',
        icon: 'none'
      })
      return
    }
    if (formData.expressNumber == '') {
      wx.showToast({
        title: '请输入快递单号',
        icon: 'none'
      })
      return
    }
    formData.id = that.data.orderId;
    formData.expressId = that.data.logisticsList[formData.expressName].id
    //获取
    wx.showModal({
      title: '提示',
      content: '您确定您的商品已寄出？快递公司为：' + that.data.logisticsList[formData.expressName].name + '，单号为：' + formData.expressNumber + '',
      success: function(res) {
        if (res.confirm) {
          that.setData({
            disabled: true
          })
          getApp().requestPost(that.data.url[that.data.orderType] + 'delivery', formData, {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }, function(res) {
            that.setData({
              disabled: false
            })
            wx.navigateBack({
              delta: 1
            })
          })
        } else if (res.cancel) {

        }
      }
    })
  }
})