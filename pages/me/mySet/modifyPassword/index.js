// pages/me/mySet/modifyPassword/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit: function(e) {
    if (e.detail.value.oldPassword === "") {
      wx.showToast({
        title: '旧密码不能为空',
      })
      return;
    } else if (e.detail.value.newPassword === "") {
      wx.showToast({
        title: '新密码不能为空',
      })
      return;
    } else if (e.detail.value.confirmPassword === "") {
      wx.showToast({
        title: '确认密码不能为空',
      })
      return;
    }

    else if(e.detail.value.newPassword !== e.detail.value.confirmPassword) {
      wx.showToast({
        title: '两次密码不同',
      })
      return;
    }

    getApp().requestPost('api/shopuser/changePassword', e.detail.value, {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': getApp().globalData.header.Cookie
    }, function(res) {
      wx.showToast({
        title: '密码修改成功',
        success: function() {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  }
})