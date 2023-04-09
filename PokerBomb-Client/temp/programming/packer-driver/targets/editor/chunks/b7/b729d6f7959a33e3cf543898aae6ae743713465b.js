System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, EventTarget, _dec, _class, _crd, ccclass, property, eventtarget, LoginClient;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      EventTarget = _cc.EventTarget;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a5e56WEVXRE6LuwJFSl49lY", "LoginClient", undefined);

      ({
        ccclass,
        property
      } = _decorator);
      eventtarget = new EventTarget();
      globalThis._eventtarget = eventtarget; //globalThis是全局的

      _export("LoginClient", LoginClient = (_dec = ccclass('LoginClient'), _dec(_class = class LoginClient extends Component {
        start() {
          this._init();
        }

        update(deltaTime) {}

        _init() {
          this._connectServer();
        }

        _connectServer() {
          let ws = new WebSocket("ws:127.0.0.1:9090/websocket/wyp");

          ws.onopen = () => {
            console.log("连接成功");
            ws.send("你好啊，服务器，我是wyp客户端");
          };

          ws.onmessage = result => {
            let message = result.data;
            console.log("接收到服务器消息：", message);
            let type = message.type;
            let data = message.data;
            this.responseServerMessage(type, data);
          };

          ws.onclose = () => {
            console.log("与服务器断开连接");
          };

          ws.onerror = err => {
            console.log("网络连接出错：", err);
          };
        }
        /**
         * 响应服务端消息 type-->消息类型，  data-->消息数据
         */


        responseServerMessage(type, data) {
          globalThis._eventtarget.emit(type, data);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b729d6f7959a33e3cf543898aae6ae743713465b.js.map