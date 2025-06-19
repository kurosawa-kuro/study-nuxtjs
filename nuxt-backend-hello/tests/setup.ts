import { beforeAll, afterAll } from 'vitest'
import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let serverProcess: any
let serverReady = false

// サーバーが起動するまで待機
const waitForServer = (port: number, maxAttempts = 30): Promise<boolean> => {
  return new Promise((resolve) => {
    let attempts = 0
    
    const checkServer = () => {
      attempts++
      
      fetch(`http://localhost:${port}/api/hello`)
        .then(() => {
          console.log(`✅ Server is ready on port ${port}`)
          resolve(true)
        })
        .catch(() => {
          if (attempts >= maxAttempts) {
            console.log(`❌ Server failed to start after ${maxAttempts} attempts`)
            resolve(false)
          } else {
            setTimeout(checkServer, 1000)
          }
        })
    }
    
    checkServer()
  })
}

// プロセスを確実に停止
const killProcess = (process: any): Promise<void> => {
  return new Promise((resolve) => {
    if (!process || process.killed) {
      resolve()
      return
    }

    // 子プロセスも含めて停止
    try {
      process.kill('SIGTERM')
    } catch (error) {
      console.log('⚠️  Process already terminated')
    }

    const timeout = setTimeout(() => {
      try {
        process.kill('SIGKILL')
      } catch (error) {
        console.log('⚠️  Process already killed')
      }
      resolve()
    }, 3000)

    process.on('close', () => {
      clearTimeout(timeout)
      resolve()
    })

    process.on('exit', () => {
      clearTimeout(timeout)
      resolve()
    })
  })
}

// テスト環境のセットアップ
beforeAll(async () => {
  console.log('🚀 Starting Nuxt.js server for testing...')
  
  // Nuxt.jsサーバーを起動
  serverProcess = spawn('npm', ['run', 'dev'], {
    cwd: join(__dirname, '..'),
    stdio: 'pipe',
    env: { ...process.env, PORT: '8000' }
  })
  
  // サーバーのログを出力
  serverProcess.stdout?.on('data', (data: Buffer) => {
    console.log(`[Server] ${data.toString().trim()}`)
  })
  
  serverProcess.stderr?.on('data', (data: Buffer) => {
    console.log(`[Server Error] ${data.toString().trim()}`)
  })
  
  // サーバーが起動するまで待機
  serverReady = await waitForServer(8000)
  
  if (serverReady) {
    console.log('🧪 Test environment setup complete')
  } else {
    console.log('⚠️  Server setup failed')
  }
}, 30000) // 30秒のタイムアウト

// テスト終了後のクリーンアップ
afterAll(async () => {
  if (serverProcess) {
    console.log('🛑 Stopping server...')
    await killProcess(serverProcess)
    console.log('✅ Server stopped')
  }
  console.log('🧹 Test cleanup complete')
}, 10000) // afterAllのタイムアウトを10秒に設定 