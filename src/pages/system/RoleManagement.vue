<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { mockRoles } from '@/data/users'

interface Role {
  id: string
  name: string
  code: string
  description: string
  permissions: string[]
}

const roles = ref<Role[]>(JSON.parse(JSON.stringify(mockRoles)))
const activeRoleId = ref(roles.value[0]?.id ?? '')
const editingPermissions = ref<string[]>([])
const activeCollapse = ref<string[]>(['房源管理', '合同管理', '费用管理', '资产管理', '系统设置'])

const activeRole = computed(() =>
  roles.value.find((r) => r.id === activeRoleId.value) ?? null
)

const permissionCategories = [
  {
    label: '房源管理',
    permissions: [
      { label: '查看', value: 'house:read' },
      { label: '新增', value: 'house:create' },
      { label: '编辑', value: 'house:edit' },
      { label: '删除', value: 'house:delete' },
    ],
  },
  {
    label: '合同管理',
    permissions: [
      { label: '查看', value: 'contract:read' },
      { label: '审核', value: 'contract:review' },
      { label: '模板管理', value: 'contract:template' },
    ],
  },
  {
    label: '费用管理',
    permissions: [
      { label: '配置', value: 'fee:config' },
      { label: '账单', value: 'fee:bill' },
      { label: '台账', value: 'fee:ledger' },
    ],
  },
  {
    label: '资产管理',
    permissions: [
      { label: '查看', value: 'asset:read' },
      { label: '统计', value: 'asset:stats' },
    ],
  },
  {
    label: '系统设置',
    permissions: [
      { label: '用户管理', value: 'system:user' },
      { label: '角色管理', value: 'system:role' },
      { label: '日志查看', value: 'system:log' },
      { label: '通知配置', value: 'system:notification' },
    ],
  },
]

function selectRole(role: Role) {
  activeRoleId.value = role.id
  if (role.permissions.includes('*')) {
    editingPermissions.value = permissionCategories.flatMap((c) =>
      c.permissions.map((p) => p.value)
    )
  } else {
    editingPermissions.value = [...role.permissions]
  }
}

function handleSave() {
  if (!activeRole.value) return
  const idx = roles.value.findIndex((r) => r.id === activeRoleId.value)
  if (idx !== -1) {
    roles.value[idx].permissions = [...editingPermissions.value]
  }
  ElMessage.success('权限已保存')
}

selectRole(roles.value[0])
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>角色权限管理</h2>
    </div>

    <div style="display: flex; gap: 20px">
      <el-card style="width: 300px; height: fit-content">
        <div
          v-for="role in roles"
          :key="role.id"
          class="role-card"
          :class="{ 'role-card-active': activeRoleId === role.id }"
          @click="selectRole(role)"
        >
          <div class="role-name">{{ role.name }}</div>
          <div class="role-desc">{{ role.description }}</div>
        </div>
      </el-card>

      <div v-if="activeRole" class="section-card" style="flex: 1">
        <div class="card-header">
          <div>
            <h3>{{ activeRole.name }}</h3>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px">
              编码：{{ activeRole.code }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ activeRole.description }}
            </div>
          </div>
        </div>

        <el-collapse v-model="activeCollapse" style="border: none">
          <el-collapse-item
            v-for="cat in permissionCategories"
            :key="cat.label"
            :title="cat.label"
            :name="cat.label"
          >
            <el-checkbox-group v-model="editingPermissions">
              <el-checkbox
                v-for="perm in cat.permissions"
                :key="perm.value"
                :label="perm.value"
                :value="perm.value"
              >
                {{ perm.label }}
              </el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
        </el-collapse>

        <div style="margin-top: 20px">
          <el-button type="primary" @click="handleSave">保存权限</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.role-card {
  padding: 14px 16px;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  margin-bottom: 8px;
  background: #f8f9fb;
}

.role-card:hover {
  background: #f0f1f5;
}

.role-card-active {
  border-color: #c9a84c;
  background: #fdf8ee;
}

.role-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.role-desc {
  font-size: 12px;
  color: var(--text-muted);
}
</style>