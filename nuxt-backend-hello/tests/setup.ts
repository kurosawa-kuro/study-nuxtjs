import { beforeAll, afterAll } from 'vitest'

// テスト環境のセットアップ
beforeAll(async () => {
  console.log('🧪 Test environment setup complete (using supertest)')
})

// テスト終了後のクリーンアップ
afterAll(async () => {
  console.log('🧹 Test cleanup complete')
}) 