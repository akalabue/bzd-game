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
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "my_EditBox", _descriptor, this);
        }

        start() {
          globalThis._eventtarget.on('login', this.onLoginMessage, this);
        }

        update(deltaTime) {}
        /**
         * onLogin
         */


        onLoginBtnClicked() {
          var str = this.my_EditBox.getComponent(EditBox).string;
          console.log("获取账号:", str);
          var senddata = {
            id: str
          };

          globalThis._loginClientMgr.sendMessage("login", senddata);
        }

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
//# sourceMappingURL=7cb4a8a082fb7972dfe2f5679863414a7973f0b6.js.map