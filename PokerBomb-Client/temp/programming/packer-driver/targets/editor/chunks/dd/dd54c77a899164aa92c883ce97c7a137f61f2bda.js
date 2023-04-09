System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, LoginScence;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2cecekPD9VBnrWabG0egeEE", "LoginScene", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("LoginScence", LoginScence = (_dec = ccclass('LoginScence'), _dec(_class = class LoginScence extends Component {
        start() {}

        update(deltaTime) {}
        /**
         * onLogin
         */


        onLoginBtnClicked() {
          console.log("登录按钮被点击了");
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=dd54c77a899164aa92c883ce97c7a137f61f2bda.js.map