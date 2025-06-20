// メモリ内のユーザーデータ（共有ストレージ）
let users = [
  { id: 1, name: 'DefaultUser' },
  { id: 2, name: 'SystemAdmin' }
]

export interface User {
  id: number
  name: string
}

export interface CreateUserRequest {
  name: string
}

export const userStorage = {
  // 全ユーザー取得
  getAllUsers(): User[] {
    return [...users]
  },
  
  // ユーザー数取得
  getCount(): number {
    return users.length
  },
  
  // IDでユーザー取得
  getUserById(id: number): User | undefined {
    return users.find(u => u.id === id)
  },
  
  // ユーザー作成
  createUser(name: string): User {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    const newUser: User = {
      id: newId,
      name: name.trim()
    }
    users.push(newUser)
    return newUser
  },
  
  // ストレージタイプ取得
  getStorageType(): string {
    return process.env.STORAGE_TYPE || 'memory-variable'
  }
} 