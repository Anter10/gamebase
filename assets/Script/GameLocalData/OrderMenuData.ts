import BaseRecord from "./BaseRecord";


interface OrderMenuInterface {
    //菜谱编号
    menuNumber: number;
    //菜谱配置
    menuConfigId: number;
}

// 菜谱数据
class OrderMenuData extends BaseRecord {
    static _name = "OrderMenuData";
    base_name = "OrderMenuData";

    constructor() {
        super();
        this.apply_auto_update();
    }
    
    private order_menu_data: Array<OrderMenuInterface> = [];

    get_order_menu(): Array<OrderMenuInterface> {
        return this.order_menu_data;
    }

    add_new_order_data(menuConfigId: number): number {
        let menu_number = 0;
        for (let i = 0; i < this.order_menu_data.length; i++) {
            if (this.order_menu_data[i].menuNumber > menu_number) {
                menu_number = this.order_menu_data[i].menuNumber;
            }
        }
        this.order_menu_data.push({ menuNumber: menu_number + 1, menuConfigId: menuConfigId });
        console.log(this.order_menu_data);
        this.store_order_menu_data(this.order_menu_data);
        return menu_number;
    }

    store_order_menu_data(order_menu_data: Array<OrderMenuInterface>) {
        this.order_menu_data = order_menu_data;
    }

    complete_order_menu_data(menuNumber: number) {
        let cur_order_menu: Array<OrderMenuInterface> = [];
        for (let i = 0; i < this.order_menu_data.length; i++) {
            if (this.order_menu_data[i].menuNumber != menuNumber) {
                cur_order_menu.push(this.order_menu_data[i]);
            }
        }
        this.order_menu_data = cur_order_menu;
        this.store_order_menu_data(this.order_menu_data);
    }

}

export default OrderMenuData;