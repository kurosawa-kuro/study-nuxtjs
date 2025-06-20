<template>
  <div class="container">
    <h1>Nuxt Backend API</h1>
    
    <div class="links">
      <NuxtLink to="/swagger" class="swagger-link">
        📚 Swagger UI でAPIテスト
      </NuxtLink>
    </div>
    
    <div class="api-test">
      <h2>クイックAPIテスト</h2>
      
      <div class="test-section">
        <h3>ユーザー一覧取得</h3>
        <button @click="getUsers" :disabled="loading">ユーザー一覧を取得</button>
        <pre v-if="usersResult">{{ JSON.stringify(usersResult, null, 2) }}</pre>
      </div>
      
      <div class="test-section">
        <h3>ユーザー作成</h3>
        <input v-model="newUserName" placeholder="ユーザー名" />
        <button @click="createUser" :disabled="loading || !newUserName">ユーザー作成</button>
        <pre v-if="createResult">{{ JSON.stringify(createResult, null, 2) }}</pre>
      </div>
      
      <div class="test-section">
        <h3>個別ユーザー取得</h3>
        <input v-model="userId" type="number" placeholder="ユーザーID" />
        <button @click="getUser" :disabled="loading || !userId">ユーザー取得</button>
        <pre v-if="userResult">{{ JSON.stringify(userResult, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(false)
const usersResult = ref(null)
const createResult = ref(null)
const userResult = ref(null)
const newUserName = ref('')
const userId = ref('')

const getUsers = async () => {
  loading.value = true
  try {
    const result = await $fetch('/api/users')
    usersResult.value = result
  } catch (error) {
    usersResult.value = { error: error.message }
  } finally {
    loading.value = false
  }
}

const createUser = async () => {
  loading.value = true
  try {
    const result = await $fetch('/api/users', {
      method: 'POST',
      body: { name: newUserName.value }
    })
    createResult.value = result
    newUserName.value = ''
    // ユーザー一覧を更新
    await getUsers()
  } catch (error) {
    createResult.value = { error: error.message }
  } finally {
    loading.value = false
  }
}

const getUser = async () => {
  loading.value = true
  try {
    const result = await $fetch(`/api/users/${userId.value}`)
    userResult.value = result
  } catch (error) {
    userResult.value = { error: error.message }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.links {
  margin: 20px 0;
}

.swagger-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}

.swagger-link:hover {
  background-color: #45a049;
}

.api-test {
  margin-top: 30px;
}

.test-section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.test-section h3 {
  margin-top: 0;
  color: #333;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 5px;
  width: 200px;
}

pre {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  margin-top: 10px;
}
</style> 