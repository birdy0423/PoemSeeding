# 詩秧花室線上下單原型

這份原型展示乾燥花客製訂單平台的核心頁面與流程，提供前端樣式、假資料與 LocalStorage 模擬，方便確認介面與需求。未來可逐步接上 Node.js/Express + SQLite 後端與驗證機制。

## 專案結構

`
public/
├── index.html              # 首頁／品牌介紹與 CTA
├── login.html              # 會員登入
├── register.html           # 會員註冊
├── order-new.html          # 線上訂製表單（含 5 天前置檢查）
├── orders.html             # 會員訂單列表
├── order-detail.html       # 單筆訂單詳情（含時間軸）
├── admin-dashboard.html    # 業主後台總覽與 CSV 匯出
├── styles/main.css         # 全站樣式與色票
└── scripts/app.js          # LocalStorage 資料模擬與頁面邏輯
`

## 使用方式

1. 以瀏覽器開啟 public/index.html 即可預覽。
2. 系統預先種入兩組帳號（可於 pp.js 調整）：
   - 業主：owner@poemseeding.com / owner123
   - 會員：member@example.com / member123
3. 會員完成註冊→下單流程：egister.html → order-new.html → orders.html → order-detail.html
4. 業主端 dmin-dashboard.html 可檢視摘要圖卡、條件篩選、側邊欄檢視詳情、更新狀態（下拉選單）與下載 CSV（加入 BOM，避免 Excel 亂碼）。

## 測試資料

- 首次載入會自動建立預設帳號與 7 筆涵蓋全部狀態的示範訂單。
- 若 LocalStorage 已被清空，可在業主後台點選「匯入測試資料」按鈕快速補齊。
- 主要帳號：
  - 業主：owner@poemseeding.com / owner123
  - 會員：member@example.com / member123

## 管理後台重點

- 篩選條件：日期區間、狀態、關鍵字（姓名/電話/訂單編號），右側即時呈現符合筆數。
- 摘要圖卡：待確認、製作中、本週出貨、已完成即時計數。
- 訂單詳情：點選「查看」開啟側邊欄，顯示配送資訊、聯絡人、需求描述與備註。
- 狀態更新：直接於列表下拉選擇，按「儲存」即寫回 LocalStorage 並同步摘要。

## 後續開發建議

- 後端：以 Express 建立 API，採用 SQLite/Prisma 管理 users、orders、status_history 等資料表。
- 驗證：改用雜湊密碼與 session / JWT，並加上欄位驗證、速率限制。
- 上傳：補充靈感圖片或 moodboard 雲端上傳，管理端可下載。
- 通知：整合 Email / LINE Notify 發送訂單確認與狀態更新。
- UI：導入真實品牌照片，調整 RWD 與無障礙對比。

## 注意事項

- 現階段為純前端原型，資料保存在瀏覽器 LocalStorage，重新清除快取將重置。
- 訂單編號、日期檢查、運費等邏輯皆以簡化版本呈現，正式上線需與實際流程再次校對。
