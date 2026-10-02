# 拔河出陣

靜態網頁：從 `players.json` 讀 20 人體重，算出總重不超過 800 kg 的最重名單。

## 使用

1. 編輯 `players.json`（姓名 + 體重，體重精度 0.1 kg）。
2. 瀏覽器不讓網頁直接讀本機檔案，所以要在這個資料夾開一個 http 伺服器：

   ```
   python -m http.server
   ```

   然後開 <http://localhost:8000>。
   或在 GitHub 開 Pages（Settings → Pages → Branch: `main`），
   網址會是 <https://changshenghsun.github.io/tug_of_war/>。

## 操作

- **鎖定**：這個人一定上場；其餘名額用 800 − 鎖定總重 去算。
- **休息**：這一輪不上場。
- **出陣**：顯示名單與總重。改了任何人的狀態後名單會清掉，再按一次即可。

## 演算法

價值＝重量的 0/1 背包，就是子集合和（subset sum）。
`pick.js` 以 0.1 kg 為單位做動態規劃：20 人 × 8000 格，瞬間完成。

## 測試

```
node --test
```

（或 `./run_tests.sh`）
