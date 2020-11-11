import BaseRecord from "./BaseRecord";

const { ccclass, property } = cc._decorator;

@ccclass
class SettingData extends BaseRecord {
    static _name = "SettingData";
    base_name = "SettingData";

    public sound_effect: boolean = true;
    public music: boolean = true;

    constructor() {
        super();
        this.apply_auto_update();
    }

    change_sound_effect(sound_effect: boolean) {
        if (sound_effect != this.sound_effect) {
            this.music = sound_effect;
            if (sound_effect) {
                //打开音效
            } else {
                //关闭音效
            }
            this.store_sound_effect(this.sound_effect);
        }
    }

    store_sound_effect(sound_effect: boolean) {
        this.sound_effect = sound_effect;
    }

    change_music(music: boolean) {
        if (music != this.music) {
            this.music = music;
            this.store_music(this.music);
            if (music) {
                //打开音乐
            } else {
                //关闭音乐
            }
        }
    }

    store_music(music: boolean) {
        this.music = music;
    }
}
export default SettingData;