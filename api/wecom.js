// 企业微信消息中转 - 硬编码版本
module.exports = async function handler(req, res) {
  // 硬编码URL
  const baseUrl = 'https://communities-december-sullivan-eng.trycloudflare.com';
  
  // 构建目标URL
  let targetUrl = baseUrl + '/webhooks/wecom';
  
  // 添加查询参数
  const params = new URLSearchParams(req.query).toString();
  if (params) {
    targetUrl += '?' + params;
  }
  
  console.log('转发到:', targetUrl);
  
  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    console.error('转发失败:', error.message);
    res.status(500).json({ error: '转发失败: ' + error.message });
  }
};
