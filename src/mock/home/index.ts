const userAccessList = {
        'url': '/api/getUserAccessList',
        'method': 'get',
        'response': () => {
            return {
                'code': 200,
                'message': 'ok',
                'data': [{
                    'value': 0,
                    'label': '00:00'
                }, {
                    'value': 0,
                    'label': '01:00'
                }, {
                    'value': 0,
                    'label': '02:00'
                }, {
                    'value': 0,
                    'label': '03:00'
                }, {
                    'value': 0,
                    'label': '04:00'
                }, {
                    'value': 0,
                    'label': '05:00'
                }, {
                    'value': 10,
                    'label': '06:00'
                }, {
                    'value': 10,
                    'label': '07:00'
                }, {
                    'value': 10,
                    'label': '08:00'
                }, {
                    'value': 10,
                    'label': '09:00'
                }, {
                    'value': 10,
                    'label': '10:00'
                }, {
                    'value': 20,
                    'label': '11:00'
                }, {
                    'value': 22,
                    'label': '12:00'
                }, {
                    'value': 30,
                    'label': '13:00'
                }, {
                    'value': 0,
                    'label': '14:00'
                }, {
                    'value': 10,
                    'label': '15:00'
                }, {
                    'value': 60,
                    'label': '16:00'
                }, {
                    'value': 90,
                    'label': '17:00'
                }, {
                    'value': 0,
                    'label': '18:00'
                }, {
                    'value': 0,
                    'label': '19:00'
                }, {
                    'value': 10,
                    'label': '20:00'
                }, {
                    'value': 10,
                    'label': '21:00'
                }, {
                    'value': 10,
                    'label': '22:00'
                }, {
                    'value': 10,
                    'label': '23:00'
                }]
            };
        }
    },
    salesTarget = {
        'url': '/api/salesTarget',
        'method': 'get',
        'response': () => {
            return {
                'code': 200,
                'message': 'ok',
                'data': [{
                    'value': 10,
                    'label': '10:00'
                }, {
                    'value': 20,
                    'label': '11:00'
                }, {
                    'value': 22,
                    'label': '12:00'
                }, {
                    'value': 30,
                    'label': '13:00'
                }, {
                    'value': 0,
                    'label': '14:00'
                }, {
                    'value': 10,
                    'label': '15:00'
                }, {
                    'value': 60,
                    'label': '16:00'
                }, {
                    'value': 90,
                    'label': '17:00'
                }, {
                    'value': 0,
                    'label': '18:00'
                }, {
                    'value': 0,
                    'label': '19:00'
                }, {
                    'value': 10,
                    'label': '20:00'
                }]
            };
        }
    },
    donutChart = {
        'url': '/api/donutChart',
        'method': 'get',
        'response': () => {
            return {
                'code': 200,
                'message': 'ok',
                'data': [
                    {
                        'item': '微信',
                        'count': 40,
                        'percent': 0.4
                    }, {
                        'item': '小程序',
                        'count': 21,
                        'percent': 0.21
                    }, {
                        'item': 'H5',
                        'count': 17,
                        'percent': 0.17
                    }, {
                        'item': 'APP',
                        'count': 13,
                        'percent': 0.13
                    }, {
                        'item': 'WEB',
                        'count': 9,
                        'percent': 0.09
                    }
                ]
            };
        }
    };

export default [userAccessList, salesTarget, donutChart];