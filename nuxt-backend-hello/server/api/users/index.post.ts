import { defineEventHandler, readBody, createError } from 'h3'
import { userStorage, CreateUserRequest } from '~/server/utils/userStorage'

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateUserRequest>(event)
  
  if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name is required and must be a non-empty string'
    })
  }
  
  const newUser = userStorage.createUser(body.name)
  
  return {
    message: 'User created successfully',
    user: newUser
  }
}) 