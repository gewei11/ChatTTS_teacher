<template>
    <div>
        <el-steps style="max-width: 600px; margin: 0 auto;" :active="active" finish-status="success">
            <el-step title="输入文本" />
            <el-step title="选择语种" />
            <el-step title="结果预览" />
        </el-steps>

        <div v-if="active === 0" class="step-content">
            <h2>第一步</h2>
            <p>请上传或输入需要转换的文本（800-2000字）</p>
            <el-input type="textarea" v-model="userInput" placeholder="输入文本" :rows="18" clearable style="width: 90%;"
                class="centered-container" />
            <div class="button-row">
                <el-upload action="#" :before-upload="handleFileUpload" :show-file-list="false"
                    accept=".txt,.doc,.docx">
                    <el-button type="primary">点击上传</el-button>
                </el-upload>
                <el-button @click="saveInput" type="success" :disabled="isInputInvalid">保存输入</el-button>
                <el-button @click="clearInput" type="warning">清除输入</el-button>
            </div>
            <p>已保存的输入:</p>
            <p class="saved-input">{{ formattedSavedInput }}</p>
            <p v-if="isInputTooShort" style="color: red;">输入内容太短，请至少输入800个字符。</p>
            <p v-if="isInputTooLong" style="color: red;">输入内容太长，请最多输入2000个字符。</p>
        </div>

        <div v-else-if="active === 1" class="step-content">
            <h2>第二步</h2>
            <p>选择语音进行AI合成</p>
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
            <p>扩展内容。</p>
            <el-form :model="form" label-width="150px" style="">
                <el-form-item label="选择语气">
                    <el-radio-group v-model="form.tone">
                        <el-radio label="angry">生气</el-radio>
                        <el-radio label="sad">悲伤</el-radio>
                        <el-radio label="narrative">叙述</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="主播语速">
                    <el-slider v-model="form.speed" :min="0" :max="100" :step="1" show-input></el-slider>
                </el-form-item>
                <el-form-item label="主播语调">
                    <el-slider v-model="form.pitch" :min="0" :max="100" :step="1" show-input></el-slider>
                </el-form-item>
                <el-form-item label="音量增益">
                    <el-slider v-model="form.gain" :min="-20" :max="20" :step="1" show-input></el-slider>
                </el-form-item>
            </el-form>
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
import { VideoPlay } from '@element-plus/icons-vue';

const active = ref(0);
const selectedCategory = ref('标准语言分类'); // 默认选中的分类
const form = ref({
    tone: 'narrative',
    speed: 50,
    pitch: 50,
    gain: 0
})


const voices = ref([
    {
        name: "社交媒体3",
        description: "中年男性，声音清新活力，适合社交媒体配音",
        category: "标准语言分类",
        audio: "audio1.mp3",
    },
    {
        name: "有声读物2",
        description: "青年女性，声音甜美柔和，适合有声读物配音",
        category: "标准语言分类",
        audio: "audio2.mp3",
    },
    {
        name: "社交媒体2",
        description: "中年男性，声音激情活力，适合社交媒体配音",
        category: "标准语言分类",
        audio: "audio3.mp3",
    },
    {
        name: "社交媒体1",
        description: "中年女性，声音平稳柔和，适合社交媒体配音",
        category: "标准语言分类",
        audio: "audio4.mp3",
    },
    {
        name: "播音主持3",
        description: "青年男性，声音热情有活力，适合新闻、广告配音",
        category: "标准语言分类",
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

const clearInput = () => {
    userInput.value = '';
    savedInput.value = '';
    localStorage.removeItem('userInput');
};

const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        userInput.value = e.target?.result || ''; // 确保 userInput 是一个字符串
        validateInputLength();
    };
    if (
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.name.endsWith('.txt')
    ) {
        if (
            file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            console.log(
                'Word file upload is not directly supported by FileReader. Consider using a library to parse the document.'
            );
        } else {
            reader.readAsText(file);
        }
    } else {
        ElMessage.error('请上传 .txt 或 .doc/.docx 文件');
    }
    return false; // 阻止默认上传行为
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

// 格式化 savedInput，每 150 个字符换行
const formattedSavedInput = computed(() => {
    return savedInput.value.match(/.{1,150}/g)?.join('\n') || '';
});

const isInputTooShort = computed(() => userInput.value.length > 0 && userInput.value.length < 800);
const isInputTooLong = computed(() => userInput.value.length > 2000);
const isInputInvalid = computed(() => isInputTooShort.value || isInputTooLong.value);

const validateInputLength = () => {
    if (isInputTooShort.value) {
        alert('输入内容太短，请至少输入800个字符。');
    } else if (isInputTooLong.value) {
        alert('输入内容太长，请最多输入2000个字符。');
    }
};
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

.el-form-item {
    width: 80%;
    margin: 26px auto;
}

.centered-container {
    display: flex;
    /* justify-content: center; */
    /* align-items: center; */
    /* height: 100%; */
    margin: 12px auto;
}
</style>
