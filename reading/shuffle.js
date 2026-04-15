const { tarotCards } = require('../../data/tarotCards.js')

Page({
  data: {
    question: '',
    spread: null,
    cards: [],
    shuffleProgress: 0,
    shuffled: false,
    hint: '长按或滑动屏幕洗牌',
    isShuffling: false,
    touchStartX: 0,
    touchStartY: 0,
    shuffleCount: 0,
    needShuffleCount: 10 // 需要洗牌次数
  },

  onLoad: function (options) {
    const question = decodeURIComponent(options.question)
    const spread = JSON.parse(options.spread)
    
    this.setData({
      question,
      spread
    })
    
    this.initCards()
  },

  initCards: function () {
    const cards = []
    // 创建牌堆效果
    for (let i = 0; i < 12; i++) {
      cards.push({
        index: i,
        rotation: (Math.random() - 0.5) * 10,
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        scale: 0.95 + Math.random() * 0.05,
        zIndex: i
      })
    }
    this.setData({ cards })
  },

  // 触摸开始
  onTouchStart: function (e) {
    if (this.data.shuffled) return
    
    this.setData({
      touchStartX: e.touches[0].clientX,
      touchStartY: e.touches[0].clientY,
      isShuffling: true,
      hint: '正在洗牌...'
    })
    
    this.shuffleOnce()
  },

  // 触摸移动
  onTouchMove: function (e) {
    if (this.data.shuffled) return
    
    const deltaX = Math.abs(e.touches[0].clientX - this.data.touchStartX)
    const deltaY = Math.abs(e.touches[0].clientY - this.data.touchStartY)
    
    // 滑动距离足够时触发洗牌
    if (deltaX > 30 || deltaY > 30) {
      this.shuffleOnce()
      // 更新起始点，实现连续洗牌
      this.setData({
        touchStartX: e.touches[0].clientX,
        touchStartY: e.touches[0].clientY
      })
    }
  },

  // 触摸结束
  onTouchEnd: function () {
    this.setData({ 
      isShuffling: false,
      hint: this.data.shuffled ? '洗牌完成！' : '继续滑动洗牌'
    })
  },

  // 执行一次洗牌
  shuffleOnce: function () {
    if (this.data.shuffled) return
    
    // 限制最大洗牌次数
    const newCount = Math.min(this.data.shuffleCount + 1, this.data.needShuffleCount)
    const progress = (newCount / this.data.needShuffleCount) * 100
    
    // 洗牌动画 - 牌堆随机散开
    const cards = this.data.cards.map(card => ({
      ...card,
      rotation: (Math.random() - 0.5) * 80,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      scale: 0.85 + Math.random() * 0.3,
      zIndex: Math.floor(Math.random() * 12)
    }))
    
    this.setData({
      cards,
      shuffleCount: newCount,
      shuffleProgress: progress
    })
    
    // 检查是否完成
    if (newCount >= this.data.needShuffleCount && !this.data.shuffled) {
      setTimeout(() => {
        this.setData({
          shuffled: true,
          hint: '✓ 洗牌完成！',
          shuffleProgress: 100
        })
        // 牌堆归位动画
        this.resetCards()
      }, 300)
    }
  },

  // 牌堆归位
  resetCards: function () {
    const cards = this.data.cards.map((card, index) => ({
      ...card,
      rotation: (Math.random() - 0.5) * 5,
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
      scale: 0.95 + Math.random() * 0.05,
      zIndex: index
    }))
    
    this.setData({ cards })
  },

  // 下一步
  nextStep: function () {
    if (!this.data.shuffled) {
      wx.showToast({
        title: '请先完成洗牌',
        icon: 'none'
      })
      return
    }
    
    wx.navigateTo({
      url: `/pages/reading/draw?question=${encodeURIComponent(this.data.question)}&spread=${JSON.stringify(this.data.spread)}`
    })
  }
})
