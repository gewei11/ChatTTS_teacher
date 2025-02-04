<template>
    <div class="wrapper">
        <Header />
        <Aside />
        <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
            <tabs></tabs>
            <div class="content">
                <transition name="move" mode="out-in">
                    <router-view v-slot="{ Component }">
                        <keep-alive :include="tabs.nameList">
                            <component :is="Component"></component>
                        </keep-alive>
                    </router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTabsStore } from "@/store/tabs";
import { useSidebarStore } from "@/store/aside";
import Header from "@/components/layout/header.vue";
import Aside from "@/components/layout/aside.vue";
import Tabs from "@/components/layout/tabs.vue";

const tabs = useTabsStore();
const sidebar = useSidebarStore();
</script>

<style>
.wrapper {
    height: 100%;
    overflow: hidden;
}
.content-box {
    position: absolute;
    left: 265px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 10px;
    -webkit-transition: left 0.3s ease-in-out;
    transition: left 0.3s ease-in-out;
    background: #ffffff;
    overflow: hidden;
}

.content {
    width: auto;
    height: 100%;
    padding: 15px;
    overflow-y: scroll;
    box-sizing: border-box;
}

.content::-webkit-scrollbar {
    width: 0;
}

.content-collapse {
    left: 65px;
}
</style>