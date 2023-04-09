System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, Poker;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1c169QiLixNeZ3x8NKuwF40", "Poker", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Poker", Poker = (_dec = ccclass('Poker'), _dec(_class = class Poker extends Component {
        constructor() {
          super(...arguments);
          this.prefab = void 0;
          this.atlas = void 0;
        }

        start() {}

        update(deltaTime) {}

        init(cardList) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=93e7d6e202e90fbd64b47163e6ff451be58cce77.js.map