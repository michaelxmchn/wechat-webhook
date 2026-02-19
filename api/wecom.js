// 企业微信消息中转
module.exports = async function handler(req, res) {
  const baseUrl = 'https://communities-december-sullivan-eng.trycloudflare.com';
  const path = '/webhooks/wecom';
  
  // 构建查询字符串
  const queryKeys = Object.keys(req.query);
  let queryString = '';
  if (queryKeys.length > 0) {
    queryString = '?' + queryKeys.map(k => `${k}=${encodeURIComponent(req.query[k])}`).join('&');
  }
  
  const targetUrl = baseUrl + path + queryString;
  
  console.log('URL:', targetUrl);
  
  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: '转发失败: ' + error.message });
  }
};
