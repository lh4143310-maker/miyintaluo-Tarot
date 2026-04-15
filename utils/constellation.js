/**
 * 动态星座图工具
 * 用法：在页面 onReady 中调用 startConstellation(canvasId, pageInstance)
 *       在页面 onUnload 中调用 stopConstellation(animTimer)
 */

// 星座连线模板（归一化坐标 0~1，每条线段 [x1,y1,x2,y2]）
// 减少星座数量和星星数量，提高性能
const CONSTELLATIONS = [
  // 白羊座 Aries - 上部右侧（简化）
  {
    name: 'Aries',
    stars: [[0.72, 0.08], [0.78, 0.12], [0.85, 0.19]],
    lines: [[0, 1], [1, 2]]
  },
  // 猎户座 Orion - 左侧中部（简化）
  {
    name: 'Orion',
    stars: [[0.08, 0.28], [0.14, 0.25], [0.20, 0.27], [0.11, 0.33], [0.17, 0.33]],
    lines: [[0, 1], [1, 2], [3, 4], [0, 3], [2, 4]]
  }
]

/**
 * 初始化星座数据（根据 canvas 实际宽高映射坐标）
 */
function buildScene(width, height) {
  const stars = []
  const lines = []

  // 背景散星（随机分布） - 进一步减少数量
  for (let i = 0; i < 10; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1 + 0.2,
      baseAlpha: Math.random() * 0.3 + 0.1,
      alpha: 0,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.01 + 0.003,
      gold: Math.random() < 0.1,
      constellation: false
    })
  }

  // 星座主星 + 连线
  CONSTELLATIONS.forEach(con => {
    const starIndices = []
    con.stars.forEach(([nx, ny]) => {
      const idx = stars.length
      starIndices.push(idx)
      stars.push({
        x: nx * width,
        y: ny * height,
        r: Math.random() * 1 + 1,
        baseAlpha: Math.random() * 0.2 + 0.4,
        alpha: 0,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.01 + 0.003,
        gold: true,
        constellation: true
      })
    })
    con.lines.forEach(([a, b]) => {
      lines.push({
        from: starIndices[a],
        to: starIndices[b],
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.008 + 0.003
      })
    })
  })

  return { stars, lines }
}

/**
 * 绘制一帧
 */
function drawFrame(ctx, scene, width, height, tick) {
  ctx.clearRect(0, 0, width, height)

  const { stars, lines } = scene

  // 绘制星点（简化绘制逻辑）
  stars.forEach(star => {
    const a = (Math.sin(tick * star.speed + star.phase) + 1) / 2
    star.alpha = star.baseAlpha * (0.5 + 0.5 * a)

    if (star.alpha > 0.1) {
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
      if (star.gold) {
        ctx.fillStyle = `rgba(212,175,55,${star.alpha})`
      } else {
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`
      }
      ctx.fill()
    }
  })

  // 绘制连线（进一步简化逻辑，减少绘制操作）
  if (tick % 2 === 0) { // 每两帧绘制一次连线，减少绘制操作
    lines.forEach(line => {
      const s1 = stars[line.from]
      const s2 = stars[line.to]
      const alpha = (Math.sin(tick * line.speed + line.phase) + 1) / 2 * 0.1 + 0.02

      if (alpha > 0.03) {
        ctx.beginPath()
        ctx.moveTo(s1.x, s1.y)
        ctx.lineTo(s2.x, s2.y)
        ctx.strokeStyle = `rgba(212,175,55,${alpha})`
        ctx.lineWidth = 0.3
        ctx.stroke()
      }
    })
  }
}

/**
 * 启动动态星座动画
 * @param {string} canvasId  canvas 组件的 id
 * @param {object} pageCtx   页面实例（this）
 * @param {Function} onTimer 返回 timer id，供外部停止
 */
function startConstellation(canvasId, pageCtx, onTimer) {
  wx.createSelectorQuery()
    .in(pageCtx)
    .select('#' + canvasId)
    .fields({ node: true, size: true })
    .exec(res => {
      if (!res[0] || !res[0].node) return

      const canvas = res[0].node
      const width = res[0].width
      const height = res[0].height

      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      const scene = buildScene(width, height)
      let tick = 0
      let lastTime = Date.now()

      let animId = null
      function loop() {
        const now = Date.now()
        // 进一步限制帧率，每32ms执行一次（约30fps）以减少性能消耗
        if (now - lastTime > 32) {
          tick++
          drawFrame(ctx, scene, width, height, tick)
          lastTime = now
        }
        animId = canvas.requestAnimationFrame(loop)
      }
      loop()

      if (onTimer) onTimer(animId, canvas)
    })
}

/**
 * 停止动画
 * @param {object} canvas  canvas node
 * @param {number} animId  requestAnimationFrame 返回的 id
 */
function stopConstellation(canvas, animId) {
  if (canvas && animId) {
    canvas.cancelAnimationFrame(animId)
  }
}

module.exports = { startConstellation, stopConstellation }