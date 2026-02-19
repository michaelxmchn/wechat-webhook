// 企业微信消息中转 - 纯Node.js
module.exports = async function handler(req, res) {
  const TARGET_URL = process.env.TARGET_URL;
  const SECRET = process.env.OPENCLAW_SECRET;
  
  if (!TARGET_URL) {
    return res.status(500).json({ 
      error: '请配置环境变量 TARGET_URL'
    });
  }
  
  try {
    const response = await fetch(`${TARGET_URL}/webhooks/wecom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OpenClaw-Secret': SECRET || ''
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '转发失败' });
  }
};
