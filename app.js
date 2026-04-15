App({
  onLaunch: function () {
    const that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.globalData.userInfo = res.data
      }
    })
    
    wx.getStorage({
      key: 'firstLaunch',
      success(res) {
        that.globalData.firstLaunch = false
      },
      fail() {
        that.globalData.firstLaunch = true
      }
    })
  },

  globalData: {
    userInfo: null,
    firstLaunch: true
  }
})
