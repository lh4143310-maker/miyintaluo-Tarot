const { spreads: builtInSpreads } = require('../../data/tarotCards.js')

Page({
  data: {
    question: '',
    spreads: [],
    selectedSpread: null,
    showSpreadDetail: false,
    viewingSpread: null,
    activeTab: 'builtin' // 'builtin' 或 'custom'
  },

  onLoad: function () {
    this.loadSpreads()
  },

  onShow: function () {
    // 每次显示页面时刷新牌阵列表（可能从自定义牌阵页面返回）
    this.loadSpreads()
  },

  loadSpreads: function () {
    // 加载内置牌阵（添加详细说明）
    const builtinSpreads = builtInSpreads.map(spread => ({
      ...spread,
      isBuiltin: true,
      description: this.getSpreadDescription(spread.id),
      suitableFor: this.getSpreadSuitableFor(spread.id)
    }))

    // 加载自定义牌阵
    const customSpreads = wx.getStorageSync('customSpreads') || []
    const formattedCustomSpreads = customSpreads.map(spread => ({
      ...spread,
      isBuiltin: false,
      description: '用户自定义牌阵',
      suitableFor: '根据个人需求定制'
    }))

    // 合并所有牌阵
    const allSpreads = [...builtinSpreads, ...formattedCustomSpreads]

    this.setData({
      spreads: allSpreads,
      selectedSpread: this.data.selectedSpread || allSpreads[0]
    })
  },

  // 获取内置牌阵的详细说明
  getSpreadDescription: function (id) {
    const descriptions = {
      1: '最经典的塔罗牌阵，通过过去、现在、未来三个维度，揭示事情的发展脉络和趋势。适合了解任何问题的整体走向。',
      2: '当你面临两难选择时使用，帮助你分析现状、对比两种选择的结果，并获得建议。适合事业抉择、感情选择等。',
      3: '专门针对感情问题设计，从现状、对方想法、自己想法、障碍到未来发展，全方位解析感情状况。'
    }
    return descriptions[id] || '经典塔罗牌阵'
  },

  // 获取牌阵适用场景
  getSpreadSuitableFor: function (id) {
    const suitable = {
      1: '综合运势、事业发展、任何问题的整体走向',
      2: '两难选择、决策分析、对比不同方案',
      3: '感情问题、恋爱关系、婚姻状况'
    }
    return suitable[id] || '多种场景'
  },

  onQuestionInput: function (e) {
    this.setData({
      question: e.detail.value
    })
  },

  selectSpread: function (e) {
    this.setData({
      selectedSpread: e.currentTarget.dataset.spread
    })
  },

  // 查看牌阵详情
  viewSpreadDetail: function (e) {
    const spread = e.currentTarget.dataset.spread
    this.setData({
      showSpreadDetail: true,
      viewingSpread: spread
    })
  },

  // 关闭牌阵详情
  closeSpreadDetail: function () {
    this.setData({
      showSpreadDetail: false,
      viewingSpread: null
    })
  },

  // 从详情中选择牌阵
  selectFromDetail: function () {
    this.setData({
      selectedSpread: this.data.viewingSpread,
      showSpreadDetail: false,
      viewingSpread: null
    })
  },

  // 跳转到创建自定义牌阵
  createCustomSpread: function () {
    wx.navigateTo({
      url: '/pages/diviner/create-spread'
    })
  },

  // 管理自定义牌阵
  manageCustomSpreads: function () {
    wx.navigateTo({
      url: '/pages/diviner/custom-spread'
    })
  },

  nextStep: function () {
    if (!this.data.question) {
      wx.showToast({
        title: '请输入问题',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url: `/pages/reading/shuffle?question=${encodeURIComponent(this.data.question)}&spread=${JSON.stringify(this.data.selectedSpread)}`
    })
  }
})
