// 企业微信消息中转
module.exports = async function handler(req, res) {
  const TARGET_URL = process.env.TARGET_URL;
  
  console.log('收到请求, TARGET_URL:', TARGET_URL);
  
  if (!TARGET_URL) {
    console.error('未配置TARGET_URL');
    return res.status(500).json({ 
      error: '请配置环境变量 TARGET_URL',
      hint: '在Vercel后台添加环境变量 TARGET_URL'
    });
  }
  
  try {
    const targetUrl = `${TARGET_URL}/webhooks/wecom`;
    console.log('转发到:', targetUrl);
    
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    console.log('转发成功:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('转发失败:', error.message);
    res.status(500).json({ 
      error: '转发失败: ' + error.message,
      target: TARGET_URL
    });
  }
};
