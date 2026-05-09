import type { Contract, ContractTemplate } from '@/types'

export const contractStatusMap: Record<string, string> = {
  active: '进行中',
  expired: '已结束',
  pending: '待审核'
}

export const contractStatusTypes: Record<string, string> = {
  active: 'success',
  expired: 'info',
  pending: 'warning'
}

export const mockContracts: Contract[] = [
  {
    id: 'HT-2025-001',
    houseName: '金航大厦A栋1201室',
    startDate: '2025-09-01',
    endDate: '2028-08-31',
    status: 'active',
    tenantName: '张三',
    templateId: 'TPL-001',
    fileUrls: ['/uploads/contract-ht-2025-001.pdf'],
    createTime: '2025-08-15'
  },
  {
    id: 'HT-2024-003',
    houseName: '金航大厦B栋305室',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    status: 'active',
    tenantName: '张三',
    templateId: 'TPL-002',
    fileUrls: ['/uploads/contract-ht-2024-003.pdf'],
    createTime: '2023-12-20'
  },
  {
    id: 'HT-2023-002',
    houseName: '金航大厦C栋808室',
    startDate: '2023-03-01',
    endDate: '2026-02-28',
    status: 'expired',
    tenantName: '张三',
    templateId: 'TPL-001',
    fileUrls: ['/uploads/contract-ht-2023-002.pdf'],
    createTime: '2023-02-10'
  },
  {
    id: 'HT-2022-001',
    houseName: '金航大厦A栋1201室',
    startDate: '2022-01-01',
    endDate: '2024-12-31',
    status: 'expired',
    tenantName: '张三',
    templateId: 'TPL-003',
    fileUrls: ['/uploads/contract-ht-2022-001.pdf'],
    createTime: '2021-12-01'
  },
  {
    id: 'HT-2026-001',
    houseName: '金航大厦D栋1502室',
    startDate: '2026-06-01',
    endDate: '2029-05-31',
    status: 'pending',
    tenantName: '张三',
    templateId: 'TPL-002',
    fileUrls: [],
    createTime: '2026-04-20'
  }
]

export const mockContractTemplates: ContractTemplate[] = [
  {
    id: 'TPL-001',
    name: '标准商铺租赁合同',
    version: 'v2.1',
    fileSize: '256KB',
    description: '适用于商铺类物业租赁，包含标准条款'
  },
  {
    id: 'TPL-002',
    name: '写字楼租赁合同',
    version: 'v1.8',
    fileSize: '198KB',
    description: '适用于办公楼宇租赁场景'
  },
  {
    id: 'TPL-003',
    name: '住宅租赁合同',
    version: 'v3.0',
    fileSize: '312KB',
    description: '住宅类物业租赁标准合同模板'
  },
  {
    id: 'TPL-004',
    name: '短期租赁协议',
    version: 'v1.2',
    fileSize: '145KB',
    description: '适用于6个月以内的短期租赁'
  }
]