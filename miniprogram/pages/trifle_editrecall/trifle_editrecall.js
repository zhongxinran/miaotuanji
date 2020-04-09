// miniprogram/trifle_editrecall/trifle_editrecall.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    person: '',
    isShowBackToast: true,
    statusHeight: app.globalData.statusHeight,
    navHeight: app.globalData.navHeight,
    bodyTopHeight: app.globalData.bodyTopHeight,
    trifle:{}
    /*trifle: {
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
    },*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options)
    const db = wx.cloud.database()
    this.setData({
      _id: options.id,
      person: options.person
    })
    console.log(options)
    db.collection("trifles").where({
      _id: this.data._id
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
  backClick: function(){
    if (this.data.isShowBackToast){
      wx.showModal({
        title: '提示',
        content: '是否留在当前页面提交修改？',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.navigateBack()
          }
        }
      })
    } else {
      wx.navigateBack()
    }
  },
  commitComment: function(e){
    this.setData({
      'isShowBackToast': false
    })
    var time = new Date()
    const db = wx.cloud.database()
    console.log(this.data.person)
    if (this.data.person == "mm") {
      console.log("here mm")
      this.setData({
        'trifle.comment_miaomiao': e.detail.value.comment,
        'trifle.lastUpdateTime_miaomiao': time.format("yyyy-MM-dd hh:mm:ss"),
      })
      db.collection('trifles').doc(this.data._id).update({
        data: {
          comment_miaomiao: e.detail.value.comment,
          lastUpdateTime_miaomiao: time.format("yyyy-MM-dd hh:mm:ss"),
        },
        success: res => {
          console.log('[数据库] [更新记录] 成功')
        },
        fail: err => {
          icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
        }
      })
    } else if (this.data.person == "tt") {
      console.log("here tt")
      this.setData({
        'trifle.comment_tuantuan': e.detail.value.comment,
        'trifle.lastUpdateTime_tuantuan': time.format("yyyy-MM-dd hh:mm:ss"),
      })
      db.collection('trifles').doc(this.data._id).update({
        data: {
          comment_tuantuan: e.detail.value.comment,
          lastUpdateTime_tuantuan: time.format("yyyy-MM-dd hh:mm:ss"),
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
    console.log(this.data.trifle)
  },
})