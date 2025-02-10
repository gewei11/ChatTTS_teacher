<template>
    <div class="settings">
      <el-form :model="settings" label-width="120px" class="settings-form">
        <!-- 修改 Header 和 Aside 颜色 -->
        <el-form-item label="Header 颜色">
          <el-color-picker v-model="settings.headerColor" />
        </el-form-item>
        <el-form-item label="Aside 颜色">
          <el-color-picker v-model="settings.asideColor" />
        </el-form-item>
  
        <!-- 修改背景颜色或背景图 -->
        <el-form-item label="背景颜色">
          <el-color-picker v-model="settings.backgroundColor" />
        </el-form-item>
        <el-form-item label="背景图片">
          <el-upload
            class="upload-demo"
            action=""
            :on-change="handleBackgroundImageChange"
            :show-file-list="false"
          >
            <el-button>上传背景图片</el-button>
          </el-upload>
        </el-form-item>
  
        <!-- 修改 Logo -->
        <el-form-item label="Logo">
          <el-upload
            class="upload-demo"
            action=""
            :on-change="handleLogoChange"
            :show-file-list="false"
          >
            <el-button>上传 Logo</el-button>
          </el-upload>
        </el-form-item>
  
        <!-- 修改网站名称 -->
        <el-form-item label="网站名称">
          <el-input v-model="settings.siteName" placeholder="输入网站名称" />
        </el-form-item>
  
        <!-- 修改左侧菜单栏名称 -->
        <el-form-item label="菜单栏名称">
          <el-input
            v-for="(item, index) in settings.menuItems"
            :key="index"
            v-model="item.name"
            :placeholder="'菜单项 ' + (index + 1)"
          />
        </el-form-item>
  
        <!-- 修改 Tabs 名称 -->
        <el-form-item label="Tabs 名称">
          <el-input
            v-for="(tab, index) in settings.tabs"
            :key="index"
            v-model="tab.name"
            :placeholder="'Tab ' + (index + 1)"
          />
        </el-form-item>
  
        <!-- 保存设置 -->
        <el-form-item>
          <el-button type="primary" @click="saveSettings">保存设置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        settings: {
          headerColor: "#123456", // Header 颜色
          asideColor: "#654321", // Aside 颜色
          backgroundColor: "#f0f0f0", // 背景颜色
          backgroundImage: "", // 背景图片路径
          logo: "", // Logo 路径
          siteName: "默认网站名称", // 网站名称
          menuItems: [
            { name: "首页" },
            { name: "工作台" },
            { name: "声音库" },
            { name: "设置" },
          ], // 菜单栏名称
          tabs: [{ name: "Tab 1" }, { name: "Tab 2" }], // Tabs 名称
        },
      };
    },
    methods: {
      handleBackgroundImageChange(file) {
        // 模拟获取上传的背景图片路径
        this.settings.backgroundImage = URL.createObjectURL(file.raw);
      },
      handleLogoChange(file) {
        // 模拟获取上传的 Logo 路径
        this.settings.logo = URL.createObjectURL(file.raw);
      },
      saveSettings() {
        // 保存设置（可以通过 API 提交或在本地存储）
        console.log("保存的设置：", this.settings);
        alert("设置已保存！");
      },
    },
  };
  </script>
  
  <style scoped>
  .settings {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
  }
  
  .settings-form {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  