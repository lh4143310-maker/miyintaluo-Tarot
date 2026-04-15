const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const shuffleArray = array => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

const getRandomCards = (cards, count) => {
  const shuffled = shuffleArray(cards)
  const selected = shuffled.slice(0, count)
  return selected.map(card => ({
    ...card,
    isReversed: Math.random() > 0.5
  }))
}

const saveReadingToHistory = (reading) => {
  const history = wx.getStorageSync('readingHistory') || []
  const newHistory = [{
    ...reading,
    id: Date.now(),
    timestamp: formatTime(new Date())
  }, ...history]
  wx.setStorageSync('readingHistory', newHistory)
  return newHistory
}

const saveDailyFortune = (fortune) => {
  const today = new Date().toDateString()
  wx.setStorageSync('lastDailyFortune', {
    ...fortune,
    date: today,
    timestamp: formatTime(new Date())
  })
}

const getTodayFortune = () => {
  const saved = wx.getStorageSync('lastDailyFortune')
  if (saved && saved.date === new Date().toDateString()) {
    return saved
  }
  return null
}

module.exports = {
  formatTime,
  shuffleArray,
  getRandomCards,
  saveReadingToHistory,
  saveDailyFortune,
  getTodayFortune
}
