/**@description 用户的微信信息 */
export interface UserWeChatInterface{
       /**@description 昵称 */
       nickName: string;
       /**@description 性别 */
       sex: number;
       /**@description 头像 */
       avatarUrl: string;
       /**@description 地区 */
       area: string;
}


//分享类型
export enum ShareType {
    Friend,
    Timeline
}