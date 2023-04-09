System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, LoginClient;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a5e56WEVXRE6LuwJFSl49lY", "LoginClient", undefined);

      ({
        ccclass,
        property
      } = _decorator);

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

          ws.onmessage = data => {
            console.log("接收到服务器消息：", data.data);
          };

          ws.onclose = () => {
            console.log("与服务器断开连接");
          };

          ws.onerror = err => {
            console.log("网络连接出错：", err);
          };
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=38df731996f80b1df88c1c355c80851ebd7a739b.js.map