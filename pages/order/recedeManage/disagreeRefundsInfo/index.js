// pages/order/recedeManage/disagreeRefundsInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:null,
    tempFilePaths:null,
    refundId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
      refundId: options.refundId
    });
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
  
  },

  // 上传图片
  chooseImg: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imageList = new Array();
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: getApp().BASE_URL + 'file/upload',
            filePath: tempFilePaths[i],
            name: 'file',
            success: function (res) {
              var data = JSON.parse(res.data);
              console.log(data.data[0].id);
              imageList.push(data.data[0].id);
              that.setData({
                imageList: imageList,
                tempFilePaths: tempFilePaths
              });
            }
          })
        }
      }
    })
  },
  // 删除图片
  deleteImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var tempFilePaths = this.data.tempFilePaths;
    var imageList = this.data.imageList;
    tempFilePaths.splice(index,1);
    imageList.splice(index, 1);
    this.setData({
      imageList: imageList,
      tempFilePaths: tempFilePaths
    })
  },

  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.tempFilePaths;
    wx.previewImage({
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },

  // 提交表单
  formSumbit:function(e){
    const that = this;
    var formData = e.detail.value;
    var refundId = that.data.refundId;
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    })
    wx.request({
        url: getApp().BASE_URL + 'api/refundexchange/' + refundId + '/refuseRefunds',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          files: that.data.imageList,
          refuseReason: formData.content
        },
        success: function (res) {
         
          if (res.statusCode != 200) {
            wx.showModal({
              title: '提示',
              icon: 'none',
              content: '上传失败',
              showCancel: false
            })
            return;
          }
          wx.showToast({
            title: "上传成功"
          })
          wx.navigateBack({
            delta: 1
          })
        },
        fail: function (e) {
          console.log(e);
          wx.showModal({
            title: '提示',
            icon: 'none',
            content: '上传失败',
            showCancel: false
          })
        },
        complete: function () {
          wx.hideToast();  //隐藏Toast
        }
      })
  }
})