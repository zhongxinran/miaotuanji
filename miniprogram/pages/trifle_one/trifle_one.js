// miniprogram/pages/trifle_one/trifle_one.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    trifle: {},
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
  
  addComment: function(e){
    if (e.target.dataset.person == "mm") {
      this.setData({
        'trifle.comment_from_miaomiao': e.detail.value
      })
    } else if (e.target.dataset.person == "tt") {
      this.setData({
        'trifle.comment_from_tuantuan': e.detail.value
      })
    }
    console.log("=== add comment from miaomiao ===")
    console.log(this.data.trifle)
  }
})