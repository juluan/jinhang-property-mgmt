<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { mockOperationLogs } from '@/data/users'

const logs = ref(mockOperationLogs)

const searchKeyword = ref('')

const filteredLogs = computed(() => {
  if (!searchKeyword.value) return logs.value
  const kw = searchKeyword.value.toLowerCase()
  return logs.value.filter(
    log =>
      log.operator.toLowerCase().includes(kw) ||
      log.action.toLowerCase().includes(kw) ||
      log.detail.toLowerCase().includes(kw)
  )
})
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>操作日志</h2>
    </div>

    <div class="section-card">
      <div class="card-header">
        <span>操作日志列表</span>
        <el-input
          v-model="searchKeyword"
          placeholder="搜索操作人 / 动作 / 详情"
          :prefix-icon="Search"
          clearable
          style="width: 320px"
        />
      </div>
      <el-table :data="filteredLogs" stripe border style="width: 100%" size="default">
        <el-table-column prop="id" label="日志编号" width="100" />
        <el-table-column prop="createdAt" label="操作时间" width="180" />
        <el-table-column prop="operator" label="操作人" width="140" />
        <el-table-column prop="action" label="操作动作" width="120" />
        <el-table-column prop="detail" label="操作详情" min-width="260" show-overflow-tooltip />
        <el-table-column prop="ip" label="IP地址" width="160" />
      </el-table>
    </div>
  </div>
</template>