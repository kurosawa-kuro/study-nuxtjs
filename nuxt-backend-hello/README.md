# Nuxt Backend Hello

バックエンドサーバー用のNuxt.jsアプリケーション

## ポート8000設定方法

このアプリケーションはバックエンドサーバー用にポート8000で動作するように設定されています。

### 設定済みの方法

1. **package.json設定済み**: `"dev": "nuxt dev --port 8000"`
   ```bash
   npm run dev
   ```

### その他の設定方法

2. **環境変数を使用**:
   ```bash
   PORT=8000 npm run dev
   ```

3. **起動オプションを使用**:
   ```bash
   npm run dev -- --port 8000
   ```

## 起動方法

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動（ポート8000）
npm run dev
```

## API エンドポイント

- `GET /api/hello` - Hello worldメッセージを返す

## アクセス方法

開発サーバー起動後、以下のURLでアクセス可能です：

- フロントエンド: http://localhost:8000
- API: http://localhost:8000/api/hello

# Nuxt 3 (Nitro) ― バックエンド API 最小サンプル

> **プロジェクト名:** `nuxt-backend-hello`
>
> 目的: `GET /api/hello` に `{ message:"Hello world" }` を返すだけの軽量 API サーバー

---

## 1. プロジェクト作成

```bash
npx nuxi@latest init nuxt-backend-hello
cd nuxt-backend-hello
npm install          # pnpm / yarn でも可
```

> *Nuxt UI やページは不要* なので `app.vue` は削除して構いません。

---

## 2. API ルートを実装

`server/api/hello.get.ts`

```ts
export default defineEventHandler(() => {
  return { message: 'Hello world' }
})
```

*ファイル名で HTTP メソッドを示す (`.get.ts`, `.post.ts` …)*

---

## 3. nuxt.config.ts（ほぼデフォルト）

```ts
export default defineNuxtConfig({
  nitro: {
    preset: 'node-server',   // Node 実行を想定
    port: 3000               // 任意
  }
})
```

---

## 4. 起動方法

### 開発モード

```bash
npm run dev     # http://localhost:3000/api/hello
```

### 本番ビルド & 実行

```bash
npm run build                # .output/ が生成
node .output/server/index.mjs
```

---

## 5. 動作確認

```bash
curl http://localhost:3000/api/hello
# => {"message":"Hello world"}
```

---

### 参考 Tips

| 目的        | やること                                                    |
| --------- | ------------------------------------------------------- |
| エンドポイント追加 | `server/api/users/[id].get.ts` などファイルを追加するだけ            |
| POST 受信   | `.post.ts` にして `await readBody(event)` を使う              |
| CORS 対応   | `server/middleware/cors.ts` を置き `setResponseHeader` で許可 |
| デプロイ      | `nitro preset=node-server` なら Dockerfile 1 枚で完結         |

これで **Nitro API サーバー「nuxt-backend-hello」** の Hello world が完成です。
