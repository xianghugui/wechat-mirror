// pages/conversation/index.js
var JMCommon = require('../../utils/JMCommon.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conversations: [],
    x: 0,
    index: 0
  },


  onChange: function (e) {
    this.setData({
      index: e.currentTarget.dataset.index
    })
    if (e.detail.source === 'friction') {
      if (e.detail.x < -48) {
        this.showDeleteButton()
      } else {
        this.hideDeleteButton()
      }
    }
  },

  /**
   * 显示删除按钮
   */
  showDeleteButton: function () {
    this.setXmove(-96)
  },

  /**
   * 隐藏删除按钮
   */
  hideDeleteButton: function () {
    this.setXmove(0)
  },

  /**
   * 删除会话
   */
  delConversation: function (e) {
    var index = e.currentTarget.dataset.index;
    var conversations = this.data.conversations;
    conversations.splice(index, 1);
    this.setData({
      conversations: conversations
    });
    wx.setStorageSync("conversations", conversations);
  },

  /**
  * 设置movable-view位移
  */
  setXmove: function (xmove) {
    var index = this.data.index
    let conversations = this.data.conversations
    if (xmove !== 0) {
      for (let i = 0, length = conversations.length; i < length; i++) {
        if (conversations[i].x !== 0) {
          conversations[i].x = 0;
          break
        }
      }
    }
    conversations[index].x = xmove
    this.setData({
      conversations: conversations
    })
  },

  /**
   * 跳转到聊天界面
   */
  toChat: function (e) {
    wx.navigateTo({
      url: '../chat/index?userId=' + e.currentTarget.dataset.userid,
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
    //显示会话列表
    var conversations = wx.getStorageSync("conversations");
    this.setData({
      conversations: conversations
    })
    var myId = app.globalData.userId;
    //是否有未读消息
    if (!JMCommon.JIM.isInit()) {
      JMCommon.JMinit(myId, function () {
        this.hasUnread();
      });
    } else if (!JMCommon.JIM.isLogin()) {
      JMCommon.JMLogin(myId, function () {
        this.hasUnread();
      });
    } else {
      this.hasUnread();
    }
  },

  //判断是否有未读消息,
  hasUnread: function () {
    var conversations = this.data.conversations
    for (let i = 0, length = conversations.length; i < length; i++) {
      conversations[i].mtime = JMCommon.toDate(conversations[i].mtime);
      conversations[i].unread_msg_count = JMCommon.JIM.getUnreadMsgCnt({
        'username': conversations[i].userId
      });
    }
    this.setData({
      conversations: conversations
    })
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
})