// 企业微信消息中转
// 部署时可配置环境变量

export default async function handler(req, res) {
  // 从环境变量获取配置（部署时填写）
  const TARGET_URL = process.env.TARGET_URL;
  const SECRET = process.env.OPENCLAW_SECRET;
  
  if (!TARGET_URL) {
    return res.status(500).json({ 
      error: '请配置环境变量 TARGET_URL',
      message: '在Vercel后台添加环境变量 TARGET_URL'
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
    return res.status(200).json(data);
  } catch (error) {
    console.error('转发错误:', error);
    return res.status(500).json({ error: '转发失败: ' + error.message });
  }
}
