
class Utils{
      
      /**
       * @description 转换显示钱的数量
       * @param money 当前的钱数
       * @param fixed_number 保留小数点的位数
       */
      static money(money: number, fixed_number?: number){
            const t_fixed_number = fixed_number ? fixed_number : 1
            const show_money = (money / 100).toFixed(t_fixed_number);
            return show_money;
      }

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

      /**@description 产生唯一ID
     * const newUuid = Utils.generateUUID(16, 16);
     */
    static generate_uuid(len, radix) {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      let uuid = [],
          i;
      if (len) {
          for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
      } else {
          let r;
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';
          for (i = 0; i < 36; i++) {
              if (!uuid[i]) {
                  r = 0 | Math.random() * 16;
                  uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
              }
          }
      }
      return uuid.join('');
   }
}



export default Utils;