import { UnlockMenuRewardConfig } from "../GameDataConfig/ConfigInterface";
import GameDataConfig from "../GameDataConfig/GameDataConfig";
import { MenuType, UnlockMenuRewardType } from "../GamePlay/GamePlayEnum/GamePlayEnum";
import BaseRecord from "./BaseRecord";
import GameLocalData from "./GameLocalData";
import UnlockMenuRewardData from "./UnlockMenuRewardData";


interface MenuInterface {
    //菜谱编号
    menuNumber: number;
    //菜谱配置
    menuConfigId: number;
}

// 菜谱数据
class OderMenuData extends BaseRecord {
    static _name = "OderMenuData";
    base_name = "OderMenuData";

    private oder_menu_data: Array<MenuInterface> = [];

    // get_menu_data_by_id(menu_id: number): MenuInterface {
    //     for (let i = 0; i < this.menu_data.length; i++) {
    //         if (this.menu_data[i].menuNumber == menu_id) {
    //             return this.menu_data[i];
    //         }
    //     }
    //     let init_menu_data = { menuNumber: menu_id, menuType: MenuType.lock, menuAdTime: 0 };
    //     this.menu_data.push(init_menu_data);
    //     this.store_menu_data(this.menu_data);
    //     return init_menu_data;
    // }

    // get_unlock_number(): number {
    //     let unlock_number = 0;
    //     for (let i = 0; i < this.menu_data.length; i++) {
    //         if (this.menu_data[i].menuType == MenuType.unlock) {
    //             unlock_number++;
    //         }
    //     }
    //     return unlock_number;
    // }

    // store_menu_data(menu_data: Array<MenuInterface>) {
    //     this.menu_data = menu_data;
    // }

    // change_menu_data(menu_id: number, menu_type: MenuType, menu_ad_time: number) {
    //     for (let i = 0; i < this.menu_data.length; i++) {
    //         if (this.menu_data[i].menuNumber == menu_id) {
    //             if (menu_type) {
    //                 this.menu_data[i].menuType = menu_type;
    //             }
    //             if (menu_ad_time) {
    //                 this.menu_data[i].menuAdTime = menu_ad_time;
    //             }
    //             this.store_menu_data(this.menu_data);
    //             this.unlock_menu_reward();
    //         }
    //     }
    // }


}

export default OderMenuData;