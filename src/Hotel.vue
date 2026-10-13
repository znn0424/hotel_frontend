<template>
  <div class="container">
    <header class="page-header">
      <div>
        <p class="eyebrow">HOTEL OPERATIONS</p>
        <h2>酒店房态管理看板</h2>
      </div>
      <el-button plain @click="logout">退出登录</el-button>
    </header>

    <el-card class="mb-4">
      <el-form :model="form">
        <el-form-item label="房间号">
          <el-input v-model="form.room_id" />
        </el-form-item>
        <el-form-item label="房间状态">
          <el-select v-model="form.status">
            <el-option label="空闲 free" value="free" />
            <el-option label="入住 occupied" value="occupied" />
            <el-option label="打扫 cleaning" value="cleaning" />
            <el-option label="维修 repair" value="repair" />
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="submitRoom">提交更新</el-button>
      </el-form>
    </el-card>

    <el-row :gutter="20" class="room-grid">
      <el-col
        v-for="(status, roomId) in roomList"
        :key="roomId"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <el-card>
          <h3>房间 {{ roomId }}</h3>
          <el-tag :type="getTagType(status)">{{ status }}</el-tag>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import http from './api/http'

const router = useRouter()

const form = ref({
  room_id: '',
  status: 'free',
})
const roomList = ref({})

// 根据房态返回 Element Plus 标签颜色。
const getTagType = (status) => {
  switch (status) {
    case 'free':
      return 'success'
    case 'occupied':
      return 'danger'
    case 'cleaning':
      return 'warning'
    case 'repair':
      return 'info'
    default:
      return ''
  }
}

// 加载全部房态。
const loadRoom = async () => {
  try {
    const response = await http.get('/room')
    roomList.value = response.data
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '房态加载失败')
  }
}

// 新增或更新房间状态。
const submitRoom = async () => {
  if (!form.value.room_id) {
    ElMessage.warning('请输入房间号')
    return
  }

  try {
    await http.post('/room/set', {
      room_id: Number(form.value.room_id),
      status: form.value.status,
    })
    ElMessage.success('房态更新成功')
    await loadRoom()
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '房态更新失败')
  }
}

// 清除本地 token 后返回登录页。
const logout = async () => {
  localStorage.removeItem('token')
  ElMessage.success('已退出登录')
  await router.replace('/login')
}

let timer = null

onMounted(() => {
  loadRoom()
  timer = setInterval(loadRoom, 5000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.container {
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
  background: #f3f6f8;
}

.page-header,
.mb-4,
.room-grid {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 4px 0 0;
  color: #20343d;
}

.eyebrow {
  margin: 0;
  color: #71808a;
  font-size: 11px;
  letter-spacing: 1.2px;
}

.mb-4 {
  margin-bottom: 16px;
}

.room-grid {
  row-gap: 20px;
}

.room-grid h3 {
  margin-top: 0;
  color: #20343d;
}

@media (max-width: 600px) {
  .container {
    padding: 16px;
  }

  .page-header {
    align-items: flex-start;
  }
}
</style>
