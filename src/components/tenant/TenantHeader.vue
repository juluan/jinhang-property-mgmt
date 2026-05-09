<template>
  <div class="tenant-header">
    <div class="header-action" @click="handleLeft">
      <el-icon v-if="showBack" :size="22"><ArrowLeft /></el-icon>
      <span v-else class="header-menu-icon">☰</span>
    </div>
    <div class="header-title">{{ title }}</div>
    <div class="header-action header-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

defineProps<{
  title: string
  showBack?: boolean
}>()

const router = useRouter()
const handleLeft = () => {
  if (router.options.history.state.back) {
    router.back()
  } else {
    router.push('/tenant')
  }
}
</script>

<style scoped>
.tenant-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 16px;
  background: var(--primary-dark, #1e3a5f);
  color: #fff;
  flex-shrink: 0;
}
.header-title {
  font-size: 16px;
  font-weight: 600;
}
.header-action {
  width: 44px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.header-right {
  justify-content: flex-end;
}
</style>
