// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'node-server'   // Node 実行を想定
  }
  // バックエンドサーバー用ポート8000設定方法:
  // 1. 環境変数: PORT=8000 npm run dev
  // 2. 起動オプション: npm run dev -- --port 8000
  // 3. package.json: "dev": "nuxt dev --port 8000"
})
