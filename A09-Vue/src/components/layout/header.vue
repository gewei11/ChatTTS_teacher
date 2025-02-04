<template>
    <div class="header">
        <div class="header-left">
            <img class="logo" src="../../assets/image/清言AI画图_0117.jpeg" alt="logo">
            <div class="web-title">AI语音助手</div>
            <div class="collapse-btn" @click="collapseChage" style="cursor: pointer;">
                <el-icon v-if="sidebar.collapse">
                    <Expand />
                </el-icon>
                <el-icon v-else>
                    <Fold />
                </el-icon>
            </div>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <el-icon class="icon" @click="refreshPage">
                    <Refresh />
                </el-icon>
                <el-tooltip content="欢迎登录" placement="top">
                    <el-icon class="icon">
                        <ChatDotSquare />
                    </el-icon>
                </el-tooltip>
                <el-button class="fullscreen-btn" @click="openWindows">
                    <el-icon>
                        <FullScreen />
                    </el-icon>
                </el-button>
                <el-avatar class="user-avator" :size="30" :src="imgurl" />
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ account }}
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="center">个人中心</el-dropdown-item>
                            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSidebarStore } from '../../store/aside';
import { useRouter } from 'vue-router';

const imgurl = ref('');
const account = ref('');
const sidebar = useSidebarStore();

const collapseChage = () => {
    sidebar.handleCollapse();
};

onMounted(() => {
    
});

const router = useRouter();
const handleCommand = (command: string) => {
    if (command === 'center') {
        router.push('/UserManagement');
    } else if (command === 'logout') {
        sessionStorage.removeItem('token');
        router.push('/login');
    }
};



const openWindows = () => {
    // const elem = document.documentElement;
    // if (elem.requestFullscreen) {
    //     elem.requestFullscreen();
    // } else if (elem.mozRequestFullScreen) { // Firefox
    //     elem.mozRequestFullScreen();
    // } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
    //     elem.webkitRequestFullscreen();
    // } else if (elem.msRequestFullscreen) { // IE/Edge
    //     elem.msRequestFullscreen();
    // }
};

const refreshPage = () => {
    window.location.reload();
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color: rgb(49, 64, 87);
    /* background-color: #ff0000; */
    border-bottom: 2px solid black;
    transition: background-color 0.3s ease;
}

.header-left {
    display: flex;
    align-items: center;
    padding-left: 20px;
}

.logo {
    width: 35px;
}

.web-title {
    margin: 0 40px 0 10px;
    font-size: 22px;
    color: white;
}

.header-right {
    padding-right: 70px;
}

.header-user-con {
    display: flex;
    align-items: center;
}

.icon {
    margin-right: 15px;
    color: rgb(130, 135, 140);
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;
}

.icon:hover {
    color: white;
    /* 悬停效果 */
}

.fullscreen-btn {
    border: 0;
    background: rgb(49, 64, 87);
    cursor: pointer;
}

.user-avator {
    margin: 0 10px 0 20px;
}

.el-dropdown-link {
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.el-dropdown-menu__item {
    text-align: center;
}

.el-popper .is-customized {
    padding: 6px 12px;
    background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper .is-customized .el-popper__arrow::before {
    background: linear-gradient(45deg, #b2e68d, #bce689);
    right: 0;
}

page {
    width: 100%;
}
</style>
