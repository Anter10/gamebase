import { gamebase } from "../Boot";
import { HttpHeaderInterface, UIParamInterface } from "../Common/CommonInterface";
import GameConfig from "../GameConfig";
import GameLocalData from "../GameLocalData/GameLocalData";
import GameRecord from "../GameLocalData/GameRecord";
import UserData from "../GameLocalData/UserLoginData";
import { HttpClient } from "../NetWork/HttpClient";
import { HttpServer } from "../NetWork/HttpServer";
import { hexMD5 } from "../NetWork/Md5";
import OSRuntime from "../OSRuntime";
import UIConfig from "../UI/UIManager/UIConfig";
import UIManager from "../UI/UIManager/UIManager";
import CommonServerData from "./CommonServerData";

class ServerData {
    public static game_server_data_instance: ServerData = null;
    /**@description 服务器端的请求头信息 */
    private _headers: HttpHeaderInterface = null;
    /**@description 初始化SDK的时候的配置信息 */

    public static get_instance(): ServerData {
        if (!this.game_server_data_instance) {
            this.game_server_data_instance = new ServerData();
        }
        return this.game_server_data_instance;
    }

    get headers(): HttpHeaderInterface {
        return this._headers;
    }

    set headers(_header: HttpHeaderInterface) {
        this._headers = _header;
    }

    init() {
        this.init_headers();
        this.init_user_data();
        this.init_headers();
    }

    init_user_data() {
        CommonServerData.get_api_user((res: any) => {
            OSRuntime.api_user_interface = res;
            const user_local_data: UserData = GameLocalData.get_instance().get_data(UserData);
            user_local_data.user_init_data = res;
            console.log("当前的用户信息 ", JSON.stringify(OSRuntime.api_user_interface));
        }, (res) => {
            console.log("用户信息不存在");
        });
    }

    init_headers() {
        this._headers = {
            /**@description 设备的型号 */
            brand: GameConfig.android_init_success_param.brand,
            /**@description 系统的版本 */
            osVersion: GameConfig.android_init_success_param.osVersion,
            /**@description rom的版本 */
            romVersion: GameConfig.android_init_success_param.romVersion,
            /**@description 应用的版本号 */
            appVersion: GameConfig.android_init_success_param.appVersion,
            /**@description 渠道*/
            channel: GameConfig.android_init_success_param.channel,
            /**@description 所处的系统名称 */
            os: GameConfig.os,
            /**@descriptions bs */
            bs: GameConfig.android_init_success_param.bs,
            /**@description gps信息 */
            gps: GameConfig.android_init_success_param.gps,
            /**@description 设备的ID */
            deviceId: GameConfig.android_init_success_param.deviceId,
            /**@description accessKey */
            accessKey: GameConfig.android_init_success_param.accessKey,
            /**@description 应用的ID */
            appId: GameConfig.android_init_param.appId,
            /**@description */
            pkgId: GameConfig.android_init_param.pkgId,
            /**@description 游戏的接口类型 */
            // apiType: GameConfig.android_init_param.apiType,
            /**@description oaid */
            oaid: GameConfig.android_init_success_param.oaid,
        }

        // console.log("=新=gameExamine=", GameConfig.gameExamine);
        // console.log("=新=_headers=", JSON.stringify(this._headers));
    }

    /**@description 发送post 请求获得 */
    post_data(uri: string, data?: Object, call_back?: Function, error_callback?: Function) {
        const http = new HttpServer(GameConfig.serverUrl);
        const content_type = `application/json`;
        const t_header = cc.instantiate(this.headers);
        http.post(uri, 5000, JSON.stringify(data), content_type, t_header, call_back, error_callback);
    }

    /**@description 发送get 请求获得 */
    get_data(uri: string, call_back?: Function, error_callback?: Function, data?: any) {
        // const http = new HttpClient(GameConfig.serverUrl, 5000);
        // // console.log(data, "当前get设置的请求地址", this.headers);
        // http.get(uri, 5000, JSON.stringify(data), this.headers).then((res: Object) => {
        //     console.log(`get 请求得到的游戏的数据 ${JSON.stringify(res)}`);
        //     const response = JSON.parse(res as string);
        //     if (response.code == 0) {
        //         call_back && call_back(response.result);
        //     } else {
        //         // console.log(`服务器断返回的错误信息 `, response);
        //         error_callback && error_callback(response);
        //     }
        // });

        const http = new HttpServer(GameConfig.serverUrl);
        console.log("当前get设置的请求地址", this.headers);
        const t_header = cc.instantiate(this.headers);
        http.get(uri, 5000, t_header, call_back, error_callback);
    }


    /**@description 请求登录 */
    login() {
    }

    bi_data(uri: string, call_back?: Function) {
        // const http = new HttpClient(GameConfig.serverUrl);
        // // console.log("当前get设置的请求地址", this.headers);
        // http.get(uri, 5000, JSON.stringify(this.headers)).then((res: Object) => {
        //     const response = JSON.parse(res as string);
        //     if (response) {
        //         call_back && call_back(response.result);
        //     }
        // });

        const http = new HttpServer(GameConfig.serverUrl);
        const t_header = cc.instantiate(this.headers);
        http.get(uri, 5000, t_header, call_back);

    }

    video_bi_data(uri: string, call_back?: Function) {
        // const http = new HttpClient(GameConfig.serverUrl);
        // // console.log("当前get设置的请求地址", this.headers);
        // http.get(uri, 5000, JSON.stringify(this.headers)).then((res: Object) => {
        //     const response = JSON.parse(res as string);
        //     if (response) {
        //         call_back && call_back(response.result);
        //     }
        // });
        const http = new HttpServer(GameConfig.serverUrl);
        const t_header = cc.instantiate(this.headers);
        http.get(uri, 5000, t_header, call_back);
    }

    //用户注册 获取accessKey
    requestServerDataRegister() {
        let url = "/bp/user/register?appId=" + GameConfig.android_init_param.appId + "&pkgId=" + GameConfig.android_init_param.pkgId + "&oaid=" + GameConfig.android_init_success_param.oaid;
        let callback = (data) => {
            // console.log("----用户注册--", data)
        }
        this.get_data(url, callback);
    }

    requestServerDataAchievement() {
        let url = "/lovexiao/achievement/list";
        this.get_data(url, function (data) {
            // console.log("==请求服务端数据=成就===", JSON.stringify(data));
            // let achieveData = cc.common.fileOperation.getUserAchievementData();//网络出现问题调用本地数据
            // if(data!=-1)
            // {
            //     let userData = {
            //         code: data.result.userInfoVO.code,
            //         creditAmount: data.result.userInfoVO.creditAmount,
            //         goldAmount: data.result.userInfoVO.goldAmount
            //     }
            //     this.notificationCenter.emit(SEVER_DATA_MAIN_USER, userData);

            //     achieveData.achieveList = data.result.list;
            // }
        }.bind(this));
    }

    //向服务端发送数据=关卡数据
    sendOutServerDataLevel(correct: string, level: string, callback: Function) {
        let testDate = new Date();
        var mytime = testDate.getTime();//获取当前时间
        let newStr = correct + "," + level + "," + mytime + "," + GameConfig.secretData;
        //// console.log("==newStr==", newStr)
        let md5NewStr = hexMD5(newStr);
        let params = {
            "correct": correct,
            "level": level,
            "timeMillis": mytime,
            "sign": md5NewStr
        };
        let url = "/g3-chengyu/api/level";
        this.post_data(url, params, callback);
    }

    //请求每日福利数据
    requestServerDataDailyWelfare(callback) {
        let url = `/${GameConfig.api_root_path}/api/task`;
        this.get_data(url, callback);
    }

    //每日福利 是否完成
    sendOutSeverDataDailyWelfareComplete(tId, state, callback) {
        let url = "/g3-chengyu/api/task";
        this.post_data(url, { taskId: tId, status: state }, callback);
    }

    sendOutSeverDataZhikeResult(tId, pro, callback) {
        //直客广告， 领取奖励
        let url = "/lovexiao/daily_task/watched?id=" + tId + "&type=" + pro;
        this.post_data(url, "", callback);
    }

    //向服务端发送数据=倒计时红包
    sendOutSeverDataCountDownRed(callback?: Function) {
        let url = "/g3-chengyu/api/money/chest";
        this.post_data(url, "", callback);
    }

    //向服务端请求数据=打卡签到
    requestServerDataSignIn(callback?: Function) {
        let url = "/g3-odyssey/api/checkIn";
        this.get_data(url, callback);
    }

    sendOutSeverDataUseProp() {
        this.get_data("/lovexiao/props/use_props", (result) => {
            // console.log("==向服务端发送数据=使用道具==", JSON.stringify(result))
        });
    }

    //发送游戏内获得红包数据
    sendOutSeverDataGameRed(redNum, callback) {
        let params = { "money": redNum };
        this.post_data('/g3-chengyu/api/money', params, callback);
    }

    //请求提现界面数据
    requestSeverDataDrawCash(callback) {
        this.get_data("/g3-odyssey/api/withdraw", callback);
    }

    //发送提现数据
    sendOutSeverDataDrawCash(params, callback) {
        //向服务端发送数据=提现
        this.post_data("/g3-odyssey/api/withdraw", params, callback);
    }

    //请求游戏主页数据
    requestSeverDataMainUser(callback) {
        this.get_data('/g3-chengyu/api/home', callback);
    }





    //请求邀请好友界面数据
    requestSeverDataInviteFriend(callback) {
        let url = "/g3-chengyu/api/share";
        this.get_data(url, callback);
    }

    //邀请好友界面领取奖励
    sendOutSeverDataInviteFriendReward(friendNum, callback) {
        let url = "/g3-chengyu/api/share";
        let params = { num: friendNum };
        this.post_data(url, params, callback);
    }

    //发送好友申请
    sendOutSeverDataInviteCode(fCode, callback) {
        let url = "/g3-chengyu/api/share/add";
        let params = { code: fCode };
        this.post_data(url, params, callback);
    }

    //获取最新能量数
    requestSeverDataNewEnergy(callback) {
        let url = "/g3-triple/api/feed/energy";
        this.get_data(url, callback);
    }

    //获取幸运宝箱
    requestSeverDataLucklyBox(callback) {
        let url = "/g3-chengyu/api/money/luckily";
        this.post_data(url, null, callback);
    }

    //获取碎片红包
    requestSeverDataFragmentRed(callback) {
        let url = "/g3-chengyu/api/money/fragment";
        this.post_data(url, null, callback);
    }

    //获取转盘数据
    requestSeverDataTurnTable(callback) {
        let url = "/g3-odyssey/api/turntable";
        this.get_data(url, callback);
    }

    //获取一元夺宝首页数据
    requestSeverDataIndiana(callback) {
        let url = "/g3-odyssey/api/crowdfunding";
        this.get_data(url, callback);
    }

    //获取一元夺宝单个奖品详细数据
    requestSeverDataIndianaPrize(callback, id) {
        let url = "/g3-odyssey/api/crowdfunding/" + id;
        this.get_data(url, callback);
    }

    // 一元夺宝投注
    requestSeverDataBetting(callback, id, first) {
        let url = "/g3-odyssey/api/crowdfunding/" + id;
        let params = { first: first };
        this.post_data(url, params, callback);
    }

    // 获取一元夺宝中奖名单数据
    requestSeverDataPrizeRoster(callback, id) {
        let url = "/g3-odyssey/api/crowdfunding/" + id + "/winners";
        this.get_data(url, callback);
    }

    // 获取体现转盘状态
    requestSeverDrawCashTurnTableStatus(callback) {
        let url = "/g3-chengyu/api/turntable/status";
        this.get_data(url, callback);
    }

    // 获取提现转盘数据
    requestSeverDrawCashTurnTableData(callback) {
        let url = "/g3-chengyu/api/turntable";
        this.get_data(url, callback);
    }

    // 提现转盘领取奖励
    requestSeverReceiveReward(callback) {
        let url = "/g3-chengyu/api/turntable";
        this.post_data(url, null, callback);
    }

    // 转盘抽奖更新最新余额
    requestSeverTurnTableNewMoney(callback, params) {
        let url = "/g3-odyssey/api/user/money";
        this.post_data(url, params, callback);
    }

    // 获取单个直客广告信息
    requestSingleZhiKeAdInfo(callback) {
        let url = `/${GameConfig.api_root_path}/api/task/one`;
        this.get_data(url, callback);
    }

    // 完成单个直客任务
    sendOutSeverDataZhiKe(tId, state, callback) {
        let url = `/${GameConfig.api_root_path}/api/task`;
        this.post_data(url, { taskId: tId, status: state }, callback);
    }

    //向服务端请求数据=打卡赚钱
    requestServerDataSignInMoney(callback) {
        let url = `/${GameConfig.api_root_path}/api/v2/checkIn`;
        this.get_data(url, callback);
    }

    //向服务器发送数据  更新打卡进度
    sendOutServerDataSignInNum(callback) {
        let url = `/${GameConfig.api_root_path}/api/checkIn/process`;
        this.post_data(url, "", callback);
    }

    //向服务器发送数据  获取打卡进度
    requestServerDataSignInNum(callback) {
        let url = `/${GameConfig.api_root_path}/api/checkIn/status`;
        this.get_data(url, callback);
    }

    //向服务端发送领取红包数据=打卡签到
    sendOutServerDataSignIn(day_number: number, callback?: Function) {
        let url = `/${GameConfig.api_root_path}/api/checkIn`;
        this.post_data(url, { day: day_number }, callback);
    }
}


export default ServerData;