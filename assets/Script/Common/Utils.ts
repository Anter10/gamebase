
class Utils{
      
      /**@description 得到UI接口需要更新的图片 [all_need_update_sprite_name, all_need_load_sprite_frame_path] */
      static get_ui_interface_sprite_path_and_sprite_name(ui_interface: any, ui_root_path?: string):[Array<string>, Array<string>]{
        const all_need_load_sprite_frame_path: Array<string> = [];
        const all_sprite_name = Object.keys(ui_interface);
        const all_need_update_sprite_name: Array<string> = [];
        for(const image_sprite_name of all_sprite_name){
            const image_name: string = ui_interface[image_sprite_name];
            if(ui_interface[image_name]){
                const path = `${ui_root_path}${image_name}`;
                all_need_load_sprite_frame_path.push(path);
                all_need_update_sprite_name.push(image_sprite_name);
            }
        }

        return [all_need_update_sprite_name, all_need_load_sprite_frame_path]
      }
}



export default Utils;