## 1. Pact-Jest 安裝

### 1.1 Pact-Jest 安裝

```shell
npm i -D jest-pact
```

### 1.2 執行 pact test with jest

```shell
npm t client.pact.spec
```

## Remark - Consumer Contract Tests - (client.pact.spec.ts)

1. Require or Import the `pactWith` object

```shell
import {pactWith} from 'jest-pact';
```

2. Setup the mock provider and register the interactions that it is expecting to receive

```typescript
provider.addInteraction({
  state: 'Server is healthy',
  ...healthRequest,
  willRespondWith: healthyResponse,
});
```

3. Run the consumer tests

```shell
npm t client.pact.spec
```

4. Generate the contract
   > pact file (合約) 會自動產生在 `pact` 資料夾
