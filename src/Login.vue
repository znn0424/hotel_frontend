<template>
  <main class="login-page">
    <section class="login-panel">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <p class="eyebrow">HOTEL OPERATIONS</p>
          <h1>酒店房态管理</h1>
        </div>
      </div>

      <div class="login-heading">
        <h2>欢迎回来</h2>
        <p>登录后查看和更新实时房态。</p>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="handleLogin"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            autocomplete="username"
            clearable
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="current-password"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-button
          class="login-button"
          type="primary"
          native-type="submit"
          :loading="loading"
        >
          登录
        </el-button>
      </el-form>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import http from './api/http'

const router = useRouter()
const route = useRoute()
const formRef = ref()
const loading = ref(false)

const form = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
}

const handleLogin = async () => {
  if (!formRef.value || loading.value) {
    return
  }

  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) {
    return
  }

  loading.value = true

  try {
    const response = await http.post('/admin/login', {
      username: form.username,
      password: form.password,
    })

    // 兼容常见的 token 返回格式：{ token } 或 { access_token }。
    const token = response.data?.token || response.data?.access_token
    if (!token) {
      throw new Error('登录响应中没有 token')
    }

    localStorage.setItem('token', token)
    ElMessage.success('登录成功')

    const redirect = typeof route.query.redirect === 'string'
      ? route.query.redirect
      : '/hotel'
    await router.replace(redirect)
  } catch (error) {
    const message = error.response?.data?.message
      || error.response?.data?.detail
      || error.message
      || '登录失败，请检查用户名和密码'
    ElMessage.error(message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
  background: #f3f6f8;
}

.login-panel {
  width: min(100%, 420px);
  padding: 40px;
  box-sizing: border-box;
  border: 1px solid #e1e8ec;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 18px 45px rgb(24 45 58 / 10%);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 42px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  color: #ffffff;
  background: #1b6d72;
  font-size: 22px;
  font-weight: 700;
}

.eyebrow {
  margin: 0 0 4px;
  color: #71808a;
  font-size: 11px;
  letter-spacing: 1.2px;
}

.brand h1 {
  margin: 0;
  color: #20343d;
  font-size: 18px;
}

.login-heading {
  margin-bottom: 24px;
}

.login-heading h2 {
  margin: 0 0 8px;
  color: #1f3039;
  font-size: 28px;
}

.login-heading p {
  margin: 0;
  color: #71808a;
  font-size: 14px;
}

.login-button {
  width: 100%;
  height: 42px;
  margin-top: 8px;
}

@media (max-width: 480px) {
  .login-panel {
    padding: 28px 22px;
  }
}
</style>
