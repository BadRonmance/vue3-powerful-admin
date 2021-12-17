const messageList = {
    'url': '/api/getMessageList',
    'method': 'get',
    'response': () => {
        return {
            'code': 200,
            'message': 'ok',
            'data': [
                {
                    'src_info': {
                        'name': '有头发的小D'
                    },
                    'parent_info': {
                        'name': 'ES6(四）用Promise封装一下IndexedDB',
                        'url': 'https://juejin.cn/post/6925298953051176968'
                    }
                },
                {
                    'src_info': {
                        'name': '金色海洋'
                    },
                    'parent_info': {
                        'name': '凹凸技术揭秘·羚珑页面可视化·成长蜕变之路',
                        'url': 'https://juejin.cn/post/6913708131864772621'
                    }
                },
                {
                    'src_info': {
                        'name': '前端瓶子君'
                    },
                    'parent_info': {
                        'name': '前端进阶算法7：小白都可以看懂的树与二叉树',
                        'url': 'https://juejin.cn/post/6844904154066845703'
                    }
                },
                {
                    'src_info': {
                        'name': 'Big shark@LX'
                    },
                    'parent_info': {
                        'name': '最全的TypeScript学习指南',
                        'url': 'https://juejin.cn/post/7031787942691471396'
                    }
                }
            ]
        };
    }
};

export default [messageList];