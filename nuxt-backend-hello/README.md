# Nuxt 3 (Nitro) ― バックエンド API 最小サンプル

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
