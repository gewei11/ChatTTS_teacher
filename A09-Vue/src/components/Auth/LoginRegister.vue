<template>
  <div class="login-register">
    <div class="contain">
      <div class="big-box" :class="{ active: isLogin }">
        <div class="big-contain" key="bigContainLogin" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <div class="bform">
            <el-input placeholder="用户名" v-model="form.username" clearable :prefix-icon="User"/>
            <el-input type="password" placeholder="密码" v-model="form.password" clearable :prefix-icon="Lock"/>
            <div class="captcha-container">
              <el-input placeholder="验证码" v-model="form.captcha" style="width: 60%;" />
              <img :src="captchaSrc" alt="captcha" @click="refreshCaptcha" style="cursor: pointer; margin-left: 10px;" />
            </div>
          </div>
          <el-button class="bbutton" @click="login" type="primary">登录</el-button>
          <!-- <span style="color: rgb(94, 89, 235); font-size: 0.8em; margin-top: 1em; cursor: pointer; margin-left: 150px;">微信登录</span> -->
        </div>
        <div class="big-contain" key="bigContainRegister" v-else>
          <div class="btitle">创建账户</div>
          <div class="bform">
            <el-input placeholder="用户名" v-model="form.username" :prefix-icon="User" clearable/>
            <el-input type="email" placeholder="邮箱" v-model="form.email" :prefix-icon="Message" clearable/>
            <el-input type="password" placeholder="密码" v-model="form.password" :prefix-icon="Lock" clearable/>
          </div>
          <el-button class="bbutton" @click="register" type="primary">注册</el-button>
        </div>
      </div>
      <div class="small-box" :class="{ active: isLogin }">
        <div class="small-contain" key="smallContainRegister" v-if="isLogin">
          <div class="stitle">你好，朋友!</div>
          <p class="scontent">开始注册，和我们一起旅行</p>
          <el-button class="sbutton" @click="isLogin = false" type="info" plain>注册</el-button>
        </div>
        <div class="small-contain" key="smallContainLogin" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">与我们保持联系，请登录你的账户</p>
          <el-button class="sbutton" @click="isLogin = true" type="info" plain>登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElInput, ElButton } from 'element-plus'
import { User, Lock, Message } from '@element-plus/icons-vue'

const router = useRouter()

const isLogin = ref(false)
const form = ref({
  username: '',
  email: '',
  password: '',
  captcha: ''
})
const captchaSrc = ref('')

onMounted(() => {
  refreshCaptcha()
})

const refreshCaptcha = () => {
  // 这里模拟从服务器获取验证码图片
  captchaSrc.value = '../../assets/image/verify_code_20250126161844.jpg'
}

const wechatLogin = () => {
  // 这里可以添加微信登录的逻辑
}

const login = () => {
  // 这里可以添加登录的逻辑
  router.push('/homePage')
  console.log('登录成功')
}

const register = () => {
  // 这里可以添加注册的逻辑
}
</script>

<style scoped>
.login-register {
  width: 99vw;
  height: 98vh;
  box-sizing: border-box;
  background-image: url('../../assets/image/h7.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
}

.contain {
  width: 58%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  /* 添加半透明背景 */
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
    0 0 6px #f0f0f0;
  background-image: url('../../assets/image/h1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.9;
}
.el-input{
  width: 360px;
  height: 45px;
}

.big-box {
  width: 65%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}

.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btitle {
  font-size: 45px;
  font-weight: bold;
  color: rgb(0, 0, 0);
  font-family: '仿宋';
  opacity: 0.8;
}

.bform {
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}

.bform input {
  width: 50%;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}

.captcha-container {
  display: flex;
  align-items: center;
}

.captcha-container img {
  width: 80px;
  height: 30px;
  margin-left: 1em;
  cursor: pointer;
}

.bbutton {
  width: 35%;
  height: 45px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.social-login img {
  width: 40px;
  height: 40px;
  margin-top: 1em;
  cursor: pointer;
}

.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}

.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}

.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}

.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}

.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1.5s;
}
</style>