const { saveReadingToHistory } = require('../../utils/util.js')
const { tarotCards } = require('../../data/tarotCards.js')
const { tarotKnowledge } = require('../../data/tarotKnowledge.js')

// DeepSeek API 配置
const DEEPSEEK_API_KEY = 'sk-7d6db32bab78444c85739330f853ae17'
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'

Page({
  data: {
    question: '',
    spread: null,
    cards: [],
    aiReport: '', // AI 解读报告
    loadingAI: false, // AI 加载状态
    showAIReport: false, // 是否显示 AI 报告
    consultQuestion: '', // 咨询问题
    consultHistory: [], // 咨询历史
    loadingConsult: false // 咨询加载状态
  },

  onLoad: function (options) {
    console.log('result onLoad options:', options)
    try {
      const question = decodeURIComponent(options.question || '')
      
      // 解析 spread，处理可能的字符串或对象
      let spread = {}
      try {
        const spreadStr = decodeURIComponent(options.spread || '{}')
        spread = JSON.parse(spreadStr)
      } catch (e) {
        console.error('解析 spread 失败:', e)
        spread = { name: '塔罗测算', positions: [] }
      }
      
      // 解析 cards
      let slimCards = []
      try {
        const cardsStr = decodeURIComponent(options.cards || '[]')
        slimCards = JSON.parse(cardsStr)
      } catch (e) {
        console.error('解析 cards 失败:', e)
        slimCards = []
      }

      console.log('解析后的数据:', { question, spread, slimCards })
      
      // 确保 spread 有默认值
      if (!spread.positions) {
        spread.positions = []
      }

      // 根据 id 从本地数据中查找完整牌信息，避免 URL 传参过长
      const cards = slimCards.map((slim, index) => {
        const full = tarotCards.find(c => c.id === slim.id) || {}
        return {
          ...full,
          isReversed: slim.isReversed,
          position: slim.position || (spread.positions[index] ? spread.positions[index].name : null)
        }
      })
      
      this.setData({
        question,
        spread,
        cards
      })
      
      // 检查是否从历史记录页面跳转过来
      if (options.fromHistory && options.aiReport) {
        // 使用已保存的 AI 解读，不再重新请求
        const aiReport = decodeURIComponent(options.aiReport)
        this.setData({
          aiReport: aiReport,
          loadingAI: false,
          showAIReport: aiReport ? true : false
        })
      } else {
        // 新测算，获取 AI 解读报告
        this.getAIReport()
      }
    } catch (e) {
      console.error('解析参数失败:', e)
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      })
    }
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
        knowledge.push(`占星：${major.planet} / ${major.zodiac}`)
        knowledge.push(`精神意义：${major.spiritual}`)
      }
    }
    
    // 小阿卡纳
    if (card.id >= 22) {
      // 判断花色
      let suit = ''
      let num = 0
      if (card.name.includes('权杖') || card.name.includes('Wands')) {
        suit = 'wands'
        const match = card.name.match(/(\d+|ACE|Page|Knight|Queen|King)/i)
        if (match) {
          const numMap = { 'ACE': 'ace', 'Page': 'page', 'Knight': 'knight', 'Queen': 'queen', 'King': 'king' }
          const key = numMap[match[1]] || match[1].toLowerCase()
          if (tarotKnowledge.minorArcana.wands[key]) {
            knowledge.push(`权杖含义：${tarotKnowledge.minorArcana.wands[key]}`)
          }
        }
      } else if (card.name.includes('圣杯') || card.name.includes('Cups')) {
        suit = 'cups'
      } else if (card.name.includes('宝剑') || card.name.includes('Swords')) {
        suit = 'swords'
      } else if (card.name.includes('星币') || card.name.includes('Pentacles')) {
        suit = 'pentacles'
      }
      
      if (suit && tarotKnowledge.minorArcana[suit]) {
        knowledge.push(`元素：${tarotKnowledge.minorArcana[suit].element}`)
        knowledge.push(`主题：${tarotKnowledge.minorArcana[suit].description}`)
      }
    }
    
    // 正逆位解读
    if (card.isReversed) {
      knowledge.push(`逆位提示：${tarotKnowledge.positionGuide.reversed.general}`)
    } else {
      knowledge.push(`正位提示：${tarotKnowledge.positionGuide.upright.general}`)
    }
    
    return knowledge.join('；')
  },

  // 自动保存测算记录
  autoSaveToHistory: function (aiReport) {
    // 只保存必要的牌信息，避免数据过大
    const slimCards = this.data.cards.map(card => ({
      id: card.id,
      name: card.name,
      isReversed: card.isReversed,
      position: card.position
    }))
    
    const readingData = {
      question: this.data.question,
      spread: this.data.spread,
      cards: slimCards,
      type: 'reading',
      aiReport: aiReport || ''
    }
    
    saveReadingToHistory(readingData)
  },

  // 查看牌面详情
  viewCardDetail: function (e) {
    const card = e.currentTarget.dataset.card
    wx.navigateTo({
      url: `/pages/diviner/card-parser?cardId=${card.id}&from=result`
    })
  },

  // 获取 AI 解读报告
  getAIReport: function () {
    this.setData({ loadingAI: true })
    
    // 构建牌面信息
    const cardsInfo = this.data.cards.map((card, index) => {
      const position = this.data.spread.positions[index]
      const knowledge = this.getCardKnowledge(card)
      return `
第${index + 1}张牌 - ${position.name}：
牌名：${card.name}（${card.isReversed ? '逆位' : '正位'}）
基本含义：${card.isReversed ? card.reversed : card.upright}
深层意义：${knowledge}
位置说明：${position.description}
      `.trim()
    }).join('\n\n')
    
    // 构建提示词
    const prompt = `你是一位资深的塔罗占卜师，拥有深厚的塔罗牌知识和丰富的解读经验。请根据以下信息为用户提供专业而温暖的占卜解读报告。

【占卜问题】
${this.data.question}

【使用牌阵】
${this.data.spread.name}

【抽牌结果】
${cardsInfo}

【解读原则】
${tarotKnowledge.interpretationPrinciples.general.join('；')}

请提供一份详细的解读报告，包含以下内容：

一、整体牌面能量分析
分析各牌之间的元素互动、能量流动和整体氛围。注意牌与牌之间的关联和呼应。

二、针对问题的具体解读
结合每张牌的位置和含义，针对占卜问题给出具体的解读。参考牌的深层意义和位置说明。

三、建议与指引
基于牌面给出实际可行的建议，帮助问卜者更好地面对当前情况。重点放在成长和行动上。

四、总结
用温暖的话语总结核心信息，给予鼓励和支持。

严格要求：
- 用温暖、专业且富有洞察力的语气撰写，像一位智慧的朋友
- 避免过于负面的表述，重点放在成长、机会和解决方案上
- 可以使用少量温馨的图案符号（如星星、月亮、太阳、花朵等）增加亲和力
- 禁止使用的符号：井号#、星号*、减号-、下划线_、方括号[]、圆括号()用于标记
- 不要使用任何 markdown 格式，纯文本输出即可
- 不要生成列表，用段落形式表达
- 结合塔罗知识库中的元素、占星和数字学含义进行深度解读
- 字数控制在600-800字，确保内容精炼且响应快速`

    // 调用 DeepSeek API
    wx.request({
      url: DEEPSEEK_API_URL,
      method: 'POST',
      timeout: 60000, // 60秒超时
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      data: {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位专业的塔罗占卜师，擅长解读塔罗牌并提供富有洞察力的建议。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      success: (res) => {
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
          // 保存到历史记录（包含 AI 解读）
          this.autoSaveToHistory(report)
        } else {
          console.error('AI 解读失败:', res)
          this.setData({ 
            loadingAI: false,
            aiReport: ''
          })
          // 即使没有 AI 解读也保存记录
          this.autoSaveToHistory('')
          wx.showToast({
            title: 'AI 解读失败，请重试',
            icon: 'none'
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
          title: '网络错误，请检查连接',
          icon: 'none'
        })
      }
    })
  },

  // 切换 AI 报告显示
  toggleAIReport: function () {
    this.setData({
      showAIReport: !this.data.showAIReport
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
    const prompt = `你是一位资深的塔罗占卜师。用户之前进行了塔罗占卜，现在想进一步咨询。

【原始占卜问题】
${this.data.question}

【抽牌结果】
${this.data.cards.map((card, index) => `${index + 1}. ${card.name}（${card.isReversed ? '逆位' : '正位'}）`).join('\n')}

【AI 解读报告】
${this.data.aiReport}

【用户进一步咨询】
${question}

请基于之前的占卜结果和解读，回答用户的进一步咨询。保持温暖、专业的语气，给出具体而有帮助的建议。字数控制在300-500字。

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
  },

  // 重新测算
  retry: function () {
    wx.redirectTo({
      url: '/pages/reading/input-question'
    })
  }
})
