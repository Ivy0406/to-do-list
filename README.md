  # <center><img src="/public/favicon.png" width="32"> 黃黃的 To-Do List</center>

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.1-CA4245?logo=react-router)](https://reactrouter.com/)


這是一個以 React 開發的 SPA（單頁式應用程式）Online To-Do List，透過 Axios 串接 RESTful API 實現 JWT 會員驗證與任務 CRUD。介面設計以清新直覺為主，提供使用者流暢即時的操作回饋。

設計稿來源：[Figma Design Link](https://www.figma.com/design/MFSk8P5jmmC2ns9V9YeCzM/TodoList?node-id=0-1&t=Ybvlt859yBpx8n1G-1)

---
## 👀 專案預覽 
![登入頁](/public/preview-sign-in.png)
![註冊頁](/public/preview-sign-up.png)
![待辦事項列表頁](/public/preview-list.png)


---

## 🛠 使用技術 

* **核心框架**：React 19.2
* **建構工具**：Vite 7.2 
* **樣式處理**：Tailwind CSS 4.1
* **路由管理**：React Router 7.11
* **HTTP 請求**：Axios 1.13
* **身份驗證**：js-cookie
* **提示與互動**：sweetalert2

---

## 📂 專案架構 

```text
to-do-list/
├─ .github/
│  └─ workflows/     
|   # GitHub Actions 自動部署腳本
├─ public/           
|   # 公開靜態資源 (Favicon, 預覽圖片)
├─ src/
│  ├─ api/           
|  |  # API 請求管理
│  ├─ assets/        
|  |  # 專案資源 (Vite 建置處理)
│  ├─ components/    
|  |  # 元件庫
│  │  ├─ shared/        
|  |  |  # 共用元件庫 (主視覺、錯誤訊息、表單輸入欄、Loading畫面)
│  │  ├─ sign-in/       
|  |  |  # 登入功能相關組件
│  │  ├─ sign-up/       
|  |  |  # 註冊功能相關組件
│  │  └─ todo-list/     
|  |     # 待辦清單核心組件
│  ├─ hooks/         
|  |  # Custom Hooks (業務邏輯層)
│  ├─ images/        
|  |  # 圖片素材存放區
│  ├─ App.jsx        
|  |  # 應用程式主路由與結構配置
│  ├─ main.jsx       
|  |  # React 應用程式入口點 (Entry Point)
│  └─ index.css      
|     # 全域樣式與 Tailwind CSS 引入
├─ .env              # 環境變數設定 (API URL 等)
├─ .env.example      # 環境變數範本 (供協作參考)
├─ eslint.config.js  # ESLint 程式碼檢查設定
├─ vite.config.js    # Vite 打包工具配置
└─ package.json      # 專案依賴與腳本管理

```

## 🚀 啟動專案 
請確認電腦已安裝 Node.js v.20.19.0 以上。

```
npm install
npm run dev
```


## 🤝 協作規範
🌱 **分支命名規範**

類別  | 用途                        | 範例 
---------------|-----------------------------------|----------------------------
feature/       | 新增功能                           | feature/[branch-name]
update/        | 更新、優化（UI & UX、改文案）         | update/[branch-name]
fix/           | 修復 Bug                           | fix/[branch-name]
hotfix/        | 修復重大 Bug                        | hotfix/[branch-name]
chore/         | 初始化專案或環境建置 (npm 安裝)       | chore/[branch-name]

💬 **Commit 訊息規範**
* 用「 類別 : 做的事」
* 「：」後面要空格後，再打要做的事。


類別  | 用途 
---------------|------------------------------------------------------------
feat           | 新增功能 
update         | 修改既有項目或功能（UI / UX 微調、既有功能的行為優化）
fix            | 修復 Bug 
style          | 格式、風格（不影響程式碼運行的變動，如空白鍵、分號等）
perf           | 改善效能 
chore          | 建構程序或輔助工具的變動（如：npm 安裝、文件更新）
refactor       | 重構（既不是修復 Bug 也不是新增功能的程式碼變動）



---