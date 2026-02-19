// 企业微信消息中转
export default async function handler(req, res) {
  // 本地OpenClaw地址
  const LOCAL_OPENCLAW = process.env.LOCAL_OPENCLAW || 'http://127.0.0.1:18789';
  const WEBHOOK_PATH = '/webhooks/wecom';
  const SECRET = process.env.OPENCLAW_SECRET;
  
  try {
    const response = await fetch(`${LOCAL_OPENCLAW}${WEBHOOK_PATH}`, {
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
    console.error('转发错误:', error);
    res.status(500).json({ error: '转发失败' });
  }
}
