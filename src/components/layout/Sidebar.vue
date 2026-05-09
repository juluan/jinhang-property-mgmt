<template>
  <div class="sidebar-wrapper" :class="{ collapsed: isCollapsed }">
    <div class="logo-area">
      <div class="logo-icon">
        <div class="logo-hex"></div>
      </div>
      <transition name="fade">
        <div v-show="!isCollapsed" class="logo-text">
          <span class="logo-title">金航建设</span>
          <span class="logo-subtitle">租赁物业管理系统</span>
        </div>
      </transition>
    </div>
    <div class="gold-bar"></div>

    <el-scrollbar class="menu-scrollbar">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapsed"
        :collapse-transition="false"
        background-color="#1e3a5f"
        text-color="rgba(255,255,255,0.75)"
        active-text-color="#c9a84c"
        router
        class="sidebar-menu"
      >
        <el-menu-item index="/dashboard">
          <el-icon><HomeFilled /></el-icon>
          <template #title>工作台</template>
        </el-menu-item>

        <el-sub-menu index="/house-group">
          <template #title>
            <el-icon><OfficeBuilding /></el-icon>
            <span>房源管理</span>
          </template>
          <el-menu-item index="/house">房源列表</el-menu-item>
          <el-menu-item index="/house/new">新增房源</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/contract-group">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>合同管理</span>
          </template>
          <el-menu-item index="/contract">合同列表</el-menu-item>
          <el-menu-item index="/contract/templates">合同模板</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/fee-group">
          <template #title>
            <el-icon><Money /></el-icon>
            <span>费用管理</span>
          </template>
          <el-menu-item index="/fee">费用配置</el-menu-item>
          <el-menu-item index="/fee/bills">账单管理</el-menu-item>
          <el-menu-item index="/fee/ledger">费用台账</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/asset-group">
          <template #title>
            <el-icon><Briefcase /></el-icon>
            <span>资产管理</span>
          </template>
          <el-menu-item index="/asset">资产列表</el-menu-item>
          <el-menu-item index="/asset/stats">资产统计</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/system-group">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
          </template>
          <el-menu-item index="/system/user">用户管理</el-menu-item>
          <el-menu-item index="/system/role">角色权限</el-menu-item>
          <el-menu-item index="/system/log">操作日志</el-menu-item>
          <el-menu-item index="/system/notification">通知配置</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>

    <div class="collapse-trigger" @click="toggleCollapse">
      <el-icon :size="18">
        <Fold v-if="!isCollapsed" />
        <Expand v-else />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  HomeFilled,
  OfficeBuilding,
  Document,
  Money,
  Briefcase,
  Setting,
  Fold,
  Expand,
} from '@element-plus/icons-vue'

const route = useRoute()
const isCollapsed = ref(false)

const activeMenu = computed(() => {
  const path = route.path
  const parents = ['/house-group', '/contract-group', '/fee-group', '/asset-group', '/system-group']
  if (parents.includes(path)) {
    return path
  }
  return route.path
})

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.sidebar-wrapper {
  width: 260px;
  height: 100%;
  background-color: #1e3a5f;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
}

.sidebar-wrapper.collapsed {
  width: 64px;
}

.logo-area {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  gap: 12px;
  height: 64px;
  box-sizing: border-box;
}

.logo-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
}

.logo-hex {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #c9a84c, #e8c97a);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.logo-text {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
}

.logo-title {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 1px;
}

.logo-subtitle {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.5px;
}

.gold-bar {
  height: 2px;
  background: linear-gradient(90deg, #c9a84c, transparent);
  flex-shrink: 0;
  margin: 0 20px;
}

.menu-scrollbar {
  flex: 1;
  overflow: hidden;
}

.sidebar-menu {
  border-right: none !important;
}

.sidebar-menu :deep(.el-menu-item.is-active) {
  background-color: rgba(201, 168, 76, 0.12) !important;
  border-right: 3px solid #c9a84c;
}

.sidebar-menu :deep(.el-menu-item:hover) {
  background-color: rgba(255, 255, 255, 0.06) !important;
}

.sidebar-menu :deep(.el-sub-menu .el-menu) {
  background-color: rgba(0, 0, 0, 0.15) !important;
}

.sidebar-menu :deep(.el-sub-menu__title:hover) {
  background-color: rgba(255, 255, 255, 0.06) !important;
}

.sidebar-menu :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
  color: #c9a84c !important;
}

.collapse-trigger {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.55);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  transition: color 0.2s;
  flex-shrink: 0;
}

.collapse-trigger:hover {
  color: #c9a84c;
  background-color: rgba(255, 255, 255, 0.04);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
