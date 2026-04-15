Page({
  data: {
    isEdit: false,
    spreadId: null,
    spreadName: '',
    cardCount: 3,
    positions: [],
    canSave: false
  },

  onLoad: function (options) {
    if (options.spread) {
      const spread = JSON.parse(options.spread)
      this.setData({
        isEdit: true,
        spreadId: spread.id,
        spreadName: spread.name,
        cardCount: spread.cardCount,
        positions: spread.positions
      })
    } else {
      this.initPositions()
    }
    this.checkCanSave()
  },

  initPositions: function () {
    const positions = []
    for (let i = 0; i < this.data.cardCount; i++) {
      positions.push({
        name: '',
        description: ''
      })
    }
    this.setData({ positions })
  },

  onNameInput: function (e) {
    this.setData({
      spreadName: e.detail.value
    })
    this.checkCanSave()
  },

  selectCardCount: function (e) {
    const count = e.currentTarget.dataset.count
    const positions = []
    for (let i = 0; i < count; i++) {
      if (i < this.data.positions.length) {
        positions.push(this.data.positions[i])
      } else {
        positions.push({
          name: '',
          description: ''
        })
      }
    }
    this.setData({
      cardCount: count,
      positions
    })
    this.checkCanSave()
  },

  onPositionNameInput: function (e) {
    const index = e.currentTarget.dataset.index
    const positions = [...this.data.positions]
    positions[index].name = e.detail.value
    this.setData({ positions })
    this.checkCanSave()
  },

  onPositionDescInput: function (e) {
    const index = e.currentTarget.dataset.index
    const positions = [...this.data.positions]
    positions[index].description = e.detail.value
    this.setData({ positions })
  },

  checkCanSave: function () {
    const hasName = this.data.spreadName.trim().length > 0
    const hasPositions = this.data.positions.every(p => p.name.trim().length > 0)
    this.setData({
      canSave: hasName && hasPositions
    })
  },

  cancel: function () {
    wx.navigateBack()
  },

  save: function () {
    if (!this.data.canSave) {
      return
    }

    const spread = {
      id: this.data.spreadId || Date.now(),
      name: this.data.spreadName,
      cardCount: this.data.cardCount,
      positions: this.data.positions
    }

    let spreads = wx.getStorageSync('customSpreads') || []
    
    if (this.data.isEdit) {
      spreads = spreads.map(s => s.id === spread.id ? spread : s)
    } else {
      spreads.unshift(spread)
    }

    wx.setStorageSync('customSpreads', spreads)
    
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })

    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})
