System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, EditBox, director, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, LoginScence;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      EditBox = _cc.EditBox;
      director = _cc.director;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a9524VmvSFBXafq4DX53DPr", "LoginScene", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("LoginScence", LoginScence = (_dec = ccclass('LoginScence'), _dec2 = property(Node), _dec(_class = (_class2 = class LoginScence extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "my_EditBox", _descriptor, this);
        }

        start() {
          globalThis._eventtarget.on('login', this.onLoginMessage, this);

          let sysInfo = wx.getSystemInfoSync(); //获取微信界面大小

          let screenWidth = sysInfo.screenWidth;
          let screenHeight = sysInfo.screenHeight;
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
          vxLoginBtn.onTap(res => {
            // 此处可以获取到用户信息
            console.log(res);
            globalThis.vxUserInfo = res.userInfo; // 加载大厅场景

            globalThis._loginClientMgr.sendMessage("login", globalThis.vxUserInfo);
          });
        }

        update(deltaTime) {}
        /**
         * onLogin
         */


        onLoginBtnClicked() {
          let str = this.my_EditBox.getComponent(EditBox).string;
          console.log("获取账号:", str);
          let senddata = {
            id: str
          };

          globalThis._loginClientMgr.sendMessage("login", senddata);
        }
        /**
         * onVxLoginBtnClicked
         */


        onVxLoginBtnClicked() {}

        onLoginMessage(data) {
          data = data.user;
          console.log("处理玩家登录消息: ", data);
          globalThis._userInfo.user_id = data.userId;
          globalThis._userInfo.user_name = data.userName;
          globalThis._userInfo.user_head_url = data.userHeadUrl;
          globalThis._userInfo.user_room_cards = data.userRoomCards;
          globalThis._userInfo.room_id = data.roomId; // 加载大厅场景

          director.loadScene("HallScene");
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "my_EditBox", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=98f0b51b075c7a55a8c2fb2bb6f8ed98a14cda85.js.map