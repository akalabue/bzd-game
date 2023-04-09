import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UserInfo')
export class UserInfo extends Component {

    public user_id;//用户id

    public user_name;//用户昵称

    public user_head_url;//用户头像

    public user_room_cards;//用户房卡数量

    public room_id;//房间id

    public room_seat; //房间位置

    static instance:any = null;

    public static getInstance(){
        if(UserInfo.instance == null){
            UserInfo.instance = new UserInfo;
        }
        return UserInfo.instance;
    }

    //但脚本第一次运行时触发此函数(挂载到脚本或者被其他脚本引入)
    start() {
        globalThis._userInfo = UserInfo.getInstance();
    }

    update(deltaTime: number) {
        
    }
}

