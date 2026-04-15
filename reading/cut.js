Page({
  data: {
    question: '',
    spread: null,
    cut: false,
    hint: '点击切牌完成'
  },

  onLoad: function (options) {
    const question = decodeURIComponent(options.question)
    const spread = JSON.parse(options.spread)
    
    this.setData({
      question,
      spread
    })
  },

  doCut: function () {
    this.setData({
      cut: true,
      hint: '切牌完成！'
    })
  },

  nextStep: function () {
    wx.navigateTo({
      url: `/pages/reading/draw?question=${encodeURIComponent(this.data.question)}&spread=${JSON.stringify(this.data.spread)}`
    })
  }
})
