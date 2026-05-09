<template>
  <div class="login-page">
    <div class="login-left">
      <div class="deco-circle deco-circle-1"></div>
      <div class="deco-circle deco-circle-2"></div>
      <div class="deco-circle deco-circle-3"></div>
      <div class="deco-shape deco-shape-1"></div>
      <div class="deco-shape deco-shape-2"></div>
      <div class="login-left-content">
        <h1 class="login-brand">金航建设</h1>
        <p class="login-brand-sub">出租方管理系统</p>
      </div>
      <div class="login-copyright">© 2025 金航建设 All Rights Reserved</div>
    </div>
    <div class="login-right">
      <div class="login-form-wrapper">
        <h2 class="login-form-title">欢迎登录</h2>
        <el-form ref="formRef" :model="loginForm" :rules="rules" size="large" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" :prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password :prefix-icon="Lock" />
          </el-form-item>
          <div class="login-form-extra">
            <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
            <a class="login-forgot" href="javascript:;">忘记密码？</a>
          </div>
          <el-button type="primary" class="login-btn" size="large" @click="handleLogin">登 录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()

const loginForm = reactive({
  username: '',
  password: '',
  remember: false,
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

function handleLogin() {
  formRef.value?.validate((valid) => {
    if (valid) {
      router.push('/dashboard')
    }
  })
}
</script>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.login-left {
  position: relative;
  width: 60%;
  background: linear-gradient(135deg, #1e3a5f 0%, #2a4f7a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.login-left-content {
  text-align: center;
  z-index: 1;
}

.login-brand {
  font-size: 52px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 8px;
  margin-bottom: 16px;
}

.login-brand-sub {
  font-size: 20px;
  color: #c9a84c;
  letter-spacing: 4px;
  font-weight: 400;
}

.login-copyright {
  position: absolute;
  bottom: 32px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
  z-index: 1;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.deco-circle-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -80px;
}

.deco-circle-2 {
  width: 200px;
  height: 200px;
  bottom: 120px;
  left: -60px;
  border-color: rgba(201, 168, 76, 0.15);
}

.deco-circle-3 {
  width: 300px;
  height: 300px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-color: rgba(255, 255, 255, 0.06);
}

.deco-shape {
  position: absolute;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.deco-shape-1 {
  width: 120px;
  height: 120px;
  top: 20%;
  right: 15%;
  transform: rotate(45deg);
}

.deco-shape-2 {
  width: 80px;
  height: 80px;
  bottom: 25%;
  left: 10%;
  transform: rotate(20deg);
  border-color: rgba(201, 168, 76, 0.1);
}

.login-right {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.login-form-wrapper {
  width: 380px;
}

.login-form-title {
  font-size: 28px;
  font-weight: 600;
  color: #1e3a5f;
  text-align: center;
  margin-bottom: 36px;
}

.login-form-extra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.login-forgot {
  font-size: 13px;
  color: #9e9eb8;
  text-decoration: none;
}

.login-forgot:hover {
  color: #c9a84c;
}

.login-btn {
  width: 100%;
  background: linear-gradient(135deg, #1e3a5f 0%, #2a4f7a 100%) !important;
  border: none !important;
  font-size: 16px;
  letter-spacing: 4px;
}

.login-btn:hover {
  background: linear-gradient(135deg, #c9a84c 0%, #d4b85c 100%) !important;
}
</style>
