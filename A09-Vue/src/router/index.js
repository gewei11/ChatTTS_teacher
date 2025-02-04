import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: '',
            hidden: true,
            notNeedAuth: true
        },
        redirect: '/homePage',
        children: [
            {
                path: '/homePage',
                name: 'HomePage',
                component: () => import('../views/HomePage.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    notNeedAuth: true
                }
            },
            {
                path: '/PersonalSpeech',
                name: 'PersonalSpeech',
                component: ()=>import('../views/PersonalizedSpeech.vue'),
                meta: {
                    title: '个性化语音',
                    hidden: false,
                    notNeedAuth: true
                }
            },
            {
                path: '/Courseware',
                name: 'Courseware',
                component: ()=>import('../views/Courseware.vue'),
                meta: {
                    title: '课件制作',
                    hidden: false,
                    notNeedAuth: true
                }
            },
            {
                path: '/SpeechInput',
                name: 'SpeechInput',
                component: ()=>import('../views/SpeechInput.vue'),
                meta: {
                    title: '语音标准化输出',
                    hidden: false,
                    notNeedAuth: true
                }
            },
            {
                path: '/Template',
                name: 'Template',
                component: ()=>import('../views/Template.vue'),
                meta: {
                    title: '声音置换及字幕',
                    hidden: false,
                    notNeedAuth: true
                }
            },
            {
                path: '/SoundSampleLibrary',
                name: 'SoundSampleLibrary',
                component: ()=>import('../views/SoundSampleLibrary.vue'),
                meta: {
                    title: '声音样本库',
                    hidden: false,
                    notNeedAuth: true
                }
            },
            {
                path: '/UserManagement',
                name: 'UserManagement',
                component: ()=>import('../views/UserManagement.vue'),
                meta: {
                    title: '个人中心',
                    hidden: false,
                    notNeedAuth: true
                }   
            },
            {
                path: '/Setting',
                name: 'Setting',
                component: ()=>import('../views/Setting.vue'),
                meta: {
                    title: '设置',
                    hidden: false,
                    notNeedAuth: true
                }
            },
            {
                path: '/MyVoice',
                name: 'myvoice',
                component: ()=>import('../views/MyVoice.vue'),
                meta: {
                    title: '我的声音库',
                    hidden: false,
                    notNeedAuth: true
                }
            },
            {
                path: '/MyTemplate',
                name: 'mytemplate',
                component: ()=>import('../views/MyTemplate.vue'),
                meta: {
                    title: '我的成品',
                    hidden: false,
                    notNeedAuth: true
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'LoginRegister',
        component: () => import('../components/Auth/LoginRegister.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router; 