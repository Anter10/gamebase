// 模拟游戏服务器

import Random from "../Common/Random";
import { LordGameConfig, WhereConfig } from "../GameDataConfig/ConfigInterface";
import GameDataConfig from "../GameDataConfig/GameDataConfig";
import { PeopleIdentityType, PeopleType } from "./GamePlayEnum";
import { LordPeopleInterface } from "./GamePlayInterface";

export class GamePalyServer{
    public static player_id = 0;

    /**@description 得到三个位置上玩家的显示数据 */
    public static get_peoples_base_message(){
        const players: Array<LordPeopleInterface> = [];
        let had_player_show_cash_out = false;
        for(let pos = 0; pos < 3; pos ++){
            this.player_id = this.player_id + 1;
            const where_config: Array<WhereConfig> = GameDataConfig.get_config_array<WhereConfig>("WhereConfig");
            const cur_where = where_config[Random.rangeInt(0, where_config.length - 1)];
            const random = Random.range(0 , 1);
            const show_money_random = JSON.parse(GameDataConfig.get_config_by_id<LordGameConfig>("LordGameConfig", 1).value);
            const show_money_random_value_range = JSON.parse(GameDataConfig.get_config_by_id<LordGameConfig>("LordGameConfig", 2).value);
            const first_random  = show_money_random[0];
            const second_random = show_money_random[1];
            let show_money = 0;

            if(random <= first_random){
               show_money = Random.rangeInt(show_money_random_value_range[0], show_money_random_value_range[1]);
            }else if(random > 1 - second_random){
               show_money = Random.rangeInt(show_money_random_value_range[2], show_money_random_value_range[3]);
            }

            // 展示的金额
            let show_cash_out = 0;
            if(!had_player_show_cash_out){
                const random_cash_out = Random.range(0 , 1);
                const random_cash_out_data = JSON.parse(GameDataConfig.get_config_by_id<LordGameConfig>("LordGameConfig", 2).value);
                if(random_cash_out < random_cash_out_data[2]){
                    show_cash_out =  random_cash_out_data[0];
                }else{
                    show_cash_out =  random_cash_out_data[1];
                }
                had_player_show_cash_out = true;
            }
           
            let peopel_type = PeopleType.matching;
            if(pos == 0){
                peopel_type = PeopleType.real;
            }

            let avatar_url = Random.rangeInt(1, 6);

            

            // 初始化
            const player: LordPeopleInterface = {
                position: pos,
                id: this.player_id,
                where_name: cur_where.name,
                money: show_money,
                show_cash_out: show_cash_out,
                peopel_type: peopel_type,
                avatar_url: avatar_url,
                cards:[],
                play_cards:[],
            }

            players.push(player);
        }

        return players;
    }


}