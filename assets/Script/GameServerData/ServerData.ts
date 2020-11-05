import { gamebase } from "../Boot";
import GameConfig from "../GameConfig";
import GameRecord from "../GameLocalData/GameRecord";
import { HttpClient } from "../NetWork/HttpClient";
import { hexMD5 } from "../NetWork/Md5";

class ServerData {
    public static game_server_data_instance: ServerData = null;
    /**@description 服务器端的请求头信息 */
    private _headers: { [key: string]: string } = {};
    /**@description 初始化SDK的时候的配置信息 */
    private _sdk_config: { [key: string]: any } = {};

    public static get_instance(): ServerData {
        if (!this.game_server_data_instance) {
            this.game_server_data_instance = new ServerData();
        }
        return this.game_server_data_instance;
    }

    get headers() {
        return this._headers;
    }

    set headers(_header: { [key: string]: string }) {
        this._headers = _header;
    }

    init() {
        this.init_headers();
        this.init_sdk_config();
    }


    get_header_key_of_value(key: string) {
        let dataStr = null;
        if (gamebase.location && gamebase.location.search) {
            dataStr = window.location.search;
        }
        if (dataStr) {
            let dataList = dataStr.split("&");
            for (var i = 0; i < dataList.length; i++) {
                let str = dataList[i];
                if (str.indexOf(key) >= 0) {
                    let sunStr = str.split("=");
                    return sunStr[1];
                }
            }
            return "default";
        } else {
            return GameConfig[key];
        }
    }


    init_headers() {
        this._headers.appId = this.get_header_key_of_value("appId");
        this._headers.pkgId = this.get_header_key_of_value("pkgId");
        this._headers.deviceId = this.get_header_key_of_value("deviceId");
        this._headers.brand = this.get_header_key_of_value("brand");
        this._headers.gps = this.get_header_key_of_value("gps");
        this._headers.bs = this.get_header_key_of_value("bs");
        this._headers.appVersion = this.get_header_key_of_value("appVersion");
        this._headers.os = this.get_header_key_of_value("os");
        this._headers.channel = this.get_header_key_of_value("channel");
        this._headers.romVersion = this.get_header_key_of_value("romVersion");
        this._headers.osVersion = this.get_header_key_of_value("osVersion");
        this._headers.oaid = this.get_header_key_of_value("oaid");
        this._headers.accessKey = this.get_header_key_of_value("accessKey");
        this._headers.apiType = this.get_header_key_of_value("apiType");
        // TODO !  这里逻辑有点诡异
        GameConfig.gameExamine = this.get_header_key_of_value("isPass") == "0";
        GameConfig.apiType = parseInt(this._headers.apiType);

        console.log("=新=gameExamine=", GameConfig.gameExamine);
        console.log("=新=_headers=", JSON.stringify(this._headers));
    }

    init_sdk_config() {
        this._sdk_config = {
            accessKey: this.headers.accessKey,
            userId: this.headers.accessKey ? this.headers.accessKey.split("_")[1] : "",
            appVersion: this.headers.appVersion,
            appName: GameConfig.productName, // app名称
            gps: this.headers.gps, // 经纬度
            env: GameConfig.branch,
            deviceId: this.headers.deviceId, // 设备号
            bundle: GameConfig.packageName, // 包名
            channelId: this.headers.channel, // 渠道
            brand: this.headers.brand, // 厂商
            romVersion: this.headers.romVersion, // sdk版本号
            osVersion: this.headers.osVersion, // 系统版本号
            appId: this.headers.appId, // app的id
            posId: GameConfig.post_id,
            pkgId: this.headers.pkgId,
            // pageName: DATA_ARRANGE.clickTargetEnter,//数据布点
            remoteName: GameConfig.remoteName
        }
    }

    /**@description 发送post 请求获得 */
    post_data(uri: string, data?: Object, call_back?: Function) {
        const http = new HttpClient(GameConfig.serverUrl, 5000);
        const content_type = `application/json`;
        http.post(uri, 5000, JSON.stringify(data), content_type, this.headers).then((res) => {
            console.log(`post 请求得到的游戏的数据 ${res}`);
            const response = JSON.parse(res as string);
            call_back && call_back(response.result);
        });
    }

    /**@description 发送get 请求获得 */
    get_data(uri: string, data?: Object, call_back?: Function) {
        const http = new HttpClient(GameConfig.serverUrl, 5000);
        console.log("当前get设置的请求地址", this.headers);
        http.get(uri, 5000, JSON.stringify(data), this.headers).then((res: Object) => {
            console.log(`get 请求得到的游戏的数据 ${res}`);
            const response = JSON.parse(res as string);
            call_back && call_back(response.result);
        });
    }

    /**@description 请求登录 */
    login() {
    }

    bi_data(uri: string, call_back?: Function) {
        const http = new HttpClient("https://bp-api.coohua.com");
        console.log("当前get设置的请求地址", this.headers);

        http.get(uri, 5000, this.headers).then((res: Object) => {
            const response = JSON.parse(res as string);
            if (response) {
                call_back && call_back(response.result);
            }
        });
    }


    //中台商业化 *（直客广告数据）
    initBusinessSdk(callback: Function) {

        const BusinessSDK = gamebase.BusinessSDK;

        console.log("=直客广告数据==", typeof BusinessSDK)

        if (typeof BusinessSDK == "undefined")
            return;

        BusinessSDK.initWebSDK(this._sdk_config, () => {
            BusinessSDK.task.getTaskList(0, (res) => {
                console.log("=直客广告数据=getTaskList=", JSON.stringify(res))
                var taskArr = [];
                //var showArr = [];
                if (res.result && res.result.read60Cache && res.result.read60Cache.adCaches) {
                    taskArr = res.result.read60Cache.adCaches;
                } else {
                    taskArr = [];
                }
                if (taskArr.length <= 0)
                    return;
                for (var key in taskArr) {
                    taskArr[key].creditName = res.result.read60Cache.creditName;
                }
                callback && callback(taskArr);
            }, (error) => {
                //util.webClick('首页高额任务', JSON.stringify(error));
                //cb && cb()
            })
        }
        );

        //点击直客广告时调用
        //BusinessSDK.task.taskClick(taskArr[i])
    }

    //用户注册 获取accessKey
    requestServerDataRegister() {
        let url = "/bp/user/register?appId=" + GameConfig.appId + "&pkgId=" + GameConfig.pkgId + "&oaid=";
        let callback = (data) => {
            console.log("----用户注册--", data)
        }
        this.get_data(url, callback);
    }

    requestServerDataAchievement() {
        let url = "/lovexiao/achievement/list";
        this.get_data(url, function (data) {
            console.log("==请求服务端数据=成就===", JSON.stringify(data));
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
        //console.log("==newStr==", newStr)
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
            console.log("==向服务端发送数据=使用道具==", JSON.stringify(result))
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