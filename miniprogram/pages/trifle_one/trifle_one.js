// miniprogram/pages/trifle_one/trifle_one.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    trifle: {
      '_id': '5mHprV8bLlrZH363lQD4djaMIEe3SQfviTZHmKFh1xUcjg2u',
      'comment_miaomiao': '这里是喵喵的评论',
      'comment_tuantuan': '这里是团团的评论',
      'date': '2020/3/29',
      'lastUpdateTime_miaomiao': '2020/3/20 17:58:00',
      'lastUpdateTime_tuantuan': '2020/3/20 17:58:00',
      'description': '一起去电影院看一场电影',
      'index': 1,
      'plan_date': '',
      'status': 1,
      'imagePath': [
        "cloud://miaotuanji-ojb42.6d69-miaotuanji-ojb42-1301691630/一起去电影院看一场电影0.jpg",
        "cloud://miaotuanji-ojb42.6d69-miaotuanji-ojb42-1301691630/my-image.jpg",
        "cloud://miaotuanji-ojb42.6d69-miaotuanji-ojb42-1301691630/一起去电影院看一场电影0.jpg",
      ],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    /* const db = wx.cloud.database()
    this.setData({
      _id: options.id
    })
    console.log(options)
    db.collection("trifles").where({
      _id: options.id
    }).get({
      success: res => {
        this.setData({
          trifle: res.data[0]
        })
        console.log('[数据库] [查询记录] 成功: ', this.data.trifle)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })*/
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

  addImage: function(){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        console.log('here', res.tempFilePaths)
        
        // 上传图片
        const cloudPath = that.data.trifle.description + that.data.trifle.imagePath.length + '.jpg'
        console.log('here1', cloudPath)
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            that.setData({
              'trifle.imagePath':[res.fileID]
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  img: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.trifle.imagePath      // 需要预览的图片http链接列表
    })
  }
})