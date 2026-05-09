<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-logo">
        <span class="logo-icon">🏢</span>
        <span class="logo-text">金航建设</span>
      </div>
      <Sidebar />
    </aside>
    <div class="admin-main">
      <Header />
      <div class="admin-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.admin-sidebar {
  width: 260px;
  background: var(--primary-dark, #1e3a5f);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.admin-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: var(--bg-light, #f5f6fa);
}
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.logo-icon {
  font-size: 28px;
}
.logo-text {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 2px;
}
</style>
