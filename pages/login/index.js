// pages/login/index.js
var JMCommon = require('../../utils/JMCommon.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: null
  },

  formSubmit: function (e) {
    var that = this
    var data = e.detail.value
    if (data.username == null || data.username.trim() == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if (data.password == null || data.password.trim() == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1000
      })
      return
    }
    this.setData({
      disabled: true
    })
    wx.login({
      success: res => {
        var that = this
        data.code = res.code
        data.openId = app.globalData.openId
        app.requestPost('api/shop/login', data, {
          'content-type': 'application/x-www-form-urlencoded'
        }, function (res) {
          console.log('已登录')
          app.globalData.header.Cookie = 'JSESSIONID=' + res.data.data.session;
          var userId = res.data.data.userId
          app.globalData.userId = userId
          app.globalData.userInfo = {
            username: data.username,
            password: data.password
          }
          app.maintain();
          //JMessage的初始化/注册/登录
          JMCommon.JMinit(userId);
          that.setData({
            disabled: true
          })
          wx.switchTab({
            url: '../goods/index'
          });
        },function(res){
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
          that.setData({
            disabled: false
          })
        })
      }
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