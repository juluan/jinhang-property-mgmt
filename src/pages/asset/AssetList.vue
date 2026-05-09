<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { mockAssets } from '@/data/assets'
import type { Asset } from '@/types'

const assets = ref<Asset[]>([...mockAssets])

const totalCount = computed(() => assets.value.length)
const totalArea = computed(() => assets.value.reduce((sum, a) => sum + a.area, 0))
const totalValue = computed(() => assets.value.reduce((sum, a) => sum + a.estimatedValue, 0))
const operatingCount = computed(() => assets.value.filter(a => a.status === '运营中').length)

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

function getStatusType(status: string): 'success' | 'warning' | 'danger' | 'info' {
  switch (status) {
    case '运营中': return 'success'
    case '维护中': return 'warning'
    case '闲置': return 'info'
    case '已处置': return 'danger'
    default: return 'info'
  }
}

const detailVisible = ref(false)
const currentAsset = ref<Asset | null>(null)

function showDetail(asset: Asset) {
  currentAsset.value = { ...asset }
  detailVisible.value = true
}

const editVisible = ref(false)
const editFormRef = ref<FormInstance>()
const editForm = ref<Asset>({
  id: '',
  name: '',
  address: '',
  area: 0,
  estimatedValue: 0,
  landType: '',
  registrationDate: '',
  certificateImages: [],
  status: '运营中',
  houseIds: [],
})

const editRules: FormRules = {
  name: [{ required: true, message: '请输入资产名称', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  area: [{ required: true, message: '请输入面积', trigger: 'blur' }],
  estimatedValue: [{ required: true, message: '请输入估值', trigger: 'blur' }],
  landType: [{ required: true, message: '请选择土地类型', trigger: 'change' }],
  registrationDate: [{ required: true, message: '请选择登记日期', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
}

const landTypeOptions = ['商业用地', '工业用地', '住宅用地', '综合用地', '其他']
const statusOptions = ['运营中', '维护中', '闲置', '已处置']

function showEdit(asset: Asset) {
  editForm.value = { ...asset }
  editVisible.value = true
}

function handleEditSubmit(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const idx = assets.value.findIndex(a => a.id === editForm.value.id)
      if (idx !== -1) {
        assets.value[idx] = { ...editForm.value }
      }
      ElMessage.success('资产信息已更新')
      editVisible.value = false
    }
  })
}

function handleDelete(asset: Asset) {
  ElMessageBox.confirm(
    `确定要删除资产 "${asset.name}" 吗？`,
    '删除确认',
    { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
  ).then(() => {
    const idx = assets.value.findIndex(a => a.id === asset.id)
    if (idx !== -1) {
      assets.value.splice(idx, 1)
    }
    ElMessage.success('资产已删除')
  }).catch(() => {})
}

const uploadFiles = ref<{ name: string; url: string }[]>([])
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>资产管理</h2>
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

    <div class="section-card">
      <div class="card-header">
        <span>资产列表</span>
      </div>
      <el-table :data="assets" stripe border style="width: 100%">
        <el-table-column prop="id" label="资产编号" width="100" />
        <el-table-column prop="name" label="资产名称" min-width="160" />
        <el-table-column prop="address" label="地址" min-width="220" show-overflow-tooltip />
        <el-table-column label="面积(m²)" width="100" align="right">
          <template #default="{ row }">
            {{ row.area.toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="估值" width="140" align="right">
          <template #default="{ row }">
            {{ formatCurrency(row.estimatedValue) }}
          </template>
        </el-table-column>
        <el-table-column prop="landType" label="土地类型" width="100" />
        <el-table-column prop="registrationDate" label="登记日期" width="120" />
        <el-table-column label="关联房源" width="100" align="center">
          <template #default="{ row }">
            <el-tag size="small" type="info">{{ row.houseIds.length }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" link @click="showDetail(row)">查看详情</el-button>
            <el-button size="small" type="primary" link @click="showEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="detailVisible" title="资产详情" width="800px" destroy-on-close>
      <template v-if="currentAsset">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="资产编号">{{ currentAsset.id }}</el-descriptions-item>
          <el-descriptions-item label="资产名称">{{ currentAsset.name }}</el-descriptions-item>
          <el-descriptions-item label="地址" :span="2">{{ currentAsset.address }}</el-descriptions-item>
          <el-descriptions-item label="面积(m²)">{{ currentAsset.area.toLocaleString() }}</el-descriptions-item>
          <el-descriptions-item label="估值">{{ formatCurrencyFull(currentAsset.estimatedValue) }}</el-descriptions-item>
          <el-descriptions-item label="土地类型">{{ currentAsset.landType }}</el-descriptions-item>
          <el-descriptions-item label="登记日期">{{ currentAsset.registrationDate }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="getStatusType(currentAsset.status)" size="small">{{ currentAsset.status }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="关联房源">{{ currentAsset.houseIds.join('、') || '无' }}</el-descriptions-item>
        </el-descriptions>

        <div style="margin-top: 24px">
          <h4 style="margin-bottom: 12px">关联房源</h4>
          <el-table :data="currentAsset.houseIds.map(id => ({ id }))" border size="small" style="width: 100%">
            <el-table-column prop="id" label="房源编号" />
          </el-table>
          <el-empty v-if="currentAsset.houseIds.length === 0" description="暂无关联房源" :image-size="60" />
        </div>

        <div style="margin-top: 24px">
          <h4 style="margin-bottom: 12px">权证图片</h4>
          <div v-if="currentAsset.certificateImages.length > 0" class="cert-gallery">
            <el-image
              v-for="(img, i) in currentAsset.certificateImages"
              :key="i"
              :src="img"
              fit="cover"
              :preview-src-list="currentAsset.certificateImages"
              :initial-index="i"
              style="width: 160px; height: 120px; border-radius: 4px"
            />
          </div>
          <el-empty v-else description="暂无上传权证图片" :image-size="60" />
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="editVisible" title="编辑资产" width="640px" destroy-on-close>
      <el-form ref="editFormRef" :model="editForm" :rules="editRules" label-width="100px">
        <el-form-item label="资产名称" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入资产名称" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address" placeholder="请输入地址" />
        </el-form-item>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="面积(m²)" prop="area">
              <el-input-number v-model="editForm.area" :min="0" :step="100" controls-position="right" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="估值" prop="estimatedValue">
              <el-input-number v-model="editForm.estimatedValue" :min="0" :step="10000" controls-position="right" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="土地类型" prop="landType">
          <el-select v-model="editForm.landType" placeholder="请选择土地类型" style="width: 100%">
            <el-option v-for="item in landTypeOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="登记日期" prop="registrationDate">
          <el-date-picker v-model="editForm.registrationDate" type="date" placeholder="请选择登记日期" value-format="YYYY-MM-DD" style="width: 100%" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="editForm.status" placeholder="请选择状态" style="width: 100%">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="权证图片">
          <el-upload
            v-model:file-list="uploadFiles"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditSubmit(editFormRef)">保存</el-button>
      </template>
    </el-dialog>
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

.cert-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>