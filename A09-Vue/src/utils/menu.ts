import { Menus } from '../types/menu'

export const menuData: Menus[] = [
    {
        id: '0',
        title: '首页',
        index: '/homePage',
        icon: 'Histogram',
    },
    {
        id: '1',
        title: '工作台',
        index: '/PersonalSpeech',
        icon: 'Menu',
        children: [
            {
                id: '1-1',
                title: '个性化语音',
                index: '/PersonalSpeech',
            },
            {
                id: '1-2',
                title: '课件制作',
                index: '/Courseware',
            },
            {
                id: '1-3',
                title: '语音标准化输出',
                index: '/SpeechInput',
            }
        ]
    },
    {
        id: '2',
        title: '声音置换及字幕',
        index: '/Template',
        icon: 'Crop',
    },
    {
        id: '3',
        title: '声音样本库',
        index: '/SoundSampleLibrary',
        icon: 'Service'
    },
    {
        id: '5',
        title: '我的',
        index: '/MyVoice',
        icon: 'UserFilled',
        children: [
            {
                id: '5-1',
                title: '我的声音库',
                index: '/MyVoice'
            },
            {
                id: '5-2',
                title: '我的成品',
                index: '/MyTemplate'
            }
        ]
    },
    {
        id: '4',
        title: '系统设置',
        index: '/UserManagement',
        icon: 'Setting',
        children: [
            {
                id: '4-1',
                title: '个人中心',
                index: '/UserManagement',
            },
            // {
            //     id: '4-2',
            //     title: '设置',
            //     index: '/Setting',
            // },
        ]
    }
];