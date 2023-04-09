System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, createRoom;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cbda9O4D59Lzpa+Lrkn0Svq", "createRoom", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("createRoom", createRoom = (_dec = ccclass('createRoom'), _dec(_class = class createRoom extends Component {
        constructor() {
          super(...arguments);
          this.gameNumbers = void 0;
        }

        //游戏局数
        start() {
          this.gameNumbers = 10;
        }

        update(deltaTime) {}

        onCloseBtnClicked() {
          this.node.active = false;
        }

        onCreateBtnClicked() {
          console.log("创建按钮点击了");
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c3734ee80a90ae15822d7609960bb7fe9a2d5bba.js.map