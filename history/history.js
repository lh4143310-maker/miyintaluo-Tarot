const app = getApp()

Page({
  data: {
    activeTab: 'all',
    history: [],
    filteredHistory: [],
    hasHistory: false,
    userInfo: null
  },

  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.loadHistory()
  },

  onReady: function () {
  },

  onUnload: function () {
  },

  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.loadHistory()
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
  },

  loadHistory: function () {
    const readingHistory = wx.getStorageSync('readingHistory') || []
    const dailyFortune = wx.getStorageSync('lastDailyFortune')
    
    // 处理测算记录，添加格式化的抽牌结果和时间
    let history = readingHistory.map(item => {
      // 格式化时间
      const date = new Date(item.timestamp)
      const time = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
      
      // 提取抽牌结果（最多显示3张牌）
      let cardSummary = ''
      if (item.cards && item.cards.length > 0) {
        const cardNames = item.cards.slice(0, 3).map(card => {
          const position = card.isReversed ? '逆位' : '正位'
          return `${card.name}(${position})`
        })
        cardSummary = cardNames.join('、')
        if (item.cards.length > 3) {
          cardSummary += ` 等${item.cards.length}张牌`
        }
      }
      
      return {
        ...item,
        time,
        cardSummary,
        spreadName: item.spread ? item.spread.name : ''
      }
    })
    
    // 添加每日运势记录
    if (dailyFortune) {
      const date = new Date(dailyFortune.timestamp)
      const time = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
      
      history.unshift({
        id: Date.now(),
        type: 'daily',
        card: dailyFortune.card,
        cardName: dailyFortune.card.name,
        cardSummary: `${dailyFortune.card.name}(${dailyFortune.card.isReversed ? '逆位' : '正位'})`,
        aiReport: dailyFortune.aiReport || '',
        timestamp: dailyFortune.timestamp,
        time: time
      })
    }
    
    this.setData({
      history,
      hasHistory: history.length > 0
    })
    
    this.filterHistory()
  },

  switchTab: function (e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({
      activeTab: tab
    })
    this.filterHistory()
  },

  filterHistory: function () {
    let filtered = this.data.history
    if (this.data.activeTab !== 'all') {
      filtered = this.data.history.filter(item => item.type === this.data.activeTab)
    }
    this.setData({
      filteredHistory: filtered
    })
  },

  viewDetail: function (e) {
    const item = e.currentTarget.dataset.item
    if (item.type === 'reading') {
      // 传递 AI 解读内容
      const aiReport = item.aiReport || ''
      // 对 cards 进行编码，避免特殊字符问题
      const cardsStr = encodeURIComponent(JSON.stringify(item.cards))
      const url = `/pages/reading/result?question=${encodeURIComponent(item.question)}&spread=${encodeURIComponent(JSON.stringify(item.spread))}&cards=${cardsStr}&aiReport=${encodeURIComponent(aiReport)}&fromHistory=1`
      console.log('跳转到结果页面:', url)
      wx.navigateTo({
        url: url,
        fail: (err) => {
          console.error('跳转失败:', err)
          wx.showToast({
            title: '页面跳转失败',
            icon: 'none'
          })
        }
      })
    } else if (item.type === 'daily') {
      // 传递 AI 解读内容
      const aiReport = item.aiReport || ''
      const url = `/pages/daily/daily?card=${encodeURIComponent(JSON.stringify(item.card))}&timestamp=${item.timestamp}&aiReport=${encodeURIComponent(aiReport)}&fromHistory=1`
      console.log('跳转到每日运势:', url)
      wx.navigateTo({
        url: url,
        fail: (err) => {
          console.error('跳转失败:', err)
          wx.showToast({
            title: '页面跳转失败',
            icon: 'none'
          })
        }
      })
    }
  },

  deleteItem: function (e) {
    const id = parseInt(e.currentTarget.dataset.id)
    const type = e.currentTarget.dataset.type
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (res.confirm) {
          if (type === 'reading') {
            let readingHistory = wx.getStorageSync('readingHistory') || []
            readingHistory = readingHistory.filter(item => item.id !== id)
            wx.setStorageSync('readingHistory', readingHistory)
          } else if (type === 'daily') {
            wx.removeStorageSync('lastDailyFortune')
          }
          this.loadHistory()
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  goToLogin: function () {
    wx.switchTab({
      url: '/pages/profile/profile'
    })
  }
})
