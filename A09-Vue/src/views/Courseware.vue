<template>
    <div>
        <el-steps style="max-width: 600px; margin: 0 auto;" :active="active" finish-status="success">
            <el-step title="上传ppt或pdf" />
            <el-step title="选择语种" />
            <el-step title="结果预览" />
        </el-steps>

        <div v-if="active === 0" class="step-content">
            <h2>第一步</h2>
            <p>请上传ppt或pdf文件</p>
            <div>
                <el-upload class="upload-demo" drag
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        拖拽上传或<em>点击上传</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            pdf/ppt files with a size less than 20mb
                        </div>
                    </template>
                </el-upload>
            </div>
        </div>
        <div v-else-if="active === 1" class="step-content">
            <h2>第二步</h2>
            <p>选择语音进行AI合成</p>
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
                    <audio :src="voice.audio" controls
                        style="margin-top: 8px; width: 100%; margin-bottom: 8px;"></audio>
                    <el-button type="primary" @click="selectVoice(voice)">立即使用</el-button>
                </div>
            </div>
            <div>
                <!-- <el-switch v-model="value" /> -->
                <!-- <hr class="my-4" /> -->
                <el-pagination :hide-on-single-page="true" :total="100" layout="prev, pager, next" :page-size="20"
                    :size="1" />
            </div>
        </div>

        <div v-else-if="active === 2" class="step-content">
            <h2>第三步</h2>
            <p>这是第三步的内容。</p>
        </div>

        <div class="buttons">
            <el-button style="margin-top: 12px; margin-bottom: 12px;" @click="last"
                :disabled="active === 0">上一步</el-button>
            <el-button style="margin-top: 12px; margin-bottom: 12px;" @click="next" :disabled="active === 2">
                {{ active === 2 ? '开始制作' : '下一步' }}
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { ElButton, ElIcon, ElMessage } from "element-plus";
import { UploadFilled, VideoPlay } from '@element-plus/icons-vue'

const active = ref(0);
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

const next = () => {
    // if (active.value <= 2 && !isInputInvalid.value) {
    //     active.value++;
    // }
    if (active.value <= 2) {
        active.value++;
    }

    if (active.value === 0) {
        saveInput();
    }
};

const last = () => {
    if (active.value > 0) {
        active.value--;
    }
};

const userInput = ref('');
const savedInput = ref('');

const saveInput = () => {
    localStorage.setItem('userInput', userInput.value);
    savedInput.value = userInput.value;
};

const selectVoice = (voice) => {
    console.log('Selected Voice:', voice.name);
};

// 根据选中的分类过滤 voices
const filteredVoices = computed(() => {
    return voices.value.filter(voice => voice.category === selectedCategory.value);
});

onMounted(() => {
    const storedInput = localStorage.getItem('userInput');
    if (storedInput) {
        savedInput.value = storedInput;
        userInput.value = storedInput;
    }
});
</script>

<style scoped>
.el-steps {
    margin-bottom: 20px;
}

.el-button {
    margin-right: 10px;
}

.step-content {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 90%;
    margin: 30px auto;
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

.button-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

.buttons {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
}

.upload-demo {
    width: 70%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 300px;
}
</style>
