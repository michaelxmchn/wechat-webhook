// 企业微信消息中转
module.exports = async function handler(req, res) {
  const baseUrl = 'https://communities-december-sullivan-eng.trycloudflare.com';
  
  // 使用URL对象正确拼接
  const url = new URL('/webhooks/wecom', baseUrl);
  
  // 添加查询参数
  for (const [key, value] of Object.entries(req.query)) {
    url.searchParams.append(key, value);
  }
  
  console.log('转发到:', url.toString());
  
  try {
    const response = await fetch(url.toString(), {
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
