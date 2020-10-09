
interface ToastInterface{
    text: string,
    duration?: number,
    finishe_call?:Function,
    /**@description 16进制的颜色值 */
    text_color?:string,
    /**@description 底部的图片的纹理 */
    bottom_sprite_frame?: cc.SpriteFrame,
}


export default ToastInterface;