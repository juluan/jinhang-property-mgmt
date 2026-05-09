<script setup lang="ts">
import { computed } from 'vue'
import { mockAssets } from '@/data/assets'

const assets = mockAssets

const totalCount = computed(() => assets.length)
const totalArea = computed(() => assets.reduce((sum, a) => sum + a.area, 0))
const totalValue = computed(() => assets.reduce((sum, a) => sum + a.estimatedValue, 0))
const operatingCount = computed(() => assets.filter(a => a.status === '运营中').length)

function formatCurrency(value: number): string {
  if (value >= 100000000) {
    return (value / 100000000).toFixed(1) + ' 亿'
  }
  if (value >= 10000) {
    return (value / 10000).toFixed(0) + ' 万'
  }
  return value.toLocaleString()
}

function formatCurrencyFull(value: number): string {
  return '¥' + value.toLocaleString('zh-CN')
}

const maxValue = computed(() => Math.max(...assets.map(a => a.estimatedValue)))
const maxArea = computed(() => Math.max(...assets.map(a => a.area)))

const barColors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C']

const landTypeDistribution = computed(() => {
  const map: Record<string, number> = {}
  assets.forEach(a => {
    map[a.landType] = (map[a.landType] || 0) + 1
  })
  return Object.entries(map).map(([type, count]) => ({
    type,
    count,
    percentage: Math.round((count / assets.length) * 100),
  }))
})

const summaryData = computed(() =>
  assets.map(a => ({
    ...a,
    valuePerSqm: Math.round(a.estimatedValue / a.area),
  }))
)
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>资产统计</h2>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-label">资产总数</div>
        <div class="stat-value">{{ totalCount }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">总面积(㎡)</div>
        <div class="stat-value">{{ totalArea.toLocaleString() }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">总估值(¥)</div>
        <div class="stat-value">{{ formatCurrency(totalValue) }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">运营中数量</div>
        <div class="stat-value">{{ operatingCount }}</div>
      </div>
    </div>

    <div class="section-card" style="margin-bottom: 20px">
      <div class="card-header">
        <span>资产估值分布</span>
      </div>
      <div v-for="(asset, i) in assets" :key="asset.id" class="chart-row">
        <div class="chart-label">
          <span class="chart-dot" :style="{ background: barColors[i] }"></span>
          <span>{{ asset.name }}</span>
        </div>
        <div class="chart-bar-wrap">
          <el-progress
            :percentage="Math.round((asset.estimatedValue / maxValue) * 100)"
            :color="barColors[i]"
            :stroke-width="20"
            :show-text="false"
          />
        </div>
        <div class="chart-value">{{ formatCurrency(asset.estimatedValue) }}</div>
      </div>
    </div>

    <div class="section-card" style="margin-bottom: 20px">
      <div class="card-header">
        <span>资产面积对比</span>
      </div>
      <div v-for="(asset, i) in assets" :key="asset.id" class="chart-row">
        <div class="chart-label">
          <span class="chart-dot" :style="{ background: barColors[i] }"></span>
          <span>{{ asset.name }}</span>
        </div>
        <div class="chart-bar-wrap">
          <div class="area-bar">
            <div
              class="area-bar-fill"
              :style="{
                width: Math.round((asset.area / maxArea) * 100) + '%',
                background: barColors[i],
              }"
            ></div>
          </div>
        </div>
        <div class="chart-value">{{ asset.area.toLocaleString() }} ㎡</div>
      </div>
    </div>

    <div class="section-card" style="margin-bottom: 20px">
      <div class="card-header">
        <span>土地类型分布</span>
      </div>
      <div v-for="(item, i) in landTypeDistribution" :key="item.type" class="chart-row">
        <div class="chart-label">
          <span class="chart-dot" :style="{ background: barColors[i] }"></span>
          <span>{{ item.type }}</span>
        </div>
        <div class="chart-bar-wrap">
          <el-progress
            :percentage="item.percentage"
            :color="barColors[i]"
            :stroke-width="20"
          />
        </div>
        <div class="chart-value">{{ item.count }} 个</div>
      </div>
    </div>

    <div class="section-card">
      <div class="card-header">
        <span>资产汇总明细</span>
      </div>
      <el-table :data="summaryData" stripe border style="width: 100%">
        <el-table-column prop="id" label="资产编号" width="100" />
        <el-table-column prop="name" label="资产名称" min-width="160" />
        <el-table-column label="面积(m²)" width="110" align="right">
          <template #default="{ row }">
            {{ row.area.toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="估值" width="150" align="right">
          <template #default="{ row }">
            {{ formatCurrencyFull(row.estimatedValue) }}
          </template>
        </el-table-column>
        <el-table-column label="每平米估值" width="130" align="right">
          <template #default="{ row }">
            {{ formatCurrencyFull(row.valuePerSqm) }}
          </template>
        </el-table-column>
        <el-table-column prop="landType" label="土地类型" width="100" />
        <el-table-column label="关联房源数" width="110" align="center">
          <template #default="{ row }">
            {{ row.houseIds.length }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.stat-label {
  font-size: 13px;
  color: #909399;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #303133;
}

.section-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.chart-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.chart-row:last-child {
  margin-bottom: 0;
}

.chart-label {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 160px;
  flex-shrink: 0;
  font-size: 14px;
  color: #606266;
}

.chart-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.chart-bar-wrap {
  flex: 1;
  min-width: 0;
}

.chart-value {
  width: 100px;
  flex-shrink: 0;
  text-align: right;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.area-bar {
  height: 28px;
  background: #f0f2f5;
  border-radius: 4px;
  overflow: hidden;
}

.area-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}
</style>