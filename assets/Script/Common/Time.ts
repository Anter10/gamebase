class Time{
    /**
     * @description 秒数转 时分秒
     */
    static seconds_to_hms(seconds: number, filter_hour: boolean = false) {
        let real_seconds = Math.floor(seconds % 60);
        let minutes = Math.floor((seconds / 60) % 60);
        let hours = Math.floor(seconds / 3600);
        let str_seconds = real_seconds < 10 ? `0${real_seconds}` : real_seconds;
        let str_minutes = minutes < 10 ? `0${minutes}` : minutes;
        let str_hours = hours < 10 ? `0${hours}` : hours;
        if (filter_hour && hours === 0) {
            return `${str_minutes}:${str_seconds}`;
        }
        return `${str_hours}:${str_minutes}:${str_seconds}`;
    }

       /** 游戏前端统一的时间 后面会换成服务器时间  单位毫秒*/
    static get_time(): number {
        return new Date().getTime();
    }

     /**@description 得到当前的秒时间  单位秒*/
    static get_second_time(): number {
        const cur_time: number = this.get_time() / 1000;
        return Math.floor(cur_time);
    }

    static convert_date_to_string(player_uuid_create_time) {
        const date_parse = player_uuid_create_time.split(" ");
        const pre_parse = date_parse[0].split("-");
        const after_pare = date_parse[1].split(":");
        const final_date = new Date();
        final_date.setFullYear(pre_parse[0]);
        final_date.setMonth(pre_parse[1] - 1);
        final_date.setDate(pre_parse[2]);
        final_date.setHours(after_pare[0]);
        final_date.setMinutes(after_pare[1]);
        final_date.setSeconds(after_pare[2]);
        const final_time_string = final_date.toISOString();
        return final_time_string;
    }


    /**是否新一天 */
    static  is_new_day(compare: Date, now: Date): boolean {
        if (!compare || !now) {
            throw new Error("have one date is wrong");
        }
        if (now.getFullYear() !== compare.getFullYear() ||
            now.getMonth() !== compare.getMonth() ||
            now.getDate() !== compare.getDate()) {
            return true;
        }
        return false;
    }

    static days_between(DateOne: Date, DateTwo: Date) {
        let OneMonth = DateOne.getMonth() + 1;
        let OneDay = DateOne.getDate();
        let OneYear = DateOne.getFullYear();
        let TwoMonth = DateTwo.getMonth() + 1;
        let TwoDay = DateTwo.getDate();
        let TwoYear = DateTwo.getFullYear();
        let cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
        return Math.abs(cha);
    }


}

export default Time;