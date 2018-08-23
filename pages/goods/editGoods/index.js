// pages/editGoods/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
    imgs: [],
    isPreview: false, //是否正在预览图片
    is_edit: true,
    goodsId: null,
    goodsName: null,
    //店铺商品规格表ID
    specId: null,
    price: null,
    imagesArray: [],
    brandsArray: [],
    classArray: [], //存放所有类目
    selectClassArray: [], //存放选择后的类目
    applicationArray: [],
    sexArray: [{
      id: 0,
      name: '男'
    }, {
      id: 1,
      name: '女'
    }],
    crowdArray: [],
    sizeArray: [],
    colorArray: [],
    brandsArrayIndex: null,
    classIndex: [],
    classId: null,
    sexIndex: null,
    crowdIndex: null,
    imagesId: [],
    imageId: null,
    delImageId: [],
    videoSrc: null,
    videoId: null,
    isEvent: false, //是否是活动商品
    uploading: false, //视频上传中,显示上传图标
  },

  isEvent: function (e) {
    var that = this
    this.setData({
      isEvent: !that.data.isEvent
    })
  },

  chooseVideo: function (e) {
    if (!this.data.uploading) {
      var that = this
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        compressed: false,
        maxDuration: 60,
        camera: 'back',
        success: function (res) {
          that.setData({ uploading: true })
          that.setData({ videoSrc: res.tempFilePath })
          wx.uploadFile({
            url: getApp().BASE_URL + 'file/upload',
            filePath: res.tempFilePath,
            name: 'file',
            success: function (res) {
              var data = JSON.parse(res.data)
              if (data.success) {
                that.setData({ videoId: data.data[0].id })
              } else {
                wx.showToast({
                  title: '上传视频失败，请重新上传',
                  icon: 'none'
                })
              }
            },
            complete: function () {
              that.setData({ uploading: false })
            }
          })
        }
      })
    }
  },

  deleteVideo: function (e) {
    this.setData({ videoSrc: null, videoId: null, uploading: false })
  },

  // 上传图片
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imagesArray;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imagesArray;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
          wx.uploadFile({
            url: getApp().BASE_URL + 'file/upload',
            filePath: tempFilePaths[i],
            name: 'file',
            success: function (res) {
              var data = JSON.parse(res.data);
              if(data.success){
                var imagesId = that.data.imagesId;
                imagesId.push(data.data[0].id);
                that.setData({
                  imagesId: imagesId
                })
              }else{
                imgs.pop();
                wx.showToast({
                  title: '图片上传失败',
                  icon: 'none',
                  duration: 1000
                })
              }
            }
          })
        }
        that.setData({
          imagesArray: imgs
        });
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imagesArray;
    var index = e.currentTarget.dataset.index;
    var delImageId = this.data.delImageId;
    delImageId.push(imgs[index].resourceId);
    imgs.splice(index, 1);
    this.setData({
      imagesArray: imgs,
      delImageId: delImageId
    })
  },

  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var curIndex = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imagesArray;
    for (let i = 0; i < imgs.length; i++) {
      imgs[i] = imgs[i].resourceUrl == null ? imgs[i] : imgs[i].resourceUrl;
    }
    this.setData({
      curIndex: curIndex,
      imgs: imgs,
      isPreview: true
    })
    wx.setNavigationBarTitle({
      title: '',
    })
  },
  closePreview: function (e) {
    this.setData({
      isPreview: false
    })
    wx.setNavigationBarTitle({
      title: '添加商品',
    })
  },
  brandsPickerChange: function (e) {
    this.setData({
      brandsArrayIndex: e.detail.value
    })
  },
  //类目某一列改变时触发
  classPickerChange: function (e) {
    var classIndex = this.data.classIndex
    if (classIndex.length < 1) {
      classIndex = [0, 0, 0]
    }
    classIndex[e.detail.column] = e.detail.value
    //选择第一列重置后两列
    if (e.detail.column == 0) {
      classIndex[1] = 0
      classIndex[2] = 0
    } else if (e.detail.column == 1) {
      classIndex[2] = 0
    }
    //选择第一第二列，重载后续节点
    if (e.detail.column != 2) {
      var classArray = this.data.classArray
      this.setData({
        selectClassArray: [
          classArray,
          classArray[classIndex[0]].node,
          classArray[classIndex[0]].node[classIndex[1]].node
        ]
      })
    }
  },
  //类目确定选择时触发
  bindMultiPickerChange: function (e) {
    var array = e.detail.value
    console.log(this.data.classArray[array[0]].node[array[1]].node)
    console.log(array)
    this.setData({
      classIndex: array,
      classId: this.data.classArray[array[0]].node[array[1]].node[array[2]].id
    })
  },
  sexPickerChange: function (e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },
  crowdPickerChange: function (e) {
    this.setData({
      crowdIndex: e.detail.value
    })
  },
  goodsNameChange: function (e) {
    this.setData({
      goodsName: e.detail.value
    })
  },
  applicationChange: function (e) {
    var a = this.data.applicationArray
    for (let i = 0; i < a.length; i++) {
      for (let j = 0, b = e.detail.value; j < b.length; j++) {
        if (a[i].propertyId + "" == b[j]) {
          a[i].checked = !a[i].checked
          break
        }
      }
    }
    this.setData({
      applicationArray: a
    })
  },
  sizeChange: function (e) {
    var a = this.data.sizeArray
    for (let i = 0; i < a.length; i++) {
      a[i].checked = false
      for (let j = 0, b = e.detail.value; j < b.length; j++) {
        if (a[i].id + "" == b[j]) {
          a[i].checked = true
          break
        }
      }
    }
    this.setData({
      sizeArray: a
    })
  },
  colorChange: function (e) {
    var a = this.data.colorArray
    for (let i = 0; i < a.length; i++) {
      a[i].checked = false
      for (let j = 0, b = e.detail.value; j < b.length; j++) {
        if (a[i].id + "" == b[j]) {
          a[i].checked = true
          break
        }
      }
    }
    this.setData({
      colorArray: a
    })
  },
  getNode: function (classArrayData, obj) {
    var node = []
    for (let j = 0, lg = classArrayData.length; j < lg; j++) {
      if (classArrayData[j].parentId == obj.id) {
        var childsNodes = this.getNode(classArrayData.slice(j), classArrayData[j])
        if (childsNodes != null || childsNodes.length > 0) {
          classArrayData[j].node = childsNodes
        }
        node.push(classArrayData[j])
      }
    }
    return node
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url;
    var is_edit = false;
    if (options.goodsId === undefined) {
      url = "api/shopAddGoods/addGoodsShowInfo";
      is_edit = false;
      that.data.is_edit = false;
      wx.setNavigationBarTitle({
        title: '添加商品',
      })
    } else {
      url = "api/shopAddGoods/editGoodInfo/" + options.goodsId;
      is_edit = true;
      that.setData({
        is_edit: true,
        goodsId: options.goodsId
      })
    }
    getApp().requestGet(url, null, {}, function (res) {
      if (is_edit) {
        for (let i = 0, a = res.data.data.applicationList,
          b = res.data.data.goodsInfo.applicationId; i < a.length; i++) {
          if (a[i].propertyId == b) {
            a[i].checked = true
            break
          }
        }
      }
      var classArray = []
      var node = []
      var classArrayData = res.data.data.goodsClass;
      for (let i = 0, lg = classArrayData.length; i < lg; i++) {
        if (classArrayData[i].parentId == 0) {
          classArrayData[i].node = that.getNode(classArrayData.slice(i), classArrayData[i])
          classArray.push(classArrayData[i])
        }
      }
      if (is_edit) {
        var classId = res.data.data.goodsInfo.classId
        for (let i = 0; i < classArrayData.length; i++) {
          for (let j = 0, node = classArrayData[i].node; j < node.length; j++) {
            for (let k = 0, nodeChild = node[j].node; k < nodeChild.length; k++) {
              if (nodeChild[k].id == classId) {
                that.setData({
                  classIndex: [i, j, k],
                  classId: classId,
                  selectClassArray: [
                    classArray,
                    classArray[i].node,
                    classArray[i].node[j].node
                  ]
                })
              }
            }
          }
        }
      } else {
        that.setData({
          selectClassArray: [
            classArray,
            classArray[0].node,
            classArray[0].node[0].node
          ]
        })
      }
      // classArray[0] = res.data.data.goodsClass.parent;
      // classArray[1] = []
      // for (let i = 0, a = res.data.data.goodsClass.child; i < a.length; i++) {
      //   if (is_edit) {
      //     if (a[i].classId == res.data.data.goodsInfo.classId) {
      //       for (let j = 0; j < classArray[0].length; j++) {
      //         if (a[i].parentId == classArray[0][j].classId) {
      //           that.setData({
      //             classIndex: [j]
      //           })
      //           break
      //         }
      //       }
      //     }
      //   } else {
      //     if (a[i].parentId == classArray[0][0].classId) {
      //       classArray[1].push(a[i])
      //     }
      //   }
      // }

      // if (is_edit) {
      //   for (let i = 0, a = res.data.data.goodsClass.child; i < a.length; i++) {
      //     if (a[i].parentId == classArray[0][that.data.classIndex[0]].classId) {
      //       classArray[1].push(a[i])
      //       if (a[i].classId == res.data.data.goodsInfo.classId) {
      //         var classIndex = that.data.classIndex
      //         classIndex[1] = classArray[1].length - 1
      //         that.setData({
      //           classIndex: classIndex
      //         })
      //       }
      //     }
      //   }
      // }
      that.setData({
        brandsArray: res.data.data.brand,
        classArray: classArray,
        crowdArray: res.data.data.ageList,
        applicationArray: res.data.data.applicationList
      })
      if (is_edit) {
        that.setData({
          goodsName: res.data.data.goodsInfo.name,
          price: res.data.data.goodsInfo.price,
          imagesArray: res.data.data.goodsInfo.imags,
          imageId: res.data.data.goodsInfo.imageSrc,
          specId: res.data.data.goodsInfo.specId,
          classId: res.data.data.goodsInfo.classId,
          isEvent: res.data.data.goodsInfo.event == 1 ? true : false,
          videoId: res.data.data.goodsInfo.videoId,
          videoSrc: res.data.data.goodsInfo.videoSrc,
        })
        for (let i = 0; i < that.data.brandsArray.length; i++) {
          if (that.data.brandsArray[i].u_id == res.data.data.goodsInfo.brandId) {
            that.setData({
              brandsArrayIndex: i
            });
            break;
          }
        }
        for (let i = 0; i < that.data.classArray.length; i++) {
          if (that.data.classArray[i].classId == res.data.data.goodsInfo.classId) {
            that.setData({
              classIndex: i
            });
            break;
          }
        }
        for (let i = 0; i < that.data.crowdArray.length; i++) {
          if (that.data.crowdArray[i].propertyId == res.data.data.goodsInfo.propertyId) {
            that.setData({
              crowdIndex: i
            });
            break;
          }
        }
      }
      var size = that.data.sizeArray;
      var color = that.data.colorArray;
      if (is_edit) {
        var selectSize = res.data.data.goodsInfo.size.split(",");
        var selectColor = res.data.data.goodsInfo.color.split(",");
      }
      for (let i = 0; i < res.data.data.specification.length; i++) {
        if (res.data.data.specification[i].type == 0) {
          if (is_edit) {
            for (let j = 0; j < selectSize.length; j++) {
              if (res.data.data.specification[i].id + "" === selectSize[j]) {
                res.data.data.specification[i].checked = true
              }
            }
          }
          size.push(res.data.data.specification[i]);
        } else {
          if (is_edit) {
            for (let j = 0; j < selectSize.length; j++) {
              if (res.data.data.specification[i].id + "" === selectColor[j]) {
                res.data.data.specification[i].checked = true
              }
            }
          }
          color.push(res.data.data.specification[i]);
        }
      }
      that.setData({
        sizeArray: size,
        colorArray: color
      });
      if (is_edit) {
        if (res.data.data.goodsInfo.sex == '男') {
          that.setData({
            sexIndex: 0
          });
        } else {
          that.setData({
            sexIndex: 1
          });
        }
      }
    });
  },
  formSubmit: function (e) {
    var data = e.detail.value;
    if (this.data.imagesArray == null || this.data.imagesArray.length < 1) {
      wx.showToast({
        title: '没有上传图片',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (data.name == '') {
      wx.showToast({
        title: '商品名称为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (data.brandId == null) {
      wx.showToast({
        title: '品牌为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (data.classId.length === 0) {
      wx.showToast({
        title: '类目为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (data.sex == null) {
      wx.showToast({
        title: '性别为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (data.ageGrade == null || data.ageGrade == '') {
      wx.showToast({
        title: '人群为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (data.occasionId.length < 1) {
      wx.showToast({
        title: '适应场合为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (data.sizes.length < 1) {
      wx.showToast({
        title: '型号为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (data.color.length < 1) {
      wx.showToast({
        title: '颜色为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (data.price == '') {
      wx.showToast({
        title: '价格为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.is_edit) {
      data.id = this.data.goodsId;
      data.specId = this.data.specId;
      data.imageId = this.data.imageId;
    }
    if(this.data.videoId !== null){
      data.videoId = this.data.videoId;
    }
    data.imgIds = this.data.imagesId;
    data.classId = this.data.classId;
    data.delImageId = this.data.delImageId;
    data.occasionId = parseInt(data.occasionId[0]);
    data.event = this.data.isEvent ? 1 : 0;
    var url = getApp().BASE_URL + 'api/shopAddGoods/add';
    if (this.data.is_edit) {
      url = getApp().BASE_URL + 'api/shopAddGoods/edit';
    }
    var msg = this.data.is_edit ? '更新成功' : '添加成功';
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        Cookie: getApp().globalData.header.Cookie
      },
      success: function (res) {
        wx.switchTab({
          url: '../index',
          success: function (res) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          },
        });
        wx.showToast({
          title: msg,
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  touchMove: function (e) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var video = wx.createVideoContext('goodsVideo', this);
    video.pause();
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

  }
})