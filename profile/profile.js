const app = getApp()

Page({
  data: {
    userInfo: null,
    userId: '',
    showModal: false,
    modalTitle: '',
    modalContent: ''
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userId: this.generateUserId()
      })
    }
  },

  onReady: function () {
  },

  onUnload: function () {
  },

  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userId: this.generateUserId()
      })
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      });
    }
  },

  generateUserId: function () {
    return 'TL' + Date.now().toString().slice(-8)
  },

  login: function () {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = res.userInfo
        app.globalData.userInfo = userInfo
        wx.setStorage({
          key: 'userInfo',
          data: userInfo
        })
        this.setData({
          userInfo,
          userId: this.generateUserId()
        })
      },
      fail: () => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  },

  logout: function () {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.globalData.userInfo = null
          wx.removeStorage({
            key: 'userInfo'
          })
          this.setData({
            userInfo: null,
            userId: ''
          })
        }
      }
    })
  },

  chooseAvatar: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        const userInfo = { ...this.data.userInfo, avatarUrl: tempFilePath }
        this.setData({ userInfo })
        app.globalData.userInfo = userInfo
        wx.setStorage({
          key: 'userInfo',
          data: userInfo
        })
        wx.showToast({
          title: '头像已更新',
          icon: 'success'
        })
      }
    })
  },

  onNicknameInput: function (e) {
    const nickName = e.detail.value
    const userInfo = { ...this.data.userInfo, nickName }
    this.setData({ userInfo })
    app.globalData.userInfo = userInfo
    wx.setStorage({
      key: 'userInfo',
      data: userInfo
    })
  },

  goToHistory: function () {
    wx.switchTab({
      url: '/pages/history/history'
    })
  },

  goToDiviner: function () {
    wx.setStorageSync('fromTab', '/pages/profile/profile')
    wx.navigateTo({ 
      url: '/pages/diviner/diviner'
    })
  },

  showAbout: function () {
    this.setData({
      showModal: true,
      modalTitle: '关于我们',
      modalContent: '秘引塔罗是一款专业级塔罗测算工具，旨在为用户提供专业、便捷的塔罗测算体验。我们采用传统塔罗理论，结合现代技术，为您带来沉浸式的测算服务。本小程序所有测算结果仅供娱乐参考，不构成任何决策建议。'
    })
  },

  showCompliance: function () {
    this.setData({
      showModal: true,
      modalTitle: '合规说明',
      modalContent: '本小程序提供的塔罗测算服务仅供娱乐和参考用途，测算结果不代表任何真实预测，也不应作为任何重要决策的依据。请理性对待测算结果，相信科学，切勿过度迷信。本小程序仅收集微信登录基础信息，不收集敏感隐私数据，确保用户信息安全。'
    })
  },

  hideModal: function () {
    this.setData({
      showModal: false
    })
  },

  stopPropagation: function () {
    
  }
})
