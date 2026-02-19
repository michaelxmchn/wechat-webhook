// 企业微信消息中转
module.exports = async function handler(req, res) {
  let TARGET_URL = process.env.TARGET_URL || '';
  TARGET_URL = TARGET_URL.trim();
  
  console.log('TARGET_URL:', TARGET_URL);
  
  if (!TARGET_URL) {
    return res.status(500).json({ 
      error: '请配置环境变量 TARGET_URL',
      hint: '在Vercel后台添加环境变量 TARGET_URL'
    });
  }
  
  // 确保URL格式正确
  let targetUrl = TARGET_URL;
  if (!targetUrl.startsWith('http')) {
    targetUrl = 'https://' + targetUrl;
  }
  targetUrl = targetUrl.replace(/\s+/g, '') + '/webhooks/wecom';
  
  console.log('转发到:', targetUrl);
  
  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('转发失败:', error.message);
    res.status(500).json({ 
      error: '转发失败: ' + error.message
    });
  }
};
