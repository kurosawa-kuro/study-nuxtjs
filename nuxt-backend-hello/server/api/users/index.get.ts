import { defineEventHandler, createError } from 'h3'
import { userStorage } from '~/server/utils/userStorage'

export default defineEventHandler(() => {
  // 環境変数STORAGE_TYPEを確認
  const storageType = userStorage.getStorageType()
  
  if (storageType !== 'memory-variable') {
    throw createError({
      statusCode: 500,
      statusMessage: 'Storage type not supported'
    })
  }
  
  return {
    users: userStorage.getAllUsers(),
    count: userStorage.getCount(),
    storageType
  }
}) 