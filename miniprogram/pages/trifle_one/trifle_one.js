// miniprogram/pages/trifle_one/trifle_one.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: 'OVGuH5XPWQw7hfGvH0tQ9NIM9wv6OgGI2TEGG1YUC0qkC6Zv',
    showDate: '',
    startTime: '2017/07/14 03:00:00',
    timeDifferenceDay: '',
    timeDifferenceHour: '',
    timeDifferenceMinute: '',
    timeDifferenceSecond: '',
    /*trifle: {
      '_id': 'OVGuH5XPWQw7hfGvH0tQ9NIM9wv6OgGI2TEGG1YUC0qkC6Zv',
      'comment_miaomiao': '这里是喵喵的评论',
      'comment_tuantuan': '这里是团团的回忆',
      'date': '',
      'lastUpdateTime_miaomiao': '2020-03-20 17:58:00',
      'lastUpdateTime_tuantuan': '2020-03-20 17:58:00',
      'description': '一起去电影院看一场电影',
      'index': 1,
      'plan_date': '',
      'status': 0,
      'imagePath': [
        "cloud://miaotuanji-ojb42.6d69-miaotuanji-ojb42-1301691630/一起去电影院看一场电影0.jpg",
        "cloud://miaotuanji-ojb42.6d69-miaotuanji-ojb42-1301691630/my-image.jpg",
        "cloud://miaotuanji-ojb42.6d69-miaotuanji-ojb42-1301691630/一起去电影院看一场电影0.jpg",
      ],
    },*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
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
    })

    Date.prototype.format = function(format) {
      var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in date) { 
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1
            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
      }
      return format;
    }

    this.setData({
      startTime: new Date(this.data.startTime)
    })
    if (this.data.trifle.status == 1) {
      var date = new Date(this.data.trifle.date)
      var timeDifference = date - this.data.startTime
      this.setData({
        'showDate': date.format("yyyy年MM月dd日")
        'timeDifferenceDay': Math.floor(timeDifference/(24*3600*1000)),
        'timeDifferenceHour': Math.floor(timeDifference/(3600*1000)),
        'timeDifferenceMinute': Math.floor(timeDifference/(60*1000)),
        'timeDifferenceSecond': Math.floor(timeDifference/1000),
      })
    }
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
    const db = wx.cloud.database()
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePaths = res.tempFilePaths
        
        // 上传图片
        for (var key in filePaths) {
          var filePath = filePaths[key]
          var number = parseFloat(that.data.trifle.imagePath.length) + parseFloat(key)
          const cloudPath = that.data.trifle.description + number + '.jpg'
          console.log('here1', cloudPath)
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              console.log('[上传文件] 成功：', res)
              that.setData({
                'trifle.imagePath': that.data.trifle.imagePath.concat([res.fileID])
              })
              db.collection('trifles').doc(that.data._id).update({
                data: {
                  imagePath: that.data.trifle.imagePath
                },
                success: res => {
                  console.log('[数据库] [更新记录] 成功-图片路径')
                },
                fail: err => {
                  icon: 'none',
                  console.error('[数据库] [更新记录] 失败：', err)
                }
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
        }
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  imgPreview: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.trifle.imagePath      // 需要预览的图片http链接列表
    })
  }, 
  bindDateChange: function(e) {
    var time = new Date(e.detail.value)
    var timeDifference = time - this.data.startTime
    this.setData({
      'trifle.date': time.format("yyyy-MM-dd"),
      'showDate': time.format("yyyy年MM月dd日"),
      'timeDifferenceDay': Math.floor(timeDifference/(24*3600*1000)),
      'timeDifferenceHour': Math.floor(timeDifference/(3600*1000)),
      'timeDifferenceMinute': Math.floor(timeDifference/(60*1000)),
      'timeDifferenceSecond': Math.floor(timeDifference/1000),
    })
    const db = wx.cloud.database()
    db.collection('trifles').doc(this.data._id).update({
      data: {
        date: time.format("yyyy-MM-dd")
      },
      success: res => {
        console.log('[数据库] [更新记录] 成功')
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },
  changeStatus(){
    var time = new Date();
    var timeDifference = time - this.data.startTime
    this.setData({
      'trifle.status': 1,
      'trifle.date': time.format("yyyy-MM-dd"),
      'showDate': time.format("yyyy年MM月dd日"),
      'timeDifferenceDay': Math.floor(timeDifference/(24*3600*1000)),
      'timeDifferenceHour': Math.floor(timeDifference/(3600*1000)),
      'timeDifferenceMinute': Math.floor(timeDifference/(60*1000)),
      'timeDifferenceSecond': Math.floor(timeDifference/1000),
    })
    const db = wx.cloud.database()
    db.collection('trifles').doc(this.data._id).update({
      data: {
        status: 1,
        date: time.format("yyyy-MM-dd")
      },
      success: res => {
        console.log('[数据库] [更新记录] 成功')
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  }
})