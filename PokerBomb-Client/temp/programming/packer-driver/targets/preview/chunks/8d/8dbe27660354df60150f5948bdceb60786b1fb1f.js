System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, HallClient;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "07e44XO3edMgZRPvJjHZGRN", "HallClient", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("HallClient", HallClient = (_dec = ccclass('HallClient'), _dec(_class = class HallClient extends Component {
        constructor() {
          super(...arguments);
          this._ws = null;
        }

        start() {
          this._init();
        }

        update(deltaTime) {}

        _init() {
          globalThis._hallClientMgr = this; //使得全局能够获取此对象

          this._connectServer();
        }

        _connectServer() {
          var ws = new WebSocket("ws:127.0.0.1:9091/websocket/hall/" + globalThis._userInfo.user_id);
          this._ws = ws;

          ws.onopen = () => {
            console.log("连接大厅服务器成功");
          };

          ws.onmessage = result => {
            var message = result.data;
            var obj = JSON.parse(message);
            console.log("大厅接收到服务器消息：", obj);
            var _data = obj.data;
            var _type = obj.type;
            this.responseServerMessage(_type, _data);
          };

          ws.onclose = () => {
            console.log("与大厅服务器断开连接");
          };

          ws.onerror = err => {
            console.log("大厅服务器网络连接出错：", err);
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

          this._ws.send(JSON.stringify(sendData)); //将javascript对象转为字符串

        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8dbe27660354df60150f5948bdceb60786b1fb1f.js.map