import { _decorator, Component, Node, EditBox, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoginScence')
export class LoginScence extends Component {

    @property(Node)
    public my_EditBox: Node

    start() {
        globalThis._eventtarget.on('login', this.onLoginMessage,this);
        let sysInfo = wx.getSystemInfoSync();
        //获取微信界面大小
        let screenWidth = sysInfo.screenWidth;
        let screenHeight = sysInfo.screenHeight;
        const vxLoginBtn = wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
              left: 0,
              top: 0,
              width: screenWidth,
              height: screenHeight,
              lineHeight: 40,
              backgroundColor: '#00000000',
              color: '#ffffff',
              textAlign: 'center',
            }
          });
          vxLoginBtn.onTap((res) => {
            // 此处可以获取到用户信息
            console.log(res);
            globalThis.vxUserInfo = res.userInfo;
            // 加载大厅场景
            director.loadScene("HallScene");
          })
    }

    update(deltaTime: number) {
        
    }

    /**
     * onLogin
     */
    public onLoginBtnClicked() {
        let str = this.my_EditBox.getComponent(EditBox).string;
        console.log("获取账号:",str);
        let senddata = {
            id: str
        }
        globalThis._loginClientMgr.sendMessage("login", senddata);
    }

    public onLoginMessage(data){
        data = data.user;
        console.log("处理玩家登录消息: ", data);
        globalThis._userInfo.user_id = data.userId;
        globalThis._userInfo.user_name = data.userName;
        globalThis._userInfo.user_head_url = data.userHeadUrl;
        globalThis._userInfo.user_room_cards = data.userRoomCards;
        globalThis._userInfo.room_id = data.roomId;

        // 加载大厅场景
        director.loadScene("HallScene");
    }

    
}

