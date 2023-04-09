System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _class2, _crd, ccclass, property, UserInfo;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ad450ByAmVGroVSSY8risKo", "UserInfo", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("UserInfo", UserInfo = (_dec = ccclass('UserInfo'), _dec(_class = (_class2 = class UserInfo extends Component {
        constructor(...args) {
          super(...args);
          this.user_id = void 0;
          this.user_name = void 0;
          this.user_head_url = void 0;
          this.user_room_cards = void 0;
          this.room_id = void 0;
        }

        static getInstance() {
          if (UserInfo.instance == null) {
            UserInfo.instance = new UserInfo();
          }

          return UserInfo.instance;
        } //但脚本第一次运行时触发此函数(挂载到脚本或者被其他脚本引入)


        start() {
          globalThis._userInfo = UserInfo.getInstance();
        }

        update(deltaTime) {}

      }, _class2.instance = null, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=29f9da9bbe5cbc0d356d6fb02f13b949f00b0473.js.map