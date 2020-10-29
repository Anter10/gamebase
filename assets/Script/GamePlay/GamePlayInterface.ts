import { LordCardType, PeopleIdentityType, PeopleType } from "./GamePlayEnum";

/**@description 牌的数据接口 */
export interface LordCardInterface{
    /**@description 数字 1 - 15【A - 大王】 */
    id: number;
    /**@description 牌的花色类型*/
    card_type: LordCardType;
}

/**@description 人的数据类型接口 */
export interface LordPeopleInterface{
    /**@description 唯一的ID */
    id : number;
    /**@description 所在的位置 玩家为 0 下一家为 1 再下一家为 2*/
    position : number;
    /**@description 玩家的名称 */
    nick_name: string;
    /**@description 玩家的头像 */
    avatar_url: string;
    /**@description 玩家的金币数 */
    coin_count: number;
    /**@description 玩家的类型 */
    peopel_type: PeopleType;
    /**@description 玩家的身份类型 */
    people_identity_type: PeopleIdentityType;
    /**@description 玩家手里面的牌 */
    cards: Array<LordCardInterface>;
    /**@description 玩家出过的牌 */
    play_cards: Array<LordCardInterface>;
}

/**@description 出牌数据接口 */
export interface LordSendCardInterface{
    /**@description 这次所出的牌 */
    send_card: LordCardInterface,
    /**@description 出牌的人的信息 */
    lord_people_interface: LordPeopleInterface,
}

/**@description 发牌的借接口 */
export interface DealCardInterface{
    /**@description 底牌 */
    in_bottom_cards: Array<LordCardInterface>;
    /**@description 每个位置的牌 */
    every_pos_cards: {[position: number]: Array<LordCardInterface>};
}