
/**@description 资源加载类 */
class Loader{
      static load_texture(path: string, call_back: Function){
            cc.resources.load(path, cc.Texture2D, (error: Error, texture: cc.Texture2D) => {
                 if(!error){
                     call_back(texture);
                 }else{
                     console.error(`图片资源 ${path} 没有找到`);
                 }    
            })
      }

      /**@description 递归调用加载spriteFrame */
      static recursion_load_sprite_frame(paths: Array<string>,call_back:Function){
          let start_index = 0;
          const rescursion_load = ()=>{
              const load_path = paths[start_index];
              this.load_texture(load_path, (texture: cc.Texture2D) => {
                 call_back(new cc.SpriteFrame(texture), start_index);
                 if(start_index < paths.length - 1){
                    start_index ++;
                    rescursion_load();
                 }
              })
          }

          rescursion_load();
      }

      /**@description 加载预质体 */
      static load_prefab(prefab_path: string, callback?: Function){
          cc.resources.load(prefab_path, cc.Prefab, (error: Error, prefab: cc.Prefab) => {
                if(!error){
                   callback && callback(prefab);
                }else{
                    console.error(`prefab ${prefab_path} 路径加载的资源失败`)
                }
          });
      }

}


export default Loader;