let fs = require("fs");
const exec = require('child_process').execSync;

function execute(cmd) {
    exec(cmd, { stdio: 'inherit' });
}

const build_argv = {};
// 构建参数
function build_parameters() {
    build_argv.branch = process.env.pack_type;
    return build_argv;
}


function build_game() {
    const build_argv = build_parameters();
    console.log("构建参数 = ",build_argv);

    // 编译项目
    execute(`/Applications/CocosCreator/Creator/2.4.3/CocosCreator.app/Contents/MacOS/CocosCreator --path ./ --build "platform=android;apiLevel=30;apilevel=30;debug=true;previewWidth=750;previewHeight=1134"`)
    console.log("build game succeed.");

    // 加密图片资源
    // const entry_png = "python en.py 1 2 3";
    // execute(entry_png);

    // // 打包APK
    const pack_apk = "cd ./build/jsb-link/frameworks/runtime-src/proj.android-studio && ./gradlew assembleDebug";
    execute(pack_apk);

    console.log("构建成功");
}

function main() {
    build_game();
}

main();