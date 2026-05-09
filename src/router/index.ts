import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/components/layout/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login.vue'),
    },
    {
      path: '/',
      component: AdminLayout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/pages/Dashboard.vue'),
        },
        {
          path: 'house',
          name: 'HouseList',
          component: () => import('@/pages/house/HouseList.vue'),
        },
        {
          path: 'house/new',
          name: 'HouseNew',
          component: () => import('@/pages/house/HouseForm.vue'),
        },
        {
          path: 'house/:id',
          name: 'HouseEdit',
          component: () => import('@/pages/house/HouseForm.vue'),
        },
        {
          path: 'contract',
          name: 'ContractList',
          component: () => import('@/pages/contract/ContractList.vue'),
        },
        {
          path: 'contract/templates',
          name: 'ContractTemplates',
          component: () => import('@/pages/contract/ContractTemplates.vue'),
        },
        {
          path: 'fee',
          name: 'FeeConfig',
          component: () => import('@/pages/fee/FeeConfig.vue'),
        },
        {
          path: 'fee/bills',
          name: 'BillManagement',
          component: () => import('@/pages/fee/BillManagement.vue'),
        },
        {
          path: 'fee/ledger',
          name: 'Ledger',
          component: () => import('@/pages/fee/Ledger.vue'),
        },
        {
          path: 'asset',
          name: 'AssetList',
          component: () => import('@/pages/asset/AssetList.vue'),
        },
        {
          path: 'asset/stats',
          name: 'AssetStats',
          component: () => import('@/pages/asset/AssetStats.vue'),
        },
        {
          path: 'system/user',
          name: 'UserManagement',
          component: () => import('@/pages/system/UserManagement.vue'),
        },
        {
          path: 'system/role',
          name: 'RoleManagement',
          component: () => import('@/pages/system/RoleManagement.vue'),
        },
        {
          path: 'system/log',
          name: 'OperationLog',
          component: () => import('@/pages/system/OperationLog.vue'),
        },
        {
          path: 'system/notification',
          name: 'NotificationConfig',
          component: () => import('@/pages/system/NotificationConfig.vue'),
        },
      ],
    },
    {
      path: '/tenant',
      component: () => import('@/components/tenant/TenantLayout.vue'),
      redirect: '/tenant/home',
      children: [
        {
          path: 'home',
          name: 'TenantHome',
          component: () => import('@/pages/tenant/TenantHome.vue'),
        },
        {
          path: 'contract',
          name: 'TenantContractTab',
          component: () => import('@/pages/tenant/TenantContractTab.vue'),
        },
        {
          path: 'mine',
          name: 'TenantMine',
          component: () => import('@/pages/tenant/TenantMine.vue'),
        },
        {
          path: 'house/:id',
          name: 'TenantHouseDetail',
          component: () => import('@/pages/tenant/TenantHouseDetail.vue'),
        },
        {
          path: 'contract/upload',
          name: 'TenantContractUpload',
          component: () => import('@/pages/tenant/TenantContractUpload.vue'),
        },
        {
          path: 'mine/bills',
          name: 'TenantBills',
          component: () => import('@/pages/tenant/TenantBills.vue'),
        },
        {
          path: 'bill/:id',
          name: 'TenantBillDetail',
          component: () => import('@/pages/tenant/TenantBillDetail.vue'),
        },
      ],
    },
  ],
})

export default router