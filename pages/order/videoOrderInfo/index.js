// pages/order/videoOrderInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: null,
    processData: [{
      name: '提交询价',
      color: '#afafaf'
    },
    {
      name: '商家报价',
      color: '#afafaf'
    },
    {
      name: '支付购买',
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
    animationData: null,
    showModalStatus: false,
    orderId: null
  },
  delivery: function(){
    // this.setData({
    //   showModalStatus: true
    // })
    this.showModal();
  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  formSubmit:function(e){
    const that = this
    var data = {
      id: that.data.orderId,
      price: e.detail.value.price
    }
    getApp().requestPost('api/videoOrder/offer',
      data, 
      { 'Cookie': getApp().globalData.header.Cookie,
        'content-type':'application/x-www-form-urlencoded'},
    function(res){
      var data = that.data.orderDeatil
      data.goodsPrice = e.detail.value.price
      data.status = 1
      that.setData({
        orderDeatil: data,
        showModalStatus: false
      })
    })
  },
  formCancel: function () {
    this.hideModal();
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
    this.setPeocessIcon('/api/videoOrder/' + this.data.orderId + '/showOrderInfo');
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
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        var processArr = that.data.processData
        if(res.data.data.status < 4){
          for (var i = 0; i < res.data.data.status + 1; i++) {
            if (i + 1 > processArr.length) {
              break
            }
            processArr[i].color = '#49c4cb';
          }
        }
        if (res.data.data.status == 5) {
          for (var i = 0; i < processArr.length; i++) {
            if (i + 1 > processArr.length) {
              break
            }
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