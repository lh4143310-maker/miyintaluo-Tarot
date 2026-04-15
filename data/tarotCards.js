const tarotCards = [
  {
    id: 0,
    name: "愚者",
    nameEn: "The Fool",
    type: "大阿卡纳",
    meaning: "新的开始、冒险、天真、自发性",
    upright: "新的开始、冒险、天真、自发性、信念、自由",
    reversed: "鲁莽、冒险带来的风险、愚蠢、疏忽、轻率",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 1,
    name: "魔术师",
    nameEn: "The Magician",
    type: "大阿卡纳",
    meaning: "创造力、技能、意志力、自信",
    upright: "创造力、技能、意志力、自信、行动、显化",
    reversed: "欺骗、操控、意志薄弱、滥用技能、不诚实",
    image: "/pages/reading/tarot-images/1.jpg"
  },
  {
    id: 2,
    name: "女祭司",
    nameEn: "The High Priestess",
    type: "大阿卡纳",
    meaning: "直觉、神秘、潜意识、智慧",
    upright: "直觉、神秘、潜意识、智慧、内在知识、静止",
    reversed: "隐藏的动机、压抑的情感、表面化、忽视直觉",
    image: "/pages/reading/tarot-images/2.jpg"
  },
  {
    id: 3,
    name: "女皇",
    nameEn: "The Empress",
    type: "大阿卡纳",
    meaning: "丰饶、母性、自然、创造力",
    upright: "丰饶、母性、自然、创造力、孕育、感官享受",
    reversed: "创造力受阻、依赖、空虚、不安全感、缺乏成长",
    image: "/pages/reading/tarot-images/3.jpg"
  },
  {
    id: 4,
    name: "皇帝",
    nameEn: "The Emperor",
    type: "大阿卡纳",
    meaning: "权威、结构、控制、父性",
    upright: "权威、结构、控制、父性、稳定、领导力",
    reversed: "独裁、僵化、冷酷、缺乏纪律、过度控制",
    image: "/pages/reading/tarot-images/4.jpg"
  },
  {
    id: 5,
    name: "教皇",
    nameEn: "The Hierophant",
    type: "大阿卡纳",
    meaning: "传统、信仰、精神指导、教育",
    upright: "传统、信仰、精神指导、教育、conformity、宗教",
    reversed: "非传统、挑战权威、新的信仰、打破常规、个人主义",
    image: "/pages/reading/tarot-images/5.jpg"
  },
  {
    id: 6,
    name: "恋人",
    nameEn: "The Lovers",
    type: "大阿卡纳",
    meaning: "爱、和谐、关系、价值观的选择",
    upright: "爱、和谐、关系、价值观的选择、伙伴关系、团结",
    reversed: "不和谐、失衡、价值观冲突、分离、错误的选择",
    image: "/pages/reading/tarot-images/6.jpg"
  },
  {
    id: 7,
    name: "战车",
    nameEn: "The Chariot",
    type: "大阿卡纳",
    meaning: "意志、胜利、控制、决心",
    upright: "意志、胜利、控制、决心、行动力、征服",
    reversed: "失去方向、失控、攻击性、缺乏纪律、失败",
    image: "/pages/reading/tarot-images/7.jpg"
  },
  {
    id: 8,
    name: "力量",
    nameEn: "Strength",
    type: "大阿卡纳",
    meaning: "勇气、耐心、同情、内在力量",
    upright: "勇气、耐心、同情、内在力量、韧性、信心",
    reversed: "软弱、自我怀疑、缺乏自律、不安全感、失控",
    image: "/pages/reading/tarot-images/8.jpg"
  },
  {
    id: 9,
    name: "隐士",
    nameEn: "The Hermit",
    type: "大阿卡纳",
    meaning: "内省、孤独、寻求真理、内在引导",
    upright: "内省、孤独、寻求真理、内在引导、沉思、智慧",
    reversed: "孤立、孤独、退缩、拒绝帮助、迷失方向",
    image: "/pages/reading/tarot-images/9.jpg"
  },
  {
    id: 10,
    name: "命运之轮",
    nameEn: "Wheel of Fortune",
    type: "大阿卡纳",
    meaning: "命运、周期、变化、机遇",
    upright: "命运、周期、变化、机遇、好运、转折点",
    reversed: "厄运、抗拒变化、失控、坏运气、中断",
    image: "/pages/reading/tarot-images/10.jpg"
  },
  {
    id: 11,
    name: "正义",
    nameEn: "Justice",
    type: "大阿卡纳",
    meaning: "公平、真理、因果、法律",
    upright: "公平、真理、因果、法律、公正、责任",
    reversed: "不公、不诚实、逃避责任、不公正、偏见",
    image: "/pages/reading/tarot-images/11.jpg"
  },
  {
    id: 12,
    name: "倒吊人",
    nameEn: "The Hanged Man",
    type: "大阿卡纳",
    meaning: "牺牲、新视角、等待、放下",
    upright: "牺牲、新视角、等待、放下、转变、放手",
    reversed: "拖延、无谓的牺牲、停滞、抗拒改变、固执",
    image: "/pages/reading/tarot-images/12.jpg"
  },
  {
    id: 13,
    name: "死神",
    nameEn: "Death",
    type: "大阿卡纳",
    meaning: "结束、转变、重生、新的开始",
    upright: "结束、转变、重生、新的开始、过渡、放下",
    reversed: "抗拒改变、停滞、无法放手、拖延、恐惧变化",
    image: "/pages/reading/tarot-images/13.jpg"
  },
  {
    id: 14,
    name: "节制",
    nameEn: "Temperance",
    type: "大阿卡纳",
    meaning: "平衡、适度、耐心、和谐",
    upright: "平衡、适度、耐心、和谐、自我控制、融合",
    reversed: "失衡、过度、缺乏耐心、冲突、不和谐",
    image: "/pages/reading/tarot-images/14.jpg"
  },
  {
    id: 15,
    name: "恶魔",
    nameEn: "The Devil",
    type: "大阿卡纳",
    meaning: "束缚、物质主义、欲望、黑暗面",
    upright: "束缚、物质主义、欲望、黑暗面、成瘾、无知",
    reversed: "释放、摆脱束缚、重获力量、面对黑暗面、独立",
    image: "/pages/reading/tarot-images/15.jpg"
  },
  {
    id: 16,
    name: "塔",
    nameEn: "The Tower",
    type: "大阿卡纳",
    meaning: "突变、觉醒、混乱、启示",
    upright: "突变、觉醒、混乱、启示、破坏、真相",
    reversed: "避免灾难、恐惧改变、推迟不可避免的、内在变化",
    image: "/pages/reading/tarot-images/16.jpg"
  },
  {
    id: 17,
    name: "星星",
    nameEn: "The Star",
    type: "大阿卡纳",
    meaning: "希望、灵感、宁静、更新",
    upright: "希望、灵感、宁静、更新、信心、平静",
    reversed: "绝望、缺乏信心、失望、消极、不切实际",
    image: "/pages/reading/tarot-images/17.jpg"
  },
  {
    id: 18,
    name: "月亮",
    nameEn: "The Moon",
    type: "大阿卡纳",
    meaning: "幻觉、恐惧、潜意识、直觉",
    upright: "幻觉、恐惧、潜意识、直觉、不确定性、梦境",
    reversed: "释放恐惧、真相大白、压抑的情感、清晰",
    image: "/pages/reading/tarot-images/18.jpg"
  },
  {
    id: 19,
    name: "太阳",
    nameEn: "The Sun",
    type: "大阿卡纳",
    meaning: "积极、成功、活力、喜悦",
    upright: "积极、成功、活力、喜悦、清晰、庆祝",
    reversed: "暂时的消沉、过度乐观、缺乏成功、虚假的乐观",
    image: "/pages/reading/tarot-images/19.jpg"
  },
  {
    id: 20,
    name: "审判",
    nameEn: "Judgement",
    type: "大阿卡纳",
    meaning: "审判、觉醒、救赎、重生",
    upright: "审判、觉醒、救赎、重生、召唤、决定",
    reversed: "自我怀疑、拒绝召唤、忽视内在声音、缺乏自我审视",
    image: "/pages/reading/tarot-images/20.jpg"
  },
  {
    id: 21,
    name: "世界",
    nameEn: "The World",
    type: "大阿卡纳",
    meaning: "完成、整合、成就、旅行",
    upright: "完成、整合、成就、旅行、圆满、统一",
    reversed: "未完成、缺乏圆满、延迟、停滞、空虚",
    image: "/pages/reading/tarot-images/21.jpg"
  }
]

const smallCards = [
  // 权杖系列 (Wands) - 火元素，代表行动、创造力、热情
  {
    id: 22,
    name: "权杖首牌",
    nameEn: "Ace of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "新的开始、创造力、灵感",
    upright: "新的开始、创造力、灵感、行动力、潜力",
    reversed: "延迟、缺乏方向、创造力受阻、错失机会",
    image: "/pages/reading/tarot-images/22.jpg"
  },
  {
    id: 26,
    name: "权杖二",
    nameEn: "Two of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "规划、决策、未来方向",
    upright: "规划、决策、未来方向、探索、等待时机",
    reversed: "恐惧改变、缺乏计划、犹豫不决、错失机会",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 27,
    name: "权杖三",
    nameEn: "Three of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "远见、扩展、进展",
    upright: "远见、扩展、进展、合作、初步成果",
    reversed: "延迟、缺乏远见、合作问题、目标未达成",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 28,
    name: "权杖四",
    nameEn: "Four of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "庆祝、和谐、稳定",
    upright: "庆祝、和谐、稳定、家庭、社区、成就",
    reversed: "不稳定、缺乏支持、家庭问题、延迟庆祝",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 29,
    name: "权杖五",
    nameEn: "Five of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "冲突、竞争、挑战",
    upright: "冲突、竞争、挑战、争论、能量过剩",
    reversed: "避免冲突、和解、合作、解决争端",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 30,
    name: "权杖六",
    nameEn: "Six of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "胜利、认可、好消息",
    upright: "胜利、认可、好消息、自信、公众赞誉",
    reversed: "骄傲、过度自信、延迟的成功、缺乏认可",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 31,
    name: "权杖七",
    nameEn: "Seven of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "防御、坚持、勇气",
    upright: "防御、坚持、勇气、对抗、保护立场",
    reversed: "放弃、不知所措、无法防御、疲惫",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 32,
    name: "权杖八",
    nameEn: "Eight of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "快速行动、进展、消息",
    upright: "快速行动、进展、消息、旅行、动力",
    reversed: "延迟、阻碍、混乱、缺乏方向、挫折",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 33,
    name: "权杖九",
    nameEn: "Nine of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "韧性、准备、坚持",
    upright: "韧性、准备、坚持、防御、最后努力",
    reversed: "疲惫、放弃、缺乏准备、固执、偏执",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 34,
    name: "权杖十",
    nameEn: "Ten of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "负担、责任、压力",
    upright: "负担、责任、压力、努力工作、即将完成",
    reversed: "释放负担、委派、不堪重负、需要休息",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 35,
    name: "权杖侍从",
    nameEn: "Page of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "探索、新想法、热情",
    upright: "探索、新想法、热情、创意、自由精神",
    reversed: "缺乏方向、冲动、不成熟、延迟消息",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 36,
    name: "权杖骑士",
    nameEn: "Knight of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "行动、冒险、冲动",
    upright: "行动、冒险、冲动、热情、旅行",
    reversed: "冲动、鲁莽、延迟、愤怒、缺乏方向",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 37,
    name: "权杖王后",
    nameEn: "Queen of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "自信、热情、社交",
    upright: "自信、热情、社交、魅力、独立",
    reversed: "嫉妒、专横、缺乏自信、自私",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 38,
    name: "权杖国王",
    nameEn: "King of Wands",
    type: "小阿卡纳",
    suit: "权杖",
    meaning: "领导力、远见、创业",
    upright: "领导力、远见、创业、魅力、掌控",
    reversed: "专横、冲动、缺乏方向、暴怒",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  
  // 圣杯系列 (Cups) - 水元素，代表情感、直觉、关系
  {
    id: 23,
    name: "圣杯首牌",
    nameEn: "Ace of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "新的感情、直觉、精神觉醒",
    upright: "新的感情、直觉、精神觉醒、爱、喜悦",
    reversed: "情感空虚、压抑的感情、不稳定、缺乏直觉",
    image: "/pages/reading/tarot-images/23.jpg"
  },
  {
    id: 39,
    name: "圣杯二",
    nameEn: "Two of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "合作、和谐、伙伴关系",
    upright: "合作、和谐、伙伴关系、爱情、相互吸引",
    reversed: "不和谐、分离、价值观冲突、关系失衡",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 40,
    name: "圣杯三",
    nameEn: "Three of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "庆祝、友谊、社交",
    upright: "庆祝、友谊、社交、欢乐、团体活动",
    reversed: "过度社交、八卦、孤立、冲突、不和谐",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 41,
    name: "圣杯四",
    nameEn: "Four of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "沉思、不满、重新评估",
    upright: "沉思、不满、重新评估、冥想、错失机会",
    reversed: "觉醒、新意识、接受、行动、感激",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 42,
    name: "圣杯五",
    nameEn: "Five of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "失落、悲伤、失望",
    upright: "失落、悲伤、失望、专注于失去、遗憾",
    reversed: "接受、原谅、继续前进、看到希望",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 43,
    name: "圣杯六",
    nameEn: "Six of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "怀旧、童年、回忆",
    upright: "怀旧、童年、回忆、纯真、分享",
    reversed: "困在过去、不成熟、缺乏创造力、放手",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 44,
    name: "圣杯七",
    nameEn: "Seven of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "选择、幻想、梦想",
    upright: "选择、幻想、梦想、想象、诱惑",
    reversed: "现实、清晰、做出选择、消除幻想",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 45,
    name: "圣杯八",
    nameEn: "Eight of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "离开、放弃、寻求更多",
    upright: "离开、放弃、寻求更多、放手、旅行",
    reversed: "恐惧改变、停滞、无法放手、退缩",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 46,
    name: "圣杯九",
    nameEn: "Nine of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "满足、愿望实现、幸福",
    upright: "满足、愿望实现、幸福、情感满足、享乐",
    reversed: "不满、贪婪、缺乏满足、空虚、过度放纵",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 47,
    name: "圣杯十",
    nameEn: "Ten of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "家庭幸福、和谐、满足",
    upright: "家庭幸福、和谐、满足、情感圆满、和平",
    reversed: "家庭冲突、不和谐、缺乏满足、破碎的梦想",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 48,
    name: "圣杯侍从",
    nameEn: "Page of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "创意、直觉、消息",
    upright: "创意、直觉、消息、梦想、敏感",
    reversed: "情感不成熟、幻想、失望、过度敏感",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 49,
    name: "圣杯骑士",
    nameEn: "Knight of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "浪漫、追求、理想主义",
    upright: "浪漫、追求、理想主义、魅力、邀请",
    reversed: "失望、情绪化、不切实际、逃避现实",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 50,
    name: "圣杯王后",
    nameEn: "Queen of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "同情、直觉、情感深度",
    upright: "同情、直觉、情感深度、关怀、理解",
    reversed: "情绪不稳定、过度敏感、缺乏界限、情绪化",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 51,
    name: "圣杯国王",
    nameEn: "King of Cups",
    type: "小阿卡纳",
    suit: "圣杯",
    meaning: "情感平衡、智慧、外交",
    upright: "情感平衡、智慧、外交、同情、控制情绪",
    reversed: "情绪操纵、情绪失控、不诚实、冷漠",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  
  // 宝剑系列 (Swords) - 风元素，代表思维、冲突、挑战
  {
    id: 24,
    name: "宝剑首牌",
    nameEn: "Ace of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "清晰的思维、真相、突破",
    upright: "清晰的思维、真相、突破、智力、成功",
    reversed: "混乱、欺骗、缺乏清晰、失败、思维受阻",
    image: "/pages/reading/tarot-images/24.jpg"
  },
  {
    id: 52,
    name: "宝剑二",
    nameEn: "Two of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "僵局、选择、平衡",
    upright: "僵局、选择、平衡、回避决定、僵局",
    reversed: "做出决定、打破僵局、信息过载、混乱",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 53,
    name: "宝剑三",
    nameEn: "Three of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "心碎、悲伤、痛苦",
    upright: "心碎、悲伤、痛苦、失去、悲伤",
    reversed: "恢复、原谅、释放痛苦、继续前进",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 54,
    name: "宝剑四",
    nameEn: "Four of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "休息、恢复、沉思",
    upright: "休息、恢复、沉思、冥想、疗愈",
    reversed: "不安、缺乏休息、压力、倦怠、停滞",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 55,
    name: "宝剑五",
    nameEn: "Five of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "冲突、失败、胜利",
    upright: "冲突、失败、胜利、不择手段、空洞的胜利",
    reversed: "和解、弥补、过去冲突、妥协、开放",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 56,
    name: "宝剑六",
    nameEn: "Six of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "过渡、离开、疗愈",
    upright: "过渡、离开、疗愈、前进、旅行",
    reversed: "无法前进、被困、抵抗改变、未完成",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 57,
    name: "宝剑七",
    nameEn: "Seven of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "欺骗、策略、偷窃",
    upright: "欺骗、策略、偷窃、狡猾、秘密",
    reversed: "坦白、内疚、被发现、诚实、面对后果",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 58,
    name: "宝剑八",
    nameEn: "Eight of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "限制、束缚、无力感",
    upright: "限制、束缚、无力感、自我设限、困境",
    reversed: "解放、释放、新视角、自由、突破",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 59,
    name: "宝剑九",
    nameEn: "Nine of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "焦虑、噩梦、恐惧",
    upright: "焦虑、噩梦、恐惧、担忧、绝望",
    reversed: "希望、释放焦虑、面对恐惧、疗愈",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 60,
    name: "宝剑十",
    nameEn: "Ten of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "结束、背叛、痛苦",
    upright: "结束、背叛、痛苦、失败、崩溃",
    reversed: "恢复、重生、结束痛苦、新的开始",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 61,
    name: "宝剑侍从",
    nameEn: "Page of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "好奇、新想法、警觉",
    upright: "好奇、新想法、警觉、沟通、诚实",
    reversed: "欺骗、八卦、不成熟、缺乏准备",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 62,
    name: "宝剑骑士",
    nameEn: "Knight of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "行动、冲动、野心",
    upright: "行动、冲动、野心、果断、快速思考",
    reversed: "冲动、鲁莽、缺乏计划、侵略性、愤怒",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 63,
    name: "宝剑王后",
    nameEn: "Queen of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "独立、清晰、智慧",
    upright: "独立、清晰、智慧、诚实、直接",
    reversed: "冷酷、残忍、过于理性、不友善",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 64,
    name: "宝剑国王",
    nameEn: "King of Swords",
    type: "小阿卡纳",
    suit: "宝剑",
    meaning: "权威、真理、智力",
    upright: "权威、真理、智力、公正、清晰",
    reversed: "独裁、不公正、滥用权力、操纵",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  
  // 星币系列 (Pentacles) - 土元素，代表物质、金钱、实际
  {
    id: 25,
    name: "星币首牌",
    nameEn: "Ace of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "新的机会、繁荣、物质稳定",
    upright: "新的机会、繁荣、物质稳定、成功、安全感",
    reversed: "错失机会、缺乏稳定、财务损失、贪婪",
    image: "/pages/reading/tarot-images/25.jpg"
  },
  {
    id: 65,
    name: "星币二",
    nameEn: "Two of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "平衡、适应、多任务",
    upright: "平衡、适应、多任务、灵活、时间管理",
    reversed: "失衡、过度承诺、混乱、缺乏组织",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 66,
    name: "星币三",
    nameEn: "Three of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "团队合作、技能、工艺",
    upright: "团队合作、技能、工艺、学习、专业",
    reversed: "缺乏团队合作、技能不足、平庸、缺乏动力",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 67,
    name: "星币四",
    nameEn: "Four of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "控制、稳定、占有欲",
    upright: "控制、稳定、占有欲、保守、财务安全",
    reversed: "贪婪、物质主义、自我封闭、财务损失",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 68,
    name: "星币五",
    nameEn: "Five of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "困难、贫困、孤立",
    upright: "困难、贫困、孤立、损失、艰难时期",
    reversed: "恢复、改善、新机会、寻求帮助、结束困难",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 69,
    name: "星币六",
    nameEn: "Six of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "慷慨、给予、分享",
    upright: "慷慨、给予、分享、慈善、平衡",
    reversed: "自私、债务、不平等、贪婪、条件性给予",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 70,
    name: "星币七",
    nameEn: "Seven of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "耐心、评估、投资",
    upright: "耐心、评估、投资、长期视角、成长",
    reversed: "不耐烦、缺乏成长、失望、浪费努力",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 71,
    name: "星币八",
    nameEn: "Eight of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "技能、勤奋、专注",
    upright: "技能、勤奋、专注、工艺、专业发展",
    reversed: "缺乏专注、平庸、无聊、缺乏动力",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 72,
    name: "星币九",
    nameEn: "Nine of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "独立、奢侈、自给自足",
    upright: "独立、奢侈、自给自足、享受、成果",
    reversed: "依赖、缺乏自律、财务问题、过度放纵",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 73,
    name: "星币十",
    nameEn: "Ten of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "财富、遗产、家庭",
    upright: "财富、遗产、家庭、长期安全、传统",
    reversed: "财务失败、家庭问题、不稳定、失去遗产",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 74,
    name: "星币侍从",
    nameEn: "Page of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "学习、机会、野心",
    upright: "学习、机会、野心、好消息、新开始",
    reversed: "缺乏进展、拖延、坏消息、缺乏机会",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 75,
    name: "星币骑士",
    nameEn: "Knight of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "勤奋、可靠、效率",
    upright: "勤奋、可靠、效率、耐心、努力工作",
    reversed: "懒惰、拖延、缺乏进展、固执、无聊",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 76,
    name: "星币王后",
    nameEn: "Queen of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "养育、实际、慷慨",
    upright: "养育、实际、慷慨、舒适、财务安全",
    reversed: "过度保护、财务不安全、自私、缺乏实际",
    image: "/pages/reading/tarot-images/0.jpg"
  },
  {
    id: 77,
    name: "星币国王",
    nameEn: "King of Pentacles",
    type: "小阿卡纳",
    suit: "星币",
    meaning: "成功、领导力、财富",
    upright: "成功、领导力、财富、商业头脑、稳定",
    reversed: "贪婪、物质主义、财务损失、腐败",
    image: "/pages/reading/tarot-images/0.jpg"
  }
]

const spreads = [
  {
    id: 1,
    name: "圣三角牌阵",
    cardCount: 3,
    positions: [
      { name: "过去", description: "事情的过去状况" },
      { name: "现在", description: "事情的当前状况" },
      { name: "未来", description: "事情的未来发展" }
    ]
  },
  {
    id: 2,
    name: "二选一牌阵",
    cardCount: 4,
    positions: [
      { name: "现状", description: "当前的状况" },
      { name: "选择A", description: "选择A的结果" },
      { name: "选择B", description: "选择B的结果" },
      { name: "建议", description: "给你的建议" }
    ]
  },
  {
    id: 3,
    name: "爱情十字牌阵",
    cardCount: 5,
    positions: [
      { name: "现状", description: "感情的现状" },
      { name: "对方", description: "对方的想法" },
      { name: "自己", description: "自己的想法" },
      { name: "障碍", description: "感情中的障碍" },
      { name: "未来", description: "感情的未来" }
    ]
  }
]

// 合并所有牌
const allCards = [...tarotCards, ...smallCards];

// 为每张牌分配唯一的图片路径
allCards.forEach((card) => {
  // 为每张牌分配一个基于其ID的图片路径
  // 这样每张牌都有自己的图片文件，不会循环使用
  card.image = `/pages/reading/tarot-images/${card.id}.jpg`;
});

module.exports = {
  tarotCards: allCards,
  spreads
}
