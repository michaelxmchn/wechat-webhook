# 企业微信消息中转部署

## 部署步骤

### 1. Vercel部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

### 2. 绑定域名

在Vercel控制台：Settings → Domains → 添加你的域名

### 3. 配置环境变量

在Vercel控制台：Settings → Environment Variables

| 变量名 | 值 |
|--------|-----|
| LOCAL_OPENCLAW | http://你的电脑IP:18789 |
| OPENCLAW_SECRET | 你的OpenClaw密钥 |

### 4. 企业微信配置

在企业微信后台配置：
- URL: https://你的域名/api/wecom
- Token: 在OpenClaw配置中一致
- EncodingAESKey: 在OpenClaw配置中一致

## 本地测试

```bash
# 本地测试中转
vercel dev

# 测试
curl -X POST http://localhost:3000/api/wecom -H "Content-Type: application/json" -d '{}'
```
