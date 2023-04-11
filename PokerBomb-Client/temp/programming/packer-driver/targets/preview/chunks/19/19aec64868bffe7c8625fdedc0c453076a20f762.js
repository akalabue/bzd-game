System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, GameRole;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "74e00QZu3BNE5kq1RDX3Dcd", "GameRole", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameRole", GameRole = (_dec = ccclass('GameRole'), _dec(_class = class GameRole extends Component {
        constructor() {
          super(...arguments);
          this.userId = void 0;
          this.userName = void 0;
          this.userIcon = void 0;
          this.totalPoints = void 0;
          this.juPoints = void 0;
          this.panPoints = void 0;
          this.userCards = void 0;
          this.userStatus = void 0;
        }

        start() {}

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=19aec64868bffe7c8625fdedc0c453076a20f762.js.map