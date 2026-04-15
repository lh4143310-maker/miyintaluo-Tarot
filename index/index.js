const app = getApp()

Page({
  data: {
    showModal: false
  },

  onLoad: function () {
    if (app.globalData.firstLaunch) {
      this.setData({ showModal: true })
    }
  },

  onReady: function () {
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      });
    }
  },

  onUnload: function () {
  },

  startReading: function () {
    wx.navigateTo({
      url: '/pages/reading/input-question'
    })
  },

  goToDaily: function () {
    wx.navigateTo({
      url: '/pages/daily/daily'
    })
  },

  goToDiviner: function () {
    wx.navigateTo({
      url: '/pages/diviner/diviner'
    })
  },

  hideModal: function () {
    
  },

  stopPropagation: function () {
    
  },

  confirmModal: function () {
    app.globalData.firstLaunch = false
    wx.setStorage({
      key: 'firstLaunch',
      data: false
    })
    this.setData({ showModal: false })
  }
})
