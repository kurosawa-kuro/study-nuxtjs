export default defineEventHandler(async (event) => {
  // OpenAPI 3.0仕様
  const swaggerSpec = {
    openapi: '3.0.0',
    info: {
      title: 'Nuxt Backend API',
      description: 'Nuxt 3 + Nitro で構築されたバックエンドAPI',
      version: '1.0.0',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server'
      }
    ],
    paths: {
      '/api/hello': {
        get: {
          summary: 'Hello World',
          description: '簡単な挨拶メッセージを返す',
          tags: ['Basic'],
          responses: {
            '200': {
              description: '成功',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Hello World!'
                      },
                      timestamp: {
                        type: 'string',
                        format: 'date-time',
                        example: '2024-01-01T00:00:00.000Z'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
    },
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'エラーメッセージ'
            },
            code: {
              type: 'string',
              example: 'VALIDATION_ERROR'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Basic',
        description: '基本的なAPI'
      },
      {
        name: 'Users',
        description: 'ユーザー管理API'
      }
    ]
  }

  // CORSヘッダーを設定
  setHeader(event, 'Access-Control-Allow-Origin', '*')
  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization')

  return swaggerSpec
}) 