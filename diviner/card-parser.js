const { tarotCards } = require('../../data/tarotCards.js')

Page({
  data: {
    searchText: '',
    cards: tarotCards,
    filteredCards: tarotCards,
    showDetail: false,
    selectedCard: null,
    fromResult: false
  },

  onLoad: function (options) {
    // 如果从结果页面跳转过来，直接显示指定牌的详情
    if (options.cardId) {
      const cardId = parseInt(options.cardId)
      const card = tarotCards.find(c => c.id === cardId)
      if (card) {
        this.setData({
          showDetail: true,
          selectedCard: card,
          fromResult: options.from === 'result'
        })
      }
    }
  },

  onSearchInput: function (e) {
    const searchText = e.detail.value
    const filteredCards = this.data.cards.filter(card => 
      card.name.includes(searchText) || card.nameEn.toLowerCase().includes(searchText.toLowerCase())
    )
    this.setData({
      searchText,
      filteredCards
    })
  },

  showCardDetail: function (e) {
    this.setData({
      showDetail: true,
      selectedCard: e.currentTarget.dataset.card
    })
  },

  hideDetail: function () {
    this.setData({
      showDetail: false,
      selectedCard: null
    })
  },

  stopPropagation: function () {
    
  },

  // 返回结果页面
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})
