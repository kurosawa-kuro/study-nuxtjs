import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
    return { message: 'From Backend: Hello world' }
  })