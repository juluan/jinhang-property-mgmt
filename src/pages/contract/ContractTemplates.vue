<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { ContractTemplate } from '@/types'
import { mockContractTemplates } from '@/data/contracts'

const templates = ref<ContractTemplate[]>([...mockContractTemplates])
const uploadVisible = ref(false)
const previewVisible = ref(false)
const currentTemplate = ref<ContractTemplate | null>(null)

const uploadForm = ref({
  name: '',
  version: '',
  fileName: '',
  fileSize: '',
})

function openUpload() {
  uploadForm.value = { name: '', version: '', fileName: '', fileSize: '' }
  uploadVisible.value = true
}

function confirmUpload() {
  if (!uploadForm.value.name || !uploadForm.value.version) {
    ElMessage.warning('请填写模板名称和版本号')
    return
  }
  const newTemplate: ContractTemplate = {
    id: 'CT' + String(templates.value.length + 1).padStart(3, '0'),
    name: uploadForm.value.name,
    version: uploadForm.value.version,
    fileName: uploadForm.value.fileName || '未命名文件',
    fileSize: uploadForm.value.fileSize || '-',
    variableCount: 0,
    createdAt: new Date().toISOString().slice(0, 10),
  }
  templates.value.unshift(newTemplate)
  ElMessage.success('模板上传成功')
  uploadVisible.value = false
}

function handleDownload(template: ContractTemplate) {
  ElMessage.success(`正在下载: ${template.fileName}`)
}

function openPreview(template: ContractTemplate) {
  currentTemplate.value = template
  previewVisible.value = true
}

function handleDelete(template: ContractTemplate) {
  ElMessageBox.confirm(`确定要删除模板「${template.name}」吗？`, '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    templates.value = templates.value.filter((t) => t.id !== template.id)
    ElMessage.success('模板已删除')
  })
}

const placeholderVariables = [
  { name: '承租方名称', key: '{{tenantName}}' },
  { name: '房源地址', key: '{{houseAddress}}' },
  { name: '租赁面积', key: '{{area}}' },
  { name: '月租金', key: '{{monthlyRent}}' },
  { name: '合同起始日期', key: '{{effectiveDate}}' },
  { name: '合同终止日期', key: '{{expiryDate}}' },
]

function handleUploadChange(file: any) {
  uploadForm.value.fileName = file.name
  uploadForm.value.fileSize = file.size
    ? file.size > 1024 * 1024
      ? (file.size / 1024 / 1024).toFixed(1) + ' MB'
      : (file.size / 1024).toFixed(0) + ' KB'
    : '-'
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>合同模板管理</h2>
      <el-button type="primary" :icon="Plus" @click="openUpload">上传新模板</el-button>
    </div>

    <div class="section-card">
      <el-table :data="templates" stripe style="width: 100%">
        <el-table-column prop="name" label="模板名称" min-width="200" />
        <el-table-column prop="version" label="版本" width="100" />
        <el-table-column prop="fileName" label="文件名" min-width="220" />
        <el-table-column prop="fileSize" label="文件大小" width="110" />
        <el-table-column prop="variableCount" label="变量数量" width="100" />
        <el-table-column prop="createdAt" label="更新时间" width="130" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" link @click="handleDownload(row)">
              下载
            </el-button>
            <el-button type="primary" size="small" link @click="openPreview(row)">
              预览
            </el-button>
            <el-button type="danger" size="small" link @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="uploadVisible" title="上传新模板" width="560px">
      <el-form :model="uploadForm" label-width="80px">
        <el-form-item label="模板名称" required>
          <el-input v-model="uploadForm.name" placeholder="请输入模板名称" />
        </el-form-item>
        <el-form-item label="版本号" required>
          <el-input v-model="uploadForm.version" placeholder="如 V1.0" />
        </el-form-item>
        <el-form-item label="模板文件">
          <el-upload
            drag
            :auto-upload="false"
            :on-change="handleUploadChange"
            :limit="1"
            accept=".pdf,.doc,.docx"
          >
            <div style="padding: 20px 0">
              <el-icon style="font-size: 40px; color: #c0c4cc">
                <Plus />
              </el-icon>
              <div style="margin-top: 8px; color: #606266">
                将文件拖到此处，或<em style="color: #409eff">点击上传</em>
              </div>
              <div style="margin-top: 4px; font-size: 12px; color: #c0c4cc">
                支持 .pdf, .doc, .docx 格式
              </div>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="uploadVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmUpload">确认上传</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="previewVisible" title="模板预览" width="600px">
      <template v-if="currentTemplate">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="模板名称" :span="2">
            {{ currentTemplate.name }}
          </el-descriptions-item>
          <el-descriptions-item label="版本">
            {{ currentTemplate.version }}
          </el-descriptions-item>
          <el-descriptions-item label="文件名">
            {{ currentTemplate.fileName }}
          </el-descriptions-item>
          <el-descriptions-item label="文件大小">
            {{ currentTemplate.fileSize }}
          </el-descriptions-item>
          <el-descriptions-item label="更新时间">
            {{ currentTemplate.createdAt }}
          </el-descriptions-item>
        </el-descriptions>
        <div style="margin-top: 20px">
          <div style="margin-bottom: 8px; font-weight: 500; font-size: 14px">模板变量列表</div>
          <el-table :data="placeholderVariables" size="small" style="width: 100%">
            <el-table-column prop="name" label="变量名称" />
            <el-table-column prop="key" label="变量标识">
              <template #default="{ row }">
                <el-tag size="small">{{ row.key }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
