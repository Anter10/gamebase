import BaseRecord from "./BaseRecord";

// 游戏的引导数据
class GuideData extends BaseRecord {
    static _name = "GuideData";
    base_name = "GuideData";

    public cur_guid_id: number = 0;
    public pass_guide_ids: Array<number> = [];

    constructor() {
        super();
        this.apply_auto_update();
    }

    /**@description  判断一个新手引导是否完成 */
    guide_finished(guide_id: number) {
        for (const pass_guide_id of this.pass_guide_ids) {
            if (guide_id == pass_guide_id) {
                return true;
            }
        }
        return false;
    }

    /**@description 过了一个新手引导 */
    pass_a_guide(guide_id: number) {
        this.pass_guide_ids.push(guide_id);
        this.pass_guide_ids = this.pass_guide_ids;
    }

}

export default GuideData;