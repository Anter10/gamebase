import BaseRecord from "./BaseRecord";


export interface OrderMenuInterface {
    //菜谱编号
    menuNumber: number;
    //菜谱配置
    menuConfigId: number;
    //上菜椅子
    menuSeatId: number;
    //客人number
    customerNumber: number;
    //哪位厨娘选定了
    CookWomanConfigId: number;
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

    add_new_order_data(menuConfigId: number, order_seat_id: number, customerNumber: number): number {
        let menu_number = 0;
        for (let i = 0; i < this.order_menu_data.length; i++) {
            if (this.order_menu_data[i].menuNumber > menu_number) {
                menu_number = this.order_menu_data[i].menuNumber;
            }
        }
        this.order_menu_data.push({ menuNumber: menu_number + 1, customerNumber: customerNumber, menuConfigId: menuConfigId, menuSeatId: order_seat_id, CookWomanConfigId: 0 });
        this.store_order_menu_data(this.order_menu_data);
        return menu_number + 1;
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

    change_have_cook_woman(menu_number: number, cook_woman_config_id: number) {
        for (let i = 0; i < this.order_menu_data.length; i++) {
            if (this.order_menu_data[i].menuNumber == menu_number) {
                this.order_menu_data[i].CookWomanConfigId = cook_woman_config_id;
                this.store_order_menu_data(this.order_menu_data);
                return;
            }
        }
    }

    get_menu_by_cook_woman_config_id(cook_woman_config_id: number): OrderMenuInterface {
        for (let i = 0; i < this.order_menu_data.length; i++) {
            if (this.order_menu_data[i].CookWomanConfigId == cook_woman_config_id) {
                return this.order_menu_data[i];
            }
        }
    }

    get_menu_by_customer_number_config_id(customer_number: number): OrderMenuInterface {
        for (let i = 0; i < this.order_menu_data.length; i++) {
            if (this.order_menu_data[i].customerNumber == customer_number) {
                return this.order_menu_data[i];
            }
        }
    }

}

export default OrderMenuData;