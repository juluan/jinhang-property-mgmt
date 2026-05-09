<template>
  <div class="page-container">
    <div class="page-header">
      <h2>{{ isEdit ? '编辑房源' : '新增房源' }}</h2>
    </div>

    <div class="section-card">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="房源名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入房源名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属区域" prop="district">
              <el-select v-model="form.district" placeholder="请选择所属区域" style="width: 100%">
                <el-option label="朝阳区" value="朝阳区" />
                <el-option label="海淀区" value="海淀区" />
                <el-option label="西城区" value="西城区" />
                <el-option label="东城区" value="东城区" />
                <el-option label="丰台区" value="丰台区" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入详细地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="面积" prop="area">
              <el-input-number v-model="form.area" :min="10" :max="10000" style="width: 100%" />
              <span style="margin-left: 8px; color: #909399">m²</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="户型" prop="layout">
              <el-select v-model="form.layout" placeholder="请选择户型" style="width: 100%">
                <el-option label="一室一厅" value="一室一厅" />
                <el-option label="两室一厅" value="两室一厅" />
                <el-option label="两室两厅" value="两室两厅" />
                <el-option label="三室一厅" value="三室一厅" />
                <el-option label="三室两厅" value="三室两厅" />
                <el-option label="四室两厅" value="四室两厅" />
                <el-option label="开间" value="开间" />
                <el-option label="复式" value="复式" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在楼层" prop="floor">
              <el-input v-model="form.floor" placeholder="如 15/28层" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="朝向" prop="orientation">
              <el-select v-model="form.orientation" placeholder="请选择朝向" style="width: 100%">
                <el-option label="南北通透" value="南北通透" />
                <el-option label="南向" value="南向" />
                <el-option label="东向" value="东向" />
                <el-option label="西向" value="西向" />
                <el-option label="北向" value="北向" />
                <el-option label="东南朝向" value="东南朝向" />
                <el-option label="西南朝向" value="西南朝向" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="月租金" prop="rent">
              <el-input-number v-model="form.rent" :min="0" :step="100" style="width: 100%" />
              <span style="margin-left: 8px; color: #909399">元/月</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="押金方式" prop="deposit">
              <el-select v-model="form.deposit" placeholder="请选择押金方式" style="width: 100%">
                <el-option label="押一付一" value="押一付一" />
                <el-option label="押一付二" value="押一付二" />
                <el-option label="押一付三" value="押一付三" />
                <el-option label="押二付三" value="押二付三" />
                <el-option label="押二付六" value="押二付六" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="封面图片" prop="coverImage">
              <el-input v-model="form.coverImage" placeholder="请输入封面图片URL" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="设施配置" prop="facilities">
          <el-checkbox-group v-model="form.facilities">
            <el-checkbox label="中央空调" value="中央空调" />
            <el-checkbox label="电梯" value="电梯" />
            <el-checkbox label="停车场" value="停车场" />
            <el-checkbox label="24小时安保" value="24小时安保" />
            <el-checkbox label="智能门禁" value="智能门禁" />
            <el-checkbox label="无障碍通道" value="无障碍通道" />
            <el-checkbox label="独立卫生间" value="独立卫生间" />
            <el-checkbox label="茶水间" value="茶水间" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="房源描述" prop="description">
          <el-input v-model="form.description" type="textarea" :rows="4" placeholder="请输入房源描述" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">保存</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { mockHouses } from '@/data/houses'

const route = useRoute()
const router = useRouter()

const formRef = ref<FormInstance>()
const submitting = ref(false)

const isEdit = computed(() => !!route.params.id)

const form = reactive({
  name: '',
  district: '',
  address: '',
  area: undefined as number | undefined,
  layout: '',
  floor: '',
  orientation: '',
  rent: undefined as number | undefined,
  deposit: '',
  facilities: [] as string[],
  description: '',
  coverImage: ''
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入房源名称', trigger: 'blur' }],
  address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
  area: [{ required: true, message: '请输入面积', trigger: 'blur' }],
  rent: [{ required: true, message: '请输入月租金', trigger: 'blur' }]
}

onMounted(() => {
  if (isEdit.value) {
    const id = Number(route.params.id)
    const house = mockHouses.find((h) => h.id === id)
    if (house) {
      form.name = house.name
      form.district = house.district
      form.address = house.address
      form.area = house.area
      form.layout = house.layout
      form.floor = house.floor
      form.orientation = house.orientation
      form.rent = house.rent
      form.deposit = house.deposit
      form.facilities = [...house.facilities]
      form.description = house.description
      form.coverImage = house.coverImage
    } else {
      ElMessage.error('房源不存在')
      router.push('/house')
    }
  }
})

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      submitting.value = true
      setTimeout(() => {
        submitting.value = false
        ElMessage.success(isEdit.value ? '房源修改成功' : '房源创建成功')
        router.push('/house')
      }, 400)
    }
  })
}

const handleCancel = () => {
  router.push('/house')
}
</script>
