<template>
    <div class="music-page">
        <el-container>
            <!-- 左侧导航栏 -->
            <el-aside width="200px" class="sidebar">
                <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" @select="handleMenuClick">
                    <el-menu-item index="1">语言分类</el-menu-item>
                    <el-menu-item index="2">领域分类</el-menu-item>
                    <el-menu-item index="3">场景分类</el-menu-item>
                    <el-menu-item index="4">情绪分类</el-menu-item>
                    <el-menu-item index="5">学科分类</el-menu-item>
                    <el-menu-item index="6">我的声音</el-menu-item>
                </el-menu>
            </el-aside>

            <!-- 主要内容区域 -->
            <el-main>
                <div class="search-bar">
                    <el-input v-model="search" placeholder="搜索声音样本" prefix-icon="Search"></el-input>
                </div>

                <div class="music-list">
                    <!-- 上传按钮只在“我的声音”分类中显示 -->
                    <div v-if="activeMenu === '6'" class="upload-section">
                        <el-upload action="https://jsonplaceholder.typicode.com/posts/" drag multiple
                            class="upload-box">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">拖拽文件或点击上传</div>
                        </el-upload>
                        <div class="audios">
                            <el-button type="warning" @click="toggleRecording"
                                style="font-size: 30px; width: 60%; height: 65px; border-radius: 10px;">{{ isRecording ?
                                    '停止录音' : '开始录音'
                                }}</el-button>
                            <audio controls v-if="audioUrl" style="margin-top: 15px;">
                                <source :src="audioUrl" type="audio/wav" />
                                您的浏览器不支持 audio 元素。
                            </audio>
                        </div>
                    </div>

                    <el-row :gutter="20">
                        <el-col :span="6" v-for="(item, index) in filteredMusicList" :key="index">
                            <el-card class="music-card" shadow="hover">
                                <img :src="item.image" class="cover-image" alt="cover" />
                                <div class="music-info">
                                    <p class="music-title">{{ item.title }}</p>
                                    <p class="music-author">{{ item.author }}</p>
                                </div>
                                <div class="audio">
                                    <audio controls>
                                        <source :src="item.audio" type="audio/mpeg" />
                                        您的浏览器不支持 audio 元素。
                                    </audio>
                                </div>
                                <div class="music-actions">
                                    <el-button type="primary" circle><el-icon>
                                            <Star />
                                        </el-icon></el-button>
                                    <el-button type="warning" circle><el-icon>
                                            <Plus />
                                        </el-icon></el-button>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <!-- <el-switch v-model="value" /> -->
                    <!-- <hr class="my-4" /> -->
                    <el-pagination :hide-on-single-page="true" :total="100" layout="prev, pager, next" :page-size="20" :size="1" />
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";

const search = ref("");
const activeMenu = ref("1");
const audioChunks = ref < Blob > ([]);
const audioUrl = ref("");
const isRecording = ref(false);
const mediaRecorder = ref < MediaRecorder | null > (null);
const value = ref(false)

const allMusic = ref({
    "1": [
        {
            title: "英语配音",
            author: "专业配音员",
            image: "http://47.108.214.25:9000/photos/2025/02/02/732e3b9c715642eb8c6cd1ef08459683.jpg",
            audio: "http://47.108.214.25:9000/audios/2025/02/04/be7af6d7cc2a402397be24984a65f39a.flac",
        },
        {
            title: "中文朗读",
            author: "普通话朗读",
            image: "https://via.placeholder.com/150",
            audio: "https://www.w3schools.com/html/horse.mp3",
        },
        {
            title: "日语旁白",
            author: "日本语",
            image: "https://via.placeholder.com/150",
            audio: "https://www.w3schools.com/html/horse.mp3",
        },
    ],
    "6": [
        {
            title: "我的录音1",
            author: "用户录音",
            image: "https://via.placeholder.com/150",
            audio: "https://www.w3schools.com/html/horse.mp3",
        },
    ],
});

const filteredMusicList = computed(() => {
    const currentMusic = allMusic.value[activeMenu.value] || [];
    if (search.value) {
        return currentMusic.filter(
            (item) =>
                item.title.includes(search.value) || item.author.includes(search.value)
        );
    }
    return currentMusic;
});

const handleMenuClick = (index) => {
    activeMenu.value = index;
    search.value = "";
};

// 开始或停止录音
const toggleRecording = async () => {
    if (isRecording.value) {
        // 停止录音
        if (mediaRecorder.value) {
            mediaRecorder.value.stop();
        }
    } else {
        // 开始录音
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.value = new MediaRecorder(stream);

            mediaRecorder.value.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.value.push(event.data);
                }
            };

            mediaRecorder.value.onstop = () => {
                const audioBlob = new Blob(audioChunks.value, { type: "audio/wav" });
                audioUrl.value = URL.createObjectURL(audioBlob);
                audioChunks.value = [];
                saveRecording(audioBlob);
                ElMessage.success("录音已保存");
            };

            mediaRecorder.value.start();
        } catch (err) {
            ElMessage.error("无法获取麦克风权限");
            console.error("Error accessing microphone:", err);
        }
    }

    isRecording.value = !isRecording.value;
};

// 保存录音到本地
const saveRecording = (audioBlob) => {
    const a = document.createElement("a");
    const url = URL.createObjectURL(audioBlob);
    a.href = url;
    a.download = `recording_${Date.now()}.wav`;
    a.click();
    URL.revokeObjectURL(url);
};
</script>

<style scoped>
.music-page {
    height: 100%;
}

.sidebar {
    background-color: #2c3e50;
    color: #fff;
    height: 100%;
}

.search-bar {
    margin-bottom: 20px;
}

.music-list {
    padding: 10px;
}

.music-card {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
}

.cover-image {
    width: 100%;
    height: 120px;
    object-fit: cover;
    margin-bottom: 10px;
    border-radius: 4px;
}

.audio {
    margin-top: 8px;
    margin-bottom: 25px;
}

.music-info {
    font-size: 14px;
}

.music-title {
    font-weight: bold;
    margin: 0;
}

.music-author {
    color: #999;
    margin: 0;
}

.music-actions {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    gap: 5px;
}

.upload-section {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.upload-box {
    width: 100%;
    text-align: center;
    border: 1px dashed #d9d9d9;
    padding: 20px;
    border-radius: 8px;
    transition: border-color 0.3s;
}

.upload-box:hover {
    border-color: #409eff;
}

.audios {
    width: 40%;
    border: 1px dashed #d9d9d9;
    justify-content: center;
    align-items: center;
    display: flex;
    font-family: '仿宋';
}

.audios:hover {
    border-color: #409eff;
}
</style>
