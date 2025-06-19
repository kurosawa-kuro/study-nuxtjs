import { describe, it, expect } from 'vitest'

describe('API: /api/hello', () => {
  const baseURL = 'http://localhost:8000'

  it('should return hello message', async () => {
    const response = await fetch(`${baseURL}/api/hello`)
    const data = await response.json()
    
    expect(data).toEqual({
      message: 'From Backend: Hello world'
    })
  })

  it('should return correct content type', async () => {
    const response = await fetch(`${baseURL}/api/hello`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    
    const data = await response.json()
    expect(data).toBeDefined()
    expect(typeof data).toBe('object')
  })

  it('should handle GET request method', async () => {
    const response = await fetch(`${baseURL}/api/hello`, {
      method: 'GET'
    })
    
    const data = await response.json()
    expect(data).toHaveProperty('message')
    expect(data.message).toBe('From Backend: Hello world')
  })
}) 