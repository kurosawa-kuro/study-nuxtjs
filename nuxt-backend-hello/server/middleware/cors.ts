import { defineEventHandler, setResponseHeaders, setResponseStatus } from 'h3'

export default defineEventHandler((event) => {
  // CORS headers
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true'
  })

  // Handle preflight requests
  if (event.method === 'OPTIONS') {
    setResponseStatus(event, 200)
    return 'OK'
  }
}) 