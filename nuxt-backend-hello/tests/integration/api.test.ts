import { describe, it, expect } from 'vitest'

describe('API Integration Tests', () => {
  const baseURL = 'http://localhost:8000'

  it('should handle CORS headers correctly', async () => {
    const response = await fetch(`${baseURL}/api/hello`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    })
    
    const data = await response.text()
    expect(data).toBe('OK')
  })

  it('should return proper JSON response', async () => {
    const response = await fetch(`${baseURL}/api/hello`)
    const data = await response.json()
    
    expect(data).toBeInstanceOf(Object)
    expect(data).toHaveProperty('message')
    expect(typeof data.message).toBe('string')
  })

  it('should handle multiple concurrent requests', async () => {
    const promises = Array.from({ length: 5 }, () => 
      fetch(`${baseURL}/api/hello`).then(res => res.json())
    )
    
    const responses = await Promise.all(promises)
    
    responses.forEach((response: any) => {
      expect(response).toEqual({
        message: 'From Backend: Hello world'
      })
    })
  })
}) 