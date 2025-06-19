import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createApp, toNodeListener } from 'h3'
import { createServer, Server } from 'node:http'
import supertest from 'supertest'
import helloHandler from '../../server/api/hello.get'
import corsMiddleware from '../../server/middleware/cors'

let server: Server
let request: any // supertestの型問題を回避

describe('API Integration Tests', () => {
  beforeAll(async () => {
    // ハンドラとCORSミドルウェアをテスト専用 H3 インスタンスへ登録
    const app = createApp()
    app.use(corsMiddleware) // CORSミドルウェアを先に登録
    app.use('/api/hello', helloHandler)
    server = createServer(toNodeListener(app)).listen()
    request = supertest(server)
  })

  afterAll(() => {
    server.close()
  })

  it('should handle CORS headers correctly', async () => {
    await request.options('/api/hello')
      .set('Origin', 'http://localhost:3000')
      .set('Access-Control-Request-Method', 'GET')
      .set('Access-Control-Request-Headers', 'Content-Type')
      .expect(200)
      .expect('OK')
  })

  it('should return proper JSON response', async () => {
    await request.get('/api/hello')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res: any) => {
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toBe('string')
      })
  })

  it('should handle multiple concurrent requests', async () => {
    const promises = Array.from({ length: 5 }, () => 
      request.get('/api/hello').expect(200)
    )
    
    const responses = await Promise.all(promises)
    
    responses.forEach((res: any) => {
      expect(res.body).toEqual({
        message: 'From Backend: Hello world'
      })
    })
  })

  it('should include CORS headers in response', async () => {
    await request.get('/api/hello')
      .set('Origin', 'http://localhost:3000')
      .expect(200)
      .expect('Access-Control-Allow-Origin', 'http://localhost:3000')
      .expect('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  })
}) 