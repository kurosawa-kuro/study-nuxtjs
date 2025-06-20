import { defineEventHandler } from 'h3'
import { createError } from 'h3'

// メモリ内のユーザーデータ
let users = [
  { id: 1, name: 'DefaultUser' },
  { id: 2, name: 'SystemAdmin' }
]

export default defineEventHandler(() => {
  // 環境変数STORAGE_TYPEを確認
  const storageType = process.env.STORAGE_TYPE || 'memory-variable'
  
  if (storageType !== 'memory-variable') {
    throw createError({
      statusCode: 500,
      statusMessage: 'Storage type not supported'
    })
  }
  
  return {
    users,
    count: users.length,
    storageType
  }
}) 