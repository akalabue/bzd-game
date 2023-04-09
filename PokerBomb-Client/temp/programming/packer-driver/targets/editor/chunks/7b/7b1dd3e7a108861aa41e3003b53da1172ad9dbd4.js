System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, BZDClient;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7cd74Dyk0lMIrf+pwjkSg+H", "BZDClient", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BZDClient", BZDClient = (_dec = ccclass('BZDClient'), _dec(_class = class BZDClient extends Component {
        constructor(...args) {
          super(...args);
          this._ws = null;
        }

        start() {
          this._init();
        }

        update(deltaTime) {}

        _init() {
          globalThis._BZDClient = this; //使得全局能够获取此对象

          this._connectServer();
        }

        _connectServer() {
          let ip = window.location.hostname;
          const ws = new WebSocket(`ws:${window.location.hostname}:9091/websocket/bzd/${globalThis._userInfo.room_id}/${globalThis._userInfo.user_id}`);
          this._ws = ws;

          ws.onopen = () => {
            console.log("连接霸炸弹游戏服务器成功");
            this.requestRoomInfo();
          };

          ws.onmessage = result => {
            let message = result.data;
            let obj = JSON.parse(message);
            console.log("接收到霸炸弹服务器消息：", obj);
            let _data = obj.data;
            let _type = obj.type;
            this.responseServerMessage(_type, _data);
          };

          ws.onclose = () => {
            console.log("与霸炸弹游戏服务器断开连接");
          };

          ws.onerror = err => {
            console.log("霸炸弹服务器网络连接出错：", err);
          };
        }
        /**
         * 响应服务端消息 type-->消息类型，  data-->消息数据
         */


        responseServerMessage(type, data) {
          globalThis._eventtarget.emit(type, data);
        }

        sendMessage(_type, _data) {
          let sendData = {
            type: _type,
            data: _data
          };
          console.log("游戏服务器发送信息：", sendData);

          this._ws.send(JSON.stringify(sendData)); //将javascript对象转为字符串

        }

        requestRoomInfo() {
          let data = {
            roomId: globalThis._userInfo.room_id,
            userId: globalThis._userInfo.user_id
          };
          this.sendMessage("requestRoomInfo", data);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7b1dd3e7a108861aa41e3003b53da1172ad9dbd4.js.map