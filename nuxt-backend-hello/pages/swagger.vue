<template>
  <div>
    <h1>Swagger UI</h1>
    <div id="swagger-ui"></div>
  </div>
</template>

<script setup>
// クライアントサイドでのみ実行
const { $fetch } = useNuxtApp()

// ページをクライアントサイド専用に設定
definePageMeta({
  ssr: false
})

onMounted(async () => {
  // 動的にswagger-uiをインポート
  const SwaggerUI = (await import('swagger-ui')).default
  const SwaggerUIStandalonePreset = (await import('swagger-ui/dist/swagger-ui-standalone-preset')).default

  // API仕様のURL（ローカルのAPIエンドポイント）
  const specUrl = '/api/swagger.json'

  SwaggerUI({
    url: specUrl,
    dom_id: '#swagger-ui',
    presets: [
      SwaggerUI.presets.apis,
      SwaggerUIStandalonePreset,
    ],
    layout: 'StandaloneLayout',
    deepLinking: true,
    displayOperationId: false,
    defaultModelsExpandDepth: 1,
    defaultModelExpandDepth: 1,
    defaultModelRendering: 'example',
    displayRequestDuration: true,
    docExpansion: 'list',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
  })
})
</script>

<style>
/* Swagger UIのスタイルをインポート */
@import 'swagger-ui/dist/swagger-ui.css';
</style> 