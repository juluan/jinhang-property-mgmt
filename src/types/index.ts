export interface House {
  id: string
  name: string
  type: 'shop' | 'office' | 'warehouse' | 'apartment'
  area: number
  floor: string
  price: number
  priceUnit: '月' | '年' | '天'
  status: 'available' | 'rented'
  address: string
  image: string
  images: string[]
  tags: string[]
  mapLocation: { lat: number; lng: number }
  contractId?: string
  tenantId?: string
}

export interface Contract {
  id: string
  houseName: string
  startDate: string
  endDate: string
  status: 'active' | 'expired' | 'pending'
  tenantName: string
  templateId: string
  fileUrls: string[]
  createTime: string
}

export interface ContractTemplate {
  id: string
  name: string
  version: string
  fileSize: string
  description: string
}

export interface FeeType {
  id: string
  name: string
  amount: number
  unit: string
  isRecurring: boolean
  isActive: boolean
}

export interface FeeItem {
  id: string
  period: string
  houseName: string
  houseId: string
  totalAmount: number
  status: 'paid' | 'unpaid' | 'pending'
  dueDate: string
  paidDate?: string
  contractId: string
  items: FeeDetail[]
}

export interface FeeDetail {
  name: string
  amount: number
}

export type BillItem = FeeItem

export interface Asset {
  id: string
  name: string
  type: string
  status: string
  houseId: string
  houseName: string
  value: number
  purchaseDate: string
  description: string
}

export interface User {
  id: string
  name: string
  role: string
  phone: string
  email: string
  status: string
}

export interface OperationLog {
  id: string
  user: string
  action: string
  module: string
  detail: string
  ip: string
  time: string
}

export interface Role {
  id: string
  name: string
  permissions: string[]
  userCount: number
}
