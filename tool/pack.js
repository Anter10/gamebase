let fs = require("fs");
const exec = require('child_process').execSync;

function execute(cmd) {
    exec(cmd, { stdio: 'inherit' });
}


const build_argv = {};

// 构建参数
function build_parameters() {
    // 打包类型
    build_argv.branch = process.env.pack_type;
    // 打包的包名
    build_argv.bundle_identifier = process.env.bundle_identifier;
    // 显示的名称
    build_argv.display_name = process.env.display_name;
    // 版本号
    build_argv.version = process.env.version;
    // 版本描述
    build_argv.info = process.env.info;
    // 打包游戏的appid
    build_argv.app_id = process.env.app_id;
    // 打包游戏的pkgId
    build_argv.pkg_id = process.env.pkg_id;
    // 打包游戏的模式 1: 应用宝审核模式 2: 应用宝线上模式 3: 官网模式
    build_argv.build_mode = process.env.build_mode;

    return build_argv;
}


function build_game() {
    const build_argv = build_parameters();
    console.log("构建参数 = ",build_argv);

    // 编译项目
    execute(`cd ../ && /Applications/CocosCreator/Creator/2.4.3/CocosCreator.app/Contents/MacOS/CocosCreator --path ./ --build "orientation={'portrait': true};platform=android;apiLevel=30;apilevel=30;debug=true;previewWidth=750;previewHeight=1134"`)
    console.log("build game succeed.");

    // 加密图片资源
    // const entry_png = "python en.py 1 2 3";
    // execute(entry_png);

    // // 打包APK
    const pack_apk = "cd ./../build/jsb-link/frameworks/runtime-src/proj.android-studio && ./gradlew assembleDebug";
    execute(pack_apk);

    console.log("构建成功");
}

function main() {
    build_game();
}

main();