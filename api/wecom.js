// 企业微信消息中转
module.exports = async function handler(req, res) {
  // 硬编码测试
  const TARGET_URL = process.env.TARGET_URL || 'https://communities-december-sullivan-eng.trycloudflare.com';
  
  try {
    let targetUrl = TARGET_URL.replace(/\/$/, '') + '/webhooks/wecom';
    
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: '转发失败: ' + error.message });
  }
};
