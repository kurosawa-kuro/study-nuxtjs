# API Tests

このディレクトリには、Nuxt.jsバックエンドAPIのテストファイルが含まれています。

## テスト構成

```
tests/
├── api/                    # APIエンドポイントテスト
│   └── hello.test.ts      # /api/hello エンドポイントテスト
├── integration/           # 統合テスト
│   └── api.test.ts       # API統合テスト
├── setup.ts              # テスト環境セットアップ（サーバー自動起動）
├── types.d.ts            # テスト用型定義
├── run-tests.sh          # テスト実行スクリプト
└── api.http              # HTTPリクエストテスト（REST Client）
```

## 実行方法

### 1. 依存関係のインストール
```bash
npm install
```

### 2. テスト実行

#### 全テスト実行（推奨）
```bash
npm test
```
**注意**: テスト環境が自動でNuxt.jsサーバーを起動します

#### APIテストのみ実行
```bash
npm run test:api
```

#### UI付きテスト実行
```bash
npm run test:ui
```

#### カバレッジ付きテスト実行
```bash
npm run test:coverage
```

#### スクリプト実行
```bash
./tests/run-tests.sh
```

### 3. HTTPリクエストテスト
VS CodeのREST Client拡張機能を使用して`api.http`ファイルを実行できます。

## CI/CD環境

### GitHub Actions
`.github/workflows/test.yml`でCI/CDが設定されています。

**特徴:**
- Node.js 18.x, 20.xでテスト実行
- 自動でサーバー起動・停止
- カバレッジレポート生成
- Codecov連携

### CI環境での利点
- ✅ 外部サーバー不要
- ✅ 自動でサーバー起動・停止
- ✅ 再現可能なテスト環境
- ✅ 並列実行対応

## テスト内容

### API Tests (`api/hello.test.ts`)
- レスポンス形式の検証
- Content-Typeの確認
- HTTPメソッドの検証

### Integration Tests (`integration/api.test.ts`)
- CORS設定の検証
- JSONレスポンス形式の確認
- 同時リクエスト処理の検証

## 環境設定

### 開発環境
- ポート: 8000
- 環境: Node.js
- テストフレームワーク: Vitest

### CORS設定
- 許可オリジン: `http://localhost:3000`
- 許可メソッド: GET, POST, PUT, DELETE, OPTIONS
- 許可ヘッダー: Content-Type, Authorization

## トラブルシューティング

### 依存関係エラー
```bash
npm install
npm run postinstall
```

### ポート競合
```bash
# 別のポートでテスト実行
PORT=8001 npm run test:api
```

### TypeScriptエラー
```bash
# 型定義の再生成
npm run postinstall
```

### サーバー起動エラー
```bash
# 手動でサーバー起動してテスト
npm run dev &
sleep 5
npm test
``` 