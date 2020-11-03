import { gamebase } from "../Boot";
import GameConfig from "../GameConfig";
import BaseNode from "./BaseNode";
import { UpdateStatue } from "./CommonEnum";
import Loader from "./Loader";
const { ccclass, property } = cc._decorator;

@ccclass
export class UpdateManagerComponent extends BaseNode {
    public manifestUrl = null;
    /** @description 更新状态 */
    public update_state = UpdateStatue.none;
    /**@description 是否重新下载 */
    public _can_retry = false;
    /**@description 存储路径 */
    public store_path = "";
    /**@description 热更新的资源管理器 */
    public assets_manager = null;
    /**@description 资源下载失败个数 */
    public download_fail_count = 0;
    /**@description 重新启动游戏开始游戏 */
    public is_restart_restart_game = false;
    /** @description 更新完成后的操作 或者 没有更新的操作 */
    public update_complete_callback = null;
    /** @description 更新过程中的回调 */
    public updating_callback = null;
    /**@description 更新的资源大小 */
    public update_size = 0;
    public asset = null;
    /**@description 初始化热更的信息 */
    public init() {
    };
    /**@description 检查服务器端是否需要走热更新 */
    public check_server() {
        return false;
    };
    /**@description 版本比较的方法 */
    public version_compare(versionA, versionB) {
        console.log("当前比较的两个版本 = ", versionA, versionB);
        var vA = versionA.split('.');
        var vB = versionB.split('.');
        for (var i = 0; i < vA.length; ++i) {
            var a = parseInt(vA[i]);
            var b = parseInt(vB[i] || 0);
            if (a == b) {
                continue;
            }
            else {
                return a - b;
            }
        }
        if (vB.length > vA.length) {
            return -1;
        }
        else {
            return 0;
        }
    };
    /**@description 检查资源更新的回调 */
    public check_update_callback(event) {
        var _this = this;
        console.log("Code: " + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log("No local manifest file found, hot update skipped.");
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log("Fail to download manifest file, hot update skipped.");
                // 不用更新直接进入游戏
                this.update_complete_callback();
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log("Already up to date with the latest remote version.");
                // 不用更新直接进入游戏
                this.update_complete_callback();
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                console.log("检查到有新的版本更新了");
                // 开始走版本更新了
                this.cal_current_assets_update_size(function () {
                    this.start_update();
                });
        }

    }

    /**@description 检查热更新 */
    public check_update() {
        if (this.update_state == UpdateStatue.checking) {
            console.log("检查更新   " + 'Checking or updating ...');
            return;
        }
        if (this.assets_manager.getState() == jsb.AssetsManager.State.UNINITED) {
            var url = this.asset;
            console.log("this.manifestUrl = ", this.asset);
            if (cc.loader.md5Pipe) {
                url = cc.loader.md5Pipe.transformURL(url);
            }
            this.assets_manager.loadLocalManifest(url);
        }
        if (!this.assets_manager.getLocalManifest() || !this.assets_manager.getLocalManifest().isLoaded()) {
            console.log("Failed to load local manifest ...");
            return;
        }
        this.assets_manager.setEventCallback(this.check_update_callback.bind(this));
        this.assets_manager.checkUpdate();
        // 设置本地的资源的url 包的资源路径
        // const branch_path = `https://yaotkj.oss-cn-beijing.aliyuncs.com/games_assets_update/channel/${GameConfig.s_channel}/${GameConfig.pack_type}/${GameConfig.branch}`;
        // this.manifestUrl = branch_path + `/${GameConfig.version}/project.manifest`;
        // if (this.assets_manager.getState() == jsb.AssetsManager.State.UNINITED) {
        //     var url = this.manifestUrl;
        //     console.log("this.manifestUrl = ", this.manifestUrl);
        //     Loader.request_remote_assets(this.manifestUrl, (assets: cc.Asset) => {
        //         let tassets = assets;
        //         console.log("当前的资源是否已经assets1111 ")
        //         if (cc.loader.md5Pipe) {
        //             tassets = cc.loader.md5Pipe.transformURL(assets);
        //         }
        //         console.log("当前的资源是否已经assets 2222")
        //         if (!this.assets_manager.getLocalManifest() || !this.assets_manager.getLocalManifest().isLoaded()) {
        //             console.log("Failed to load local manifest ...");
        //             return;
        //         }
        //         this.assets_manager.loadLocalManifest(tassets);
        //         this.assets_manager.setEventCallback(this.check_update_callback.bind(this));
        //         this.assets_manager.checkUpdate();
        //     }, () => {
        //         this.update_complete_callback();
        //     })
        // }else{
        //     this.update_complete_callback();
        // }
    };
    /**@description 重试下载 */
    public retry() {
        if (this.update_state !== UpdateStatue.updating && this._can_retry) {
            this._can_retry = false;
            console.log('重新下载失败的资源');
            this.assets_manager.downloadFailedAssets();
        }
    };
    public update_callback(event) {
        var failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log("没有本地的配置文件 跳过更新");
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                var update_percent = event.getPercent();
                if (typeof (update_percent) == "number") {
                    this.updating_callback && this.updating_callback(update_percent);
                }
                console.log("更新进度  = ", update_percent);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                console.log('ERROR_DOWNLOAD_MANIFEST.');
                break;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log('Fail to download manifest file, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log('Already up to date with the latest remote version.');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                console.log("更新成功  = " + 'Update finished. ' + event.getMessage());
                this.is_restart_restart_game = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                console.log("event.getMessage()" + event.getMessage());
                this._can_retry = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                console.log("更新错误  = " + 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                this._can_retry = true;
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                console.log("解压失败错误  = " + 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                break;
            default:
                break;
        }
        if (failed) {
            this.assets_manager.setEventCallback(null);
        }
        if (this.is_restart_restart_game) {
            console.log("重新启动游戏了吗");
            this.assets_manager.setEventCallback(null);
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this.assets_manager.getLocalManifest().getSearchPaths();
            Array.prototype.unshift.apply(searchPaths, newPaths);
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);
            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    };

    /**@description 开始热更新 */
    public start_update() {
        if (this.assets_manager) {
            console.log("开始热更新状态 = ", this.assets_manager.getState(), jsb.AssetsManager.State.UNINITED);
            if (this.assets_manager.getState() == jsb.AssetsManager.State.UNINITED) {
                var url = this.manifestUrl;
                if (cc.loader.md5Pipe) {
                    url = cc.loader.md5Pipe.transformURL(url);
                }
                this.assets_manager.loadLocalManifest(url);
            }
            this.assets_manager.setEventCallback(this.update_callback.bind(this));
            this.download_fail_count = 0;
            this.assets_manager.update();
        }
    };
    /**@description 计算本次更新的包的大小 */
    public cal_current_assets_update_size(call_back) {
        var _this = this;
        /**@description 服务器端的本地版本信息 */
        var branch_path = "https://yaotkj.oss-cn-beijing.aliyuncs.com/games_assets_update/channel/" + GameConfig.s_channel + "/" + GameConfig.pack_type + "/" + GameConfig.branch;
        var native_manifest = branch_path + ("/" + GameConfig.version + "/project.manifest");
        var remote_manifest = branch_path + "/project.manifest";
        Loader.request_remote_assets(native_manifest, (assets) => {
            console.log("本地远程资源的信息 ", assets._nativeAsset);
            var native_json = JSON.parse(assets._nativeAsset);
            if (native_json) {
                Loader.request_remote_assets(remote_manifest, (assets) => {
                    console.log("更新的远程资源的信息 ", assets._nativeAsset);
                    var remote_json = JSON.parse(assets._nativeAsset);
                    if (remote_json) {
                        var native_assets = native_json.assets;
                        var remote_assets = native_json.assets;
                        var native_assets_fils = Object.keys(native_assets);
                        var remote_assets_fils = Object.keys(remote_assets);
                        var find_it = false;
                        for (var _i = 0, remote_assets_fils_1 = remote_assets_fils; _i < remote_assets_fils_1.length; _i++) {
                            var remote_filename = remote_assets_fils_1[_i];
                            find_it = false;
                            var remote_file_msg = native_assets[remote_filename];
                            for (var _a = 0, native_assets_fils_1 = native_assets_fils; _a < native_assets_fils_1.length; _a++) {
                                var native_filebane = native_assets_fils_1[_a];
                                if (remote_filename == native_filebane) {
                                    var native_file_msg = native_assets[remote_filename];
                                    if (native_file_msg && remote_file_msg && native_file_msg.md5 != remote_file_msg.md5) {
                                        find_it = true;
                                        this.update_size = this.update_size + remote_file_msg.size;
                                    }
                                }
                            }
                            if (!find_it) {
                                this.update_size = this.update_size + remote_file_msg.size;
                            }

                            // 开始热更新

                        }
                    } else {
                        this.update_complete_callback();
                    }
                }, () => {
                    this.update_complete_callback();
                });
            } else {
                this.update_complete_callback();
            }
        }, () => {
            this.update_complete_callback();
        });
    }

    public current_update_size() {
        return Math.floor(this.update_size / 1048576);
    };


    /**@description 开始初始化资源管理器 并开始更新资源 */
    public init_assets_manager() {
        console.log("初始化热更新");
        if (!gamebase.jsb) {
            this.update_complete_callback();
            return;
        }
        this.store_path = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset');
        var branch_path = "https://yaotkj.oss-cn-beijing.aliyuncs.com/games_assets_update/channel/" + GameConfig.s_channel + "/" + GameConfig.pack_type + "/" + GameConfig.branch + "/";
        console.log("当前的资源配置信息的URL = ", branch_path + "/project.manifest");
        console.log("当前的存储路径", this.store_path);
        this.assets_manager = new jsb.AssetsManager(branch_path + "/project.manifest", this.store_path, this.version_compare.bind(this));
        console.log("当前的存储路径", this.store_path);
        this.assets_manager.setVerifyCallback(function (path, asset) {
            var compressed = asset.compressed;
            var md5 = asset.md5;
            var relative_path = asset.path;
            var assets_size = asset.size;
            console.log("当前下载的资源信息 = ", asset);
            if (compressed) {
                console.log("资源已经压缩过的资源 = " + relative_path);
                return true;
            }
            else {
                console.log("Verification passed : " + "Verification passed : " + relative_path + ' (' + md5 + ')');
                return true;
            }
        });
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            this.assets_manager.setMaxConcurrentTask(2);
        }
        this.check_update();
    };
}