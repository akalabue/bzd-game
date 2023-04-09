System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, joinRoom;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0ffd2PAmD5FS7dvWnGhFXjg", "joinRoom", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("joinRoom", joinRoom = (_dec = ccclass('joinRoom'), _dec(_class = class joinRoom extends Component {
        start() {}

        update(deltaTime) {}

        onCloseBtnClicked() {
          this.node.active = false;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=05133f216d5bed876e83df4d7b38f3dd77180b9c.js.map