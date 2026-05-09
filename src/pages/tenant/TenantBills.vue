<template>
  <div class="page">
    <TenantHeader title="我的账单" :showBack="true" />
    <div class="tabs-wrapper">
      <div
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-item"
        :class="{ active: activeTab === tab.value }"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
      </div>
    </div>
    <div v-if="filteredBills.length > 0" class="list">
      <div
        v-for="bill in filteredBills"
        :key="bill.id"
        class="bill-card"
        @click="goDetail(bill.id)"
      >
        <div class="card-top">
          <div class="left">
            <div class="period">{{ bill.period }}</div>
            <div class="house">{{ bill.houseName }}</div>
          </div>
          <div class="right">
            <div class="amount">&yen;{{ bill.totalAmount.toFixed(2) }}</div>
            <el-tag :type="billStatusTypes[bill.status]" size="small">
              {{ billStatusMap[bill.status] }}
            </el-tag>
          </div>
        </div>
        <div class="card-bottom">
          <div v-if="bill.status === 'published' || bill.status === 'overdue'" class="due-date">
            缴费截止：{{ bill.dueDate }}
          </div>
          <div v-if="bill.status === 'paid' && bill.paidDate" class="paid-date">
            已缴日期：{{ bill.paidDate }}
          </div>
          <button
            v-if="bill.status === 'published' || bill.status === 'overdue'"
            class="pay-btn"
            @click.stop="goDetail(bill.id)"
          >
            立即缴费
          </button>
        </div>
      </div>
    </div>
    <div v-else class="empty-wrap">
      <el-empty description="暂无账单" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TenantHeader from '@/components/tenant/TenantHeader.vue'
import { mockBills, billStatusMap, billStatusTypes } from '@/data/bills'

const router = useRouter()

const tabs = [
  { label: '待缴费', value: 'unpaid' },
  { label: '已缴费', value: 'paid' }
]

const activeTab = ref('unpaid')

const filteredBills = computed(() => {
  if (activeTab.value === 'unpaid') {
    return mockBills.filter((b) => b.status === 'published' || b.status === 'overdue' || b.status === 'draft')
  }
  return mockBills.filter((b) => b.status === 'paid')
})

const goDetail = (id: string) => {
  router.push(`/tenant/bill/${id}`)
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f6fa;
  max-width: 375px;
  margin: 0 auto;
}

.tabs-wrapper {
  display: flex;
  background: #fff;
  padding: 0 12px;
  border-bottom: 1px solid #f0f0f0;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  font-size: 14px;
  color: #666;
  position: relative;
  cursor: pointer;
}

.tab-item.active {
  color: #c8a85b;
  font-weight: 600;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: #c8a85b;
  border-radius: 1px;
}

.list {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bill-card {
  background: #fff;
  border-radius: 10px;
  padding: 14px 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.left .period {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.left .house {
  font-size: 13px;
  color: #888;
}

.right {
  text-align: right;
}

.right .amount {
  font-size: 18px;
  font-weight: 700;
  color: #c8a85b;
  margin-bottom: 4px;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.due-date {
  font-size: 12px;
  color: #e6a23c;
}

.paid-date {
  font-size: 12px;
  color: #67c23a;
}

.pay-btn {
  background: linear-gradient(135deg, #c8a85b, #d4b86a);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 6px 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.empty-wrap {
  padding-top: 80px;
}
</style>