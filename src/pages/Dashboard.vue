<template>
  <div class="page-container">
    <div class="welcome-gradient" style="border-radius: 12px; padding: 28px 32px; margin-bottom: 24px; color: white;">
      <h2 style="font-size: 22px; font-weight: 600; margin-bottom: 6px;">您好，系统管理员</h2>
      <p style="font-size: 14px; opacity: 0.7;">{{ todayDate }}</p>
    </div>

    <el-row :gutter="20" style="margin-bottom: 24px;">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-label">可租房源</div>
          <div class="stat-value">{{ availableHousesCount }}</div>
          <div class="stat-sub">共 {{ mockHouses.length }} 套房源</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-label">进行中合同</div>
          <div class="stat-value">{{ mockContracts.length }}</div>
          <div class="stat-sub">
            <span>{{ approvedContracts }} 份已归档</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-label">待处理账单</div>
          <div class="stat-value">{{ pendingBillsCount }}</div>
          <div class="stat-sub">
            <span>{{ overdueBillsCount }} 笔逾期</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-label">本月收入</div>
          <div class="stat-value">¥200,000+</div>
          <div class="stat-sub">较上月 +12.5%</div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="16">
        <div class="section-card">
          <div class="card-header">
            <h3>近期合同</h3>
            <el-link type="primary" :underline="false">查看全部</el-link>
          </div>
          <el-table :data="mockContracts" style="width: 100%;" size="default">
            <el-table-column prop="houseName" label="房源" min-width="180" show-overflow-tooltip />
            <el-table-column prop="tenantName" label="承租方" min-width="180" show-overflow-tooltip />
            <el-table-column label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="contractStatusTypes[row.status] as any" size="small">
                  {{ contractStatusMap[row.status] }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="effectiveDate" label="生效日期" width="120" />
            <el-table-column prop="expiryDate" label="到期日期" width="120" />
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="section-card">
          <div class="card-header">
            <h3>待收账单</h3>
            <el-link type="primary" :underline="false">查看全部</el-link>
          </div>
          <el-table :data="unpaidBills" style="width: 100%;" size="default">
            <el-table-column prop="houseName" label="房源" min-width="140" show-overflow-tooltip />
            <el-table-column label="金额" width="100">
              <template #default="{ row }">
                <span style="font-weight: 600; color: #1e3a5f;">¥{{ row.totalAmount.toLocaleString() }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="dueDate" label="截止日期" width="110" />
            <el-table-column label="状态" width="90">
              <template #default="{ row }">
                <el-tag :type="billStatusTypes[row.status] as any" size="small">
                  {{ billStatusMap[row.status] }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { mockHouses } from '@/data/houses'
import { mockContracts, contractStatusMap, contractStatusTypes } from '@/data/contracts'
import { mockBills, billStatusMap, billStatusTypes } from '@/data/bills'

const todayDate = computed(() => {
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return `${year}年${month}月${day}日 ${weekDays[d.getDay()]}`
})

const availableHousesCount = computed(() => mockHouses.filter(h => h.status === 'available').length)

const approvedContracts = computed(() => mockContracts.filter(c => c.status === 'approved').length)

const pendingBillsCount = computed(() => mockBills.filter(b => b.status !== 'paid').length)

const overdueBillsCount = computed(() => mockBills.filter(b => b.status === 'overdue').length)

const unpaidBills = computed(() => mockBills.filter(b => b.status !== 'paid'))
</script>
