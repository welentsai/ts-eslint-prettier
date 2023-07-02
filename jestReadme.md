## 1. Jest 安裝

### 1.1 Jest 安裝
```shell
npm i -D jest typescript ts-jest @types/jest 
```

### 1.2 新增 jest.config.js 讓 Jest 可以編譯 TypeScript

```shell
npx ts-jest config:init
```

或

```javascript
module.exports = {
  coverageDirectory: "coverage",
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.tsx?$"
};
```

配置說明
- `coverageDirectory`：Jest 輸出的 coverage 檔案要放在哪個目錄
- `preset`：設定 preset
- `testEnvironment`：用於測試的測試環境
- `testRegex`：Jest 只執行 match 此 pattern 的測試檔案

### 1.3 package.json 新增以下內容

```json
{
  "scripts": {
    "test": "jest --coverage"
  }
}
```

### 1.4 執行測試

```shell
npm run test
```
