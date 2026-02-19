// 企业微信消息中转
module.exports = async function handler(req, res) {
  const TARGET_URL = process.env.TARGET_URL;
  
  // 调试：返回配置状态
  if (req.query && req.query.debug) {
    return res.json({ 
      configured: !!TARGET_URL, 
      url: TARGET_URL ? '***' : null 
    });
  }
  
  if (!TARGET_URL) {
    return res.status(500).json({ 
      error: 'TARGET_URL未配置',
      solution: '在Vercel后台添加环境变量 TARGET_URL'
    });
  }
  
  try {
    // 构建目标URL
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
