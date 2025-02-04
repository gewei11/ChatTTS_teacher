<template>
  <div class="upload">
    <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽视频文件到此处，或 <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          视频大小不超过10M
        </div>
      </template>
    </el-upload>

    <div class="showVideo">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="视频名称" />
        <el-table-column prop="name" label="视频大小" />
        <el-table-column prop="state" label="视频时长" />
        <el-table-column prop="state" label="添加字幕">
          <template #default="{ row }">
            <el-tooltip :content="'添加字幕： ' + row.value" placement="top">
              <el-switch v-model="row.value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                active-value="开启" inactive-value="关闭" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="{ row }">
            <el-button link type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
            <el-button link type="primary" size="small" :disabled="!canDownload" @click="handleAction(row)">
              {{ canDownload ? '下载': '下载不可用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="input">
      <div class="custom-style">
        <el-segmented v-model="selectedCategory" :options="options" />
      </div>
      <div class="voice-cards">
        <div v-for="(voice, index) in filteredVoices" :key="index" class="voice-card">
          <div class="voice-header">
            <el-icon>
              <VideoPlay />
            </el-icon>
            <span>{{ voice.name }}</span>
          </div>
          <p>{{ voice.description }}</p>
          <audio :src="voice.audio" controls style="margin-top: 8px; width: 100%; margin-bottom: 8px;"></audio>
          <el-button type="primary" @click="selectVoice(voice)">立即使用</el-button>
        </div>
      </div>
    </div>

    <el-button class="wl-btn" type="primary" @click="startConversion">开始转换</el-button>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled, VideoPlay } from '@element-plus/icons-vue'
import { ref, computed } from 'vue';

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
    value: '关闭', // 添加开关值
  },
])

const selectedCategory = ref('语言分类'); // 默认选中的分类

const options = ['语言分类', '领域分类', '场景分类', '情绪分类', '学科分类', '我的'];

const voices = ref([
  {
    name: "社交媒体3",
    description: "中年男性，声音清新活力，适合社交媒体配音",
    category: "场景分类",
    audio: "audio1.mp3",
  },
  {
    name: "有声读物2",
    description: "青年女性，声音甜美柔和，适合有声读物配音",
    category: "领域分类",
    audio: "audio2.mp3",
  },
  {
    name: "社交媒体2",
    description: "中年男性，声音激情活力，适合社交媒体配音",
    category: "场景分类",
    audio: "audio3.mp3",
  },
  {
    name: "社交媒体1",
    description: "中年女性，声音平稳柔和，适合社交媒体配音",
    category: "场景分类",
    audio: "audio4.mp3",
  },
  {
    name: "播音主持3",
    description: "青年男性，声音热情有活力，适合新闻、广告配音",
    category: "语言分类",
    audio: "audio5.mp3",
  },
]);

// 根据选中的分类过滤 voices
const filteredVoices = computed(() => {
  return voices.value.filter(voice => voice.category === selectedCategory.value);
});

const canDownload = ref(false);

const startConversion = () => {
  canDownload.value = true;
};

const handleDelete = (row) => {
  console.log('Deleting video:', row.date);
  // 实现删除逻辑
};

const handleAction = (row) => {
  if (canDownload.value) {
    console.log('Downloading/Previewing video:', row.date);
    // 实现下载/预览逻辑
  }
};

const selectVoice = (voice) => {
  console.log('Selected Voice:', voice.name);
};
</script>

<style scoped>
.upload {
  border: 1px solid rgb(242, 239, 239);
  width: 100%;
  height: 100%;
}

.upload-demo {
  width: 70%;
  margin: 25px auto;
  height: 200px;
}

.showVideo {
  width: 70%;
  margin: 25px auto;
  margin-top: 60px;
}

.input {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 70%;
  margin: 30px auto;
  margin-top: 40px;
}

.voice-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 15px auto;
}

.voice-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.voice-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  margin-bottom: 8px;
}

.custom-style .el-segmented {
  --el-segmented-item-selected-color: var(--el-text-color-primary);
  --el-segmented-item-selected-bg-color: #ffd100;
  --el-border-radius-base: 16px;
}

.wl-btn{
  margin-left: 14%;
  width: 230px;
  height: 50px;
  background-color: #13ce66;
  font-size: 30px;
  font-family: '仿宋';
  color: #000000;
  margin-bottom: 50px;
}
</style>



