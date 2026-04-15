# 下载塔罗牌图片脚本
$tarotCards = @(
    @{id=0; nameEn="The Fool"},
    @{id=1; nameEn="The Magician"},
    @{id=2; nameEn="The High Priestess"},
    @{id=3; nameEn="The Empress"},
    @{id=4; nameEn="The Emperor"},
    @{id=5; nameEn="The Hierophant"},
    @{id=6; nameEn="The Lovers"},
    @{id=7; nameEn="The Chariot"},
    @{id=8; nameEn="Strength"},
    @{id=9; nameEn="The Hermit"},
    @{id=10; nameEn="Wheel of Fortune"},
    @{id=11; nameEn="Justice"},
    @{id=12; nameEn="The Hanged Man"},
    @{id=13; nameEn="Death"},
    @{id=14; nameEn="Temperance"},
    @{id=15; nameEn="The Devil"},
    @{id=16; nameEn="The Tower"},
    @{id=17; nameEn="The Star"},
    @{id=18; nameEn="The Moon"},
    @{id=19; nameEn="The Sun"},
    @{id=20; nameEn="Judgement"},
    @{id=21; nameEn="The World"},
    
    # 权杖系列
    @{id=22; nameEn="Ace of Wands"},
    @{id=26; nameEn="Two of Wands"},
    @{id=27; nameEn="Three of Wands"},
    @{id=28; nameEn="Four of Wands"},
    @{id=29; nameEn="Five of Wands"},
    @{id=30; nameEn="Six of Wands"},
    @{id=31; nameEn="Seven of Wands"},
    @{id=32; nameEn="Eight of Wands"},
    @{id=33; nameEn="Nine of Wands"},
    @{id=34; nameEn="Ten of Wands"},
    @{id=35; nameEn="Page of Wands"},
    @{id=36; nameEn="Knight of Wands"},
    @{id=37; nameEn="Queen of Wands"},
    @{id=38; nameEn="King of Wands"},
    
    # 圣杯系列
    @{id=23; nameEn="Ace of Cups"},
    @{id=39; nameEn="Two of Cups"},
    @{id=40; nameEn="Three of Cups"},
    @{id=41; nameEn="Four of Cups"},
    @{id=42; nameEn="Five of Cups"},
    @{id=43; nameEn="Six of Cups"},
    @{id=44; nameEn="Seven of Cups"},
    @{id=45; nameEn="Eight of Cups"},
    @{id=46; nameEn="Nine of Cups"},
    @{id=47; nameEn="Ten of Cups"},
    @{id=48; nameEn="Page of Cups"},
    @{id=49; nameEn="Knight of Cups"},
    @{id=50; nameEn="Queen of Cups"},
    @{id=51; nameEn="King of Cups"},
    
    # 宝剑系列
    @{id=24; nameEn="Ace of Swords"},
    @{id=52; nameEn="Two of Swords"},
    @{id=53; nameEn="Three of Swords"},
    @{id=54; nameEn="Four of Swords"},
    @{id=55; nameEn="Five of Swords"},
    @{id=56; nameEn="Six of Swords"},
    @{id=57; nameEn="Seven of Swords"},
    @{id=58; nameEn="Eight of Swords"},
    @{id=59; nameEn="Nine of Swords"},
    @{id=60; nameEn="Ten of Swords"},
    @{id=61; nameEn="Page of Swords"},
    @{id=62; nameEn="Knight of Swords"},
    @{id=63; nameEn="Queen of Swords"},
    @{id=64; nameEn="King of Swords"},
    
    # 星币系列
    @{id=25; nameEn="Ace of Pentacles"},
    @{id=65; nameEn="Two of Pentacles"},
    @{id=66; nameEn="Three of Pentacles"},
    @{id=67; nameEn="Four of Pentacles"},
    @{id=68; nameEn="Five of Pentacles"},
    @{id=69; nameEn="Six of Pentacles"},
    @{id=70; nameEn="Seven of Pentacles"},
    @{id=71; nameEn="Eight of Pentacles"},
    @{id=72; nameEn="Nine of Pentacles"},
    @{id=73; nameEn="Ten of Pentacles"},
    @{id=74; nameEn="Page of Pentacles"},
    @{id=75; nameEn="Knight of Pentacles"},
    @{id=76; nameEn="Queen of Pentacles"},
    @{id=77; nameEn="King of Pentacles"}
)

# 创建图片目录
$imageDir = "d:\trae\项目\项目罗列\塔罗\pages\reading\tarot-images"
if (-not (Test-Path $imageDir)) {
    New-Item -ItemType Directory -Path $imageDir -Force
}

# 下载图片
foreach ($card in $tarotCards) {
    $id = $card.id
    $nameEn = $card.nameEn
    
    Write-Host "Downloading image for $nameEn..."
    
    # 生成搜索查询
    $query = "tarot card $nameEn illustration"
    
    try {
        # 使用Bing搜索获取图片
        $searchUrl = "https://www.bing.com/images/search?q=$([System.Web.HttpUtility]::UrlEncode($query))&first=1"
        $response = Invoke-WebRequest -Uri $searchUrl -UseBasicParsing
        
        # 提取第一张图片的URL
        $imageUrl = $response.Content -match 'murl":"([^"]+)"' | ForEach-Object { $matches[1] }
        
        if ($imageUrl) {
            # 下载图片
            $outputPath = "$imageDir\$id.jpg"
            Invoke-WebRequest -Uri $imageUrl -OutFile $outputPath
            Write-Host "Downloaded to $outputPath"
        } else {
            Write-Host "No image found for $nameEn"
        }
    } catch {
        Write-Host "Error downloading $nameEn: $($_.Exception.Message)"
    }
    
    # 避免请求过于频繁
    Start-Sleep -Seconds 2
}

Write-Host "All images downloaded!"