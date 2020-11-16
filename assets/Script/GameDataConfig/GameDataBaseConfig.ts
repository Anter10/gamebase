/**@description 游戏常量配置 */
const GameDataBaseConfig = {
    /**@description 玩家最大等级 */
    playerMaxLevel: 100 ,
    /**@description 花架个数 */
    flowerTrellisNum: 8 ,
    /**@description 每个花架可放置花盆数量 */
    canBePlacedFlowerNum: 4 ,
    /**@description 领取红包所需一键加速次数 */
    accelerationNum: 10 ,
    /**@description 一键加速赠送时间 */
    accelerationTime: 60 ,
    /**@description 一键加速倍率 */
    accelerationMultiplier: 5 ,
    /**@description 鲜花种类数量 */
    flowerTypeNum: 32 ,
    /**@description 每种鲜花，每天最大收获数 */
    flowerMaxHarvestNum: 5 ,
    /**@description 鲜花最大等级 */
    flowerMaxLevel: 50 ,
    /**@description 鲜花状态 */
    flowerStatus: [
        `需要等级` ,`首次\n种植` ,`种植` ,`立即\n解锁` ,`成长中` ,`可成长` ,`收获\n鲜花` ,`可成熟`
    ] ,
    /**@description 4个花盆的位置 */
    flowerpotPosition: [
        cc.v3(-240 ,40) ,cc.v3(-80 ,40) ,cc.v3(80 ,40) ,cc.v3(240 ,40) ,
    ],
    /**@description 6个花盆上边鲜花对应Y坐标 */
    flowerPosY: [60 ,76 ,76 ,76 ,79 ,85] ,
    /**@description 花盆下边阴影X坐标 */
    flowerShadowPosX: [-35 ,-35 ,-25 ,-28 ,-22 ,-38] ,
    
    /**@description 鲜花名字前缀 */
    flowerName: [
        `_forgetmenot_level` ,
        `_jasmineofwindmill_level` ,
        `_galsang_level` ,
        `_summerfireworks_level` ,
        `_bluesnow_level` ,
        `_epiphyllum_level` ,
        `_lupine_level` ,
        `_huajuju_level` ,
        `_chineseherbaceouspeony_level` ,
        `_crystalfountain_level` ,
        `_chrysanthemum_level` ,
        `_juliet_level` ,
        `_triangleplum_level` ,
        `_lily_level` ,
        `_hibiscus_level` ,
        `_endlesssummer_level` ,
        `_morningglory_level` ,
        `_gardenia_level` ,
        `_clivia_level` ,
        `_longshagem_level` ,
        `_Lavender_level` ,
        `_Cyclamen_level` ,
        `_sakura_level` ,
        `_bride_level` ,
        `_tulips_level` ,
        `_clematis_level` ,
        `_astilbe_level` ,
        `_rose_level` ,
        `_mandragora_level` ,
        `_jonquil_level` ,
        `_jessamine_level` ,
        `_azalea_level`
    ] ,

    /**@description 弹窗类型 */
    popup_type: {
        red: 1 ,
        no_coin: 2 ,
        tips: 3 ,
        benefits: 4 ,
    },

    /**@description 金币转化W/M */
    conversionCoin: (coinNum: number) => {
        if (coinNum >= 1000 && coinNum < 1000000) {
            return `${(coinNum / 1000).toFixed(2)}K`;
        }
        else if (coinNum >= 1000000) {
            return `${(coinNum / 1000000).toFixed(2)}M`;
        }
        return `${coinNum}`;
    } ,

    /**@description 现金 “分”转化为“元” */
    conversionCash: (cashNum: number) => {
        return `${cashNum / 100}元`;
    } ,

    /**@description 根据鲜花当前状态值，获取当前鲜花种类 */
    getFlowerType: (status: number) => {
        return Math.floor(status / 10000);
    } ,

    /**@description 根据鲜花当前状态值，获取当前鲜花等级 */
    getFlowerLevel: (status: number) => {
        return status % 10000;
    } ,

    /**@description 根据鲜花当前状态值，获取需要展示的花盆 */
    getFlowerpotType: (status: number) => {
        let type = Math.ceil((status % 10000) / 10);
        return type > 0 ? type : 1;
    } ,

    /**@description 时间转化 s转化为00:00:00格式 */
    conversionTime: (time: number) => {
        let hours: any = Math.floor(time / 60 / 60);
        let minutes: any = Math.floor((time - hours * 60 * 60) / 60);
        let seconds: any = time - hours * 60 * 60 - minutes * 60;
        hours = (hours >= 0 && hours < 10) ? `0${hours}` : hours;
        minutes = (minutes >= 0 && minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds >= 0 && seconds < 10) ? `0${seconds}` : seconds;
        return `${hours}:${minutes}:${seconds}`;
    } ,

    /**@description 根据鲜花等级，获取鲜花产出金币速度 */
    getFlowerGenerateCoinSpeed: (level: number ,flowerType: number ,game_data_config: cc.JsonAsset) => {
        let baseSpeed = 10;
        if (level <= 10) {
            baseSpeed = game_data_config[`FlowerBasicsData`][`1`][`getCoinSpeed`];
        }
        else if (level > 10 && level <= 20) {
            baseSpeed = game_data_config[`FlowerBasicsData`][`2`][`getCoinSpeed`];            
        }
        else if (level > 20 && level <= 30) {
            baseSpeed = game_data_config[`FlowerBasicsData`][`3`][`getCoinSpeed`];
        }
        else if (level > 30 && level <= 40) {
            baseSpeed = game_data_config[`FlowerBasicsData`][`4`][`getCoinSpeed`];
        }
        else if (level > 40 && level <= 50) {
            baseSpeed = game_data_config[`FlowerBasicsData`][`5`][`getCoinSpeed`];
        }
        else if (level > 50) {
            baseSpeed = game_data_config[`FlowerBasicsData`][`6`][`getCoinSpeed`];
        }
        return game_data_config[`FlowerData`][flowerType][`getGoldMultiplier`] * 10 * baseSpeed / 10;
    } ,
    /**@description 根据鲜花等级，获取鲜花成长消耗金币数量 */
    getFlowerGenerateConsumeCoinNum: (level: number ,flowerType: number ,game_data_config: cc.JsonAsset) => {
        let baseConsume = 7000;
        if (level == 10) {
            baseConsume = game_data_config[`FlowerBasicsData`][`1`][`consumeCoin`];
        }
        else if (level == 20) {
            baseConsume = game_data_config[`FlowerBasicsData`][`2`][`consumeCoin`];
        }
        else if (level == 30) {
            baseConsume = game_data_config[`FlowerBasicsData`][`3`][`consumeCoin`];
        }
        else if (level == 40) {
            baseConsume = game_data_config[`FlowerBasicsData`][`4`][`consumeCoin`];
        }
        else if (level == 50) {
            baseConsume = game_data_config[`FlowerBasicsData`][`5`][`consumeCoin`];
        }
        else {
            return 0;
        }
        return game_data_config[`FlowerData`][flowerType][`consumeGoldMultiplier`] * 100 * baseConsume / 100;
    } ,

    /**@description 获取鲜花升级所需经验 */
    getFlowerUpgradeNeedExperience: (level: number ,flowerType: number ,game_data_config: cc.JsonAsset) => {
        let baseExperience = 5;
        if (level <= 10) {
            baseExperience = game_data_config[`FlowerBasicsData`][`1`][`needExperience`];
        }
        else if (level > 10 && level <= 20) {
            baseExperience = game_data_config[`FlowerBasicsData`][`2`][`needExperience`];            
        }
        else if (level > 20 && level <= 30) {
            baseExperience = game_data_config[`FlowerBasicsData`][`3`][`needExperience`];
        }
        else if (level > 30 && level <= 40) {
            baseExperience = game_data_config[`FlowerBasicsData`][`4`][`needExperience`];
        }
        else if (level > 40 && level <= 50) {
            baseExperience = game_data_config[`FlowerBasicsData`][`5`][`needExperience`];
        }
        return game_data_config[`FlowerData`][flowerType][`experienceMultiplier`] * 10 * baseExperience;
    } ,

    /**@description 获取离线时间 */
    get_offline_time(lastDate: number) {
        const curDate = new Date().getTime();
        const offSet = curDate - lastDate;
        if (offSet / 1000 / 60  / 60 < 1) {
            return -1;
        }
        return offSet;
    } ,
};
export default GameDataBaseConfig;