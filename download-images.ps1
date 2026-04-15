# 塔罗牌图片URL列表
$imageUrls = @(
    "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Tarot_06_Lovers.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/1/11/Wands01.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/3/36/Cups01.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/1/1a/Swords01.jpg"
    "https://upload.wikimedia.org/wikipedia/commons/f/fd/Pents01.jpg"
)

# 确保目标目录存在
$targetDir = "pages/reading/tarot-images"
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force
}

# 下载图片
for ($i = 0; $i -lt $imageUrls.Length; $i++) {
    $url = $imageUrls[$i]
    $filename = "$i.jpg"
    $outputPath = Join-Path $targetDir $filename
    
    try {
        Write-Host "Downloading image $i..."
        Invoke-WebRequest -Uri $url -OutFile $outputPath
        Write-Host "  ✓ Downloaded: $filename"
    } catch {
        Write-Host "  ✗ Failed to download image $i"
        Write-Host "  Error: $($_.Exception.Message)"
    }
    
    # 添加延迟，避免请求频率过高
    Start-Sleep -Seconds 2
}

Write-Host "\nDownload completed!"
Write-Host "Images saved to: $targetDir"