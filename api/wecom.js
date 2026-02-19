// 企业微信消息中转
module.exports = async function handler(req, res) {
  let TARGET_URL = process.env.TARGET_URL || '';
  
  // 清理URL，去除空格和多余字符
  TARGET_URL = TARGET_URL.trim().replace(/\s+/g, '');
  
  if (!TARGET_URL) {
    return res.status(500).json({ error: 'TARGET_URL未配置' });
  }
  
  // 确保URL格式正确
  if (!TARGET_URL.startsWith('http')) {
    TARGET_URL = 'https://' + TARGET_URL;
  }
  
  // 正确的URL拼接
  const baseUrl = TARGET_URL.replace(/\/$/, '');
  let targetUrl = baseUrl + '/webhooks/wecom';
  
  // 添加查询参数
  const params = new URLSearchParams(req.query).toString();
  if (params) {
    targetUrl += '?' + params;
  }
  
  console.log('最终URL:', targetUrl);
  
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
