let fs = require("fs");
const exec = require('child_process').execSync;

function execute(cmd) {
    exec(cmd, { stdio: 'inherit' });
}


function build_game() {
    // 编译项目
    execute(`/Applications/CocosCreator/Creator/2.4.2/CocosCreator.app/Contents/MacOS/CocosCreator --path ./ --build "platform=android;apiLevel=30;apilevel=30;debug=true;previewWidth=720;previewHeight=1280"`)
    console.log("build game succeed.");

    // 加密图片资源
    const entry_png = "python en.py 1 2 3";
    execute(entry_png);

    // // 打包APK
    const pack_apk = "cd ./build/jsb-link/frameworks/runtime-src/proj.android-studio && ./gradlew assembleDebug";
    execute(pack_apk);
}

function main() {
    console.log("当前Jenkins的构建参数 = ",process.env.debug);
    // build_game();
}

main();