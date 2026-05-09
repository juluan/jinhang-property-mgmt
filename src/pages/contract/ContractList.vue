<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Contract } from '@/types'
import { mockContracts, contractStatusMap, contractStatusTypes } from '@/data/contracts'

const contracts = ref<Contract[]>([...mockContracts])
const filterStatus = ref('')
const filterKeyword = ref('')
const reviewVisible = ref(false)
const detailVisible = ref(false)
const currentContract = ref<Contract | null>(null)
const reviewResult = ref('')
const reviewComment = ref('')

const statusOptions = [
  { label: '全部', value: '' },
  { label: '待审核', value: 'pending' },
  { label: '已归档', value: 'archived' },
  { label: '已驳回', value: 'rejected' },
]

const filteredContracts = computed(() => {
  return contracts.value.filter((c) => {
    const matchStatus = !filterStatus.value || c.status === filterStatus.value
    const kw = filterKeyword.value.toLowerCase()
    const matchKeyword =
      !kw ||
      c.houseName.toLowerCase().includes(kw) ||
      c.tenantName.toLowerCase().includes(kw)
    return matchStatus && matchKeyword
  })
})

function openReview(contract: Contract) {
  currentContract.value = contract
  reviewResult.value = ''
  reviewComment.value = ''
  reviewVisible.value = true
}

function submitReview() {
  if (!reviewResult.value) {
    ElMessage.warning('请选择审核结果')
    return
  }
  const target = contracts.value.find((c) => c.id === currentContract.value!.id)
  if (target) {
    target.status = reviewResult.value as Contract['status']
    target.reviewComment = reviewComment.value
  }
  ElMessage.success('审核结果已提交')
  reviewVisible.value = false
}

function openDetail(contract: Contract) {
  currentContract.value = contract
  detailVisible.value = true
}

function handleDelete(contract: Contract) {
  ElMessageBox.confirm(`确定要删除合同 ${contract.id} 吗？`, '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    contracts.value = contracts.value.filter((c) => c.id !== contract.id)
    ElMessage.success('合同已删除')
  })
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>合同管理</h2>
    </div>

    <div class="section-card" style="margin-bottom: 16px">
      <div class="card-header">
        <h3>筛选条件</h3>
      </div>
      <el-row :gutter="16">
        <el-col :span="6">
          <el-select v-model="filterStatus" placeholder="合同状态" clearable style="width: 100%">
            <el-option
              v-for="opt in statusOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="filterKeyword" placeholder="房源名称/承租方名称" clearable />
        </el-col>
      </el-row>
    </div>

    <div class="section-card">
      <el-table :data="filteredContracts" stripe style="width: 100%">
        <el-table-column prop="id" label="合同编号" width="120" />
        <el-table-column prop="houseName" label="房源名称" min-width="180" />
        <el-table-column prop="tenantName" label="承租方" min-width="180" />
        <el-table-column prop="tenantPhone" label="承租方电话" width="140" />
        <el-table-column label="合同有效期" min-width="220">
          <template #default="{ row }">
            <span>{{ row.effectiveDate || '-' }} ~ {{ row.expiryDate || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="contractStatusTypes[row.status]" size="small">
              {{ contractStatusMap[row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="row.status === 'pending'"
              type="primary"
              size="small"
              link
              @click="openReview(row)"
            >
              审核
            </el-button>
            <el-button type="primary" size="small" link @click="openDetail(row)">
              查看
            </el-button>
            <el-button type="danger" size="small" link @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="reviewVisible" title="合同审核" width="600px">
      <template v-if="currentContract">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="房源名称" :span="2">
            {{ currentContract.houseName }}
          </el-descriptions-item>
          <el-descriptions-item label="承租方">
            {{ currentContract.tenantName }}
          </el-descriptions-item>
          <el-descriptions-item label="承租方电话">
            {{ currentContract.tenantPhone }}
          </el-descriptions-item>
          <el-descriptions-item label="合同生效日期">
            {{ currentContract.effectiveDate || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="合同到期日期">
            {{ currentContract.expiryDate || '-' }}
          </el-descriptions-item>
        </el-descriptions>
        <div style="margin-top: 20px">
          <div style="margin-bottom: 8px; font-weight: 500">审核结果</div>
          <el-radio-group v-model="reviewResult">
            <el-radio value="approved">通过</el-radio>
            <el-radio value="rejected">驳回</el-radio>
          </el-radio-group>
        </div>
        <div style="margin-top: 16px">
          <el-input
            v-model="reviewComment"
            type="textarea"
            :rows="3"
            placeholder="审核意见"
          />
        </div>
      </template>
      <template #footer>
        <el-button @click="reviewVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReview">提交审核</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="detailVisible" title="合同详情" width="700px">
      <template v-if="currentContract">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="合同编号">
            {{ currentContract.id }}
          </el-descriptions-item>
          <el-descriptions-item label="模板编号">
            {{ currentContract.templateId }}
          </el-descriptions-item>
          <el-descriptions-item label="房源名称" :span="2">
            {{ currentContract.houseName }}
          </el-descriptions-item>
          <el-descriptions-item label="承租方">
            {{ currentContract.tenantName }}
          </el-descriptions-item>
          <el-descriptions-item label="承租方电话">
            {{ currentContract.tenantPhone }}
          </el-descriptions-item>
          <el-descriptions-item label="合同生效日期">
            {{ currentContract.effectiveDate || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="合同到期日期">
            {{ currentContract.expiryDate || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="合同状态">
            <el-tag :type="contractStatusTypes[currentContract.status]" size="small">
              {{ contractStatusMap[currentContract.status] }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            {{ currentContract.createdAt }}
          </el-descriptions-item>
          <el-descriptions-item label="审核意见" :span="2">
            {{ currentContract.reviewComment || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="合同文件" :span="2">
            <ul style="padding-left: 16px; margin: 0">
              <li v-for="file in currentContract.files" :key="file">{{ file }}</li>
            </ul>
          </el-descriptions-item>
        </el-descriptions>
      </template>
    </el-dialog>
  </div>
</template>
