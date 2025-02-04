<template>
    <div class="container">
      <el-tabs type="border-card" class="demo-tabs">
        <!-- 信息编辑 -->
        <el-tab-pane label="信息编辑">
          <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="用户名">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="用户邮箱">
              <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="居住地址">
              <el-input v-model="form.address" />
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input v-model="form.contact" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">修改</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
  
        <!-- 密码修改 -->
        <el-tab-pane label="密码修改">
          <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="旧密码" >
              <el-input v-model="form.oldPassword" type="password" clearable />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="form.newPassword" type="password" clearable />
            </el-form-item>
            <el-form-item label="确认新密码">
              <el-input v-model="form.confirmPassword" type="password" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changePassword">修改</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
  
        <!-- 头像上传 -->
        <el-tab-pane label="头像上传">
          <div class="upload-container">
            <el-upload
              ref="upload"
              :action="uploadUrl"
              :show-file-list="false"
              :on-change="handleFileChange"
              :auto-upload="false"
            >
              <div v-if="!form.avatarUrl" class="avatar-uploader">
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
                <!-- <span>点击或拖拽上传</span> -->
              </div>
              <img v-else :src="form.avatarUrl" class="avatar-preview" />
            </el-upload>
            <div v-if="form.avatarUrl" class="confirm-buttons">
              <el-button type="primary" @click="confirmUpload">确认上传</el-button>
              <el-button @click="cancelUpload">取消</el-button>
            </div>
          </div>
        </el-tab-pane>
  
        <!-- Task -->
        <el-tab-pane label="Task">Task</el-tab-pane>
      </el-tabs>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { ElMessage, UploadProps, UploadInstance, UploadUserFile } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  
  const upload = ref<UploadInstance>()
  const uploadUrl = 'https://jsonplaceholder.typicode.com/posts/' // 替换为实际的API端点
  
  const form = reactive({
    name: '',
    email: '',
    address: '',
    contact: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatarUrl: ''
  })
  
  const onSubmit = () => {
    console.log('Submit info changes!')
  }
  
  const changePassword = () => {
    console.log('Change password!')
  }
  
  const handleFileChange: UploadProps['onChange'] = (file: UploadUserFile) => {
    if (!beforeAvatarUpload(file.raw!)) return
    form.avatarUrl = URL.createObjectURL(file.raw!)
  }
  
  const beforeAvatarUpload = (rawFile: File): boolean => {
    if (rawFile.type !== 'image/jpeg') {
      ElMessage.error('头像必须是JPG格式!')
      return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('头像大小不能超过2MB!')
      return false
    }
    return true
  }
  
  const confirmUpload = () => {
    if (form.avatarUrl && upload.value) {
      upload.value.submit()
      console.log('Avatar confirmed and uploaded.')
    }
  }
  
  const cancelUpload = () => {
    form.avatarUrl = ''
    if (upload.value) {
      upload.value.clearFiles()
    }
  }
  </script>
  
  <style scoped>
  .container {
    border: 1px solid #ccc;
    padding: 20px;
    min-height: 100px;
    height: 600px;
    width: 80%;
    margin: 90px auto;
  }
  
  .demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
  
  .el-form {
    margin: 20px auto;
    padding: 10px;
  }
  
  .upload-container {
    background: #ffffff;
    width: 50%;
    height: auto;
    padding: 20px;
    margin: 30px auto;
    border-radius: 10px;
    border: 2px dashed #d9d9d9;
    text-align: center;
    position: relative;
  }
  
  .upload-container:hover {
    border-color: #409EFF;
  }
  
  .avatar-uploader {
    display: inline-block;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
  }
  
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  
  .avatar-uploader-icon {
    font-size: 26px;
    color: #8c939d;
  }
  
  .avatar-preview {
    width: 178px;
    height: 178px;
    display: block;
  }
  
  .confirm-buttons {
    margin-top: 10px;
  }
  </style>