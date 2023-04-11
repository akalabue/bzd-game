import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BZDClient')
export class BZDClient extends Component {
    private _ws : any = null;

    start() {
        this._init();
    }

    update(deltaTime: number) {
        
    }

    private _init() {
        globalThis._BZDClient = this;//使得全局能够获取此对象
        this._connectServer();
    }

    private _connectServer(){
        let ip = window.location.hostname;
        const ws = new WebSocket(`ws://${window.location.hostname}:9091/websocket/bzd/${globalThis._userInfo.room_id}/${globalThis._userInfo.user_id}`);
        this._ws = ws;
        ws.onopen = ()=>{
            console.log("连接霸炸弹游戏服务器成功");
            this.requestRoomInfo();
            this.newUserJoinRoom();
        }
        ws.onmessage = (result)=>{
            let message = result.data;
            let obj = JSON.parse(message);
            console.log("接收到霸炸弹服务器消息：",obj);
            let _data = obj.data;
            let _type = obj.type;
            this.responseServerMessage(_type, _data);
        }
        ws.onclose = ()=>{
            console.log("与霸炸弹游戏服务器断开连接");
        }
        ws.onerror = (err)=>{
            console.log("霸炸弹服务器网络连接出错：",err);
        }
    }

    /**
     * 响应服务端消息 type-->消息类型，  data-->消息数据
     */

    public responseServerMessage(type, data){
        globalThis._eventtarget.emit(type, data);
    }

    private sendMessage(_type, _data){
        let sendData = {
            type: _type,
            data: _data
        }
        console.log(sendData);
        this._ws.send(JSON.stringify(sendData));//将javascript对象转为字符串
    }

    requestRoomInfo(){
        this.sendMessage("requestRoomInfo", {});
    }

    newUserJoinRoom(){
        this.sendMessage("newUserJoinRoom", {});
    }
}

