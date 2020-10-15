import BaseRecord from "./BaseRecord";


interface TableInterface {
    //桌子编号
    tableNumber: number;
    //桌子等级
    tableLevel: number;
}

// 游戏中八张桌子的数据
class TableData extends BaseRecord {
    static _name = "TableData";
    base_name = "TableData";

    private table_data: Array<TableInterface> = [{ tableNumber: 0, tableLevel: 1 }];

    constructor() {
        super();
        this.apply_auto_update();
    }

    get_table_data(table_number: number): TableInterface {
        for (let i = 0; i < this.table_data.length; i++) {
            if (this.table_data[i].tableNumber == table_number) {
                return this.table_data[i];
            }
        }
        let init_table_data: TableInterface = { tableNumber: table_number, tableLevel: 0 };
        this.table_data.push(init_table_data);
        this.store_table_data(this.table_data);
        return init_table_data;
    }

    store_table_data(table_data) {
        this.table_data = table_data;
    }

    change_table_level_data(table_number: number, table_level: number) {
        for (let i = 0; i < this.table_data.length; i++) {
            if (this.table_data[i].tableNumber == table_number) {
                this.table_data[i].tableLevel = table_level;
                this.store_table_data(this.table_data);
            }
        }
    }

}

export default TableData;