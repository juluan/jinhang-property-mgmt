<template>
  <div class="route-loading-bar" :class="{ loading: isPageLoading }" />
  <router-view v-slot="{ Component }">
    <transition name="page-fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isPageLoading = ref(false)
let hideTimer: number | null = null

router.beforeEach(() => {
  isPageLoading.value = true
  if (hideTimer) clearTimeout(hideTimer)
})

router.afterEach(() => {
  hideTimer = requestAnimationFrame(() => {
    isPageLoading.value = false
  })
})
</script>

<style scoped>
.route-loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0;
  background: var(--primary-gold, #c9a84c);
  z-index: 9999;
  transition: width 0.3s ease;
  opacity: 0;
}
.route-loading-bar.loading {
  width: 70%;
  opacity: 1;
}
</style>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.15s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
