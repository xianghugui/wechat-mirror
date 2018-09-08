// pages/message/index.js
//引入公共模块文件
var common = require('../template/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList: [],
    total: null,
    refresh: true,
  },

  //跳转消息详情
  jumpToMessageInfo: function(e) {
    var id = e.currentTarget.dataset.id;
    if (id != null) {
      wx.navigateTo({
        url: './messageInfo/index?messageId=' + id,
      })
    }
  },
  loadMessageData: function() {
    const _self = this;
    var data = {
      pageIndex: _self.data.messageList.length,
      pageSize: 5,
      userId: getApp().globalData.userId
    }
    getApp().requestGet('api/message/queryShopMessageList', data, {
      'content-type': 'application /x-www-form-urlencoded'
    }, function(res) {
      var data = res.data.data.data,
        messageList = _self.data.messageList;

      //解析富文本
      for (var i = 0; i < data.length; i++) {
        data[i].imageSrc = common.exportSrc(data[i].content);
        if (data[i].imageSrc == -1) {
          data[i].content = common.textParsing(data[i].content);
        }
        data[i].createTime = common.formatDateTime(data[i].createTime);
      }

      _self.setData({
        refresh: true,
        messageList: messageList.concat(data),
        total: res.data.data.total
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadMessageData();
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      messageList: []
    })
    var that = this
    wx.showNavigationBarLoading();
    setTimeout(function() {
      that.loadMessageData();
      wx.hideNavigationBarLoading();
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.messageList.length < this.data.total) {
      this.setData({
        refresh: false,
      })
      this.loadMessageData();
    }
  }
})