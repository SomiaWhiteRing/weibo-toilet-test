# 冲浪高手检测器 (Weibo Surfing Master Detector)

这是一个用于检测微博用户"冲浪水平"的浏览器脚本。通过分析用户的发言中包含的特定关键词，生成可视化的统计结果。

## 功能特点

- 🔍 自动检测用户微博内容中的特定关键词
- 📊 生成清晰的数据可视化图表
- 🎯 支持超过100个预设关键词
- 💫 优雅的动画和现代化UI设计
- 🛡️ 内置请求频率控制和错误处理机制

## 安装方法

### 方法一：直接使用

1. 安装 Tampermonkey 浏览器扩展
2. 点击[这里](https://greasyfork.org/zh-CN/scripts/520371)安装脚本

### 方法二：手动安装

1. 安装 Tampermonkey 浏览器扩展
2. 创建新脚本
3. 复制 `toilet-userscript.js` 中的内容到新脚本中
4. 保存即可使用

## 使用方法

1. 访问任意微博用户主页
2. 在用户头像旁边会出现一个 🚽 图标
3. 点击图标开始检测
4. 等待检测完成后会显示分析结果

## 技术栈

- JavaScript (ES6+)
- Chart.js - 数据可视化
- Tampermonkey API

## 开发相关

### 调试模式

在 `toilet-userscript.js` 中设置：
```javascript
const DEBUG_MODE = true;
```

### 自定义关键词

可以在 `words` 数组中添加或修改关键词。

## 注意事项

- 请合理使用，避免频繁请求导致IP被限制
- 该脚本仅供学习和娱乐使用
- 请遵守微博相关使用条款

## License

MIT License

## 贡献指南

欢迎提交 Issue 和 Pull Request！
