Page({
  data: {
    spreads: [],
    showDetail: false,
    selectedSpread: null
  },

  onLoad: function () {
    this.loadSpreads()
  },

  onShow: function () {
    this.loadSpreads()
  },

  loadSpreads: function () {
    const spreads = wx.getStorageSync('customSpreads') || []
    this.setData({ spreads })
  },

  createSpread: function () {
    wx.navigateTo({
      url: '/pages/diviner/create-spread'
    })
  },

  editSpread: function (e) {
    const spread = e.currentTarget.dataset.spread
    wx.navigateTo({
      url: `/pages/diviner/create-spread?spread=${JSON.stringify(spread)}`
    })
  },

  deleteSpread: function (e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个牌阵吗？',
      success: (res) => {
        if (res.confirm) {
          const spreads = this.data.spreads.filter(s => s.id !== id)
          wx.setStorageSync('customSpreads', spreads)
          this.setData({ spreads })
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  viewSpread: function (e) {
    this.setData({
      showDetail: true,
      selectedSpread: e.currentTarget.dataset.spread
    })
  },

  hideDetail: function () {
    this.setData({
      showDetail: false,
      selectedSpread: null
    })
  },

  stopPropagation: function () {
    
  }
})
