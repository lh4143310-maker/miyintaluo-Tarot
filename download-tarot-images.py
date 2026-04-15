#!/usr/bin/env python3
import os
import requests
from bs4 import BeautifulSoup
import time

# 塔罗牌数据
tarot_cards = [
    {"id": 0, "name": "愚者", "name_en": "The Fool"},
    {"id": 1, "name": "魔术师", "name_en": "The Magician"},
    {"id": 2, "name": "女祭司", "name_en": "The High Priestess"},
    {"id": 3, "name": "女皇", "name_en": "The Empress"},
    {"id": 4, "name": "皇帝", "name_en": "The Emperor"},
    {"id": 5, "name": "教皇", "name_en": "The Hierophant"},
    {"id": 6, "name": "恋人", "name_en": "The Lovers"},
    {"id": 7, "name": "战车", "name_en": "The Chariot"},
    {"id": 8, "name": "力量", "name_en": "Strength"},
    {"id": 9, "name": "隐士", "name_en": "The Hermit"},
    {"id": 10, "name": "命运之轮", "name_en": "Wheel of Fortune"},
    {"id": 11, "name": "正义", "name_en": "Justice"},
    {"id": 12, "name": "倒吊人", "name_en": "The Hanged Man"},
    {"id": 13, "name": "死神", "name_en": "Death"},
    {"id": 14, "name": "节制", "name_en": "Temperance"},
    {"id": 15, "name": "恶魔", "name_en": "The Devil"},
    {"id": 16, "name": "塔", "name_en": "The Tower"},
    {"id": 17, "name": "星星", "name_en": "The Star"},
    {"id": 18, "name": "月亮", "name_en": "The Moon"},
    {"id": 19, "name": "太阳", "name_en": "The Sun"},
    {"id": 20, "name": "审判", "name_en": "Judgement"},
    {"id": 21, "name": "世界", "name_en": "The World"},
    
    # 权杖系列
    {"id": 22, "name": "权杖首牌", "name_en": "Ace of Wands"},
    {"id": 26, "name": "权杖二", "name_en": "Two of Wands"},
    {"id": 27, "name": "权杖三", "name_en": "Three of Wands"},
    {"id": 28, "name": "权杖四", "name_en": "Four of Wands"},
    {"id": 29, "name": "权杖五", "name_en": "Five of Wands"},
    {"id": 30, "name": "权杖六", "name_en": "Six of Wands"},
    {"id": 31, "name": "权杖七", "name_en": "Seven of Wands"},
    {"id": 32, "name": "权杖八", "name_en": "Eight of Wands"},
    {"id": 33, "name": "权杖九", "name_en": "Nine of Wands"},
    {"id": 34, "name": "权杖十", "name_en": "Ten of Wands"},
    {"id": 35, "name": "权杖侍从", "name_en": "Page of Wands"},
    {"id": 36, "name": "权杖骑士", "name_en": "Knight of Wands"},
    {"id": 37, "name": "权杖王后", "name_en": "Queen of Wands"},
    {"id": 38, "name": "权杖国王", "name_en": "King of Wands"},
    
    # 圣杯系列
    {"id": 23, "name": "圣杯首牌", "name_en": "Ace of Cups"},
    {"id": 39, "name": "圣杯二", "name_en": "Two of Cups"},
    {"id": 40, "name": "圣杯三", "name_en": "Three of Cups"},
    {"id": 41, "name": "圣杯四", "name_en": "Four of Cups"},
    {"id": 42, "name": "圣杯五", "name_en": "Five of Cups"},
    {"id": 43, "name": "圣杯六", "name_en": "Six of Cups"},
    {"id": 44, "name": "圣杯七", "name_en": "Seven of Cups"},
    {"id": 45, "name": "圣杯八", "name_en": "Eight of Cups"},
    {"id": 46, "name": "圣杯九", "name_en": "Nine of Cups"},
    {"id": 47, "name": "圣杯十", "name_en": "Ten of Cups"},
    {"id": 48, "name": "圣杯侍从", "name_en": "Page of Cups"},
    {"id": 49, "name": "圣杯骑士", "name_en": "Knight of Cups"},
    {"id": 50, "name": "圣杯王后", "name_en": "Queen of Cups"},
    {"id": 51, "name": "圣杯国王", "name_en": "King of Cups"},
    
    # 宝剑系列
    {"id": 24, "name": "宝剑首牌", "name_en": "Ace of Swords"},
    {"id": 52, "name": "宝剑二", "name_en": "Two of Swords"},
    {"id": 53, "name": "宝剑三", "name_en": "Three of Swords"},
    {"id": 54, "name": "宝剑四", "name_en": "Four of Swords"},
    {"id": 55, "name": "宝剑五", "name_en": "Five of Swords"},
    {"id": 56, "name": "宝剑六", "name_en": "Six of Swords"},
    {"id": 57, "name": "宝剑七", "name_en": "Seven of Swords"},
    {"id": 58, "name": "宝剑八", "name_en": "Eight of Swords"},
    {"id": 59, "name": "宝剑九", "name_en": "Nine of Swords"},
    {"id": 60, "name": "宝剑十", "name_en": "Ten of Swords"},
    {"id": 61, "name": "宝剑侍从", "name_en": "Page of Swords"},
    {"id": 62, "name": "宝剑骑士", "name_en": "Knight of Swords"},
    {"id": 63, "name": "宝剑王后", "name_en": "Queen of Swords"},
    {"id": 64, "name": "宝剑国王", "name_en": "King of Swords"},
    
    # 星币系列
    {"id": 25, "name": "星币首牌", "name_en": "Ace of Pentacles"},
    {"id": 65, "name": "星币二", "name_en": "Two of Pentacles"},
    {"id": 66, "name": "星币三", "name_en": "Three of Pentacles"},
    {"id": 67, "name": "星币四", "name_en": "Four of Pentacles"},
    {"id": 68, "name": "星币五", "name_en": "Five of Pentacles"},
    {"id": 69, "name": "星币六", "name_en": "Six of Pentacles"},
    {"id": 70, "name": "星币七", "name_en": "Seven of Pentacles"},
    {"id": 71, "name": "星币八", "name_en": "Eight of Pentacles"},
    {"id": 72, "name": "星币九", "name_en": "Nine of Pentacles"},
    {"id": 73, "name": "星币十", "name_en": "Ten of Pentacles"},
    {"id": 74, "name": "星币侍从", "name_en": "Page of Pentacles"},
    {"id": 75, "name": "星币骑士", "name_en": "Knight of Pentacles"},
    {"id": 76, "name": "星币王后", "name_en": "Queen of Pentacles"},
    {"id": 77, "name": "星币国王", "name_en": "King of Pentacles"}
]

# 创建图片目录
image_dir = "d:\\trae\\项目\\项目罗列\\塔罗\\pages\\reading\\tarot-images"
if not os.path.exists(image_dir):
    os.makedirs(image_dir)

# 下载图片
def download_image(card_id, card_name, card_name_en):
    output_path = os.path.join(image_dir, f"{card_id}.jpg")
    
    # 如果文件已存在，跳过下载
    if os.path.exists(output_path):
        print(f"{card_name} ({card_name_en}) 的图片已存在，跳过下载")
        return
    
    print(f"正在下载 {card_name} ({card_name_en}) 的图片...")
    
    try:
        # 使用Bing图片搜索
        search_query = f"tarot card {card_name_en} illustration"
        search_url = f"https://www.bing.com/images/search?q={search_query}"
        
        # 发送请求
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        response = requests.get(search_url, headers=headers)
        response.raise_for_status()
        
        # 解析HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 找到第一张图片
        image_elements = soup.find_all('img', {'class': 'mimg'})
        if not image_elements:
            # 尝试其他选择器
            image_elements = soup.find_all('img')
        
        if image_elements:
            # 获取图片URL
            image_url = image_elements[0].get('src') or image_elements[0].get('data-src')
            
            if image_url:
                # 确保URL完整
                if not image_url.startswith('http'):
                    image_url = f"https://www.bing.com{image_url}"
                
                # 下载图片
                img_response = requests.get(image_url, headers=headers)
                img_response.raise_for_status()
                
                # 保存图片
                with open(output_path, 'wb') as f:
                    f.write(img_response.content)
                
                print(f"已下载 {card_name} 的图片到 {output_path}")
            else:
                print(f"未找到 {card_name} 的图片URL")
        else:
            print(f"未找到 {card_name} 的图片元素")
            
    except Exception as e:
        print(f"下载 {card_name} 时出错: {str(e)}")
    
    # 避免请求过于频繁
    time.sleep(2)

# 下载所有牌的图片
for card in tarot_cards:
    download_image(card["id"], card["name"], card["name_en"])

print("所有图片下载完成！")