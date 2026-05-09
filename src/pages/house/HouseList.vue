<template>
  <div class="page-container">
    <div class="page-header">
      <h2>房源管理</h2>
      <el-button type="primary" @click="$router.push('/house/new')">新增房源</el-button>
    </div>

    <div class="section-card">
      <div class="card-header">
        <span>筛选条件</span>
      </div>
      <el-row :gutter="16" style="margin-top: 16px">
        <el-col :span="6">
          <el-select v-model="filters.status" placeholder="房源状态" clearable style="width: 100%">
            <el-option label="全部" value="" />
            <el-option label="可租" value="available" />
            <el-option label="已租" value="rented" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="filters.district" placeholder="所属区域" clearable style="width: 100%">
            <el-option label="朝阳区" value="朝阳区" />
            <el-option label="海淀区" value="海淀区" />
            <el-option label="西城区" value="西城区" />
            <el-option label="东城区" value="东城区" />
            <el-option label="丰台区" value="丰台区" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="filters.keyword" placeholder="房源名称/地址搜索" clearable />
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="section-card" style="margin-top: 16px">
      <el-table :data="filteredHouses" stripe border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="房源编号" width="100" align="center" />
        <el-table-column prop="name" label="房源名称" min-width="140" show-overflow-tooltip />
        <el-table-column prop="district" label="区域" width="100" align="center" />
        <el-table-column label="面积" width="110" align="center">
          <template #default="{ row }">{{ row.area }} m²</template>
        </el-table-column>
        <el-table-column prop="layout" label="户型" width="120" align="center" />
        <el-table-column label="月租金" width="130" align="center" :formatter="rentFormatter" />
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="houseStatusColors[row.status] as any" size="default">
              {{ houseStatusMap[row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleView(row)">查看</el-button>
            <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="pagination.page"
        :page-size="pagination.size"
        :page-sizes="[10, 20, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 16px; justify-content: flex-end"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>

    <el-dialog v-model="dialogVisible" title="房源详情" width="60%" destroy-on-close>
      <template v-if="currentHouse">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="房源编号">{{ currentHouse.id }}</el-descriptions-item>
          <el-descriptions-item label="房源名称">{{ currentHouse.name }}</el-descriptions-item>
          <el-descriptions-item label="所属区域">{{ currentHouse.district }}</el-descriptions-item>
          <el-descriptions-item label="详细地址">{{ currentHouse.address }}</el-descriptions-item>
          <el-descriptions-item label="面积">{{ currentHouse.area }} m²</el-descriptions-item>
          <el-descriptions-item label="户型">{{ currentHouse.layout }}</el-descriptions-item>
          <el-descriptions-item label="所在楼层">{{ currentHouse.floor }}</el-descriptions-item>
          <el-descriptions-item label="朝向">{{ currentHouse.orientation }}</el-descriptions-item>
          <el-descriptions-item label="月租金">¥{{ currentHouse.rent.toLocaleString() }}</el-descriptions-item>
          <el-descriptions-item label="押金方式">{{ currentHouse.deposit }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="houseStatusColors[currentHouse.status] as any">
              {{ houseStatusMap[currentHouse.status] }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="设施配置" :span="2">
            <el-tag
              v-for="facility in currentHouse.facilities"
              :key="facility"
              style="margin-right: 6px; margin-bottom: 4px"
              size="small"
            >{{ facility }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="房源描述" :span="2">{{ currentHouse.description }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ currentHouse.createdAt }}</el-descriptions-item>
        </el-descriptions>

        <div v-if="currentHouse.images && currentHouse.images.length" style="margin-top: 20px">
          <h4 style="margin-bottom: 12px">房源图片</h4>
          <el-row :gutter="12">
            <el-col v-for="(img, idx) in currentHouse.images" :key="idx" :span="6" style="margin-bottom: 12px">
              <el-image
                :src="img"
                :preview-src-list="currentHouse.images"
                :initial-index="idx"
                fit="cover"
                style="width: 100%; height: 160px; border-radius: 4px"
              />
            </el-col>
          </el-row>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { mockHouses, houseStatusMap, houseStatusColors } from '@/data/houses'
import type { House } from '@/types'

const router = useRouter()

const loading = ref(false)

const filters = reactive({
  status: '',
  district: '',
  keyword: ''
})

const pagination = reactive({
  page: 1,
  size: 10
})

const dialogVisible = ref(false)
const currentHouse = ref<House | null>(null)

const filteredHouses = computed(() => {
  let list = mockHouses

  if (filters.status) {
    list = list.filter((h) => h.status === filters.status)
  }
  if (filters.district) {
    list = list.filter((h) => h.district === filters.district)
  }
  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase()
    list = list.filter(
      (h) =>
        h.name.toLowerCase().includes(kw) ||
        h.address.toLowerCase().includes(kw)
    )
  }

  return list.slice(
    (pagination.page - 1) * pagination.size,
    pagination.page * pagination.size
  )
})

const total = computed(() => {
  let list = mockHouses
  if (filters.status) {
    list = list.filter((h) => h.status === filters.status)
  }
  if (filters.district) {
    list = list.filter((h) => h.district === filters.district)
  }
  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase()
    list = list.filter(
      (h) =>
        h.name.toLowerCase().includes(kw) ||
        h.address.toLowerCase().includes(kw)
    )
  }
  return list.length
})

const rentFormatter = (_row: any, _column: any, cellValue: number) => {
  return '¥' + cellValue.toLocaleString()
}

const handleSearch = () => {
  pagination.page = 1
}

const handleReset = () => {
  filters.status = ''
  filters.district = ''
  filters.keyword = ''
  pagination.page = 1
}

const handleSizeChange = () => {
  pagination.page = 1
}

const handlePageChange = () => {}

const handleView = (row: House) => {
  currentHouse.value = row
  dialogVisible.value = true
}

const handleEdit = (row: House) => {
  router.push(`/house/${row.id}`)
}

const handleDelete = (row: House) => {
  ElMessageBox.confirm(`确认删除房源「${row.name}」？删除后不可恢复。`, '删除确认', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage.success('房源已删除')
    })
    .catch(() => {})
}
</script>

<style scoped>
.el-row {
  align-items: center;
}
</style>
