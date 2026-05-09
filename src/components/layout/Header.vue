<template>
  <div class="header-bar">
    <div class="header-left">
      <el-icon class="collapse-btn" :size="20" @click="$emit('toggle-sidebar')">
        <Fold />
      </el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }">
          <el-icon><HomeFilled /></el-icon>
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path" :to="item.to ? { path: item.path } : undefined">
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="header-right">
      <el-input
        v-model="searchText"
        placeholder="搜索菜单、功能..."
        :prefix-icon="Search"
        class="search-input"
        clearable
      />

      <el-badge :value="notificationCount" :hidden="notificationCount === 0" class="notification-badge">
        <el-icon class="header-icon" :size="20">
          <Bell />
        </el-icon>
      </el-badge>

      <el-dropdown trigger="click" @command="handleUserCommand">
        <div class="user-avatar-area">
          <el-avatar :size="34" :src="userAvatar">
            <el-icon :size="18"><UserFilled /></el-icon>
          </el-avatar>
          <div class="user-info">
            <span class="user-name">{{ userName }}</span>
            <span class="user-role">{{ userRole }}</span>
          </div>
          <el-icon class="dropdown-arrow" :size="14">
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">
              <el-icon><UserFilled /></el-icon>
              个人设置
            </el-dropdown-item>
            <el-dropdown-item command="logout" divided>
              <el-icon><SwitchButton /></el-icon>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  Fold,
  Expand,
  Bell,
  UserFilled,
  Search,
  HomeFilled,
  ArrowDown,
  SwitchButton,
} from '@element-plus/icons-vue'

defineEmits<{
  (e: 'toggle-sidebar'): void
}>()

const route = useRoute()
const searchText = ref('')
const notificationCount = ref(3)
const userName = ref('管理员')
const userRole = ref('超级管理员')
const userAvatar = ref('')

const breadcrumbMap: Record<string, string> = {
  '/dashboard': '工作台',
  '/house': '房源列表',
  '/house/new': '新增房源',
  '/contract': '合同列表',
  '/contract/templates': '合同模板',
  '/fee': '费用配置',
  '/fee/bills': '账单管理',
  '/fee/ledger': '费用台账',
  '/asset': '资产列表',
  '/asset/stats': '资产统计',
  '/system/user': '用户管理',
  '/system/role': '角色权限',
  '/system/log': '操作日志',
  '/system/notification': '通知配置',
}

const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const crumbs: { path: string; label: string; to: boolean }[] = []

  let accumulated = ''
  for (const seg of segments) {
    accumulated += '/' + seg
    const label = breadcrumbMap[accumulated] || seg
    crumbs.push({
      path: accumulated,
      label,
      to: accumulated !== route.path,
    })
  }

  return crumbs
})

function handleUserCommand(command: string) {
  if (command === 'logout') {
    ElMessage.success('已退出登录')
  } else if (command === 'profile') {
    ElMessage.info('跳转至个人设置')
  }
}
</script>

<style scoped>
.header-bar {
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.collapse-btn {
  cursor: pointer;
  color: #606266;
  transition: color 0.2s;
  flex-shrink: 0;
}

.collapse-btn:hover {
  color: #1e3a5f;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-input {
  width: 260px;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: 20px;
  background-color: #f5f6fa;
  box-shadow: none;
}

.search-input :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #c9a84c inset;
}

.search-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #1e3a5f inset;
}

.notification-badge {
  cursor: pointer;
}

.notification-badge :deep(.el-badge__content) {
  background-color: #e74c3c;
}

.header-icon {
  color: #606266;
  cursor: pointer;
  transition: color 0.2s;
}

.header-icon:hover {
  color: #1e3a5f;
}

.user-avatar-area {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.user-avatar-area:hover {
  background-color: #f5f6fa;
}

.user-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.user-role {
  font-size: 12px;
  color: #909399;
}

.dropdown-arrow {
  color: #909399;
}

:deep(.el-breadcrumb__inner) {
  color: #606266;
  font-weight: 400;
}

:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: #1e3a5f;
  font-weight: 600;
}
</style>
