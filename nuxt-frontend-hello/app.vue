<template>
  <div class="h-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        {{ message || 'Loading...' }}
      </h1>
      <button 
        @click="fetchMessage" 
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Refresh Message
      </button>
    </div>
  </div>
</template>

<script setup>
const message = ref('')

const fetchMessage = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/hello')
    const data = await response.json()
    message.value = data.message
  } catch (error) {
    console.error('Error fetching message:', error)
    message.value = 'Error: Could not fetch message'
  }
}

// コンポーネントマウント時にメッセージを取得
onMounted(() => {
  fetchMessage()
})
</script>
