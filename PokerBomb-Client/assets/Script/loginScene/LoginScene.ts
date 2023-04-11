import { _decorator, Component, Node, EditBox, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoginScence')
export class LoginScence extends Component {

    @property(Node)
    public my_EditBox: Node

    start() {
        // globalThis._eventtarget.on('login', this.onLoginMessage,this);
        let sysInfo = wx.getSystemInfoSync();
        //获取微信界面大小
        let screenWidth = sysInfo.screenWidth;
        let screenHeight = sysInfo.screenHeight;
        let self = this;
        const vxLoginBtn = wx.createUserInfoButton({
            type: 'text',
            text: '微信登录',
            style: {
            //   left: 0,
            //   top: 0,
            //   width: screenWidth,
            //   height: screenHeight,
            //   lineHeight: 40,
            //   backgroundColor: '#00000000',
            //   color: '#ffffff',
            //   textAlign: 'center',
                left: 10,
                top: 76,
                width: 200,
                height: 40,
                lineHeight: 40,
                backgroundColor: '#ff0000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
          });
          vxLoginBtn.onTap((res) => {
            // 此处可以获取到用户信息
            console.log(res.userInfo);
            let userInfo = res.userInfo;
            self.wxLogin(userInfo);
          })

          wx.getUserInfo({
              success(res){
                  let userInfo = res.userInfo;
                  self.wxLogin(userInfo);
              },
              fail(){
                  console.log("获取用户信息失败")
              }
          })
    }

    wxLogin(userInfo) {
        let self = this;
        wx.login({
            success(res){
                if(res.code){
                    wx.request({
                        url:`http://${window.location.hostname}:9091/wxlogin`,
                        method:"POST",
                        header:{
                            'content-type':'application/x-www-form-urlencoded'
                        },
                        data:{
                            code: res.code,
                            nickName: userInfo.nickName,
                            avatarUrl: userInfo.avatarUrl
                        },
                        success(res) {
                            self.onLoginMessage(res.data);
                        }
                        
                    })
                }else {
                    console.log("登陆失败" + res.errMsg);
                }
            }
        })
        director.loadScene("HallScene");
    }

    /**
     * onLogin
     */
    public onLoginBtnClicked() {
        let self = this;
        let str = this.my_EditBox.getComponent(EditBox).string;
        console.log("获取账号:",str);
        var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
        httpRequest.open('POST', `http://${window.location.hostname}:9091/login`, true); //第二步：打开连接
        httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
        httpRequest.send(`userid=${str}`);//发送请求 将情头体写在send中
        /**
         * 获取数据后的处理程序
         */ 
        httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
                let data = JSON.parse(httpRequest.responseText);//获取到服务端返回的数据
                self.onLoginMessage(data);
            }
        };
    }

    /**
     * onVxLoginBtnClicked
     */
    public onVxLoginBtnClicked() {
        
    }

    public onLoginMessage(data){
        console.log("处理玩家登录消息: ", data);
        globalThis._userInfo.user_id = data.userId;
        globalThis._userInfo.user_name = data.nickName;
        globalThis._userInfo.user_head_url = data.avatarUrl;
        globalThis._userInfo.user_room_cards = data.userRoomCards;
        globalThis._userInfo.room_id = data.roomId;

        // 加载大厅场景
        director.loadScene("HallScene");
    }

    
}

