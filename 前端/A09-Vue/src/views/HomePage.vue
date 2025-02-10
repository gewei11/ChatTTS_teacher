<template>
    <div class="home">
        <div class="start">
            <el-button type="primary" round style="width: 35%; margin-bottom: 20px;" class="button-el" @click="$router.push('/Courseware')">
                <i class="el-icon-circle-plus"></i>
                开始制作
            </el-button>
        </div>
        <el-divider />
        <el-row :gutter="30" class="el-row-bg">
            <el-col :span="4" class="el-col-xs" @click="$router.push('/PersonalSpeech')">
                个性化语音
            </el-col>
            <el-col :span="4" class="el-col-xs" @click="$router.push('/Courseware')">
                课件制作
            </el-col>
            <el-col :span="4" class="el-col-xs" @click="$router.push('/SpeechInput')">
                标准语音输出
            </el-col>
            <el-col :span="4" class="el-col-xs" @click="$router.push('/SoundSampleLibrary')">
                声音样本库
            </el-col>
            <el-col :span="4" class="el-col-xs" @click="$router.push('/MyTemplate')">
                我的模版
            </el-col>
        </el-row>
        <el-divider />
        <p>我的成品 ({{ draftCount }})</p>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="6" v-for="(item, index) in items" :key="index" class="el-col-img">
                <el-card shadow="hover" style="border-radius: 20px;">
                    <img :src="item.image" alt="" style="width: 100%; height: auto;">
                    <div class="card-content">
                        <p>{{ item.date }}</p>
                        <p>{{ item.size }} | {{ item.time }}</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
const items = [
    { image: 'path/to/image1.jpg', date: '1月15日', size: '8.9K', time: '00:00' },
    { image: 'path/to/image2.jpg', date: '1月13日', size: '8.9K', time: '00:00' },
    { image: 'path/to/image3.jpg', date: '12月30日', size: '111.3M', time: '09:58' },
    { image: 'path/to/image1.jpg', date: '1月15日', size: '8.9K', time: '00:00' },
    { image: 'path/to/image3.jpg', date: '12月30日', size: '111.3M', time: '09:58' }
]

const draftCount = 3;
</script>

<style scoped>
.home {
    padding: 20px;
}

.start{
    height: 270px;
    background: rgb(0, 0, 0);
    text-align: center;
    line-height: 270px;
    color: #fff;
    margin-bottom: 20px;
    margin-top: -20px;
    border-radius: 25px;
}

.card-content {
    text-align: center;
    height: 160px;
    font-size: 20px;
}

.el-row-bg{
    padding: 15px;
    width: 100%;
}

.el-col-xs {
    background: red;
    height: 110px;
    margin: 0 23px;
    text-align: center;
    line-height: 110px;
    color: #fff;
    font-size: 30px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.35s ease;
    transform: scale(1);
}

.el-col-xs:hover {
    transform: scale(1.1);
}

.el-col-img {
    border-radius: 50px;
    margin-bottom: 15px;
}

.button-el {
    height: 65px;
    line-height: 45px;
    font-size: 22px;
}
</style>