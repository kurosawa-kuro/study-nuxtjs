import { defineEventHandler, getRouterParam, createError } from 'h3'

// メモリ内のユーザーデータ
let users = [
  { id: 1, name: 'DefaultUser' },
  { id: 2, name: 'SystemAdmin' }
]

export default defineEventHandler((event) => {
  const idParam = getRouterParam(event, 'id')
  
  if (!idParam) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    })
  }
  
  const id = parseInt(idParam)
  
  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid user ID'
    })
  }
  
  const user = users.find(u => u.id === id)
  
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }
  
  return user
}) 