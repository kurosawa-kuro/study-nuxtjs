import { defineEventHandler, readBody, createError } from 'h3'

// メモリ内のユーザーデータ
let users = [
  { id: 1, name: 'DefaultUser' },
  { id: 2, name: 'SystemAdmin' }
]

interface CreateUserRequest {
  name: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateUserRequest>(event)
  
  if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name is required and must be a non-empty string'
    })
  }
  
  // 新しいIDを生成（既存の最大ID + 1）
  const newId = Math.max(...users.map(u => u.id)) + 1
  
  const newUser = {
    id: newId,
    name: body.name.trim()
  }
  
  users.push(newUser)
  
  return {
    message: 'User created successfully',
    user: newUser
  }
}) 