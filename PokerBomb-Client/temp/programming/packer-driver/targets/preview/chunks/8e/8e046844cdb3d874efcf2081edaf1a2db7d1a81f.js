System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, PushCardVo;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "db37ctDRmRNXrs4FxyBiZRs", "PushCardVo", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PushCardVo", PushCardVo = (_dec = ccclass('PushCardVo'), _dec(_class = class PushCardVo extends Component {
        constructor() {
          super(...arguments);
          this.preCardList = new Array();
          this.prePushSeat = 0;
          this.preSeat = 0;
          this.preUserCards = new Array();
          this.preStatus = "";
          this.curCardList = new Array();
          this.curSeat = 0;
          this.points = 0;
          this.myStatus = "";
          this.type = "";
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8e046844cdb3d874efcf2081edaf1a2db7d1a81f.js.map