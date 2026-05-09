import type { User } from '@/types'

export const mockUsers: User[] = [
  {
    id: 'U001',
    username: 'admin',
    name: '系统管理员',
    phone: '138****0001',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 'U002',
    username: 'zhangsan',
    name: '张三',
    phone: '138****0002',
    role: 'operator',
    status: 'active',
    createdAt: '2024-03-15',
  },
  {
    id: 'U003',
    username: 'lisi',
    name: '李四',
    phone: '138****0003',
    role: 'operator',
    status: 'active',
    createdAt: '2024-06-20',
  },
  {
    id: 'U004',
    username: 'wangwu',
    name: '王五',
    phone: '138****0004',
    role: 'operator',
    status: 'disabled',
    createdAt: '2024-09-01',
  },
]

export const mockRoles = [
  {
    id: 'R001',
    name: '超级管理员',
    code: 'admin',
    description: '拥有系统全部权限',
    permissions: ['*'],
  },
  {
    id: 'R002',
    name: '运营人员',
    code: 'operator',
    description: '可管理房源、合同、费用',
    permissions: ['house:*', 'contract:*', 'fee:*', 'asset:read'],
  },
]

export const mockOperationLogs = [
  {
    id: 'L001',
    operator: '系统管理员',
    action: '合同审批',
    detail: '审核通过合同 C001（北京创新科技有限公司）',
    ip: '192.168.1.100',
    createdAt: '2025-04-05 09:30:00',
  },
  {
    id: 'L002',
    operator: '系统管理员',
    action: '账单发布',
    detail: '发布2025年05月账单，共3条',
    ip: '192.168.1.100',
    createdAt: '2025-04-20 10:00:00',
  },
  {
    id: 'L003',
    operator: '张三',
    action: '房源编辑',
    detail: '编辑房源 H001 信息',
    ip: '192.168.1.101',
    createdAt: '2025-04-18 14:20:00',
  },
  {
    id: 'L004',
    operator: '系统管理员',
    action: '用户管理',
    detail: '创建新用户 王五',
    ip: '192.168.1.100',
    createdAt: '2025-04-15 11:00:00',
  },
  {
    id: 'L005',
    operator: '李四',
    action: '费用配置',
    detail: '修改水电费阶梯单价',
    ip: '192.168.1.102',
    createdAt: '2025-04-12 16:45:00',
  },
  {
    id: 'L006',
    operator: '系统管理员',
    action: '系统设置',
    detail: '更新催缴通知模板',
    ip: '192.168.1.100',
    createdAt: '2025-04-10 08:30:00',
  },
]
