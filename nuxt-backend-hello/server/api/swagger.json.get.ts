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
      '/api/users': {
        get: {
          summary: 'ユーザー一覧取得',
          description: '全ユーザーの一覧を取得する',
          tags: ['Users'],
          responses: {
            '200': {
              description: '成功',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      users: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/User'
                        }
                      },
                      count: {
                        type: 'integer',
                        example: 2
                      },
                      storageType: {
                        type: 'string',
                        example: 'memory-variable'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: 'ユーザー作成',
          description: '新しいユーザーを作成する',
          tags: ['Users'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: {
                      type: 'string',
                      description: 'ユーザー名',
                      example: 'NewUser'
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: '作成成功',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'User created successfully'
                      },
                      user: {
                        $ref: '#/components/schemas/User'
                      }
                    }
                  }
                }
              }
            },
            '400': {
              description: 'バリデーションエラー',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/api/users/{id}': {
        get: {
          summary: '個別ユーザー取得',
          description: '指定されたIDのユーザーを取得する',
          tags: ['Users'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ユーザーID',
              schema: {
                type: 'integer',
                example: 1
              }
            }
          ],
          responses: {
            '200': {
              description: '成功',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            },
            '400': {
              description: '無効なID',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '404': {
              description: 'ユーザーが見つかりません',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ユーザーID',
              example: 1
            },
            name: {
              type: 'string',
              description: 'ユーザー名',
              example: 'DefaultUser'
            }
          },
          required: ['id', 'name']
        },
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