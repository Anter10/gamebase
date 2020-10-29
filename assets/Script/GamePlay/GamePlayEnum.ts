
/**@description 斗地主游戏的状态 */
export enum LordGameState{
    /**@description 杀进程进游戏的时候 开始进来的时候的等待状态 */
    start_waiting = "start_waiting",
    /**@description 玩完一局游戏的时候 等待开始游戏的状态 */
    waiting = "waiting",
    /**@description 匹配的状态 */
    mating = "mating",
    /**@description 发牌的状态 */
    carding = "carding",
    /**@description 叫地主的状态 */
    lording = "lording",
    /**@description 亮底牌状态 */
    reveal_the_ins_and_outs = "reveal_the_ins_and_outs",
    /**@description 游戏中的状态 */
    gameing = "gameing",
    /**@description 游戏结束的状态 */
    end = "end",
}

/**@description 游戏牌的类型 */
export enum LordSendCardType{
    /**@description 单只 */
    one = "one",
    /**@description 对子 */
    double = "double",
    /**@description 三张 */
    three = "three",
    /**@description 炸弹 */
    boom = "boome",
    /**@description 三带一 */
    three_with_one = "three_with_one",
    /**@description 三带二*/
    three_withe_two = "three_withe_two",
    /**@description 飞机 */
    plane = "plane",
    /**@description 飞机带一 */
    plane_with_one = "plane_with_one",
    /**@description 飞机带二 */
    plane_with_two = "plane_with_two",
    /**@description 顺子 */
    scroll = "scroll",
    /**@description 连对 */
    double_scroll = "double_scroll",
    /**@description 王炸 */
    king_boom = "king_boom",
}

/**@description 扑克牌的花色类型 */
export enum LordCardType{
    /**@description */
    none = "none",
    /**@description 梅花 */
    clubs = "clubs",
    /**@description 黑桃 */
    spade = "spade",
    /**@description 红桃 */
    heart = "heart",
    /**@description 方块 */
    dianmond = "dianmond",
    /**@description 小王 */
    small_king = "small_king",
    /**@description 大王 */
    big_king = "big_king",
}

/**@description 身份类型 */
export enum PeopleType{
    /**@description 机器人 */
    matching = "matching",
    /**@description 真实玩家 */
    real = "real",
}

/**@description 玩家的身份类型 */
export enum PeopleIdentityType{
    /**@description 地主 */
    lord = "lord",
    /**@description 非地主 */
    farmer = "farmer",
}


/**@description 发牌逻辑类型 */
export enum LordDealCardsType{
    /**@description 正常发牌 */
    none = "none",
    /**@description 偏向地主的牌 */
    lord = "lord",
    /**@description 偏向非地主的牌*/
    farmer = "farmer",
}

/**@description 特殊牌的别名 */
export enum CardTypeNumber{
    /**@description J [11]*/
    "J" = 11,
     /**@description Q [12]*/
    "Q" = 12,
     /**@description K [13]*/
    "K" = 13,
     /**@description A [14]*/
    "A" = 14,
     /**@description 小王 [15]*/
    "w" = 15,
     /**@description 大王 [16]*/
    "W" = 16,
}