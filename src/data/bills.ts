import type { Bill, FeeType } from '@/types'

export const billStatusMap: Record<string, string> = {
  draft: '草稿',
  published: '待缴费',
  paid: '已缴费',
  overdue: '已逾期'
}

export const billStatusTypes: Record<string, '' | 'warning' | 'success' | 'danger' | 'info'> = {
  draft: 'info',
  published: 'warning',
  paid: 'success',
  overdue: 'danger'
}

export const mockFeeTypes: FeeType[] = [
  { id: 'FT-01', name: '物业管理费', code: 'WYF', defaultValue: 0, enabled: true },
  { id: 'FT-02', name: '水电费', code: 'SDF', defaultValue: 0, enabled: true },
  { id: 'FT-03', name: '电梯维保费', code: 'DTF', defaultValue: 200, enabled: true },
  { id: 'FT-04', name: '垃圾清运费', code: 'LJY', defaultValue: 150, enabled: true },
  { id: 'FT-05', name: '公共照明费', code: 'GGF', defaultValue: 100, enabled: true },
  { id: 'FT-06', name: '绿化养护费', code: 'LHY', defaultValue: 200, enabled: true },
  { id: 'FT-07', name: '停车费', code: 'TCF', defaultValue: 500, enabled: false },
  { id: 'FT-08', name: '维修基金', code: 'WXJ', defaultValue: 300, enabled: false }
]

export const mockBills: Bill[] = [
  {
    id: 'BILL-2026-001',
    houseName: '金航大厦A栋1201室',
    period: '2026年5月',
    totalAmount: 3200.00,
    status: 'published',
    dueDate: '2026-05-15',
    feeItems: [
      { name: '物业管理费', amount: 1200.00, description: '建筑面积120m² × 10元/m²' },
      { name: '水电费', amount: 350.00, description: '水费150元 + 电费200元' },
      { name: '电梯维保费', amount: 200.00, description: '月度电梯维护分摊' },
      { name: '垃圾清运费', amount: 150.00, description: '月度生活垃圾处理费' },
      { name: '公共照明费', amount: 100.00, description: '公共区域照明电费分摊' },
      { name: '绿化养护费', amount: 200.00, description: '社区绿化维护分摊' },
      { name: '其他费用', amount: 1000.00, description: '含停车费、维修基金等' }
    ]
  },
  {
    id: 'BILL-2026-002',
    houseName: '金航大厦A栋1201室',
    period: '2026年4月',
    totalAmount: 3150.00,
    status: 'paid',
    dueDate: '2026-04-15',
    paidDate: '2026-04-10',
    feeItems: [
      { name: '物业管理费', amount: 1200.00, description: '建筑面积120m² × 10元/m²' },
      { name: '水电费', amount: 330.00, description: '水费145元 + 电费185元' },
      { name: '电梯维保费', amount: 200.00, description: '月度电梯维护分摊' },
      { name: '垃圾清运费', amount: 150.00, description: '月度生活垃圾处理费' },
      { name: '公共照明费', amount: 100.00, description: '公共区域照明电费分摊' },
      { name: '绿化养护费', amount: 200.00, description: '社区绿化维护分摊' },
      { name: '其他费用', amount: 970.00, description: '含停车费、维修基金等' }
    ]
  },
  {
    id: 'BILL-2026-003',
    houseName: '金航大厦A栋1201室',
    period: '2026年3月',
    totalAmount: 2800.00,
    status: 'overdue',
    dueDate: '2026-03-15',
    feeItems: [
      { name: '物业管理费', amount: 1200.00, description: '建筑面积120m² × 10元/m²' },
      { name: '水电费', amount: 280.00, description: '水费130元 + 电费150元' },
      { name: '电梯维保费', amount: 200.00, description: '月度电梯维护分摊' },
      { name: '垃圾清运费', amount: 150.00, description: '月度生活垃圾处理费' },
      { name: '公共照明费', amount: 100.00, description: '公共区域照明电费分摊' },
      { name: '绿化养护费', amount: 200.00, description: '社区绿化维护分摊' },
      { name: '其他费用', amount: 670.00, description: '含停车费、维修基金等' }
    ]
  },
  {
    id: 'BILL-2026-004',
    houseName: '金航大厦B栋305室',
    period: '2026年5月',
    totalAmount: 2450.00,
    status: 'published',
    dueDate: '2026-05-20',
    feeItems: [
      { name: '物业管理费', amount: 900.00, description: '建筑面积90m² × 10元/m²' },
      { name: '水电费', amount: 280.00, description: '水费120元 + 电费160元' },
      { name: '电梯维保费', amount: 200.00, description: '月度电梯维护分摊' },
      { name: '垃圾清运费', amount: 120.00, description: '月度生活垃圾处理费' },
      { name: '公共照明费', amount: 80.00, description: '公共区域照明电费分摊' },
      { name: '绿化养护费', amount: 170.00, description: '社区绿化维护分摊' },
      { name: '其他费用', amount: 700.00, description: '含停车费、维修基金等' }
    ]
  },
  {
    id: 'BILL-2026-005',
    houseName: '金航大厦B栋305室',
    period: '2026年4月',
    totalAmount: 2380.00,
    status: 'paid',
    dueDate: '2026-04-20',
    paidDate: '2026-04-18',
    feeItems: [
      { name: '物业管理费', amount: 900.00, description: '建筑面积90m² × 10元/m²' },
      { name: '水电费', amount: 260.00, description: '水费110元 + 电费150元' },
      { name: '电梯维保费', amount: 200.00, description: '月度电梯维护分摊' },
      { name: '垃圾清运费', amount: 120.00, description: '月度生活垃圾处理费' },
      { name: '公共照明费', amount: 80.00, description: '公共区域照明电费分摊' },
      { name: '绿化养护费', amount: 170.00, description: '社区绿化维护分摊' },
      { name: '其他费用', amount: 650.00, description: '含停车费、维修基金等' }
    ]
  },
  {
    id: 'BILL-2026-006',
    houseName: '金航大厦C栋808室',
    period: '2026年5月',
    totalAmount: 5100.00,
    status: 'draft',
    dueDate: '2026-05-25',
    feeItems: [
      { name: '物业管理费', amount: 2000.00, description: '建筑面积200m² × 10元/m²' },
      { name: '水电费', amount: 520.00, description: '水费220元 + 电费300元' },
      { name: '电梯维保费', amount: 300.00, description: '月度电梯维护分摊' },
      { name: '垃圾清运费', amount: 200.00, description: '月度生活垃圾处理费' },
      { name: '公共照明费', amount: 150.00, description: '公共区域照明电费分摊' },
      { name: '绿化养护费', amount: 280.00, description: '社区绿化维护分摊' },
      { name: '其他费用', amount: 1650.00, description: '含停车费、维修基金等' }
    ]
  }
]
