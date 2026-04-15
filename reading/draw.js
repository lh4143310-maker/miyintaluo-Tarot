const { tarotCards } = require('../../data/tarotCards.js')

Page({
  data: {
    question: '',
    spread: null,
    gridCards: [], // 5x5 网格卡牌
    selectedCards: [], // 用户已选择的卡牌
    selectedCount: 0,
    needSelectCount: 0,
    allSelected: false,
    isSelecting: false
  },

  onLoad: function (options) {
    const question = decodeURIComponent(options.question)
    const spread = JSON.parse(options.spread)
    
    // 创建 5x5 网格（25张牌）
    const gridCards = this.createGridCards()
    
    this.setData({
      question,
      spread,
      gridCards,
      needSelectCount: spread.cardCount,
      selectedCards: new Array(spread.cardCount).fill(null)
    })
  },

  // 创建 5x5 网格卡牌
  createGridCards: function () {
    // 从78张牌中随机选取25张
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5)
    const selected25 = shuffled.slice(0, 25)
    
    // 创建网格数据（5行5列）
    const grid = []
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const index = row * 5 + col
        grid.push({
          ...selected25[index],
          gridIndex: index,
          row,
          col,
          selected: false,
          selectOrder: -1, // 选择顺序
          revealed: false,
          isReversed: Math.random() > 0.5 // 随机正逆位
        })
      }
    }
    return grid
  },

  // 点击网格中的牌
  selectGridCard: function (e) {
    const gridIndex = e.currentTarget.dataset.index
    const card = this.data.gridCards[gridIndex]
    
    // 如果已经选够了，或者这张牌已经被选了，则返回
    if (this.data.selectedCount >= this.data.needSelectCount || card.selected) {
      return
    }
    
    this.setData({ isSelecting: true })
    
    // 标记为已选择
    const newGridCards = [...this.data.gridCards]
    newGridCards[gridIndex].selected = true
    newGridCards[gridIndex].selectOrder = this.data.selectedCount
    
    // 添加到已选择列表
    const newSelectedCards = [...this.data.selectedCards]
    newSelectedCards[this.data.selectedCount] = {
      ...card,
      selected: true,
      selectOrder: this.data.selectedCount,
      revealed: false
    }
    
    const newCount = this.data.selectedCount + 1
    const allSelected = newCount >= this.data.needSelectCount
    
    this.setData({
      gridCards: newGridCards,
      selectedCards: newSelectedCards,
      selectedCount: newCount,
      allSelected,
      isSelecting: false
    })
    
    // 如果选够了，显示完成按钮
    if (allSelected) {
      wx.showToast({
        title: '选择完成！',
        icon: 'success'
      })
    }
  },

  // 跳转到结果页面
  goToResult: function () {
    if (!this.data.allSelected) {
      wx.showToast({
        title: `还需选择 ${this.data.needSelectCount - this.data.selectedCount} 张牌`,
        icon: 'none'
      })
      return
    }
    
    // 准备传递给结果页面的数据
    const resultCards = this.data.selectedCards.map((card, index) => ({
      id: card.id,
      name: card.name,
      nameEn: card.nameEn,
      image: card.image,
      isReversed: card.isReversed,
      position: this.data.spread.positions[index],
      meaning: card.isReversed ? card.reversed : card.upright
    }))
    
    wx.navigateTo({
      url: `/pages/reading/result?question=${encodeURIComponent(this.data.question)}&spread=${JSON.stringify(this.data.spread)}&cards=${encodeURIComponent(JSON.stringify(resultCards))}`
    })
  },

  // 重新选择
  resetSelection: function () {
    wx.showModal({
      title: '重新选择',
      content: '确定要清空已选择的牌吗？',
      success: (res) => {
        if (res.confirm) {
          // 重新创建网格
          const gridCards = this.createGridCards()
          this.setData({
            gridCards,
            selectedCards: new Array(this.data.needSelectCount).fill(null),
            selectedCount: 0,
            allSelected: false
          })
        }
      }
    })
  }
})
