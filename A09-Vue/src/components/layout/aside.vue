<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="sidebar.collapse"
            :background-color="sidebar.bgColor"
            :text-color="sidebar.textColor"
            router
        >
            <template v-for="item in menuData" :key="item.index">
                <template v-if="item.children">
                    <el-sub-menu :index="item.index" v-permiss="item.id">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon"></component>
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.children" :key="subItem.index">
                            <el-sub-menu v-if="subItem.children" :index="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem, i) in subItem.children"
                                    :key="i"
                                    :index="threeItem.index"
                                >
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :index="subItem.index" v-permiss="item.id">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" v-permiss="item.id">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../../store/aside';
import { useRoute } from 'vue-router';
import { menuData } from '../../utils/menu'

const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});

const sidebar = useSidebarStore();
</script>

<style scoped>
.sidebar {
    width: 260px;
    display: block;
    position: absolute;
    left: 8px;
    top: 70px;
    bottom: 0;
    overflow-y: auto;
    background-color: rgb(49, 64, 87);
    transition: width 0.3s ease;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu {
    min-height: 100%;
}

.sidebar-el-menu .el-menu-item,
.sidebar-el-menu .el-sub-menu {
    transition: background-color 0.3s ease;
}

.sidebar-el-menu .el-menu-item:hover,
.sidebar-el-menu .el-sub-menu:hover {
    background-color: rgba(255, 255, 255, 0.1); /* 悬停效果 */
}

.sidebar-el-menu .el-menu-item.is-active {
    background-color: rgba(255, 255, 255, 0.2); /* 选中效果 */
}
</style>
