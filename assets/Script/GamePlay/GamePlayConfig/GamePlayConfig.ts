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
    customer_speed: 80,
    //椅子位置,每个椅子占用四个位置[0,0],[0,1],[1,0],[1,1]
    chair_position: { 0: [3, 24], 1: [6, 24], 2: [12, 24], 3: [15, 24], 4: [2, 18], 5: [6, 18], 6: [11, 18], 7: [15, 18], 8: [2, 16], 9: [6, 16], 10: [11, 16], 11: [15, 16], 12: [2, 11], 13: [6, 11], 14: [11, 11], 15: [15, 11], },
    //排队位置 8 10 . 4  2 
    line_up_position: { 0: [8, 5], 1: [8, 2] },
}
export default GamePlayConfig;