import { AudioConfig } from "../GameDataConfig/ConfigInterface";

/**@description 播放声音的文件 */
class CocosAudio{
      public audio_handler: number = 0;
      public audio_config: AudioConfig = null;
      public audio: cc.AudioSource = null;

      play(audio_config: AudioConfig){
           this.audio_config = audio_config;
           cc.resources.load(`./Audio/${this.audio_config.name}`, cc.AudioClip, (error: Error, audio_clip: cc.AudioClip) => {
              if(!error){
                  this.audio = new cc.AudioSource();
                  this.audio.clip = audio_clip;
                  this.audio.play();
                  this.audio.loop = this.audio_config.loop;
              }else{
                  console.error(`当前的音乐没有播放出来  ${this.audio_config.name}`)
              }
           });
      }

      stop(){
          if(this.audio){
             this.audio.stop();
          }
      }

      resume(){
          if(this.audio){
             this.audio.resume();
          }
      }


      
}

export default CocosAudio;