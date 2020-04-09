// miniprogram/pages/trifle.js
const app = getApp()
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusHeight,
    navHeight: app.globalData.navHeight,
    bodyTopHeight: app.globalData.bodyTopHeight,
    trifles:[],
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
    const db = wx.cloud.database()

    // 获取某个数据库的总条数
    function getListCount(db, set) {
      return new Promise((resolve, reject) => {
        db.collection(set).count().then(res => {
          resolve(res.total);
        }).catch(e => {
          console.log(e)
          reject("查询失败")
        })
      })
    }

    // 单次查询数据，20条
    function getListIndexSkip(db, set, skip) {
      return new Promise((resolve, reject) => {
        let statusList = []
        let selectPromise
        if (skip > 0) {
          selectPromise = db.collection(set).skip(skip).get()
        } else {
          // skip值为0时，会报错
          selectPromise = db.collection(set).get()
        }
        selectPromise.then(res => {
          resolve(res.data);
        }).catch(e => {
          console.error(e)
          reject("查询失败!")
        })
      })
    }

    // 用于对列表中的map对象进行排序
    function compare(p){
      return function(m,n){
          var a = m[p];
          var b = n[p];
          return a - b;
      }
    }
    
    // 循环读取全部数据
    getListCount(db, "trifles").then(res => {
      let list = []
      for (let i = 0; i < res; i += 20) {
        getListIndexSkip(db, "trifles", i).then(res => {
            list = list.concat(res)
            list.sort(compare('index'))
            this.setData({
              trifles: list
            })
          })
          .catch(e => {
            console.error(e)
            reject("查询失败")
          })
      }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  // 查询数据库
  onQuery: function() {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('counters').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  backClick(){
    wx.navigateBack()
  }
})