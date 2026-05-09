<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const activeTab = ref('sms')

const smsForm = reactive({
  billReminder: true,
  contractExpiryReminder: true,
  dunningNotice: true,
  systemNotice: false,
  signature: '【金航建设】',
})

const emailForm = reactive({
  server: 'smtp.example.com',
  port: 465,
  username: 'admin@example.com',
  password: '',
  senderName: '金航建设',
  senderEmail: 'noreply@example.com',
})

const systemMsgForm = reactive({
  enabled: true,
  retentionDays: 90,
})

const testEmail = ref('')

function handleSmsSave() {
  ElMessage.success('短信通知配置已保存')
}

function handleEmailSave() {
  ElMessage.success('邮件通知配置已保存')
}

function handleSystemMsgSave() {
  ElMessage.success('系统消息配置已保存')
}

function handleTestEmail() {
  if (!testEmail.value) {
    ElMessage.warning('请输入测试邮箱')
    return
  }
  ElMessage.success(`测试邮件已发送至 ${testEmail.value}`)
  testEmail.value = ''
}

function handleClearNotifications() {
  ElMessageBox.confirm('确定要清空全部系统消息吗？此操作不可恢复。', '清空确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success('全部系统消息已清空')
  }).catch(() => {})
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>通知配置</h2>
    </div>

    <div class="section-card">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="短信通知" name="sms">
          <el-form :model="smsForm" label-width="140px" style="max-width: 600px">
            <el-form-item label="账单提醒">
              <el-switch v-model="smsForm.billReminder" />
            </el-form-item>
            <el-form-item label="合同到期提醒">
              <el-switch v-model="smsForm.contractExpiryReminder" />
            </el-form-item>
            <el-form-item label="催缴通知">
              <el-switch v-model="smsForm.dunningNotice" />
            </el-form-item>
            <el-form-item label="系统通知">
              <el-switch v-model="smsForm.systemNotice" />
            </el-form-item>
            <el-form-item label="短信签名">
              <el-input v-model="smsForm.signature" style="width: 200px" />
            </el-form-item>
          </el-form>

          <div style="margin-top: 24px">
            <h4 style="margin-bottom: 12px; font-size: 15px; color: var(--text-dark)">短信模板预览</h4>
            <div class="template-cards">
              <div class="template-card">
                <div class="template-title">账单提醒模板</div>
                <div class="template-body">
                  {{ smsForm.signature }}尊敬的{租户姓名}，您的{月份}房租账单已生成，金额{金额}元，请于{截止日期}前完成支付。如有疑问请联系物业。
                </div>
              </div>
              <div class="template-card">
                <div class="template-title">催缴通知模板</div>
                <div class="template-body">
                  {{ smsForm.signature }}温馨提示：您的{月份}房租账单（金额{金额}元）已逾期，请尽快完成支付以避免产生滞纳金。
                </div>
              </div>
            </div>
          </div>

          <div style="margin-top: 24px">
            <el-button type="primary" @click="handleSmsSave">保存配置</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="邮件通知" name="email">
          <el-form :model="emailForm" label-width="120px" style="max-width: 560px">
            <el-form-item label="SMTP服务器">
              <el-input v-model="emailForm.server" />
            </el-form-item>
            <el-form-item label="端口">
              <el-input v-model.number="emailForm.port" />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="emailForm.username" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="emailForm.password" type="password" show-password placeholder="请输入SMTP密码" />
            </el-form-item>
            <el-form-item label="发件人名称">
              <el-input v-model="emailForm.senderName" />
            </el-form-item>
            <el-form-item label="发件人邮箱">
              <el-input v-model="emailForm.senderEmail" />
            </el-form-item>
          </el-form>

          <div style="margin-top: 20px; display: flex; gap: 12px; align-items: flex-end">
            <el-form-item label="测试发送">
              <el-input v-model="testEmail" placeholder="输入测试邮箱地址" style="width: 240px" />
            </el-form-item>
            <el-button @click="handleTestEmail">发送测试邮件</el-button>
          </div>

          <div style="margin-top: 24px">
            <el-button type="primary" @click="handleEmailSave">保存配置</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="系统消息" name="system">
          <el-form :model="systemMsgForm" label-width="140px" style="max-width: 600px">
            <el-form-item label="系统通知">
              <el-switch v-model="systemMsgForm.enabled" />
              <span style="margin-left: 8px; color: var(--text-muted); font-size: 13px">
                {{ systemMsgForm.enabled ? '已启用' : '已关闭' }}
              </span>
            </el-form-item>
            <el-form-item label="消息保留期限">
              <el-select v-model="systemMsgForm.retentionDays" style="width: 200px">
                <el-option :value="30" label="30天" />
                <el-option :value="60" label="60天" />
                <el-option :value="90" label="90天" />
                <el-option :value="180" label="180天" />
              </el-select>
              <span style="margin-left: 8px; color: var(--text-muted); font-size: 13px">
                超过期限的消息将自动清理
              </span>
            </el-form-item>
          </el-form>

          <div style="margin-top: 20px; display: flex; gap: 12px">
            <el-button type="danger" @click="handleClearNotifications">清空全部通知</el-button>
          </div>

          <div style="margin-top: 24px">
            <el-button type="primary" @click="handleSystemMsgSave">保存配置</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped>
.template-cards {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.template-card {
  flex: 1;
  min-width: 280px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 16px;
  background: #fafbfc;
}

.template-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px dashed #e0e0e0;
}

.template-body {
  font-size: 13px;
  color: #666;
  line-height: 1.8;
}
</style>