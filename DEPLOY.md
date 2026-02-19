# 一键部署指南

## 部署步骤

### 第一步：一键部署

点击下方按钮：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/michaelxmchn/wechat-webhook)

### 第二步：配置环境变量

在Vercel项目设置中添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| TARGET_URL | 你手动输入的公网地址 | 见下方说明 |
| OPENCLAW_SECRET | 你的OpenClaw密钥 | 可选 |

#### 获取 TARGET_URL

**方案A：使用Cloudflare Tunnel（当前运行中）**
```
https://communities-december-sullivan-eng.trycloudflare.com
```

**方案B：使用你自己的域名**
```
https://ai.你的域名.com
```

### 第三步：域名配置（如果你有自己的域名）

1. 在Vercel后台：Settings → Domains
2. 添加你的域名（如：ai.yourdomain.com）
3. 在域名DNS服务商添加记录：

| 类型 | 名称 | 值 |
|------|------|-----|
| CNAME | ai | cname.vercel-dns.com |

### 第四步：企业微信配置

在企业微信后台配置：
- URL: `https://你的域名/api/wecom`
- Token: 在OpenClaw配置中设置
- EncodingAESKey: 在OpenClaw配置中设置

---

## 你是域名所有者，需要做的

### 1. 域名DNS配置

在域名服务商（阿里云/腾讯云等）添加DNS记录：

| 类型 | 主机记录 | 记录值 |
|------|----------|---------|
| CNAME | ai | cname.vercel-dns.com |

### 2. 域名备案

确保你的域名已在国内备案（企业微信要求）

### 3. 验证域名

Vercel可能需要验证域名所有权，按提示操作即可

---

## 完整流程图

```
你操作：
1. Vercel一键部署
2. 配置TARGET_URL
3. (可选)绑定自己的域名
4. 配置企业微信

企业微信用户：
发送消息 → 你的域名/api/wecom → Vercel中转 → Cloudflare Tunnel → 你的电脑OpenClaw
```

---

## 待实现功能：自定义权限命令

### 功能需求

- 群内不同人不同权限
- 有的可以保存文件
- 有的可以检阅文件
- 有的可以上传产品

### 状态：待开发
