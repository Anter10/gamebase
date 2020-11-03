const images = require("images");


const sizes = {
    "mipmap-hdpi":36,
    "mipmap-ldpi":48,
    "mipmap-mdpi":72,
    "mipmap-xhdpi":96,
    "mipmap-xxhdpi":144,
    "mipmap-xxxhdpi":192,
}

function resize_icons(){
    const sizes_keys = Object.keys(sizes);

    for(const key of sizes_keys){
        images("./../icons/icon.png")
        .resize(sizes[key],sizes[key])
        .save(`./../icons/${key}/ic_launcher.png`, {quality: 60})
    }
}

resize_icons();