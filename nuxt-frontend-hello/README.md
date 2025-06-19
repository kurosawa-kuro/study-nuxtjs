# Nuxt 3 "Hello World" 最短セットアップ (プロジェクト名: **nuxt-frontend-hello**)

---

## 1. 雛形を作成

```bash
# ① プロジェクト生成
npx nuxi@latest init nuxt-frontend-hello
cd nuxt-frontend-hello

# ② 依存インストール
npm install              # または pnpm / yarn
```

生成される主なファイル : `nuxt.config.ts`, `app.vue`, `package.json` など。

---

## 2. Tailwind CSS を導入 (ダークモード対応)

```bash
npx nuxi@latest module add tailwindcss
```

自動で行われること:

* `devDependency` に `tailwindcss` 追加
* `@nuxtjs/tailwindcss` を `nuxt.config.ts` の `modules` に追記
* `tailwind.config.ts`, `assets/css/tailwind.css` を生成

> `tailwind.config.ts` には既定で `darkMode: 'class'` がセットされています。

一度サーバーを再起動してください。

---

## 3. “Hello World” を表示

### 3‑A. `app.vue` だけで完結（最速）

```vue
<template>
  <div class="h-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
      Hello&nbsp;World&nbsp;🎉
    </h1>
  </div>
</template>
```

### 3‑B. ページフォルダ版（`pages/index.vue`）

```vue
<script setup>
const msg = 'Hello World 🎉';
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
```

---

## 4. 開発サーバーを起動

```bash
npm run dev    # => http://localhost:3000
```

* `<html class="dark">` を付けるか OS をダークモードにすると背景がダークになります。
* ファイル保存ごとにホットリロード。

---

## 5. よく使う npm スクリプト

| コマンド              | 目的                    |
| ----------------- | --------------------- |
| `npm run dev`     | 開発サーバー (HMR)          |
| `npm run build`   | 本番ビルド (`.output/` 作成) |
| `npm run preview` | ビルド成果物をローカル実行         |

---

## 6. レイアウトを“少し上寄り”に調整したい場合

```vue
<template>
  <div class="h-screen flex justify-start items-center pt-32 bg-white dark:bg-gray-900">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
      Hello&nbsp;World&nbsp;🎉
    </h1>
  </div>
</template>
```

* `justify-start` : 縦方向を上寄せ
* `pt-32` : 約 8 rem (=128 px) の上余白

---

## 7. トラブルシューティング

| 症状                | 確認ポイント                                                                 |
| ----------------- | ---------------------------------------------------------------------- |
| 画面が中央寄せにならない      | Tailwind クラス (`flex items-center justify-center h-screen`) に typo がないか |
| 背景が白のまま           | `<!doctype html><html class="dark">` になっているか／ブラウザ側ダークテーマ設定             |
| Tailwind が読み込まれない | DevTools Network で `tailwind.css` が 200 になっているか／モジュール設定漏れ              |

---

### これで “Hello World” の Nuxt 3 フロントが完成です！

次のステップ例:

1. ルーティング / レイアウトの追加
2. pinia で状態管理
3. バックエンドとの通信 (`useFetch`, GraphQL など)

気になる部分があれば随時アップデートしてください 💡
