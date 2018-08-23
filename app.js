//app.js
App({
  BASE_URL: 'https://mirror.lmlm.cn/',
  // BASE_URL: 'http://localhost:8080/',
  globalData: {
    header: { 'Cookie': '', 'content-type': '' },
    openId: null,
    userId: null,
    hasUnread: false, //是否有未读消息
    userInfo: {},
  },
  requestGet: function (url, data, header, successCallback, failCallback) {
    this.requestMethod(url, 'GET', data, header, successCallback, failCallback)
  },
  requestPost: function (url, data, header, successCallback, failCallback) {
    this.requestMethod(url, 'POST', data, header, successCallback, failCallback)
  },
  requestDel: function (url, data, header, successCallback, failCallback) {
    this.requestMethod(url, 'DELETE', data, header, successCallback, failCallback)
  },
  requestPut: function (url, data, header, successCallback, failCallback) {
    this.requestMethod(url, 'PUT', data, header, successCallback, failCallback)
  },
  requestMethod: function (url, method, data, header, successCallback, failCallback) {
    var that = this
    wx.request({
      url: that.BASE_URL + url,
      data: data,
      method: method,
      header: header,
      success: function (res) {
        if (res.data.success) {
          successCallback && successCallback(res)
        } else {
          if(failCallback){
            failCallback()
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
        }
      }
    })
  },

  onLaunch: function (options) {
    var that = this
    setInterval(() => {
      wx.login({
        success: res => {
          var data = that.globalData.userInfo
          data.code = res.code
          data.openId = that.globalData.openId
          that.requestPost('api/shop/login', data, {
            'content-type': 'application/x-www-form-urlencoded'
          }, function (res) {
            that.globalData.header.Cookie = 'JSESSIONID=' + res.data.data.session;
          })
        }
      })
    }, 300000)
  }
})
