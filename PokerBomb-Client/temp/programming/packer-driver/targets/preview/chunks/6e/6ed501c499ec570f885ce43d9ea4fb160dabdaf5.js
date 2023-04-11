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
        constructor() {
          super(...arguments);
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
          var ip = window.location.hostname;
          var ws = new WebSocket("ws:" + window.location.hostname + ":9091/websocket/bzd/" + globalThis._userInfo.room_id + "/" + globalThis._userInfo.user_id);
          this._ws = ws;

          ws.onopen = () => {
            console.log("连接霸炸弹游戏服务器成功");
            this.requestRoomInfo();
            this.newUserJoinRoom();
          };

          ws.onmessage = result => {
            var message = result.data;
            var obj = JSON.parse(message);
            console.log("接收到霸炸弹服务器消息：", obj);
            var _data = obj.data;
            var _type = obj.type;
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
          var sendData = {
            type: _type,
            data: _data
          };
          console.log(sendData);

          this._ws.send(JSON.stringify(sendData)); //将javascript对象转为字符串

        }

        requestRoomInfo() {
          this.sendMessage("requestRoomInfo", {});
        }

        newUserJoinRoom() {
          this.sendMessage("newUserJoinRoom", {});
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6ed501c499ec570f885ce43d9ea4fb160dabdaf5.js.map