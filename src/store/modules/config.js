const state = {
    parking_type_json:{
        1:{label:"室内",value:1},
        2:{label:"室外",value:2}
    },

    //停车场类型
    parking_type:[
        {label:"室内",value:1},
        {label:"室外",value:2}
    ],
    //停车场状态
    parking_status:[
        {label:'禁用',value:false},
        {label:'启用',value:true}
    ],
    //车辆品牌禁启用状态
    brand_status:[
        {label:'禁用',value:false},
        {label:'启用',value:true}
    ],
    // 年检状态
    yearCheck_status:[
        {label:'已年检',value:true},
        {label:'未年检',value:false}
    ],
    //档位
    gear_status:[
        {label:'手动',value:1},
        {label:'自动',value:2},
        {label:'人工智能',value:3},
    ],
    energyType:[
        {label:'电',value:1},
        {label:'油',value:2},
        {label:'混合动力',value:3},
    ],
    //性别
    sexType:[
        {label:'男',value:1},
        {label:'女',value:2},
    ],
    //黑名单
    HMDType:[
        {label:'是',value:true},
        {label:'否',value:false},
    ],

    //关键字搜索
    keyWord_options:[
        {label:'停车场名称',value:'parkingName'},
        {label:'详细区域',value:'address'},
        {label:'字段',value:'key'},
        {label:'文本',value:'value'},
        {label:'用户名',value:'username'},
        {label:'真实姓名',value:'truename'},
        {label:'身份证',value:'card_id'},
    ],

    //订单车辆状态信息
    order_status:{
        WAIT:{
            zh:'待取车'
        }, 
        OVERTIME:{
            zh:'超时'
        },
        OVER:{
            zh:'完成'
        },
        CANCEL:{
            zh:'取消'
        },
        RETURN:{
            zh:'待还车'
        },
    },

    //车辆状态信息
    cars_status:{
        WAIT:{
            zh:'已预约'
        }, 
        DRIVING:{
            zh:'行驶中'
        },
        CHEDK:{
            zh:'年检'
        },
        MAINTAIN:{
            zh:'保养'
        },
        REPAIR:{
            zh:'维修'
        },
    }
}
  
const getters = {}
const mutations ={}
const actions = {}

export default {
    namespaced: true,
    state,
};
