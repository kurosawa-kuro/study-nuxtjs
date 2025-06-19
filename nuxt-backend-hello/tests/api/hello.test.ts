import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createApp, toNodeListener } from 'h3'
import { createServer, Server } from 'node:http'
import supertest from 'supertest'
import helloHandler from '../../server/api/hello.get'

let server: Server
let request: any // supertestの型問題を回避

describe('API: /api/hello', () => {
  beforeAll(async () => {
    // ハンドラをテスト専用 H3 インスタンスへ登録
    const app = createApp()
    app.use('/api/hello', helloHandler)
    server = createServer(toNodeListener(app)).listen()
    request = supertest(server)
  })

  afterAll(() => {
    server.close()
  })

  it('should return hello message', async () => {
    await request.get('/api/hello')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res: any) => {
        expect(res.body).toEqual({
          message: 'From Backend: Hello world'
        })
      })
  })

  it('should return correct content type', async () => {
    await request.get('/api/hello')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res: any) => {
        expect(res.body).toBeDefined()
        expect(typeof res.body).toBe('object')
      })
  })

  it('should handle GET request method', async () => {
    await request.get('/api/hello')
      .expect(200)
      .expect((res: any) => {
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('From Backend: Hello world')
      })
  })
}) 