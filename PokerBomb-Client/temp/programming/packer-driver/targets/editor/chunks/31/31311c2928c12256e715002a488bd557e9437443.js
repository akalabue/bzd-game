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
        constructor(...args) {
          super(...args);
          this._ws = null;
        }

        start() {
          this._init();
        }

        update(deltaTime) {}

        _init() {
          globalThis._loginClientMgr = this; //使得全局能够获取此对象

          this._connectServer();
        }

        _connectServer() {
          const ws = new WebSocket("ws:127.0.0.1:9090/websocket/login");
          this._ws = ws;

          ws.onopen = () => {
            console.log("连接登录服务器成功"); // ws.send("你好啊，服务器，我是wyp客户端");
          };

          ws.onmessage = result => {
            let message = result.data;
            let obj = JSON.parse(message);
            console.log("接收到登录服务器消息：", obj);
            let _data = obj.data;
            let _type = obj.type;
            console.log("登录服务器发送数据--> 类型：", _type, " 数据：", _data);
            this.responseServerMessage(_type, _data);
          };

          ws.onclose = () => {
            console.log("与登录服务器断开连接");
          };

          ws.onerror = err => {
            console.log("登录网络连接出错：", err);
          };
        }
        /**
         * 响应服务端消息 type-->消息类型，  data-->消息数据
         */


        responseServerMessage(type, data) {
          // console.log("服务端发送数据--> 类型：", type, " 数据：", data)
          globalThis._eventtarget.emit(type, data);
        }

        sendMessage(_type, _data) {
          let sendData = {
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
//# sourceMappingURL=31311c2928c12256e715002a488bd557e9437443.js.map