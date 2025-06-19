了解です！プロジェクト名を **`nuxt-frontend-hello`** にして、ゼロから “Hello World” を表示するまでの最短手順をまとめ直します。

---

## 1. 雛形を作成

```bash
# ① プロジェクト生成
npx nuxi@latest init nuxt-frontend-hello
cd nuxt-frontend-hello

# ② 依存インストール
npm install          # または pnpm install / yarn
```

> ここで `nuxt-frontend-hello/` ディレクトリが作成され、
> `nuxt.config.ts`・`app.vue` など最低限のファイルが自動生成されます。

---

## 2. “Hello World” を書く

### 方法A：`app.vue` だけで完結

`app.vue`

```vue
<template>
  <div class="h-screen flex items-center justify-center">
    <h1 class="text-3xl font-bold">
      Hello World 🎉
    </h1>
  </div>
</template>
```

> *app.vue はアプリ全体の頂点レイアウト* なので、これだけで表示されます。

### 方法B：ページフォルダを使う

```bash
mkdir -p pages
```

`pages/index.vue`

```vue
<script setup>
const msg = 'Hello World 🎉'
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
```

---

## 3. 開発サーバーを起動

```bash
npm run dev          # nuxi dev が実行
# → http://localhost:3000 にアクセス
```

ブラウザに **Hello World 🎉** が出ていれば成功です。ファイル保存ごとにホットリロードされます。

---

## 4. よく使う 3 つの npm スクリプト

| コマンド              | 役割                   |
| ----------------- | -------------------- |
| `npm run dev`     | 開発サーバー (HMR 付き)      |
| `npm run build`   | 本番ビルド：`.output/` を生成 |
| `npm run preview` | ビルド成果物をローカルで試運転      |

---

### 補足 Tips

* **TypeScript**：そのまま `<script setup lang="ts">` で即利用可。
* **Tailwind CSS**：

  ```bash
  npx nuxi@latest module add tailwindcss
  ```

  で自動セットアップ完了。
* **Git 初期化**：

  ```bash
  git init && git add . && git commit -m "init nuxt-frontend-hello"
  ```

これで **`nuxt-frontend-hello`** プロジェクトの “Hello World” が完成しました。次のステップや追加機能が必要になったら、いつでもどうぞ！
