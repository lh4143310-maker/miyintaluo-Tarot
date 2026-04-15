const { tarotCards } = require('../../data/tarotCards.js')
const { saveDailyFortune, getTodayFortune } = require('../../utils/util.js')
const { tarotKnowledge } = require('../../data/tarotKnowledge.js')

// DeepSeek API 配置
const DEEPSEEK_API_KEY = 'sk-7d6db32bab78444c85739330f853ae17'
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'

Page({
  data: {
    today: '',
    drawn: false,
    card: null,
    animating: false,
    showResult: false,
    aiReport: '',
    loadingAI: false,
    showAIReport: false,
    consultQuestion: '',
    consultHistory: [],
    loadingConsult: false
  },

  onLoad: function (options) {
    const today = this.formatDate(new Date())
    this.setData({ today })
    
    // 检查是否有从历史记录页面传递过来的参数
    if (options.card && options.timestamp) {
      try {
        const card = JSON.parse(options.card)
        // 检查是否从历史记录跳转（带有 AI 解读）
        if (options.fromHistory && options.aiReport) {
          const aiReport = decodeURIComponent(options.aiReport)
          this.setData({
            drawn: true,
            card: card,
            aiReport: aiReport,
            showAIReport: aiReport ? true : false
          })
        } else {
          // 没有 AI 解读，需要获取
          this.setData({
            drawn: true,
            card: card
          })
          this.getAIReport(card)
        }
      } catch (e) {
        console.error('解析卡片数据失败:', e)
        // 解析失败时，使用今天的运势
        this.loadTodayFortune()
      }
    } else {
      // 没有参数时，使用今天的运势
      this.loadTodayFortune()
    }
  },

  // 加载今日运势
  loadTodayFortune: function () {
    const savedFortune = getTodayFortune()
    if (savedFortune) {
      this.setData({
        drawn: true,
        card: savedFortune.card,
        aiReport: savedFortune.aiReport || '',
        showAIReport: savedFortune.aiReport ? true : false
      })
      // 如果没有 AI 解读，才重新获取
      if (!savedFortune.aiReport) {
        this.getAIReport(savedFortune.card)
      }
    }
  },

  formatDate: function (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const weekday = weekdays[date.getDay()]
    return `${year}年${month}月${day}日 ${weekday}`
  },

  drawCard: function () {
    if (this.data.animating) return
    
    this.setData({ animating: true })
    
    // 洗牌动画持续1.5秒
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * tarotCards.length)
      const card = {
        ...tarotCards[randomIndex],
        isReversed: Math.random() > 0.5
      }
      
      this.setData({
        drawn: true,
        card,
        animating: false
      })
      
      // 触发结果展示动画
      setTimeout(() => {
        this.setData({ showResult: true })
        // 获取 AI 解读（保存会在获取完成后进行）
        this.getAIReport(card)
      }, 100)
    }, 1500)
  },

  // 获取 AI 解读报告
  getAIReport: function (card) {
    this.setData({ loadingAI: true })
    
    // 获取牌的知识
    const knowledge = this.getCardKnowledge(card)
    
    // 构建提示词
    const prompt = `你是一位资深的塔罗占卜师。请为今天的每日运势抽牌提供温暖而专业的解读。

【今日运势抽牌】
牌名：${card.name}（${card.isReversed ? '逆位' : '正位'}）
基本含义：${card.isReversed ? card.reversed : card.upright}
深层意义：${knowledge}

请提供一份今日运势解读报告，包含以下内容：

一、今日整体能量
分析今天整体的能量氛围和主题。

二、各方面运势
分别解读今天在爱情、事业、财运、健康等方面的运势。

三、建议与指引
给出今天的行动建议和注意事项。

四、幸运提示
分享今天的幸运色、幸运数字或幸运方向等。

严格要求：
- 用温暖、积极的语气撰写，像一位智慧的朋友
- 可以使用少量温馨的图案符号（如星星、月亮、太阳、花朵等）
- 禁止使用的符号：井号#、星号*、减号-、下划线_
- 不要使用任何 markdown 格式，纯文本输出
- 字数控制在400-600字`

    // 调用 DeepSeek API
    wx.request({
      url: DEEPSEEK_API_URL,
      method: 'POST',
      timeout: 60000,
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      data: {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位专业的塔罗占卜师，擅长提供温暖而准确的每日运势解读。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      },
      success: (res) => {
        console.log('AI 响应:', res)
        if (res.statusCode === 200 && res.data.choices && res.data.choices[0]) {
          let report = res.data.choices[0].message.content
          // 清除 markdown 符号
          report = report.replace(/[#*\-_\[\]]/g, '')
          report = report.replace(/\(\)/g, '')
          report = report.replace(/\n{3,}/g, '\n\n')
          this.setData({
            aiReport: report,
            loadingAI: false,
            showAIReport: true
          })
          // 保存到本地（包含 AI 解读）
          saveDailyFortune({ 
            card: this.data.card,
            aiReport: report 
          })
        } else {
          console.error('AI 解读失败:', res)
          this.setData({ 
            loadingAI: false,
            aiReport: ''
          })
          // 即使没有 AI 解读也保存
          saveDailyFortune({ 
            card: this.data.card,
            aiReport: '' 
          })
          wx.showToast({
            title: 'AI 解读失败：' + (res.data?.error?.message || '未知错误'),
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail: (err) => {
        console.error('AI 请求失败:', err)
        this.setData({ 
          loadingAI: false,
          aiReport: ''
        })
        wx.showToast({
          title: '网络请求失败，请检查网络',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },

  // 获取牌的深层知识
  getCardKnowledge: function (card) {
    const knowledge = []
    
    // 大阿卡纳深层含义
    if (card.id >= 0 && card.id <= 21) {
      const majorKeys = Object.keys(tarotKnowledge.majorArcana)
      const majorKey = majorKeys[card.id]
      if (majorKey && tarotKnowledge.majorArcana[majorKey]) {
        const major = tarotKnowledge.majorArcana[majorKey]
        knowledge.push(`元素：${major.element}`)
        knowledge.push(`占星：${major.planet}`)
        knowledge.push(`精神意义：${major.spiritual}`)
      }
    } else {
      // 小阿卡纳
      let suit = ''
      if (card.name.includes('权杖') || card.name.includes('Wands')) {
        suit = 'wands'
      } else if (card.name.includes('圣杯') || card.name.includes('Cups')) {
        suit = 'cups'
      } else if (card.name.includes('宝剑') || card.name.includes('Swords')) {
        suit = 'swords'
      } else if (card.name.includes('星币') || card.name.includes('Pentacles')) {
        suit = 'pentacles'
      }
      
      if (suit && tarotKnowledge.minorArcana[suit]) {
        const minor = tarotKnowledge.minorArcana[suit]
        knowledge.push(`花色：${minor.suit}`)
        knowledge.push(`元素：${minor.element}`)
        knowledge.push(`主题：${minor.description}`)
      }
    }
    
    return knowledge.join('；') || '暂无详细知识'
  },

  // 切换 AI 报告显示
  toggleAIReport: function () {
    this.setData({
      showAIReport: !this.data.showAIReport
    })
  },

  // 明日再来 - 跳转到首页
  reDraw: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  viewHistory: function () {
    wx.switchTab({
      url: '/pages/history/history'
    })
  },

  // 咨询输入
  onConsultInput: function (e) {
    this.setData({
      consultQuestion: e.detail.value
    })
  },

  // 发送咨询
  sendConsult: function () {
    const question = this.data.consultQuestion.trim()
    if (!question) {
      wx.showToast({
        title: '请输入您的问题',
        icon: 'none'
      })
      return
    }
    
    if (this.data.loadingConsult) {
      return
    }
    
    this.setData({ loadingConsult: true })
    
    // 构建提示词
    const prompt = `你是一位资深的塔罗占卜师。用户今天抽了每日运势牌，现在想进一步咨询。

【今日运势抽牌】
牌名：${this.data.card.name}（${this.data.card.isReversed ? '逆位' : '正位'}）
基本含义：${this.data.card.isReversed ? this.data.card.reversed : this.data.card.upright}

【AI 解读报告】
${this.data.aiReport}

【用户进一步咨询】
${question}

请基于今日运势抽牌和解读，回答用户的进一步咨询。保持温暖、专业的语气，给出具体而有帮助的建议。字数控制在300-500字。

严格要求：
- 绝对不要出现井号（#）和星号（*）这两个符号
- 不要使用任何 markdown 格式符号
- 可以使用少量温馨的图案符号（如星星、月亮、太阳等）`

    // 调用 DeepSeek API
    wx.request({
      url: DEEPSEEK_API_URL,
      method: 'POST',
      timeout: 60000,
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      data: {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位专业的塔罗占卜师，擅长根据已有解读回答用户的深入咨询。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data.choices && res.data.choices[0]) {
          let answer = res.data.choices[0].message.content
          // 清除 markdown 符号
          answer = answer.replace(/[#*\-_\[\]]/g, '')
          answer = answer.replace(/\(\)/g, '')
          answer = answer.replace(/\n{3,}/g, '\n\n')
          
          // 添加到咨询历史
          const newHistory = [...this.data.consultHistory, {
            question: question,
            answer: answer
          }]
          
          this.setData({
            consultHistory: newHistory,
            consultQuestion: '',
            loadingConsult: false
          })
        } else {
          console.error('咨询失败:', res)
          this.setData({ loadingConsult: false })
          wx.showToast({
            title: '咨询失败，请重试',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        console.error('咨询请求失败:', err)
        this.setData({ loadingConsult: false })
        wx.showToast({
          title: '网络错误，请检查连接',
          icon: 'none'
        })
      }
    })
  }
})
