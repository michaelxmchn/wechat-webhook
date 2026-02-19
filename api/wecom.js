// 企业微信消息中转
module.exports = async function handler(req, res) {
  const TARGET_URL = process.env.TARGET_URL || 'https://communities-december-sullivan-eng.trycloudflare.com';
  
  console.log('收到请求:', JSON.stringify(req.query));
  console.log('Body:', JSON.stringify(req.body));
  
  try {
    let targetUrl = TARGET_URL.replace(/\/$/, '') + '/webhooks/wecom';
    const queryParams = new URLSearchParams(req.query).toString();
    if (queryParams) {
      targetUrl += '?' + queryParams;
    }
    
    console.log('转发到:', targetUrl);
    
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
