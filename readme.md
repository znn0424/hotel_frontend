# 酒店房态前端系统（Vite + Vue3 + TypeScript + Element Plus）
> 本项目为 Vite+Vue3+TS 前端项目，包含**脚手架快速创建**、**手动从零搭建**两套方案，记录完整开发流程、文件作用、依赖导入与常见踩坑。

## 技术栈
- 构建工具：Vite
- 框架：Vue3
- 语言：TypeScript
- UI库：Element Plus
- 网络请求：Axios

---

项目创建方式
> ✅【推荐】脚手架创建（工作/练习首选，自动生成全部配置，减少踩坑）


```powershell
# 1. 创建vue+ts模板项目
npm create vite@latest hotel-front -- --template vue-ts

# 2. 进入项目文件夹
cd hotel-front

# 3. 安装自带基础依赖(vue/vite/ts)
npm install

# 4. 安装第三方业务依赖
npm install element-plus axios


# import 'element-plus/dist/index.css' 的作用是引入 Element Plus 的全局样式，让 el-button、el-card、el-form 等组件正常显示。

## Axios
Axios 是前端HTTP请求库，用于Vue前端和FastAPI后端通信，负责传递JSON数据。

npm install axios
