const GamePlayConfig = {
    //金币转为中文的最小数量
    gold_coin_show_chinese: 10000,
    //点击一次招揽顾客增加百分比
    click_attract_customer_button_add: 20,
    //桌子总数量
    total_table_number: 8,
    //装饰总数量
    total_decoration_number: 9,
    //灶王爷绕场时间
    kitchen_god_active_time: 60000,
    //灶王爷候场时间
    kitchen_god_wait_time: 120000,
    //厨娘最高等级
    cook_woman_max_level: 5,
    //每日最多解锁菜品数量
    daily_unlock_menu_limit: 10,
    //主界面客人移动的速度
    customer_speed: 200,
    //椅子位置,每个椅子占用四个位置[0,0],[0,1],[1,0],[1,1]
    chair_position: { 0: [3, 24], 1: [6, 24], 2: [11, 24], 3: [15, 24], 4: [3, 19], 5: [6, 19], 6: [11, 19], 7: [15, 19], 8: [3, 17], 9: [6, 17], 10: [11, 17], 11: [15, 17], 12: [3, 11], 13: [6, 11], 14: [11, 11], 15: [15, 11], },
    //排队位置 8 10 . 4  2 
    line_up_position: { 0: [8, 5], 1: [8, 2] },
    //自动点菜时间
    automatic_menu_time: 5,
    //顾客吃饭时间
    customer_eat_menu: 10,
    //随机聊天文案的出现时间
    chat_active_time: 10,
    //随机聊天文案的展示时间
    chat_exist_time: 2,
    //厨娘接菜位置
    cook_woman_get_menu_position: [4, 29],
    //厨娘闲逛
    cook_woman_stroll_position: { 0: [1, 29], 1: [17, 29] },
    //厨娘做饭位置
    cook_woman_cook_position: { 0: [3, 31], 1: [7, 31], 2: [11, 31], 3: [14, 31] },
    //主界面厨娘溜达的速度   30 500 
    cook_woman_stroll_speed: 30,
    //主界面厨娘送菜的速度   30 500 
    cook_woman_send_menu_speed: 500,
    //做饭时间
    cook_woman_cook_spend: 5,
    //红心上限
    red_heart_max: 24800,
    //每照顾一个客人得到红心
    get_red_heart: 1,
    //自动加客人时长
    add_customer_time: 120,
}
export default GamePlayConfig;