// 企业微信消息中转
module.exports = async function handler(req, res) {
  const TARGET_URL = process.env.TARGET_URL || 'https://communities-december-sullivan-eng.trycloudflare.com';
  
  try {
    // 构建目标URL，包含查询参数
    let targetUrl = TARGET_URL.replace(/\/$/, '') + '/webhooks/wecom';
    
    // 构建查询字符串
    const queryParams = new URLSearchParams(req.query).toString();
    if (queryParams) {
      targetUrl += '?' + queryParams;
    }
    
    console.log('转发到:', targetUrl);
    console.log('Body:', JSON.stringify(req.body));
    
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.text();
    console.log('响应:', data);
    res.status(200).send(data);
  } catch (error) {
    console.error('转发失败:', error.message);
    res.status(500).json({ error: '转发失败: ' + error.message });
  }
};
