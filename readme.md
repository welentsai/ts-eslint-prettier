## 1. 初始化 Node.js

### 1.1 NPM init - 建立 Node.js project package.json

```shell
# initial a empty NPM project
npm init -y
```

### 1.2. 安裝 TypeScript

```shell
npm i -D typescript
```

### 1.3. 加入 node.d.ts

```shell
npm i -D @types/node
```

### 1.4. 加入 TypeScript 的設定檔 tsconfig.json

```shell
npx tsc --init
```

### 1.5. default tsconfig.json configuration

```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "outDir": "dist",
    "sourceMap": true
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

It tells the compiler to

- use `es2018` syntax when generating the distributable
- use the `commonjs` module format.
- generate *.js to `/dist` folder
- generate source map
- include all *.ts file inside `/src` folder
- exclude all files inside `/node_modules` folder

## 2. 建立開發環境 Live Compile + Run

### 2.1 加入實時編譯模組 ts-node

```shell
npm i -D ts-node
```

### 2.2 加入 nodemon

```shell
npm i -D nodemon
```

### 2.3 將script 設定加入 package.json

```shell
"scripts": {
    "start": "npm run build:live",
    "build:live": "nodemon --exec ./node_modules/.bin/ts-node -- ./index.ts",
    "build": "tsc index.ts"
},
```

### 2.4 通過 `npm run start` 進行開發

### 2.5 Production  編譯 js `npm run build`

## 3. ESlint 環境建置

### 3.1 安裝 ESlint dependencies

```shell
npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### 3.2 產生 `.eslintrc`

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {}
}
```

It tells the ESLint linter to:

- use Typescript parser
- use `Recommended Typescript preset` for linting
- use `ES2018` and `module` sourceType to match ts.config settings

### 3.3 修改 `package.json`

```json
{
  "scripts": {
    "lint": "eslint src/**/*.ts",
    "format": "eslint src/**/*.ts --fix"
  }
}
```

## 4. Prettier

### 4.1 安裝 prettier

```shell
npm i -D prettier
```

### 4.2 產生 prettier 設定檔 `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 120,
  "tabWidth": 2
}
```

The setting let Prettier to

- Ensure semi colon at the end of each statement
- Ensure trailing comma at the end of each statement
- Convert all double quotes to single quotes where applicable
- Break into new lines for all lines greater than 120 characters wide
- Ensure tab width is 2 characters

## 5. Vitest

### 5.1 安裝 Vitest

```shell
npm install -D vitest
```

### 5.2 Writing tests

```typescript
// sum.test.js
import {expect, test} from 'vitest'

test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3)
})
```

### 5.3 修改 package.json

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

### 5.4 Run Tests

```
npm run test
```

### 5.5 Config Vitest

在 root 新增 `vite.config.ts`

新增以下程式片段

```typescript
import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        // ...
    },
})
```

### 5.6 Coverage

安裝 coverage-v8

```shell
npm i -D @vitest/coverage-v8
```

package.json 新增

```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

## Remark

- `nodemon` 用來監察檔案的改變
- `ts-node` 通過 `tsconfig.json` 的設定，對 **index.ts** 進行自動編譯成為 js