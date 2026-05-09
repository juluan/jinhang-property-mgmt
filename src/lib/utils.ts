export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function formatMoney(amount: number): string {
  return amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function statusTagType(status: string): 'success' | 'warning' | 'info' | 'danger' {
  const map: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
    active: 'success',
    available: 'success',
    rented: 'warning',
    paid: 'success',
    unpaid: 'danger',
    overdue: 'danger',
    pending: 'warning',
    expired: 'info',
    published: 'warning',
  }
  return map[status] || 'info'
}
