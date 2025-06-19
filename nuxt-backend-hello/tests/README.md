# API Tests (Supertest版)

このディレクトリには、Nuxt.jsバックエンドAPIのテストファイルが含まれています。
**Supertest**を使用して、外部サーバー不要の高速テストを実現しています。

## テスト構成

```
tests/
├── api/                    # APIエンドポイントテスト
│   └── hello.test.ts      # /api/hello エンドポイントテスト（Supertest）
├── integration/           # 統合テスト
│   └── api.test.ts       # API統合テスト（Supertest + CORS）
├── setup.ts              # テスト環境セットアップ
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
**特徴**: 外部サーバー不要、高速実行

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
- **外部サーバー完全不要**
- 高速テスト実行
- カバレッジレポート生成

### CI環境での利点
- ✅ **外部サーバー完全不要**
- ✅ **高速実行**（Supertest使用）
- ✅ **再現可能なテスト環境**
- ✅ **並列実行対応**
- ✅ **リソース効率**

## テスト内容

### API Tests (`api/hello.test.ts`)
- レスポンス形式の検証
- Content-Typeの確認
- HTTPメソッドの検証
- OPTIONSリクエスト（CORS）の検証

### Integration Tests (`integration/api.test.ts`)
- CORS設定の検証
- JSONレスポンス形式の確認
- 同時リクエスト処理の検証
- CORSヘッダーの確認

## 技術スタック

### テストフレームワーク
- **Vitest**: 高速なテストランナー
- **Supertest**: HTTPアサーションライブラリ
- **H3**: 軽量HTTPフレームワーク

### テスト手法
- **EventHandler直接注入**: NitroのEventHandlerを直接テスト
- **メモリ内サーバー**: 外部プロセス不要
- **CORS統合テスト**: ミドルウェアとAPIの統合テスト

## 環境設定

### 開発環境
- ポート: 8000（開発時のみ）
- 環境: Node.js
- テストフレームワーク: Vitest + Supertest

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

### TypeScriptエラー
```bash
# 型定義の再生成
npm run postinstall
```

### テスト実行エラー
```bash
# キャッシュクリア
npm run test -- --reporter=verbose
```

## Supertestの利点

| 項目 | 従来のfetch | Supertest |
|------|-------------|-----------|
| 外部サーバー | 必要 | 不要 |
| 実行速度 | 遅い | 高速 |
| CI/CD | 複雑 | シンプル |
| デバッグ | 困難 | 容易 |
| リソース使用 | 多い | 少ない | 